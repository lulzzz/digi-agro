package com.arobs.model.crop;

import com.arobs.entity.crop.Crop;
import com.arobs.entity.crop.CropSubculture;
import com.arobs.entity.crop.CropVariety;

import java.io.Serializable;

public class CropVarietyModel implements Serializable {

    private Long id;
    private Long cropCategoryId;

    private Long cropId;
    private String cropNameRo;
    private String cropNameRu;

    private Long cropSubcultureId;
    private String cropSubcultureNameRo;
    private String cropSubcultureNameRu;

    private String nameRo;
    private String nameRu;
    private String descriptionRo;
    private String descriptionRu;

    public CropVarietyModel() {
    }

    public CropVarietyModel(CropVariety cropVariety) {
        this.id = cropVariety.getId();
        CropSubculture cropSubculture = cropVariety.getCropSubculture();
        if (cropSubculture != null) {
            this.cropSubcultureId = cropSubculture.getId();
            this.cropSubcultureNameRo = cropSubculture.getNameRo();
            this.cropSubcultureNameRu = cropSubculture.getNameRu();
        }

        Crop crop = cropVariety.getCrop();
        if (crop != null) {
            this.cropId = crop.getId();
            this.cropNameRo = crop.getNameRo();
            this.cropNameRu = crop.getNameRu();
            this.cropCategoryId = crop.getCropCategoryId();
        }
        this.nameRo = cropVariety.getNameRo();
        this.nameRu = cropVariety.getNameRu();
        this.descriptionRo = cropVariety.getDescriptionRo();
        this.descriptionRu = cropVariety.getDescriptionRu();
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCropSubcultureId() {
        return cropSubcultureId;
    }

    public void setCropSubcultureId(Long cropSubcultureId) {
        this.cropSubcultureId = cropSubcultureId;
    }

    public String getCropSubcultureNameRo() {
        return cropSubcultureNameRo;
    }

    public void setCropSubcultureNameRo(String cropSubcultureNameRo) {
        this.cropSubcultureNameRo = cropSubcultureNameRo;
    }

    public String getCropSubcultureNameRu() {
        return cropSubcultureNameRu;
    }

    public void setCropSubcultureNameRu(String cropSubcultureNameRu) {
        this.cropSubcultureNameRu = cropSubcultureNameRu;
    }

    public String getNameRo() {
        return nameRo;
    }

    public void setNameRo(String nameRo) {
        this.nameRo = nameRo;
    }

    public String getNameRu() {
        return nameRu;
    }

    public void setNameRu(String nameRu) {
        this.nameRu = nameRu;
    }

    public String getDescriptionRo() {
        return descriptionRo;
    }

    public void setDescriptionRo(String descriptionRo) {
        this.descriptionRo = descriptionRo;
    }

    public String getDescriptionRu() {
        return descriptionRu;
    }

    public void setDescriptionRu(String descriptionRu) {
        this.descriptionRu = descriptionRu;
    }


    public String getCropNameRo() {
        return cropNameRo;
    }

    public void setCropNameRo(String cropNameRo) {
        this.cropNameRo = cropNameRo;
    }

    public String getCropNameRu() {
        return cropNameRu;
    }

    public void setCropNameRu(String cropNameRu) {
        this.cropNameRu = cropNameRu;
    }
}
