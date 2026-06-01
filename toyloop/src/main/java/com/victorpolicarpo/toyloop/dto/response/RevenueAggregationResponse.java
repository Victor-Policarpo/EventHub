package com.victorpolicarpo.toyloop.dto.response;

import java.math.BigDecimal;

public record RevenueAggregationResponse(Integer year, Integer month, BigDecimal revenue) {
}
