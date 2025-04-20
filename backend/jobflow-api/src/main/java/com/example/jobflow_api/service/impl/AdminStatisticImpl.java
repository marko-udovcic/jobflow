package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.AdminStatisticsDTO;
import com.example.jobflow_api.models.enums.UserRole;
import com.example.jobflow_api.repositories.JobApplicationRepository;
import com.example.jobflow_api.repositories.JobPostingRepository;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.service.AdminStatistic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AdminStatisticImpl implements AdminStatistic {
    private final JobPostingRepository jobRepository;
    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;

    @Override
    public AdminStatisticsDTO getStatistics(Integer year, Integer month) {
        LocalDate now = LocalDate.now();

        int targetYear = (year != null) ? year : now.getYear();
        int targetMonth = (month != null) ? month : now.getMonthValue();

        LocalDateTime startOfMonth = LocalDateTime.of(targetYear, targetMonth, 1, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusNanos(1);

        AdminStatisticsDTO result = new AdminStatisticsDTO();
        result.setYear(targetYear);
        result.setMonth(targetMonth);
        result.setMonthName(Month.of(targetMonth).getDisplayName(TextStyle.FULL, Locale.getDefault()));

        result.setCompaniesCount(
                userRepository.countByCreatedAtBetweenAndRole(startOfMonth, endOfMonth, UserRole.EMPLOYER));

        result.setPostedJobsCount(jobRepository.countByPostingDateBetween(startOfMonth, endOfMonth));
        result.setJobApplicationsCount(jobApplicationRepository.countByApplicationDateBetween(startOfMonth, endOfMonth));
        result.setActiveUsersCount(userRepository.countByCreatedAtBetweenAndEnabledTrue(startOfMonth, endOfMonth));

        return result;
    }

    @Override
    public List<AdminStatisticsDTO> getMonthlyStatistics(int year) {
        List<AdminStatisticsDTO> result = new ArrayList<>();

        LocalDate now = LocalDate.now();
        int currentYear = now.getYear();
        int currentMonth = now.getMonthValue();

        year = Math.min(year, currentYear);

        int maxMonth = (year == currentYear) ? currentMonth : 12;

        for (int month = 1; month <= maxMonth; month++) {
            AdminStatisticsDTO monthStats = getStatistics(year, month);
            result.add(monthStats);
        }

        return result;
    }
}
