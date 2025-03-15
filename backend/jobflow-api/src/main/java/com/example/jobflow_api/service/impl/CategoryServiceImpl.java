package com.example.jobflow_api.service.impl;

;
import com.example.jobflow_api.models.Category;
import com.example.jobflow_api.repositories.CategoryRepository;
import com.example.jobflow_api.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category, long id) {

        Category existingCategory = categoryRepository.findById(id).orElse(null);

        if (existingCategory != null) {
            existingCategory.setName(category.getName());

            return categoryRepository.save(existingCategory);
        } else {
            category.setId(id);
            return categoryRepository.save(category);
        }
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepository.deleteById(id);
    }


}