package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.response.DashboardResponse;
import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final PartyRepository partyRepository;

    public DashboardResponse getSummary(LocalDateTime start, LocalDateTime end) {
        LocalDateTime startDate = (start != null) ? start : LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        LocalDateTime endDate = (end != null) ? end : LocalDateTime.now().withHour(23).withMinute(59);

        long totalInPeriod = partyRepository.countByPartyStatusAndStartDateHoursBetween(Party.PartyStatus.SCHEDULED, startDate, endDate)
                + partyRepository.countByPartyStatusAndStartDateHoursBetween(Party.PartyStatus.FINISHED, startDate, endDate);

        BigDecimal revenueReceived = partyRepository.sumRevenueByStatusAndRange(Party.PartyStatus.FINISHED, startDate, endDate);
        BigDecimal revenueToReceive = partyRepository.sumRevenueByStatusAndRange(Party.PartyStatus.SCHEDULED, startDate, endDate);

        BigDecimal totalRevenue = (revenueReceived != null ? revenueReceived : BigDecimal.ZERO)
                .add(revenueToReceive != null ? revenueToReceive : BigDecimal.ZERO);

        return new DashboardResponse(
                totalInPeriod,
                revenueReceived != null ? revenueReceived : BigDecimal.ZERO,
                revenueToReceive != null ? revenueToReceive : BigDecimal.ZERO,
                totalRevenue
        );
    }
}