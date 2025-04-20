package com.example.jobflow_api.controllers;
import com.example.jobflow_api.models.Category;
import com.example.jobflow_api.service.CategoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@SecurityRequirement(name = "bearerAuth")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> findAllCategories() {
        return categoryService.findAllCategories();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Category saveCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Category updateCategory(@RequestBody Category category, @PathVariable long id) {
        return categoryService.updateCategory(category, id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteCategory(@PathVariable long id) {
        categoryService.deleteCategory(id);
    }


}