package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.request.PartyToyRequest;
import com.victorpolicarpo.toyloop.dto.request.TransitionRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeePartyResponse;
import com.victorpolicarpo.toyloop.dto.response.ListPartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyToyResponse;
import com.victorpolicarpo.toyloop.dto.update.PartyUpdate;
import com.victorpolicarpo.toyloop.entity.*;
import com.victorpolicarpo.toyloop.exception.*;
import com.victorpolicarpo.toyloop.mapper.PartyMapper;
import com.victorpolicarpo.toyloop.repository.EmployeeRepository;
import com.victorpolicarpo.toyloop.repository.PartyRepository;
import com.victorpolicarpo.toyloop.repository.PartyToyRepository;
import com.victorpolicarpo.toyloop.repository.ToyRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartyService {
    private final PartyRepository partyRepository;
    private final PartyMapper partyMapper;
    private final ToyRepository toyRepository;
    private final PartyToyRepository partyToyRepository;
    private final EmployeeRepository employeeRepository;
    private final AuthService authService;

    @Transactional
    public PartyResponse createParty(PartyRequest dto) {
        if (partyRepository.existsByStartDateHoursAndAddress(dto.startDateHours(), dto.address())){
            throw new ResourceAlreadyExistsException("An exist party in this hours and in this month/day");
        }

        User user = authService.getAuthenticatedUser();
        LocalDateTime endHours = dto.endDateHours() != null ? dto.endDateHours() : dto.startDateHours().plusHours(4);

        checkEmployeeAvailability(dto.employeeId() != null ? new HashSet<>(dto.employeeId()) : new HashSet<>(), dto.startDateHours(), endHours, -1L);
        validateAllStocks(dto.toys(), dto.startDateHours(), endHours, -1L);

        Party party = partyMapper.toEntity(dto);
        party.setEndDateHours(endHours);
        party.setCreateBy(user);

        Set<Employee> employees = new HashSet<>();
        if (dto.employeeId() != null && !dto.employeeId().isEmpty()){
            validateEmployeesActive(new HashSet<>(dto.employeeId()), employees, new HashSet<>());
        }
        party.setEmployees(employees);

        Set<PartyToy> partyToys = new HashSet<>();
        for (PartyToyRequest f : dto.toys()) {
            Toy toyEntity = toyRepository.findById(f.toyId()).orElseThrow(
                    () -> new ResourceNotFoundException("Toy not found")
            );
            PartyToy pt = new PartyToy();
            pt.setToy(toyEntity);
            pt.setParty(party);
            pt.setQuantity(f.quantity());
            partyToys.add(pt);
        }
        party.setPartyToys(partyToys);

        if (party.getValue() == null || party.getValue().compareTo(BigDecimal.ZERO) == 0 ) {
            party.setValue(calculateTotalValue(party));
        }
        return partyMapper.toResponse(partyRepository.save(party));
    }

    @Transactional
    public PartyResponse updateParty(@Valid PartyUpdate dto, Long id) {
        Party party = findById(id);
        validatePartyDates(party, dto);
        partyMapper.updateEntityFromDto(dto, party);

        if (party.getPartyStatus() != Party.PartyStatus.FINISHED && party.getEndDateHours().isAfter(LocalDateTime.now())) {
            if (dto.employees() != null) {

                if (dto.employees().isEmpty()) {
                    party.getEmployees().clear();
                } else {
                    Set<Long> employeeIds = dto.employees().stream()
                            .map(EmployeePartyResponse::employeeId)
                            .collect(Collectors.toSet());

                    Set<Long> existingEmployeeIds = party.getEmployees().stream()
                            .map(Employee::getEmployeeId)
                            .collect(Collectors.toSet());

                    checkEmployeeAvailability(employeeIds, party.getStartDateHours(), party.getEndDateHours(), party.getPartyId());
                    Set<Employee> newEmployees = new HashSet<>();
                    validateEmployeesActive(employeeIds, newEmployees, existingEmployeeIds);
                    party.getEmployees().clear();
                    party.getEmployees().addAll(newEmployees);
                }
            }
            else if (dto.startDateHours() != null || dto.endDateHours() != null) {
                Set<Long> currentEmployeeIds = party.getEmployees().stream()
                        .map(Employee::getEmployeeId)
                        .collect(Collectors.toSet());

                checkEmployeeAvailability(currentEmployeeIds, party.getStartDateHours(), party.getEndDateHours(), party.getPartyId());
            }
        }

        if (dto.partyToys() != null && party.getEndDateHours().isAfter(LocalDateTime.now()) && party.getPartyStatus() != Party.PartyStatus.FINISHED) {
            validateAllStocks(dto.partyToys(), party.getStartDateHours(), party.getEndDateHours(), party.getPartyId());
            updatePartyToys(party, dto.partyToys());

            if (dto.value() == null) {
                party.setValue(calculateTotalValue(party));
            }
        }

        return partyMapper.toResponse(partyRepository.save(party));
    }

    public PartyResponse findPartyById(Long id) {
        return partyMapper.toResponse(findById(id));
    }

    public Page<ListPartyResponse> getByFilter(Party.PartyStatus partyStatus,
                                               Party.AssemblyStatus assemblyStatus,
                                               LocalDate date, Pageable pageable) {
        Page<Party> partyPage = partyRepository.findByFilters(partyStatus, assemblyStatus, date, pageable);
        return partyPage.map(partyMapper::toListPartyResponse);
    }


    @Transactional
    public void delete(Long id) {
        Party party = findById(id);
        party.setActive(false);
    }


    private BigDecimal calculateTotalValue(Party party){
        if (party.getPartyToys() == null || party.getPartyToys().isEmpty()){
            return BigDecimal.ZERO;
        }
        return party.getPartyToys().stream()
                .map(valueToy -> {
                    BigDecimal price = valueToy.getToy().getValueForFourHours();
                    BigDecimal unitPrice = (price != null) ? price : BigDecimal.ZERO;
                    return unitPrice.multiply(BigDecimal.valueOf(valueToy.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void validatePartyDates(Party party, PartyUpdate dto){
        LocalDateTime start = (dto.startDateHours() != null) ? dto.startDateHours() : party.getStartDateHours();
        LocalDateTime end = (dto.endDateHours() != null) ? dto.endDateHours() : party.getEndDateHours();
        if (end.isBefore(start) || end.isEqual(start)){
            throw new BusinessRuleException("The end date must be strictly after the start date.");
        }
        if (java.time.Duration.between(start, end).toMinutes() < 15){
            throw new BusinessRuleException("The party must last at least 15 minutes.");
        }
    }

    private void validateAllStocks(Collection<?> toyItems, LocalDateTime start, LocalDateTime end, Long excludePartyId) {
        List<ResourceConflict> errors = new ArrayList<>();

        if (toyItems == null || toyItems.isEmpty()){
            throw new BusinessRuleException("The party must contain at least 1 toy");
        }

        for (Object item : toyItems) {
            Long toyId;
            Integer quantity;
            if (item instanceof PartyToyRequest(Long id, Integer quantity1)) {
                toyId = id;
                quantity = quantity1;
            } else if (item instanceof PartyToyResponse res) {
                toyId = res.toyId();
                quantity = res.quantity();
            } else {
                continue;
            }

            Integer busy = partyToyRepository.getQuantityBusyExcludingParty(toyId, start, end, excludePartyId);
            Toy toy = toyRepository.findById(toyId)
                    .orElseThrow(() -> new ResourceNotFoundException("Toy not found"));

            int available = toy.getAvailableQuantity() - (busy != null ? busy : 0);

            if (quantity > available) {
                errors.add(new ResourceConflict("Insufficient stock", "The requested quantity is not available in stock.", toy.getToyId(), toy.getName()));
            }
        }

        if (!errors.isEmpty()) {
            throw new ResourceBusyException(errors);
        }
    }

    private void checkEmployeeAvailability(Set<Long> employeeIds, LocalDateTime start, LocalDateTime end, Long excludePartyId){
        List<ResourceConflict> errors = new ArrayList<>();
        if (employeeIds == null || employeeIds.isEmpty()){
            return;
        }
        for (Long id: employeeIds){
            Long busy = employeeRepository.countOccupiedEmployeeExcludingParty(id, start, end, excludePartyId);

            if (busy > 0) {
                Employee emp = employeeRepository.findById(id).orElseThrow(
                        () -> new ResourceNotFoundException("Employee not found"));
                errors.add(new ResourceConflict("Employee unavailable", "The selected employee is currently busy.", emp.getEmployeeId(), emp.getName()));
            }
        }
        if (!errors.isEmpty()){
            throw new ResourceBusyException(errors);
        }

    }

    private void validateEmployeesActive(Set<Long> employeeIds, Set<Employee> targetList, Set<Long> existingEmployeeIds) {
        List<ResourceConflict> conflicts = new ArrayList<>();
        if (existingEmployeeIds == null) {
            existingEmployeeIds = new HashSet<>();
        }

        for (Long id : employeeIds) {
            Employee emp = employeeRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

            if (!emp.isActive() && !existingEmployeeIds.contains(id)) {
                conflicts.add(new ResourceConflict(
                        "Inactive Employee",
                        "This employee cannot be assigned because they are inactive.",
                        emp.getEmployeeId(),
                        emp.getName()
                ));
            } else {
                targetList.add(emp);
            }
        }

        if (!conflicts.isEmpty()) {
            throw new ResourceBusyException(conflicts);
        }
    }

    public Party findById(Long id) {
        return partyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Party not found or not exist")
        );
    }

    private void updatePartyToys(Party party, Set<PartyToyResponse> toyDto) {
        party.getPartyToys().clear();
        for (PartyToyResponse dto : toyDto) {
            Toy toy = toyRepository.findById(dto.toyId()).orElseThrow(
                    () -> new ResourceNotFoundException("Toy not found")
            );

            PartyToy pt = new PartyToy();
            pt.setToy(toy);
            pt.setParty(party);
            pt.setQuantity(dto.quantity());

            party.getPartyToys().add(pt);
        }
    }

    @Transactional
    public void transition(Long id, TransitionRequest dto) {
        Party party = findById(id);

        switch (dto.action()) {
            case ASSEMBLE -> assemble(party);

            case START -> start(party);

            case FINISH -> finish(party);

            case CANCEL -> cancel(party);

            case COLLECT -> collect(party);
        }

    }


    private void assemble(Party party) {
        if (party.getPartyStatus() != Party.PartyStatus.SCHEDULED || party.getAssemblyStatus() != Party.AssemblyStatus.TO_ASSEMBLE) {
            throw new BusinessRuleException("The toys cannot be assembled at the party.");
        }

        party.setAssemblyStatus(Party.AssemblyStatus.ASSEMBLED);
    }


    private void start(Party party){

        if (party.getPartyStatus() != Party.PartyStatus.SCHEDULED || party.getAssemblyStatus() != Party.AssemblyStatus.ASSEMBLED){
            throw new BusinessRuleException("The party cannot begin.");
        }
        party.setPartyStatus(Party.PartyStatus.IN_PROGRESS);
    }

    private void finish(Party party){
        if (party.getPartyStatus() != Party.PartyStatus.IN_PROGRESS){
            throw new BusinessRuleException("The party cannot finish");
        }
        party.setPartyStatus(Party.PartyStatus.FINISHED);
        party.setAssemblyStatus(Party.AssemblyStatus.TO_DISASSEMBLE);
    }

    private void cancel(Party party) {

        if (party.getPartyStatus() != Party.PartyStatus.SCHEDULED
                && party.getPartyStatus() != Party.PartyStatus.IN_PROGRESS) {

            throw new BusinessRuleException("Party cannot be canceled because it is " + party.getPartyStatus());
        }

        Party.AssemblyStatus nextAssemblyStatus = switch (party.getAssemblyStatus()) {
            case TO_ASSEMBLE ->
                    Party.AssemblyStatus.NOT_APPLICABLE;
            case ASSEMBLED ->
                    Party.AssemblyStatus.TO_DISASSEMBLE;
            default ->
                    throw new BusinessRuleException(
                            "Party cannot be canceled during assembly state: " + party.getAssemblyStatus()
                    );
        };

        party.setPartyStatus(Party.PartyStatus.CANCELED);
        party.setAssemblyStatus(nextAssemblyStatus);
    }

    private void collect(Party party) {

        if (party.getAssemblyStatus() != Party.AssemblyStatus.TO_DISASSEMBLE) {
            throw new BusinessRuleException("The toys cannot be collected");
        }
        party.setAssemblyStatus(Party.AssemblyStatus.DISASSEMBLED);
    }

}
