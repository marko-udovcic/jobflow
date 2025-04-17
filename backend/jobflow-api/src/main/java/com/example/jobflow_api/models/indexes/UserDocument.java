package com.example.jobflow_api.models.indexes;


import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.models.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Document(indexName = "users")
public class UserDocument {
    @Id
    private String id;

    @Field(type = FieldType.Text, name = "email")
    private String email;

    @Field(type = FieldType.Boolean, name = "enabled")
    private boolean enabled;

    @Field(type = FieldType.Keyword, name = "role")
    private UserRole role;

    @Field(type = FieldType.Keyword, name = "company_status")
    private Status companyStatus;

    @Field(type = FieldType.Text, name = "company_name")
    private String companyName;

    @Field(type = FieldType.Text, name = "phone_number")
    private String phoneNumber;

    @Field(type = FieldType.Text, name = "about_company")
    private String aboutCompany;

    @Field(type = FieldType.Date, name = "created_at")
    private LocalDate createdAt;


    public static UserDocument fromEntity(AppUser appUser, ModelMapper modelMapper) {
        UserDocument document = modelMapper.map(appUser, UserDocument.class);

        document.setCreatedAt(appUser.getCreatedAt() != null ?
                appUser.getCreatedAt().toLocalDate() :
                LocalDate.now());

        return document;
    }
}
