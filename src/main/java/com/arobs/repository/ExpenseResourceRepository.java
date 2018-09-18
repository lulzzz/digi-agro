package com.arobs.repository;

import com.arobs.entity.ExpenseResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseResourceRepository extends JpaRepository<ExpenseResource, Long> {

    @Query("SELECT er FROM ExpenseResource er WHERE er.expenseId = :expenseId")
    List<ExpenseResource> find(@Param("expenseId") Long expenseId);

    @Modifying
    @Query("DELETE FROM ExpenseResource er " +
            " WHERE er.expenseId = :expenseId AND er.tableName = :tableName")
    void remove(@Param("expenseId") Long expenseId, @Param("tableName") String tableName);
}
