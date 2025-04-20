package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.AdminStatisticsDTO;

import java.util.List;

public interface AdminStatistic {
    AdminStatisticsDTO getStatistics(Integer year, Integer month);

    List<AdminStatisticsDTO> getMonthlyStatistics(int year);
}
