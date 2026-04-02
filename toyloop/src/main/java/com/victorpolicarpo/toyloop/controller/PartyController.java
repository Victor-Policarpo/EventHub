package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.response.ListPartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyResponse;
import com.victorpolicarpo.toyloop.dto.update.PartyUpdate;
import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.service.PartyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("auth/parties")
@RequiredArgsConstructor
public class PartyController {
    private final PartyService partyService;

    @GetMapping("/{id}")
    public ResponseEntity<PartyResponse> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(partyService.findPartyById(id));
    }

    @GetMapping
    public ResponseEntity<Page<ListPartyResponse>> getByFilter(
            @RequestParam(required = false) Party.PartyStatus partyStatus,
            @RequestParam(required = false) Party.AssemblyStatus assemblyStatus,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @org.springdoc.core.annotations.ParameterObject
            @PageableDefault(sort = "startDateHours", direction = Sort.Direction.ASC) Pageable pageable
    ){
        return ResponseEntity.status(HttpStatus.OK).body(partyService.getByFilter(partyStatus, assemblyStatus, date, pageable));
    }

    @PostMapping
    public ResponseEntity<PartyResponse> createParty(@Valid @RequestBody PartyRequest dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(partyService.createParty(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PartyResponse> updateParty(@Valid @RequestBody PartyUpdate dto, @PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(partyService.updateParty(dto, id));
    }


    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteParty(@PathVariable Long id){
        partyService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{id}/start-party")
    public ResponseEntity<Void> startParty(@PathVariable Long id){
        partyService.startParty(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{id}/end-party")
    public ResponseEntity<Void> endParty(@PathVariable Long id){
        partyService.endParty(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{id}/collect-party")
    public ResponseEntity<Void> collectParty(@PathVariable Long id){
        partyService.collectParty(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{id}/cancel-party")
    public ResponseEntity<Void> cancelParty(@PathVariable Long id){
        partyService.cancelParty(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
