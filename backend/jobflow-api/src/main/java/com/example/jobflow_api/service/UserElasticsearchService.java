package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.PaginationDTO;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.models.AppUser;

public interface UserElasticsearchService {
    void indexUser(AppUser user);
    void deleteUser(String id);

    PaginationDTO<UserDTO> searchUserByEmail(String email, int page, int size);

}
