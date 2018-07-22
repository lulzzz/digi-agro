package com.arobs.entity;

import javax.persistence.*;

/**
 * Created by mihail.gorgos on 14.07.2018.
 */
@Entity
@Table(name = "cities_villages")
public class CityVillage {

    @Id
    @GeneratedValue
    private Long id;

    @Column (name = "county_id", length = 2)
    private String countyId;

    @Column (name = "country_id", length = 2)
    private String countryId;

    @Column (name = "name_ro")
    private String nameRo;

    @Column (name = "name_ru")
    private String nameRu;

    public CityVillage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountyId() {
        return countyId;
    }

    public void setCountyId(String countyId) {
        this.countyId = countyId;
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

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }
}