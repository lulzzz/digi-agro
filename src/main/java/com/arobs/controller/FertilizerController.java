package com.arobs.controller;

import com.arobs.entity.Employee;
import com.arobs.entity.Fertilizer;
import com.arobs.model.EmployeeModel;
import com.arobs.model.chemicals.FertilizerModel;
import com.arobs.service.chemicals.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/fertilizer")
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<List<FertilizerModel>> getFertilizers() {

        List<Fertilizer> fertilizers = fertilizerService.find();
        List<FertilizerModel> models = fertilizers.stream().map(FertilizerModel::new).collect(Collectors.toList());

        return ResponseEntity.ok(models);
    }

    @RequestMapping(value = "/by-type/{typeId}", method = RequestMethod.GET)
    public ResponseEntity<List<FertilizerModel>> getFertilizers(@PathVariable("typeId") final Long typeId) {

        List<Fertilizer> fertilizers = fertilizerService.find(typeId);
        List<FertilizerModel> models = fertilizers.stream().map(FertilizerModel::new).collect(Collectors.toList());

        return ResponseEntity.ok(models);
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<FertilizerModel> getModel(@PathVariable Long id) {
        Fertilizer item = fertilizerService.findOne(id);
        return ResponseEntity.ok(new FertilizerModel(item));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<FertilizerModel> save(@RequestBody FertilizerModel model, HttpSession session) {
        Long tenantId = (Long) session.getAttribute("tenant");
        return ResponseEntity.ok(new FertilizerModel(fertilizerService.save(model)));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void remove(@PathVariable Long id) {
        fertilizerService.remove(id);
    }

}