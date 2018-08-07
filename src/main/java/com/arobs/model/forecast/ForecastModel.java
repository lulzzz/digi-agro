package com.arobs.model.forecast;

import java.util.List;

public class ForecastModel {

    private List<Long> parcels;

    private Long cropCategoryId;
    private Long cropId;
    private Long cropVarietyId;

    private String forecastName;
    private String description;

    private Double unitPrice;

    public List<Long> getParcels() {
        return parcels;
    }

    public void setParcels(List<Long> parcels) {
        this.parcels = parcels;
    }

    public Long getCropCategoryId() {
        return cropCategoryId;
    }

    public void setCropCategoryId(Long cropCategoryId) {
        this.cropCategoryId = cropCategoryId;
    }

    public Long getCropId() {
        return cropId;
    }

    public void setCropId(Long cropId) {
        this.cropId = cropId;
    }

    public Long getCropVarietyId() {
        return cropVarietyId;
    }

    public void setCropVarietyId(Long cropVarietyId) {
        this.cropVarietyId = cropVarietyId;
    }

    public String getForecastName() {
        return forecastName;
    }

    public void setForecastName(String forecastName) {
        this.forecastName = forecastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
}