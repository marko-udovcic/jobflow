package com.example.jobflow_api.models;


import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.models.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "app_user")
public class AppUser {
    @Id
    @UuidGenerator
    private String id;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_status", nullable = false)
    private Status companyStatus;

    @Column(name = "company_name", length = 100, nullable = true)
    private String companyName;

    @Column(name = "phone_number", length = 50, nullable = true)
    private String phoneNumber;

    @Column(name = "about_company", columnDefinition = "TEXT", nullable = true)
    private String aboutCompany;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "employer", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<JobPosting> jobPostings;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "verification_token_expiry_date")
    private LocalDateTime verificationTokenExpiryDate;

    public void generateVerificationToken() {
        this.verificationToken = UUID.randomUUID().toString();
        this.verificationTokenExpiryDate = LocalDateTime.now().plusHours(24);
    }
}
