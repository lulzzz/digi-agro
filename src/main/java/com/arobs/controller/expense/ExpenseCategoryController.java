package com.arobs.controller.expense;

import com.arobs.entity.ExpenseCategory;
import com.arobs.model.PayloadModel;
import com.arobs.model.expense.ExpenseCategoryModel;
import com.arobs.service.expense.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/expense-category")
public class ExpenseCategoryController {

    @Autowired
    private ExpenseCategoryService categoryService;

    @RequestMapping(value = "/tree", method = RequestMethod.GET)
    public ResponseEntity<PayloadModel> getCategoriesTree(HttpSession session) {
        Long tenantId = (Long) session.getAttribute("tenant");

        List<ExpenseCategoryModel> list = new ArrayList<>();
        PayloadModel<ExpenseCategoryModel> payloadModel = new PayloadModel<>();

        List<ExpenseCategory> categories = categoryService.find(tenantId);
        for (ExpenseCategory mainCategory : categories) {
            if (mainCategory.getParentId() == null) {
                ExpenseCategoryModel parentModel = new ExpenseCategoryModel(mainCategory);
                parentModel.setChildren(new ArrayList<>());

                for (ExpenseCategory subCategory : categories) {
                    if (subCategory.getParentId() != null && subCategory.getParentId().equals(mainCategory.getId())) {
                        ExpenseCategoryModel childModel = new ExpenseCategoryModel(subCategory);
                        parentModel.getChildren().add(childModel);
                    }
                }

                list.add(parentModel);
            }
        }

        ExpenseCategoryModel[] arr = new ExpenseCategoryModel[list.size()];
        payloadModel.setPayload(list.toArray(arr));
        payloadModel.setStatus(PayloadModel.STATUS_SUCCESS);
        return ResponseEntity.ok(payloadModel);
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ExpenseCategoryModel> getModel(@PathVariable Long id) {
        ExpenseCategory category = categoryService.findOne(id);
        return ResponseEntity.ok(new ExpenseCategoryModel(category));
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<ExpenseCategory> save(@RequestBody ExpenseCategoryModel model,
                                                HttpSession session) {
        Long tenantId = (Long) session.getAttribute("tenant");
        return ResponseEntity.ok(categoryService.save(model, tenantId));
    }

}