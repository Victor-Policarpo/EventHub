package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.ToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.dto.update.ToyUpdate;
import com.victorpolicarpo.toyloop.service.ToyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<ToyResponse>> listAllToy(){
        return ResponseEntity.ok(toyService.listAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateToy(@Valid @RequestBody ToyUpdate dto, @PathVariable Long id){
        toyService.updateToy(dto, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> updateToy(@PathVariable Long id) {
        toyService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
