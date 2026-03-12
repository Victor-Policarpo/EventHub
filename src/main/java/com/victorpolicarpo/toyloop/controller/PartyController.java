package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.response.PartyResponse;
import com.victorpolicarpo.toyloop.service.PartyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/parties")
@RequiredArgsConstructor
public class PartyController {
    private final PartyService partyService;

    @GetMapping("/{id}")
    public ResponseEntity<PartyResponse> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(partyService.findPartyById(id));
    }

    @PostMapping
    public ResponseEntity<PartyResponse> createParty(@Valid @RequestBody PartyRequest dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(partyService.createParty(dto));
    }

}
