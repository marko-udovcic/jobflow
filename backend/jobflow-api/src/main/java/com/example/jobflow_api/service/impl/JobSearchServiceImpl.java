package com.example.jobflow_api.service.impl;

import co.elastic.clients.elasticsearch.core.search.FieldSuggester;
import co.elastic.clients.elasticsearch.core.search.Suggester;
import com.example.jobflow_api.dtos.JobListingResponse;
import com.example.jobflow_api.dtos.PaginationDTO;
import com.example.jobflow_api.models.indexes.JobPostingDocument;
import com.example.jobflow_api.repositories.elasticsearch.JobSearchRepository;
import com.example.jobflow_api.service.JobSearchService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilter;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.data.elasticsearch.core.suggest.response.Suggest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class JobSearchServiceImpl implements JobSearchService {
    private final JobSearchRepository jobSearchRepository;
    private final ModelMapper modelMapper;
    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public PaginationDTO<JobListingResponse> searchJobPostings(String title, String location, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC,"postingDate"));
        Page<JobPostingDocument> jobPostingsPage = null;

        if((title != null && !title.isEmpty() )&&(location != null && !location.isEmpty())){
            jobPostingsPage = jobSearchRepository.searchByTitleAndLocation(title,location, pageRequest);
        }

        else if (title != null && !title.isEmpty()) {
            jobPostingsPage = jobSearchRepository.searchByTitle(title, pageRequest);
        }

        else if (location != null && !location.isEmpty()) {
            jobPostingsPage = jobSearchRepository.searchByLocation(location, pageRequest);
        }

        else {
            jobPostingsPage = jobSearchRepository.findAll(pageRequest);
        }

        List<JobListingResponse>  responseList = jobPostingsPage.getContent().stream()
                .map(document ->{
                    JobListingResponse response = modelMapper.map(document, JobListingResponse.class);
                    response.setCompanyName(document.getEmployerName());
                    return response;
                }).toList();

        PaginationDTO<JobListingResponse> paginationDTO = modelMapper.map(jobPostingsPage, PaginationDTO.class);
        paginationDTO.setContent(responseList);

        return paginationDTO;
    }


    public <T> Set<String> suggestFields(String prefix, String fieldName, Class<T> clazz) {
        var fieldSuggester = FieldSuggester.of(b -> b.prefix(prefix)
                .completion(csb -> csb.field(fieldName)
                        .skipDuplicates(true)
                        .fuzzy(f -> f.fuzziness("AUTO"))
                        .size(10)));

        var suggester = Suggester.of(b -> b.suggesters("field-suggest", fieldSuggester));

        var query = NativeQuery.builder()
                .withSuggester(suggester)
                .withMaxResults(0)
                .withSourceFilter(FetchSourceFilter.of(b -> b.withExcludes("*")))
                .build();

        var searchHits = elasticsearchOperations.search(query, clazz);

        if (searchHits.getSuggest() != null &&
                searchHits.getSuggest().getSuggestion("field-suggest") != null) {
            return searchHits.getSuggest().getSuggestion("field-suggest")
                    .getEntries()
                    .get(0)
                    .getOptions()
                    .stream()
                    .map(Suggest.Suggestion.Entry.Option::getText)
                    .collect(Collectors.toSet());
        } else {
            return Collections.emptySet();
        }
    }

    @Override
    public Set<String> suggestLocations(String prefix) {
        return suggestFields(prefix,"locationCompletion",JobPostingDocument.class);
    }

    @Override
    public Set<String> suggestJobTitles(String prefix) {
        return suggestFields(prefix,"titleCompletion",JobPostingDocument.class);
    }


}
