package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.response.DashboardResponse;
import com.victorpolicarpo.toyloop.dto.response.RevenueBreakdownResponse;
import com.victorpolicarpo.toyloop.dto.response.RevenueChartResponse;
import com.victorpolicarpo.toyloop.service.DashboardService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("auth/finance")
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardResponse> getSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        return ResponseEntity.ok(dashboardService.getSummary(start, end));
    }

    @GetMapping("/revenue")
    public ResponseEntity<List<RevenueChartResponse>> getRevenue(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ){
        return ResponseEntity.ok(dashboardService.getRevenueChart(start, end));
    }

    @GetMapping("/revenue-breakdown")
    public ResponseEntity<RevenueBreakdownResponse> getRevenueBreakdown(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ){
        return ResponseEntity.ok(dashboardService.getRevenueBreakdown(start, end));
    }
}
