package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.EmployeeRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeeResponse;
import com.victorpolicarpo.toyloop.dto.update.EmployeeUpdate;
import com.victorpolicarpo.toyloop.entity.Employee;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.mapper.EmployeeMapper;
import com.victorpolicarpo.toyloop.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    @Transactional
    public void createEmployee(@Valid EmployeeRequest dto) {
        if (employeeRepository.existsByNameAndActiveTrue(dto.name())){
            throw new ResourceAlreadyExistsException("An employee with this name already exists.");
        }
        Employee employee = employeeMapper.toEntity(dto);
        employeeRepository.save(employee);
    }


    public Page<EmployeeResponse> listAllEmployee(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        if (start == null || end == null){
            return employeeRepository.findByActiveTrue(pageable)
                    .map(emp -> employeeMapper.toResponseWithAvailability(emp, true));
        }

        return employeeRepository.findAvailableEmployees(start, end, pageable);
    }

    @Transactional
    public void update(@Valid EmployeeUpdate dto, Long id) {
        Employee employee = findById(id);
        employeeMapper.updateEntityFromDto(dto, employee);
        employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = findById(id);
        employee.setActive(false);
    }

    public EmployeeResponse findEmployeeById(Long id) {
        return employeeMapper.toResponse(findById(id));
    }

    public Employee findById(Long id){
        return employeeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("A employee Id not found or not exist.")
        );
    }

}
