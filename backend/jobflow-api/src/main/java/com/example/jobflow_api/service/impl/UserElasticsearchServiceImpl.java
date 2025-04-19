package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.PaginationDTO;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.indexes.UserDocument;
import com.example.jobflow_api.repositories.elasticsearch.UserElasticsearchRepository;
import com.example.jobflow_api.service.UserElasticsearchService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class UserElasticsearchServiceImpl implements UserElasticsearchService {

    private final ModelMapper modelMapper;
    private final UserElasticsearchRepository userElasticsearchRepository;

    @Override
    public void indexUser(AppUser user) {
        UserDocument userDocument = UserDocument.fromEntity(user, modelMapper);
        userElasticsearchRepository.save(userDocument);
    }

    @Override
    public void deleteUser(String id) {
        userElasticsearchRepository.deleteById(id);
    }

    @Override
    public PaginationDTO<UserDTO> searchUserByEmail(String email, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<UserDocument> usersPage;

        if (email != null && !email.isEmpty()) {
            usersPage = userElasticsearchRepository.searchByEmail(email, pageRequest);
        } else {
            usersPage = userElasticsearchRepository.findAll(pageRequest);
        }

        List<UserDTO> responseList = new ArrayList<>();
        for (UserDocument document : usersPage.getContent()) {
            UserDTO map = modelMapper.map(document, UserDTO.class);

            if(document.getCreatedAt() != null){
                map.setCreatedAt(document.getCreatedAt().atStartOfDay());
            }

            responseList.add(map);
        }

        PaginationDTO<UserDTO> paginationDTO = modelMapper.map(usersPage, PaginationDTO.class);
        paginationDTO.setContent(responseList);

        return paginationDTO;
    }
}
