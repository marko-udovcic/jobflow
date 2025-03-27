package com.example.jobflow_api.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UpdateCompanyRequest {
    private String companyName;
    private String aboutCompany;
}
