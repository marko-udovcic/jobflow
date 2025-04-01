package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.*;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.JobApplication;
import com.example.jobflow_api.models.JobMessage;
import com.example.jobflow_api.models.JobPosting;
import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.models.enums.UserRole;
import com.example.jobflow_api.repositories.JobApplicationRepository;
import com.example.jobflow_api.repositories.JobMessageRepository;
import com.example.jobflow_api.repositories.JobPostingRepository;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.security.services.UserDetailsImpl;
import com.example.jobflow_api.service.AuthService;
import com.example.jobflow_api.service.JobApplicationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class JobApplicationServiceImpl implements JobApplicationService {
    private final ModelMapper modelMapper;
    private final JobApplicationRepository jobApplicationRepository;
    private final AuthService authService;
    private final UserRepository appUserRepository;
    private final JobPostingRepository jobPostingRepository;
    private final JobMessageRepository jobMessageRepository;

    public <T> PaginationDTO<T> createPaginationDTO(Page<?> applications, List<T> content) {
        PaginationDTO<T> paginationDTO = new PaginationDTO<>();

        paginationDTO.setContent(content);
        paginationDTO.setPageNumber(applications.getNumber());
        paginationDTO.setPageSize(applications.getSize());
        paginationDTO.setTotalElements((int) applications.getTotalElements());
        paginationDTO.setTotalPages(applications.getTotalPages());
        paginationDTO.setNumberOfElements(applications.getNumberOfElements());

        return paginationDTO;
    }

    @Override
    public ResponseEntity<?> createApplication(JobApplicationRequest jobApplicationRequest) {
        UserDetailsImpl userDetails = authService.getCurrentUserDetails();
        final String userId = userDetails.getId();

        var jobApplication = modelMapper.map(jobApplicationRequest, JobApplication.class);


        Optional<JobPosting> jobPostingOpt = jobPostingRepository.findById(jobApplicationRequest.getJobPostingId());
        if (jobPostingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job posting not found");
        }
        JobPosting jobPosting = jobPostingOpt.get();

        Optional<AppUser> appUserOpt = appUserRepository.findById(userId);
        if (appUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        AppUser appUser = appUserOpt.get();

        jobApplication.setJobPosting(jobPosting);
        jobApplication.setWorker(appUser);
        jobApplication.setApplicationStatus(Status.PENDING);

        jobApplication = jobApplicationRepository.save(jobApplication);

        return ResponseEntity.status(HttpStatus.CREATED).body(jobApplication);
    }


    @Override
    public PaginationDTO<JobApplicationDetailsForEmployerDTO> getApplicationsByJobId(String jobId, Pageable pageable) {
        Page<JobApplication> applications = jobApplicationRepository.findByJobPostingId(jobId, pageable);

        List<JobApplicationDetailsForEmployerDTO> content = applications.isEmpty()
                ? Collections.emptyList()
                : applications.getContent().stream().map(application -> {
            JobApplicationDetailsForEmployerDTO dto = modelMapper.map(application, JobApplicationDetailsForEmployerDTO.class);
            dto.setEmail(application.getWorker().getEmail());
            dto.setWorkerId(application.getWorker().getId());
            return dto;
        }).toList();

        return createPaginationDTO(applications, content);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateJobApplicationWithMessage(JobApplicationUpdateRequest jobApplicationUpdateRequest) {
        Optional<JobApplication> jobApplication = jobApplicationRepository
                .findById(jobApplicationUpdateRequest.getId());
        if (jobApplication.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Job application is not found");
        }

        Status aplicationStatus = Status.valueOf(jobApplicationUpdateRequest.getApplicationStatus().toUpperCase());
        var application = jobApplication.get();

        var currentAuthEmployer = authService.getCurrentUserDetails();
        String employerId = currentAuthEmployer.getId();

        Optional<AppUser> employer = appUserRepository.findById(employerId);
        UserRole userRole = employer.get().getRole();

        application.setApplicationStatus(aplicationStatus);

        var jobMessage = new JobMessage();
        jobMessage.setJobApplication(jobApplication.get());
        jobMessage.setWorker(jobApplication.get().getWorker());
        jobMessage.setContent(jobApplicationUpdateRequest.getMessage());
        jobMessage.setEmployer(employer.get());
        jobMessage.setSenderRole(userRole.name());

        jobMessageRepository.save(jobMessage);
        jobApplicationRepository.save(application);

        return ResponseEntity.ok("Job application updated and message sent successfully.");
    }

    @Override
    public List<JobApplicationForWorkerDTO> getApplicationsByWorkerId(String workerId) {
        List<JobApplication> applications = jobApplicationRepository.findByWorkerId(workerId);

        if(applications.isEmpty()){
            return Collections.emptyList();
        }

        return applications.stream()
                .map(jobApplication -> {
                    JobApplicationForWorkerDTO jobApplicationForWorkerDTO = modelMapper.map(jobApplication, JobApplicationForWorkerDTO.class);

                    String companyName = jobApplication.getJobPosting().getEmployer().getCompanyName();
                    String jobPostingId= jobApplication.getJobPosting().getId();

                    jobApplicationForWorkerDTO.setCompanyName(companyName);
                    jobApplicationForWorkerDTO.setJobPostingId(jobPostingId);

                    List<JobMessageResponse> messages = jobApplication.getMessages().stream()
                            .map(jobMessage -> {
                                JobMessageResponse messageResponse = modelMapper.map(jobMessage, JobMessageResponse.class);

                                if(jobMessage.getEmployer() != null){
                                    messageResponse.setEmployerEmail(jobMessage.getEmployer().getEmail());
                                }
                                return messageResponse;
                            }).toList();
                    jobApplicationForWorkerDTO.setMessages(messages);

                    return jobApplicationForWorkerDTO;
                })
                .toList();
    }

}
