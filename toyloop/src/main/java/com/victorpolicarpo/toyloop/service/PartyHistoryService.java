package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.entity.PartyHistory;
import com.victorpolicarpo.toyloop.enums.PartyAction;
import com.victorpolicarpo.toyloop.repository.PartyHistoryRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PartyHistoryService {
    private final PartyHistoryRepository partyHistoryRepository;

    public void register(@NonNull  Party party, @NonNull PartyAction partyAction, @NonNull UUID performedBy){
        PartyHistory history = new PartyHistory();
        history.setParty(party);
        history.setAction(partyAction);
        history.setPerformedBy(performedBy);
        history.setPerformedAt(LocalDateTime.now());
        partyHistoryRepository.save(history);
    }
}
