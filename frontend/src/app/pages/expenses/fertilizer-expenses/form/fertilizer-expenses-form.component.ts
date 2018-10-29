import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FertilizerExpenseModel} from './fertilizer-expense.model';
import {MachineService} from '../../../../services/machine.service';
import {ModalService} from '../../../../services/modal.service';
import {AlertService} from '../../../../services/alert.service';
import {LangService} from '../../../../services/lang.service';
import {ExpenseCategoryModel} from '../../../enterprise/manage-expense-categories/expense-category/expense-category.model';
import {ExpenseCategoryService} from '../../../../services/expenses/expense-category.service';
import {ExpenseCategoryTreeModel} from '../../../enterprise/manage-expense-categories/expense-category-tree/expense-category-tree.model';
import {FertilizerExpenseService} from '../../../../services/expenses/fertilizer-expense.service';

@Component({
    selector: 'app-fertilizer-expenses-form',
    templateUrl: './fertilizer-expenses-form.component.html',
    styleUrls: ['./fertilizer-expenses-form.component.scss']
})
export class FertilizerExpensesFormComponent implements OnInit {

    confirmationModalId = 'expense-remove-confirmation-modal';

    form: FormGroup;
    submitted = false;

    model: FertilizerExpenseModel ;
    subCategories: ExpenseCategoryTreeModel[] = [];

    machines: any[];
    employees: any[];
    employeeMap: any;

    multiSelectSettings = {
        enableSearchFilter: true,
        badgeShowLimit: 1,
        text: this.langService.instant('select-dropdown.select'),
        selectAllText: this.langService.instant('select-dropdown.select-all'),
        unSelectAllText: this.langService.instant('select-dropdown.deselect-all'),
        searchPlaceholderText: this.langService.instant('select-dropdown.search-placeholder'),
        filterSelectAllText: this.langService.instant('select-dropdown.select-all-filtered'),
        filterUnSelectAllText: this.langService.instant('select-dropdown.deselect-all-filtered')
    };

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private modalService: ModalService,
                private fertilizerExpenseService: FertilizerExpenseService,
                private expenseCategoryService: ExpenseCategoryService,
                private machineService: MachineService,
                private langService: LangService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.setupResources()
            .then(() => this.restoreModel());
    }

    private setupResources(): Promise<void> {
        this.expenseCategoryService.getTree().subscribe(payloadModel => {
            const treeModels = payloadModel.payload;
            treeModels.forEach((treeModel: ExpenseCategoryTreeModel) => {
                this.subCategories.push(treeModel);
            });

        });

        return new Promise((resolve) => {
            this.machineService.findAll().subscribe(machineModels => {
                this.machines = [];
                this.employees = [];
                this.employeeMap = {};
                machineModels.forEach(machine => {
                    this.machines.push({
                        id: machine.id,
                        itemName: this.getMachineLabel(machine)
                    });
                    this.registerEmployees(machine.id, machine.employees);
                });
                resolve();
            });
        });
    }

    private getMachineLabel(model) {
        return model.brand + ' ' + model.model + ' (' + model.identifier + ')';
    }

    private registerEmployees(machineId, items) {
        if (!items) {
            return;
        }
        items.forEach(employee => {
            let listModel = this.employeeMap[employee.id];

            if (!listModel) {
                listModel = {
                    id: employee.id,
                    itemName: this.getEmployeeLabel(employee),
                    machineMap: {}
                };
                this.employeeMap[employee.id] = listModel;
                this.employees.push(listModel);
            }

            listModel.machineMap[machineId] = machineId;
        });
    }

    private getEmployeeLabel(model) {
        return model.firstName + ' ' + model.lastName;
    }

    public resetUnlinkedEmployees() {
        const machineIds = this.form.controls['machines'].value.map(m => m.id);
        const employeesControl = this.form.controls['employees'];
        const employees = employeesControl.value.filter(employee => {
            return machineIds.some(machineId => employee.machineMap[machineId]);
        });
        employeesControl.setValue(employees);
    }

    private restoreModel() {
        this.route.params.subscribe(params => {
            const id = params['id'];

            if (id == -1) {
                this.prepareNewModel();
            }
            else {
                this.setupModel(id);
            }
        });
    }

    private setupModel(id) {
        this.fertilizerExpenseService.findOne(id).subscribe(model => {
            this.model = model;
            this.model.expenseDate = this.model.expenseDate ? new Date(this.model.expenseDate) : null;
            this.buildForm();
        });
    }

    private prepareNewModel() {
        this.model = new FertilizerExpenseModel();
        this.model.expenseDate = new Date();
        this.buildForm();
    }


    private buildForm() {
        const expenseDate = this.model.expenseDate ? this.model.expenseDate.toISOString().substring(0, 10) : null;
        this.form = this.fb.group({
            title: [this.model.title, Validators.required],
            expenseDate: [expenseDate, Validators.required],
            machines: [this.getSelectedMachines()],
            employees: [this.getSelectedEmployees()],
        });
    }

    private getSelectedMachines() {

        let selectedMachines = [];
        if (this.model.machines && this.model.machines.length > 0) {
            const map = {};
            this.machines.forEach(item => map[item.id] = item);
            selectedMachines = this.model.machines.map(machineId => map[machineId]);
        }

        return selectedMachines;
    }

    private getSelectedEmployees() {

        let selectedEmployees = [];
        if (this.model.employees && this.model.employees.length > 0) {
            const map = {};
            this.employees.forEach(item => map[item.id] = item);
            selectedEmployees = this.model.employees.map(id => map[id]);
        }

        return selectedEmployees;
    }

    save() {
        this.submitted = true;

        if (!this.form.valid) {
            this.alertService.validationFailed();
            return;
        }

        Object.assign(this.model, this.form.value);
        this.submitted = false;

        this.model.machines = this.form.value.machines.map(item => item.id);
        this.model.employees = this.form.value.employees.map(item => item.id);

        this.model.expenseItems = this.model.expenseItems.filter(item => {
            return !item.deleted || (item.deleted && item.id != null);
        });

        this.fertilizerExpenseService.save(this.model).subscribe((model) => {
            this.model = model;
            this.alertService.saved();
        });
    }

    prepareRemove() {
        this.modalService.open(this.confirmationModalId);
    }

    remove() {
        this.fertilizerExpenseService.remove(this.model).subscribe(() => {
            this.alertService.removed();
            this.back();
        });
    }

    back() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}