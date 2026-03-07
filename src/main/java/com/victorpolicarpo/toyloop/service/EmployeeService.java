package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.EmployeeRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeeResponse;
import com.victorpolicarpo.toyloop.dto.update.EmployeeUpdate;
import com.victorpolicarpo.toyloop.entity.Employee;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.exception.UserAlreadyExistsException;
import com.victorpolicarpo.toyloop.mapper.EmployeeMapper;
import com.victorpolicarpo.toyloop.repository.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }


    public void createEmployee(@Valid EmployeeRequest dto) {
        if (employeeRepository.existsByName(dto.name())){
            throw new UserAlreadyExistsException("An employee with this name already exists.");
        }
        Employee employee = employeeMapper.toEntity(dto);
        employeeRepository.save(employee);
    }


    public List<EmployeeResponse> listAllEmployee() {
        List<Employee> employeeList = employeeRepository.findAll();
        return employeeMapper.toResponseList(employeeList);
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
