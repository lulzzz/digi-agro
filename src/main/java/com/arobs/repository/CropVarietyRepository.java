package com.arobs.repository;

import com.arobs.entity.crop.CropVariety;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropVarietyRepository extends JpaRepository<CropVariety, Long> {

    @Query("SELECT v FROM CropVariety v " +
            "WHERE v.crop.id = :cropId " +
            "ORDER BY v.nameRo ")
    List<CropVariety> findByCrop(@Param("cropId") Long cropId);

    @Query("SELECT v FROM CropVariety v " +
            "WHERE v.cropSubculture.id = :cropSubcultureId " +
            "ORDER BY v.nameRo ")
    List<CropVariety> findBySubculture(@Param("cropSubcultureId") Long cropSubcultureId);
}

