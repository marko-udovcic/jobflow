package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, String> {
}
