package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.response.DashboardResponse;
import com.victorpolicarpo.toyloop.dto.response.RevenueAggregationResponse;
import com.victorpolicarpo.toyloop.dto.response.RevenueBreakdownResponse;
import com.victorpolicarpo.toyloop.dto.response.RevenueChartResponse;
import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PartyRepository partyRepository;

    public DashboardResponse getSummary(LocalDate start, LocalDate end) {
        LocalDate now = LocalDate.now();

        LocalDateTime startDate = (start != null)
                ? start.atStartOfDay()
                : now.withDayOfMonth(1).atStartOfDay();

        LocalDateTime endDate = (end != null)
                ? end.atTime(LocalTime.MAX)
                : now.withDayOfMonth(now.lengthOfMonth()).atTime(LocalTime.MAX);

        long totalInPeriod = partyRepository.countByPartyStatusAndActiveTrueAndStartDateHoursBetween(Party.PartyStatus.SCHEDULED, startDate, endDate)
                + partyRepository.countByPartyStatusAndActiveTrueAndStartDateHoursBetween(Party.PartyStatus.FINISHED, startDate, endDate);

        BigDecimal revenueReceived = partyRepository.sumRevenueByStatusAndRange(Party.PartyStatus.FINISHED, startDate, endDate);
        BigDecimal revenueToReceive = partyRepository.sumRevenueByStatusAndRange(Party.PartyStatus.SCHEDULED, startDate, endDate);

        BigDecimal received = revenueReceived != null ? revenueReceived : BigDecimal.ZERO;
        BigDecimal toReceive = revenueToReceive != null ? revenueToReceive : BigDecimal.ZERO;
        BigDecimal totalRevenue = received.add(toReceive);

        return new DashboardResponse(
                totalInPeriod,
                received,
                toReceive,
                totalRevenue
        );
    }

    public List<RevenueChartResponse> getRevenueChart(LocalDate start, LocalDate end) {
        LocalDate now = LocalDate.now();

        LocalDate startCursorDate = (start != null)
                ? start.withDayOfMonth(1)
                : now.minusMonths(12).withDayOfMonth(1);

        LocalDate endCursorDate = (end != null)
                ? end.withDayOfMonth(1)
                : now.withDayOfMonth(1);

        LocalDateTime startDateTime = startCursorDate.atStartOfDay();
        LocalDateTime endDateTime = endCursorDate
                .withDayOfMonth(endCursorDate.lengthOfMonth())
                .atTime(LocalTime.MAX);

        List<RevenueAggregationResponse> revenues =
                partyRepository.getRevenueGroupedByMonth(
                        Party.PartyStatus.FINISHED,
                        startDateTime,
                        endDateTime
                );

        Map<YearMonth, BigDecimal> revenueMap = revenues.stream()
                .collect(Collectors.toMap(
                        r -> YearMonth.of(r.year(), r.month()),
                        RevenueAggregationResponse::revenue
                ));

        List<RevenueChartResponse> result = new ArrayList<>();
        Locale locale = Locale.of("pt", "BR");
        LocalDate cursor = startCursorDate;

        while (!cursor.isAfter(endCursorDate)) {
            YearMonth current = YearMonth.of(cursor.getYear(), cursor.getMonthValue());
            BigDecimal value = revenueMap.getOrDefault(current, BigDecimal.ZERO);

            String label = cursor.getMonth().getDisplayName(TextStyle.SHORT, locale) + "/" + cursor.getYear();

            result.add(new RevenueChartResponse(
                    cursor.getYear(),
                    cursor.getMonthValue(),
                    label,
                    value
            ));

            cursor = cursor.plusMonths(1);
        }
        return result;
    }

    public RevenueBreakdownResponse getRevenueBreakdown(LocalDate start, LocalDate end) {
        LocalDate now = LocalDate.now();

        LocalDateTime startDate = (start != null)
                ? start.atStartOfDay()
                : now.withDayOfMonth(1).atStartOfDay();

        LocalDateTime endDate = (end != null)
                ? end.atTime(LocalTime.MAX)
                : now.withDayOfMonth(now.lengthOfMonth()).atTime(LocalTime.MAX);

        BigDecimal received = partyRepository.sumRevenueByStatusAndRange(Party.PartyStatus.FINISHED, startDate, endDate);
        BigDecimal pending = partyRepository.sumRevenueByStatusAndRange(Party.PartyStatus.SCHEDULED, startDate, endDate);

        return new RevenueBreakdownResponse(
                received != null ? received : BigDecimal.ZERO,
                pending != null ? pending : BigDecimal.ZERO
        );
    }
}