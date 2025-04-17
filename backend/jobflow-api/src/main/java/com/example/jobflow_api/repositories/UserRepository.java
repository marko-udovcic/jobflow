package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, String> {
    Boolean existsByEmail(String email);
    Optional<AppUser> findByEmail(String email);

    long countByCreatedAtBetweenAndRole(LocalDateTime start, LocalDateTime end, UserRole role);

    long countByCreatedAtBetweenAndEnabledTrue(LocalDateTime start, LocalDateTime end);
}
