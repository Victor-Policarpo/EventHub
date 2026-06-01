package com.victorpolicarpo.toyloop.dto.response;

import java.math.BigDecimal;

public record RevenueChartResponse(
        Integer year,
        Integer month,
        String label,
        BigDecimal revenue
) {
}
