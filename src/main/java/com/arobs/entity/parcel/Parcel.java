package com.arobs.entity.parcel;

import com.arobs.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by mihail.gorgos on 25.07.2018.
 * Aici se vor defini parcelele (fara coodonate). O parcela poate fi un camp real cu numar cadastral,
 * dar de asemnea poate fi o separare logica la un camp. De exemplu: partea de vest si partea de est.
 * Fiecare gospodar va putea sa-si defineasca parcelele asa cum doreste. Iar pentru definirea geometriei
 * parcelei se va folosi tabelul PARCEL_COORDS
 */
@Entity
@Table(name = "parcel")
public class Parcel extends BaseEntity {

    @Column(name = "tenant_id")
    private Long tenantId;

    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "branch_id")
    private Long branchId;

    @Column(name = "cadaster_number", length = 128)
    private String cadasterNumber;

    @Column(name = "land_worthiness_points")
    private Integer landWorthinessPoints;

    /**
     * Aria parcelei masurata in hectare
     */
    @Column(name = "area")
    private Double area;

    @Column(name = "name", length = 128)
    private String name;

    @Column(name = "description", length = 512)
    private String description;

    @Column(name = "country_id", length = 2)
    private String countryId;

    @Column(name = "county_id", length = 2)
    private String countyId;

    @Column(name = "city_id")
    private Long cityId;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "last_work_type_id")
    private Long lastWorkTypeId;

    @Column(name = "irrigated", columnDefinition = "boolean default false")
    private boolean irrigated;

    @Column(columnDefinition = "boolean default true")
    private boolean active = true;

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

    public Long getBranchId() {
        return branchId;
    }

    public void setBranchId(Long branchId) {
        this.branchId = branchId;
    }

    public String getCadasterNumber() {
        return cadasterNumber;
    }

    public void setCadasterNumber(String cadasterNumber) {
        this.cadasterNumber = cadasterNumber;
    }

    public Integer getLandWorthinessPoints() {
        return landWorthinessPoints;
    }

    public void setLandWorthinessPoints(Integer landWorthinessPoints) {
        this.landWorthinessPoints = landWorthinessPoints;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public String getCountyId() {
        return countyId;
    }

    public void setCountyId(String countyId) {
        this.countyId = countyId;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public Long getLastWorkTypeId() {
        return lastWorkTypeId;
    }

    public void setLastWorkTypeId(Long lastWorkTypeId) {
        this.lastWorkTypeId = lastWorkTypeId;
    }

    public boolean isIrrigated() {
        return irrigated;
    }

    public void setIrrigated(boolean irrigated) {
        this.irrigated = irrigated;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
