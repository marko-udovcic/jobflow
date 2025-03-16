package com.example.jobflow_api.models;

import com.example.jobflow_api.models.enums.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "job_application")
public class JobApplication {
    @Id
    @UuidGenerator
    private String id;

    private String content;

    @Column(name = "cv_url", length = 255, nullable = true)
    private String cvUrl;

    @Column(name = "job_position", length = 150, nullable = true)
    private String jobPosition;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_status", nullable = false)
    private Status applicationStatus;

    @CreationTimestamp
    @Column(name = "application_date", updatable = false)
    private LocalDateTime applicationDate;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "job_posting_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private JobPosting jobPosting;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "worker_id", referencedColumnName = "id", nullable = false)
    private AppUser worker;


}
