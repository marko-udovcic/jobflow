package com.example.jobflow_api.repositories.elasticsearch;

import com.example.jobflow_api.models.indexes.JobPostingDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSearchRepository extends ElasticsearchRepository<JobPostingDocument, String> {
    @Query("""
    {
      "match": {
        "title": {
          "query": "?0",
          "fuzziness": "AUTO"
        }
      }
    }
    """)
    Page<JobPostingDocument> searchByTitle(String title, Pageable pageable);

    @Query("""
    {
      "match": {
        "location": {
          "query": "?0",
          "fuzziness": "AUTO"
        }
      }
    }
    """)
    Page<JobPostingDocument> searchByLocation(String location, Pageable pageable);

    @Query("""
    {
      "bool": {
        "must": [
          {
            "match": {
              "title": {
                "query": "?0",
                "fuzziness": "AUTO"
              }
            }
          },
          {
            "match": {
              "location": {
                "query": "?1",
                "fuzziness": "AUTO"
              }
            }
          }
        ]
      }
    }
""")
    Page<JobPostingDocument>  searchByTitleAndLocation(String title, String location,Pageable pageable);


}
