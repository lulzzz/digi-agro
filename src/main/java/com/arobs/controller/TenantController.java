package com.arobs.controller;

import com.arobs.entity.Tenant;
import com.arobs.model.ListItemModel;
import com.arobs.model.tenant.TenantFilterModel;
import com.arobs.model.tenant.TenantModel;
import com.arobs.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tenant")
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @RequestMapping(value = "/list-items", method = RequestMethod.GET)
    public ResponseEntity<List<ListItemModel>> fetchListItems() {
        List<Tenant> tenants = tenantService.findByUser();
        List<ListItemModel> models = tenants.stream().map(t -> new ListItemModel(t.getId(), t.getName())).collect(Collectors.toList());
        return ResponseEntity.ok(models);
    }

    @RequestMapping(value = "/find-by", method = RequestMethod.POST)
    public ResponseEntity<List<TenantModel>> getModels(@RequestBody TenantFilterModel filterRequestModel) {
        List<Tenant> tenants = tenantService.find(filterRequestModel);
        List<TenantModel> models = tenants.stream().map(TenantModel::new).collect(Collectors.toList());
        return ResponseEntity.ok(models);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<TenantModel> getModel(@PathVariable Long id) {
        return ResponseEntity.ok(new TenantModel(tenantService.findOne(id)));
    }

    @RequestMapping(value = "/unique", method = RequestMethod.GET)
    public ResponseEntity<Boolean> isUnique(@RequestParam(value = "id", required = false) Long id,
                                            @RequestParam("field") String field, @RequestParam("value") String value) {
        return ResponseEntity.ok(tenantService.isUnique(id, field, value));
    }

    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<TenantModel> save(@RequestBody TenantModel model) {
        return ResponseEntity.ok(new TenantModel(tenantService.save(model)));
    }

    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        tenantService.delete(id);
    }

}
