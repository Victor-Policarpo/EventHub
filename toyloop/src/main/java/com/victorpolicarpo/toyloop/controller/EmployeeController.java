package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.EmployeeRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeeResponse;
import com.victorpolicarpo.toyloop.dto.update.EmployeeUpdate;
import com.victorpolicarpo.toyloop.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/auth/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<Void> createEmployee(@Valid @RequestBody EmployeeRequest dto) {
        employeeService.createEmployee(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> listAllEmployee(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
    ) {
        return ResponseEntity.ok(employeeService.listAllEmployee(start, end));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeUpdate dto) {
        employeeService.update(dto, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}