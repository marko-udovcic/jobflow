package com.example.jobflow_api.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "digital_cv")
public class DigitalCv {
    @Id
    @Column(name = "worker_id", length = 50)
    private String workerId;


    private String firstname;
    private String lastname;

    @Column(name = "email", length = 150, unique = true, nullable = false)
    private String email;

    private String country;
    private String city;
    private String phone;

    @Column(name = "summary", columnDefinition = "TEXT")
    private String summary;

    @Column(name = "work_experience", columnDefinition = "TEXT")
    private String workExperience;

    @Column(name = "education", columnDefinition = "TEXT")
    private String education;

    @Column(name = "languages", columnDefinition = "TEXT")
    private String languages;

    @Column(name = "computer_skills", columnDefinition = "TEXT")
    private String computerSkills;

    @Column(name = "other_skills", columnDefinition = "TEXT")
    private String otherSkills;

    @Column(name = "driving_licence", columnDefinition = "TEXT")
    private String drivingLicence;

    @Column(name = "additional_information", columnDefinition = "TEXT")
    private String additionalInformation;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "nationality", columnDefinition = "TEXT")
    private String nationality;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "worker_id", referencedColumnName = "id")
    private AppUser appUser;
}
