package com.victorpolicarpo.toyloop.config;

import com.victorpolicarpo.toyloop.dto.request.TransitionRequest;
import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.enums.PartyAction;
import com.victorpolicarpo.toyloop.exception.BusinessRuleException;
import com.victorpolicarpo.toyloop.repository.PartyRepository;
import com.victorpolicarpo.toyloop.service.PartyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class PartyAutomation {
    private final PartyRepository partyRepository;
    private final PartyService partyService;

    @Scheduled(cron = "0 */5 * * * *")
    public void autoFinishParties(){
        LocalDateTime threshold = LocalDateTime.now().plusMinutes(10);
        List<Party> parties = partyRepository.findPartiesToAutoFinish(threshold);

        for (Party party : parties){
            try {
                partyService.transition(party.getPartyId(), new TransitionRequest(PartyAction.FINISH));
            } catch (BusinessRuleException e) {
                log.warn("Party {} skipped by automation: {}", party.getPartyId(), e.getMessage());
            }
        }
    }
}
