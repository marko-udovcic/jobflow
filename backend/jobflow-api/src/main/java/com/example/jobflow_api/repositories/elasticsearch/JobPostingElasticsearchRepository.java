package com.example.jobflow_api.repositories.elasticsearch;

import com.example.jobflow_api.models.indexes.JobPostingDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostingElasticsearchRepository extends ElasticsearchRepository<JobPostingDocument, String> {
}
