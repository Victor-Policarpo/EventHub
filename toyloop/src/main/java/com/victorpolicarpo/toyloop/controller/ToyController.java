package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.ToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.dto.update.ToyUpdate;
import com.victorpolicarpo.toyloop.service.ToyService;
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
@RequestMapping("/auth/toys")
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
public class ToyController {
    private final ToyService toyService;

    public ToyController(ToyService toyService) {
        this.toyService = toyService;
    }

    @PostMapping
    public ResponseEntity<Void> createToy(@Valid @RequestBody ToyRequest dto){
        toyService.createToy(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<Page<ToyResponse>> listAllToy(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            Pageable pageable
    ){
        Page<ToyResponse> page = toyService.listAllToys(start, end, pageable);
        return ResponseEntity.ok(page);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateToy(@Valid @RequestBody ToyUpdate dto, @PathVariable Long id){
        toyService.updateToy(dto, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        toyService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
