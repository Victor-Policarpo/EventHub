package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.response.PartyHistoryResponse;
import com.victorpolicarpo.toyloop.dto.response.UserSimpleResponse;
import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.entity.PartyHistory;
import com.victorpolicarpo.toyloop.enums.PartyAction;
import com.victorpolicarpo.toyloop.mapper.PartyHistoryMapper;
import com.victorpolicarpo.toyloop.repository.PartyHistoryRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartyHistoryService {
    private final PartyHistoryRepository partyHistoryRepository;
    private final AuthService authService;
    private final PartyHistoryMapper partyHistoryMapper;

    public void register(@NonNull  Party party, @NonNull PartyAction partyAction, @NonNull UUID performedBy){
        PartyHistory history = new PartyHistory();
        history.setParty(party);
        history.setAction(partyAction);
        history.setPerformedBy(performedBy);
        history.setPerformedAt(LocalDateTime.now());
        partyHistoryRepository.save(history);
    }

    public List<PartyHistoryResponse> getHistoryByPartyId(Long partyId){
        List<PartyHistory> histories = partyHistoryRepository.findByPartyId(partyId);
        return histories.stream().map(history -> {
            UserSimpleResponse userSimple = authService.getUserSimpleById(history.getPerformedBy());
            return partyHistoryMapper.toResponse(history, userSimple);
        }).collect(Collectors.toList());
    }

}
