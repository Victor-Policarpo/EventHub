package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.request.PartyToyRequest;
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
        checkEmployeeAvailability(dto.employeeId(), dto.startDateHours(), endHours, -1L);
        validateAllStocks(dto.toys(), dto.startDateHours(), endHours, -1L);

        Party party = partyMapper.toEntity(dto);
        party.setEndDateHours(endHours);
        party.setCreateBy(user);

        Set<Employee> employees = new HashSet<>();
        if (dto.employeeId() != null){
            for (Long id : dto.employeeId()) {
                Employee emp = employeeRepository.findById(id).orElseThrow(
                        () -> new ResourceNotFoundException("Employee not found"));
                employees.add(emp);
            }
        }

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
        party.setEmployees(employees);

        if (party.getValue() == null || party.getValue().compareTo(BigDecimal.ZERO) == 0 ) {
            party.setValue(calculateTotalValue(party));
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
    public PartyResponse updateParty(@Valid PartyUpdate dto, Long id) {
        Party party = findById(id);
        validatePartyDates(party, dto);
        partyMapper.updateEntityFromDto(dto, party);

        if (party.getPartyStatus() != Party.PartyStatus.FINISHED) {
            if (dto.employees() != null && !dto.employees().isEmpty()) {
                Set<Long> employeeIds = dto.employees().stream()
                        .map(EmployeePartyResponse::employeeId)
                        .collect(Collectors.toSet());

                checkEmployeeAvailability(employeeIds, party.getStartDateHours(), party.getEndDateHours(), party.getPartyId());
                Set<Employee> newEmployees = new HashSet<>();
                for (Long empId : employeeIds) {
                    var emp = employeeRepository.findById(empId).orElseThrow(
                            () -> new ResourceNotFoundException("Employee not found"));
                    newEmployees.add(emp);
                }
                party.setEmployees(newEmployees);
            }
            else if (dto.startDateHours() != null || dto.endDateHours() != null) {
                Set<Long> currentEmployeeIds = party.getEmployees().stream()
                        .map(Employee::getEmployeeId)
                        .collect(Collectors.toSet());

                checkEmployeeAvailability(currentEmployeeIds, party.getStartDateHours(), party.getEndDateHours(), party.getPartyId());
            }
        }

        if (dto.partyToys() != null) {
            validateAllStocks(dto.partyToys(), party.getStartDateHours(), party.getEndDateHours(), party.getPartyId());

            updatePartyToys(party, dto.partyToys());

            if (dto.value() == null) {
                party.setValue(calculateTotalValue(party));
            }
        }
        return partyMapper.toResponse(partyRepository.save(party));
    }

    public Party findById(Long id) {
        return partyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Party not found or not exist")
        );
    }

    @Transactional
    public void delete(Long id) {
        Party party = findById(id);
        party.setActive(false);
    }

    @Transactional
    public void startParty(Long id) {
        Party party = findById(id);
        if (party.getPartyStatus() != Party.PartyStatus.SCHEDULED){
            throw new BusinessRuleException("You can't start a party with status: " + party.getPartyStatus());
        }
        party.setPartyStatus(Party.PartyStatus.IN_PROGRESS);
        party.setAssemblyStatus(Party.AssemblyStatus.ASSEMBLED);
    }

    @Transactional
    public void endParty(Long id) {
        Party party = findById(id);
        if (party.getPartyStatus() == Party.PartyStatus.FINISHED || party.getPartyStatus() == Party.PartyStatus.CANCELED){
            throw new BusinessRuleException("Party already ended or canceled.");
        }
        party.setPartyStatus(Party.PartyStatus.FINISHED);
        party.setAssemblyStatus(Party.AssemblyStatus.TO_DISASSEMBLE);
    }

    @Transactional
    public void collectParty(Long id) {
        Party party = findById(id);
        if (party.getPartyStatus() == Party.PartyStatus.SCHEDULED || party.getPartyStatus() == Party.PartyStatus.IN_PROGRESS) {
            throw new BusinessRuleException("The toys can only be collected after the end or cancellation of the party.");
        } else if (party.getAssemblyStatus() != Party.AssemblyStatus.TO_DISASSEMBLE) {
            throw new BusinessRuleException("Toys can only be collected when the status is 'To Disassemble.");
        }
        party.setAssemblyStatus(Party.AssemblyStatus.DISASSEMBLED);
    }

    @Transactional
    public void cancelParty(Long id) {
        Party party = findById(id);
        if (party.getPartyStatus() == Party.PartyStatus.FINISHED || party.getPartyStatus() == Party.PartyStatus.CANCELED){
            throw new BusinessRuleException("Party already ended or canceled.");
        }

        if (party.getPartyStatus() == Party.PartyStatus.IN_PROGRESS){
            party.setAssemblyStatus(Party.AssemblyStatus.TO_DISASSEMBLE);
        } else {
            party.setAssemblyStatus(Party.AssemblyStatus.NOT_APPLICABLE);
        }
        party.setPartyStatus(Party.PartyStatus.CANCELED);
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

    private void updatePartyToys(Party party, Set<PartyToyResponse> toyDto){
        party.getPartyToys().clear();
        for (PartyToyResponse f: toyDto){
            Toy toy = toyRepository.findById(f.toyId()).orElseThrow(
                    () -> new ResourceNotFoundException("Toy not found")
            );
            PartyToy pt = new PartyToy();
            pt.setToy(toy);
            pt.setParty(party);
            pt.setQuantity(f.quantity());

            party.getPartyToys().add(pt);
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
}
