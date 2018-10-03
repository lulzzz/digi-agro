package com.arobs.controller.expense;

import com.arobs.entity.*;
import com.arobs.enums.UnitOfMeasure;
import com.arobs.model.expense.ExpenseModel;
import com.arobs.model.expense.SowingExpenseListModel;
import com.arobs.model.parcel.ParcelModel;
import com.arobs.service.expense.ExpenseService;
import com.arobs.service.parcel.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/sowing-expense")
public class SowingExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private ParcelService parcelService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<List<SowingExpenseListModel>> getModels(HttpSession session) {
        Long tenantId = (Long) session.getAttribute("tenant");

        List<Expense> expenses = expenseService.find(tenantId, ExpenseCategory.MACHINERY);
        List<SowingExpenseListModel> resultModels = new ArrayList<>();

        for (Expense expense : expenses) {
            ExpenseModel expenseModel = expenseService.getModel(expense);

            List<ParcelModel> parcelModels = new ArrayList<>();
            List<Parcel> parcels = parcelService.findAll(expenseModel.getMachines());
            for (Parcel parcel:parcels) {
                parcelModels.add(new ParcelModel(parcel));
            }

            SowingExpenseListModel model1 = new SowingExpenseListModel();
            model1.setExpenseId(expense.getId());
            model1.setExpenseDate(expense.getExpenseDate());
            model1.setCrop("Porumb");
            model1.setVariety("Mama");
            model1.setIcon("corn.png");
            model1.setUnitOfMeasure(UnitOfMeasure.SowingUnit.getUnitOfMeasure());
            model1.setArea((double)((int)(Math.random() * 10000))/100);
            model1.setNormSow1Ha((double)((int)(Math.random() * 10000))/100);
            model1.setActualSown1Ha((double)((int)(Math.random() * 10000))/100);
            model1.setUnitPrice(BigDecimal.valueOf((double)((int)(Math.random() * 10000))/100));
            model1.setCreatedAt(expense.getCreatedAt());
            model1.setCreatedBy("" + expense.getCreatedBy());
            model1.setParcels(parcelModels);
            resultModels.add(model1);

            SowingExpenseListModel model2 = new SowingExpenseListModel();
            model2.setExpenseId(expense.getId());
            model2.setExpenseDate(expense.getExpenseDate());
            model2.setCrop("Cartof");
            model2.setVariety("Irga");
            model1.setIcon("potatoes.png");
            model2.setUnitOfMeasure(UnitOfMeasure.SowingUnit.getUnitOfMeasure());
            model2.setArea((double)((int)(Math.random() * 10000))/100);
            model2.setNormSow1Ha((double)((int)(Math.random() * 10000))/100);
            model2.setActualSown1Ha((double)((int)(Math.random() * 10000))/100);
            model2.setUnitPrice(BigDecimal.valueOf((double)((int)(Math.random() * 10000))/100));
            model2.setCreatedAt(expense.getCreatedAt());
            model2.setCreatedBy("" + expense.getCreatedBy());
            model2.setParcels(parcelModels);
            resultModels.add(model2);

            SowingExpenseListModel model3 = new SowingExpenseListModel();
            model3.setExpenseId(expense.getId());
            model3.setExpenseDate(expense.getExpenseDate());
            model3.setCrop("Griu");
            model3.setVariety("Aktios");
            model1.setIcon("wheat.png");
            model3.setUnitOfMeasure(UnitOfMeasure.SowingUnit.getUnitOfMeasure());
            model3.setArea((double)((int)(Math.random() * 10000))/100);
            model3.setNormSow1Ha((double)((int)(Math.random() * 10000))/100);
            model3.setActualSown1Ha((double)((int)(Math.random() * 10000))/100);
            model3.setUnitPrice(BigDecimal.valueOf((double)((int)(Math.random() * 10000))/100));
            model3.setCreatedAt(expense.getCreatedAt());
            model3.setCreatedBy("" + expense.getCreatedBy());
            model3.setParcels(parcelModels);
            resultModels.add(model3);

//            for (ExpenseItemModel expenseItemModel : expenseModel.getExpenseItems()) {
//                SowingExpenseListModel listModel = new SowingExpenseListModel();
//                resultModels.add(listModel);
//                listModel.setExpenseId(expense.getId());
//                listModel.setExpenseDate(expense.getExpenseDate());
//                listModel.setSparePart(expenseItemModel.getTitle());
//                listModel.setSparePartPrice(expenseItemModel.getTotalCost());
//                listModel.setParcels(parcelModels);
//                listModel.setCreatedAt(expense.getCreatedAt());
//                listModel.setCreatedBy("" + expense.getCreatedBy());
//            }
        }

        return ResponseEntity.ok(resultModels);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ExpenseModel> getModel(@PathVariable Long id) {
        ExpenseModel expenseModel = expenseService.findOneModel(id);
        return ResponseEntity.ok(expenseModel);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<ExpenseModel> save(@RequestBody ExpenseModel model,
                                             HttpSession session) {
        Long tenant = (Long) session.getAttribute("tenant");
        return ResponseEntity.ok(expenseService.saveModel(model, tenant, ExpenseCategory.MACHINERY));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void remove(@PathVariable Long id) {
        expenseService.remove(id);
    }

}