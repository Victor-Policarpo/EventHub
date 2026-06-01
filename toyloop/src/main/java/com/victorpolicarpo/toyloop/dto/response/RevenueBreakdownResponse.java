package com.victorpolicarpo.toyloop.dto.response;

import java.math.BigDecimal;

public record RevenueBreakdownResponse(BigDecimal received, BigDecimal pending) {
}
