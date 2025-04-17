package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.models.JobPosting;
import com.example.jobflow_api.models.indexes.JobPostingDocument;
import com.example.jobflow_api.repositories.elasticsearch.JobPostingElasticsearchRepository;
import com.example.jobflow_api.service.JobPostingElasticsearchService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class JobPostingElasticsearchServiceImpl implements JobPostingElasticsearchService {

    private final JobPostingElasticsearchRepository jobPostingElasticsearchRepository;
    private final ModelMapper modelMapper;

    @Override
    public void indexJobPosting(JobPosting jobPosting) {
        JobPostingDocument jobPostingDocument = JobPostingDocument.fromEntity(jobPosting, modelMapper);
        jobPostingElasticsearchRepository.save(jobPostingDocument);
    }

    @Override
    public void deleteJobPosting(String id) {
            jobPostingElasticsearchRepository.deleteById(id);
    }

    @Override
    public void deleteJobPostingsByIds(List<String> ids) {

        if(ids !=null && !ids.isEmpty()){
            jobPostingElasticsearchRepository.deleteAllById(ids);
        }
    }
}
