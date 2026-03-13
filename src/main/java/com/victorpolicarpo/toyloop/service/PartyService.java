package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.request.PartyToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ListPartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyResponse;
import com.victorpolicarpo.toyloop.entity.*;
import com.victorpolicarpo.toyloop.exception.BusinessRuleException;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.mapper.PartyMapper;
import com.victorpolicarpo.toyloop.repository.EmployeeRepository;
import com.victorpolicarpo.toyloop.repository.PartyRepository;
import com.victorpolicarpo.toyloop.repository.PartyToyRepository;
import com.victorpolicarpo.toyloop.repository.ToyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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
        LocalDateTime endHours = dto.endDateHours();
        if (endHours == null){
            endHours = dto.startDateHours().plusHours(4);
        }

        Party party = partyMapper.toEntity(dto);
        party.setEndDateHours(endHours);
        party.setCreateBy(user);

        Set<Employee> employee = new HashSet<>();
        Set<PartyToy> partyToys = new HashSet<>();
        for (Long f: dto.employeeId()){
            Employee employeeEntity = employeeRepository.findById(f).orElseThrow(
                    () -> new ResourceNotFoundException("Employee not found or not exist")
            );

            Long busy = employeeRepository.countOccupiedEmployee(
                    employeeEntity.getEmployeeId(),
                    dto.startDateHours(),
                    endHours
            );
            if (busy > 0){
                throw new BusinessRuleException("The employee: " + employeeEntity.getName() + " is already scheduled for another party at this time!");
            }
            employee.add(employeeEntity);
        }

        for (PartyToyRequest f: dto.toys()){
            Toy toyEntity = toyRepository.findById(f.toyId()).orElseThrow(
                    () -> new ResourceNotFoundException("Toy not found or not exist")
            );
            Integer busy = partyToyRepository.getQuantityBusy(
                    toyEntity.getToyId(),
                    dto.startDateHours(),
                    endHours
            );

            if (busy == null) busy = 0;
            int availableNow = toyEntity.getAvailableQuantity() - busy;
            if (f.quantity() > availableNow){
                throw new BusinessRuleException("Insufficient stock for the toy: " + toyEntity.getName() + " in this time: " + availableNow);
            }

            PartyToy pt = new PartyToy();
            pt.setToy(toyEntity);
            pt.setParty(party);
            pt.setQuantity(f.quantity());
            partyToys.add(pt);
        }
        party.setPartyToys(partyToys);
        party.setEmployees(employee);
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
            throw new BusinessRuleException("Toys can only be collected when the status is 'To Disassemble'.");
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


}
