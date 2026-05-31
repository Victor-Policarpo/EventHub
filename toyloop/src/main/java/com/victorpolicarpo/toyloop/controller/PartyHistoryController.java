package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.response.PartyHistoryResponse;
import com.victorpolicarpo.toyloop.service.PartyHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("auth/parties")
@RequiredArgsConstructor
public class PartyHistoryController {
    private final PartyHistoryService partyHistoryService;


    @GetMapping("/{id}/history")
    public ResponseEntity<List<PartyHistoryResponse>> getHistory(@PathVariable Long id){
        return ResponseEntity.ok(partyHistoryService.getHistoryByPartyId(id));
    }

}
