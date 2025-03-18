package com.example.jobflow_api.dtos;

import lombok.Data;

import java.util.List;

@Data
public class PaginationDTO<T>{
    private List<T> content;
    private  int pageNumber;
    private int pageSize;
    private int totalElements;
    private int totalPages;
    private int numberOfElements;
}
