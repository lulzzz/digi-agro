import {Component, Input, OnInit} from '@angular/core';
import {LangService} from '../../../../services/lang.service';
import {ColDef, GridOptions} from 'ag-grid';
import {DeleteRendererComponent} from '../../../../modules/aggrid/delete-renderer/delete-renderer.component';
import {NumericUtil} from '../../../../common/numericUtil';
import {PinnedRowRendererComponent} from '../../../../modules/aggrid/pinned-row-renderer/pinned-row-renderer.component';
import {ModalService} from '../../../../services/modal.service';
import {FuelExpenseItemModel} from './fuel-expense-item.model';
import {ExpenseCategoryModel} from '../../../enterprise/manage-expense-categories/expense-category/expense-category.model';

@Component({
    selector: 'app-fuel-expense-item-table',
    templateUrl: './fuel-expense-item-table.component.html',
    styleUrls: ['./fuel-expense-item-table.component.scss']
})
export class FuelExpenseItemTableComponent implements OnInit {

    @Input() models: FuelExpenseItemModel[];
    @Input() categories: ExpenseCategoryModel[];

    categoryMap: any;

    confirmationModalId = 'expense-item-remove-confirmation-modal';

    options: GridOptions;
    context;

    currentModel: FuelExpenseItemModel;

    constructor(private langService: LangService,
                private modalService: ModalService) {
    }

    ngOnInit() {
        this.setupCategories();
        this.setupGrid();
    }

    private setupCategories() {
        this.categoryMap = {};
        this.categories.forEach(model => this.categoryMap[model.name] = model.id);
    }

    private extractCategoryLabels() {
        return Object.keys(this.categoryMap);
    }

    private lookupCategoryId(key) {
        return this.categoryMap[key];
    }

    private lookupCategoryLabel(value) {
        for (const key in this.categoryMap) {
            if (this.categoryMap.hasOwnProperty(key)) {
                if (value === this.categoryMap[key]) {
                    return key;
                }
            }
        }
    }

    private setupGrid() {
        this.options = <GridOptions>{};

        this.options.enableColResize = true;
        this.options.enableSorting = true;
        this.options.enableFilter = true;
        this.options.columnDefs = this.setupHeaders();
        this.context = {componentParent: this};
        this.options.frameworkComponents = {pinnedRowRenderer: PinnedRowRendererComponent};

        this.options.rowData = this.models;
        this.setupSummaryRow(this.models);
    }

    private setupHeaders() {

        this.options.defaultColDef = {
            pinnedRowCellRenderer: 'pinnedRowRenderer',
            pinnedRowCellRendererParams: {style: {fontWeight: 'bold'}}
        };

        const headers: ColDef[] = [
            {
                field: 'delete',
                headerName: '',
                width: 24,
                minWidth: 24,
                maxWidth: 30,
                editable: false,
                suppressResize: true,
                suppressMenu: true,
                cellRendererFramework: DeleteRendererComponent,
                cellStyle: () => {
                    return {padding: 0};
                }
            },
            {
                headerName: 'Category',
                field: 'categoryId',
                width: 150,
                minWidth: 150,
                editable: params => !params.data.readOnly,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: this.extractCategoryLabels()
                },
                valueFormatter: (params) => this.lookupCategoryLabel(params.value),
                valueParser: (params) => this.lookupCategoryId(params.newValue)
            },
            {
                headerName: 'Title',
                field: 'title',
                width: 175,
                minWidth: 175,
                editable: params => !params.data.readOnly
            },
            {
                headerName: 'Quantity',
                field: 'quantity',
                width: 175,
                minWidth: 175,
                editable: params => !params.data.readOnly,
                valueSetter: (params) => this.valueSetter(params),
                onCellValueChanged: (params) => this.onValueChange(params)
            }
        ];

        headers.forEach(header => {
            if (header.headerName) {
                this.langService.get(header.headerName).subscribe(m => header.headerName = m);
            }
        });

        return headers;
    }

    public onGridReady() {
        this.options.api.sizeColumnsToFit();
    }

    public adjustGridSize() {
        setTimeout(() => {
            if (this.options && this.options.api) {
                this.options.api.sizeColumnsToFit();
            }
        }, 500);
    }

    private setupSummaryRow(models) {
        const summaryRow = new FuelExpenseItemModel();
        summaryRow.readOnly = true;
        summaryRow.title = 'TOTAL';
        models.forEach(model => this.aggregate(summaryRow, model, true));
        this.options.pinnedBottomRowData = [summaryRow];
    }

    private aggregate(source: FuelExpenseItemModel, item: FuelExpenseItemModel, applyAddition) {
        const sumFields = ['quantity'];
        sumFields.forEach(field => {
            source[field] = source[field] || 0;
            if (applyAddition) {
                source[field] += item[field] || 0;
            }
            else {
                source[field] -= item[field] || 0;
            }
        });
    }

    private valueSetter(params) {
        const newValue = params.newValue;
        if (newValue == params.oldValue) {
            return false;
        }

        if (!NumericUtil.isNumeric(newValue)) {
            return false;
        }

        const field = params.colDef.field;
        params.data[field] = newValue;

        return true;
    }

    private onValueChange(params) {
        const field = params.colDef.field;
        const newValue = params.newValue || 0;
        const oldValue = params.oldValue || 0;
        const diff = newValue - oldValue;

        const summaryRow = this.getSummaryRow();
        summaryRow[field] = summaryRow[field] || 0;
        summaryRow[field] += diff;

        this.updateSummaryRow();
    }

    public add() {
        const model = new FuelExpenseItemModel();
        model.categoryId = this.categories[0].id;
        this.models.push(model);
        this.options.api.updateRowData({
            add: [model]
        });
    }

    public onDelete(node) {
        this.modalService.open(this.confirmationModalId);
        this.currentModel = node.data;
    }

    public remove() {
        this.currentModel.deleted = true;
        this.options.api.updateRowData({remove: [this.currentModel]});
        const summaryRow = this.getSummaryRow();
        this.aggregate(summaryRow, this.currentModel, false);
        this.updateSummaryRow();
        this.currentModel = null;
    }

    private getSummaryRow() {
        const summaryRowNode = this.options.api.getPinnedBottomRow(0);
        return summaryRowNode.data;
    }

    private updateSummaryRow() {
        const summaryRowNode = this.options.api.getPinnedBottomRow(0);
        const refreshCellParams = {
            rowNodes: [summaryRowNode]
        };
        this.options.api.refreshCells(refreshCellParams);
    }

}
