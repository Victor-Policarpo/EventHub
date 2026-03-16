package com.victorpolicarpo.toyloop.config;

import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.repository.PartyRepository;
import com.victorpolicarpo.toyloop.service.PartyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PartyAutomation {
    private final PartyRepository partyRepository;
    private final PartyService partyService;

    @Scheduled(cron = "0 */5 * * * *")
    @Transactional
    public void autoFinishParties(){
        LocalDateTime threshold = LocalDateTime.now().plusMinutes(10);
        List<Party> parties = partyRepository.findPartiesToAutoFinish(threshold);
        for (Party party: parties){
            try{
                partyService.endParty(party.getPartyId());
                System.out.println("Automation: Party " + party.getPartyId());
            } catch (Exception e){
                System.err.println("Erro ao finalizar festa " + party.getPartyId() + ": " + e.getMessage());
            }
        }

    }

}

