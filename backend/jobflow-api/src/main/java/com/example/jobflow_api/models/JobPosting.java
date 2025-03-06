package com.example.jobflow_api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "job_posting")
public class JobPosting {
    @Id
    @UuidGenerator
    private String id;

    private String title;
    private String salary;
    private String description;
    private String responsibilities;
    private String location;

    @Column(name = "job_type", length = 50)
    private String jobType;

    @Column(name = "hourly_rate", length = 20)
    private String hourlyRate;

    @Column(name = "job_requirements", columnDefinition = "TEXT")
    private String jobRequirements;

    @CreationTimestamp
    @Column(name = "posting_date", updatable = false)
    private LocalDateTime postingDate;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "employer_id", referencedColumnName = "id", nullable = false)
    private AppUser employer;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = true)
    private Category category;
}
