package com.arobs.repository;

import com.arobs.entity.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {

    @Modifying
    @Query("UPDATE Machine m SET m.active = false WHERE m.id = :id")
    void softDelete(@Param("id") Long id);

    @Query("SELECT m FROM Machine m " +
            "WHERE m.active = true AND m.tenant.id = :tenantId")
    List<Machine> find(@Param("tenantId") Long tenantId);

    @Query("SELECT m FROM Machine m " +
            "WHERE m.active = true AND m.tenant.id = :tenantId AND m.machineGroup.id = :machineGroupId")
    List<Machine> find(@Param("tenantId") Long tenantId, @Param("machineGroupId") Long machineGroupId);
}
