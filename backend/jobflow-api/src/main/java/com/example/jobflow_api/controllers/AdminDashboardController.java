package com.example.jobflow_api.controllers;

import com.example.jobflow_api.dtos.AdminStatisticsDTO;
import com.example.jobflow_api.dtos.JobListingResponse;
import com.example.jobflow_api.dtos.PaginationDTO;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.service.AdminStatistic;
import com.example.jobflow_api.service.UserElasticsearchService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/dashboard")
@SecurityRequirement(name = "bearerAuth")
public class AdminDashboardController {

    private final AdminStatistic adminStatistic;
    private final UserElasticsearchService userElasticsearchService;

    @GetMapping("/statistics")
    public ResponseEntity<AdminStatisticsDTO> getStatistics(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month) {

        return ResponseEntity.ok(adminStatistic.getStatistics(year, month));
    }

    @GetMapping("/monthly-breakdown")
    public ResponseEntity<List<AdminStatisticsDTO>> getMonthlyStatistics(
            @RequestParam(required = false) Integer year) {

        int targetYear = (year != null) ? year : LocalDate.now().getYear();
        return ResponseEntity.ok(adminStatistic.getMonthlyStatistics(targetYear));
    }


    @GetMapping("/search-users")
    public ResponseEntity<PaginationDTO<UserDTO>> search(
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        PaginationDTO<UserDTO> result = userElasticsearchService.searchUserByEmail(email, page, size);
        return ResponseEntity.ok(result);
    }

}
