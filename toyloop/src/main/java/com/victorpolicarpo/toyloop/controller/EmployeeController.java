package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.EmployeeRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeeResponse;
import com.victorpolicarpo.toyloop.dto.update.EmployeeUpdate;
import com.victorpolicarpo.toyloop.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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
    public ResponseEntity<Page<EmployeeResponse>> listAllEmployee(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            Pageable pageable
    ) {
        return ResponseEntity.ok(employeeService.listAllEmployee(start, end, pageable));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeUpdate dto) {
        employeeService.update(dto, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}