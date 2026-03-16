package com.victorpolicarpo.toyloop.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponse(
        long totalParties,
        BigDecimal revenueReceived,
        BigDecimal revenueToReceive,
        BigDecimal totalRevenue
) {
}
