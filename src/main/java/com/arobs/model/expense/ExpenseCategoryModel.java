package com.arobs.model.expense;

import com.arobs.entity.ExpenseCategory;

import java.io.Serializable;
import java.util.List;

public class ExpenseCategoryModel implements Serializable {

    private Long id;
    private Long tenantId;
    private Long parentId;
    private String defaultName;
    private String name;
    private List<ExpenseCategoryModel> children;

    public ExpenseCategoryModel() {
    }

    public ExpenseCategoryModel(ExpenseCategory category) {
        this.id = category.getId();
        this.tenantId = category.getTenantId();
        this.parentId = category.getParentId();
        this.defaultName = category.getDefaultName();
        this.name = category.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getDefaultName() {
        return defaultName;
    }

    public void setDefaultName(String defaultName) {
        this.defaultName = defaultName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ExpenseCategoryModel> getChildren() {
        return children;
    }

    public void setChildren(List<ExpenseCategoryModel> children) {
        this.children = children;
    }
}