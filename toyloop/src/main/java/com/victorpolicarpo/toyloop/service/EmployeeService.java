package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.EmployeeRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeeResponse;
import com.victorpolicarpo.toyloop.dto.update.EmployeeUpdate;
import com.victorpolicarpo.toyloop.entity.Employee;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.mapper.EmployeeMapper;
import com.victorpolicarpo.toyloop.repository.EmployeeRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public void createEmployee(@Valid EmployeeRequest dto) {
        if (employeeRepository.existsByName(dto.name())){
            throw new ResourceAlreadyExistsException("An employee with this name already exists.");
        }
        Employee employee = employeeMapper.toEntity(dto);
        employeeRepository.save(employee);
    }


    public List<EmployeeResponse> listAllEmployee(LocalDateTime start, LocalDateTime end) {
        List<Employee> allEmployees = employeeRepository.findAll();
        if (start == null || end == null) {
            return allEmployees.stream()
                    .map(e -> employeeMapper.toResponseWithAvailability(e, true))
                    .toList();
        }
        Set<Long> busyIds = new HashSet<>(employeeRepository.findOccupiedEmployeeIds(start, end));

        return allEmployees.stream()
                .map(e -> {
                    boolean available = !busyIds.contains(e.getEmployeeId());
                    return employeeMapper.toResponseWithAvailability(e, available);
                })
                .toList();
    }


    public void update(@Valid EmployeeUpdate dto, Long id) {
        Employee employee = findById(id);
        employeeMapper.updateEntityFromDto(dto, employee);
        employeeRepository.save(employee);
    }


    public void deleteEmployee(Long id) {
        employeeRepository.delete(findById(id));
    }


    public Employee findById(Long id){
        return employeeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("A employee Id not found or not exist.")
        );
    }


}
