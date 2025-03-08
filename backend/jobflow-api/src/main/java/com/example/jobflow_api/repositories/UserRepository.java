package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, String> {
    Boolean existsByEmail(String email);
}
