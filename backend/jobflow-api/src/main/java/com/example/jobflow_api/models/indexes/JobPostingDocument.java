package com.example.jobflow_api.models.indexes;


import com.example.jobflow_api.models.JobPosting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.CompletionField;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.core.suggest.Completion;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Document(indexName = "job_postings")
public class JobPostingDocument {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String salary;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String description;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String responsibilities;

    @Field(type = FieldType.Text)
    private String location;

    @Field(name = "job_type", type = FieldType.Keyword)
    private String jobType;

    @Field(name = "hourly_rate", type = FieldType.Text)
    private String hourlyRate;

    @Field(name = "jobs_requirements", type = FieldType.Text, analyzer = "standard")
    private String jobsRequirements;

    @Field(name = "posting_date", type = FieldType.Date)
    private LocalDate postingDate;

    @Field(name = "employer_id", type = FieldType.Keyword)
    private String employerId;

    @Field(name = "employer_name", type = FieldType.Text)
    private String employerName;

    @Field(name = "category_id", type = FieldType.Keyword)
    private Long categoryId;

    @Field(name = "category_name", type = FieldType.Text)
    private String categoryName;

    @CompletionField
    private Completion locationCompletion;

    @CompletionField
    private Completion titleCompletion;

    public static JobPostingDocument fromEntity(JobPosting jobPosting, ModelMapper modelMapper) {
        JobPostingDocument document = modelMapper.map(jobPosting, JobPostingDocument.class);

        if (jobPosting.getEmployer() != null) {
            document.setEmployerId(jobPosting.getEmployer().getId());
            document.setEmployerName(jobPosting.getEmployer().getCompanyName());
        }

        if (jobPosting.getCategory() != null) {
            document.setCategoryId(jobPosting.getCategory().getId());
            document.setCategoryName(jobPosting.getCategory().getName());
        }
        document.setLocationCompletion(new Completion(new String[]{jobPosting.getLocation()}));
        document.setTitleCompletion(new Completion(new String[]{jobPosting.getTitle()}));


        document.setPostingDate(jobPosting.getPostingDate() != null ?
                jobPosting.getPostingDate().toLocalDate() : LocalDate.now());

        return document;
    }
}
