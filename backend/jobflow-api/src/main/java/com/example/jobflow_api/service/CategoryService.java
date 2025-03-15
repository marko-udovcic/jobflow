package com.example.jobflow_api.service;

import com.example.jobflow_api.models.Category;

import java.util.List;

public interface CategoryService {
    List<Category> findAllCategories();

    Category saveCategory(Category category);

    Category updateCategory(Category category, long id);

    void deleteCategory(long id);
}
