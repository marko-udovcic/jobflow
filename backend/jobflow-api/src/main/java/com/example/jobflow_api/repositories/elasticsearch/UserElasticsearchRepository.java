package com.example.jobflow_api.repositories.elasticsearch;

import com.example.jobflow_api.models.indexes.UserDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserElasticsearchRepository extends ElasticsearchRepository<UserDocument, String> {

    @Query("""
    {
      "match": {
        "email": {
          "query": "?0",
          "fuzziness": "AUTO"
        }
      }
    }
    """)
    Page<UserDocument> searchByEmail(String email, Pageable pageable);
}
