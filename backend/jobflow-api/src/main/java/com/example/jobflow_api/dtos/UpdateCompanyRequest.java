package com.example.jobflow_api.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCompanyRequest {
    private String companyName;
    private String aboutCompany;
}
