package com.arobs.service.chemicals;

import com.arobs.entity.Fertilizer;
import com.arobs.enums.FertilizerType;
import com.arobs.model.chemicals.FertilizerModel;
import com.arobs.repository.FertilizerRepository;
import com.arobs.service.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FertilizerService extends BaseEntityService<Fertilizer, FertilizerRepository> {

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Override
    public FertilizerRepository getRepository() {
        return fertilizerRepository;
    }

    public List<Fertilizer> find() {
        return getRepository().find();
    }

    public List<Fertilizer> find(FertilizerType fertilizerType) {
        return getRepository().find(fertilizerType);
    }

    @Transactional
    public Fertilizer save(FertilizerModel model) {
        Fertilizer entity;

        if (model.getId() == null) {
            entity = new Fertilizer();
        } else {
            entity = findOne(model.getId());
        }

        copyValues(entity, model);
        return getRepository().save(entity);
    }

    private void copyValues(Fertilizer entity, FertilizerModel model) {
        entity.setFertilizerType(model.getFertilizerType());
        entity.setNameRo(model.getNameRo());
        entity.setNameRu(model.getNameRu());
        entity.setDescriptionRo(model.getDescriptionRo());
        entity.setDescriptionRu(model.getDescriptionRu());
    }

    @Override
    @Transactional
    public void delete(Long id) {
        getRepository().softDelete(id);
    }
}
