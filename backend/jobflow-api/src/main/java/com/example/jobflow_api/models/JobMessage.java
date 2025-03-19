package com.example.jobflow_api.models;


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
@Table(name = "app_message")
public class JobMessage {
    @Id
    @UuidGenerator
    private String id;

    private String content;

    @CreationTimestamp
    @Column(name = "sent_date", updatable = false)
    private LocalDateTime sentDate;

    @Column(name = "sender_role", length = 150, nullable = false)
    private String senderRole;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "job_application_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private JobApplication jobApplication;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "worker_id", referencedColumnName = "id", nullable = false)
    private AppUser worker;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "employer_id", referencedColumnName = "id", nullable = false)
    private AppUser employer;

}

