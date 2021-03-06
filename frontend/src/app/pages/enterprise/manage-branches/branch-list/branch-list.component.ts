import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ColDef, GridOptions} from 'ag-grid';
import {EditRendererComponent} from '../../../../modules/aggrid/edit-renderer/edit-renderer.component';
import {BranchService} from '../../../../services/branch.service';
import {BranchModel} from '../branch/branch.model';
import {LangService} from '../../../../services/lang.service';
import {FieldMapper} from '../../../../common/field.mapper';

@Component({
    selector: 'app-branch-list',
    templateUrl: './branch-list.component.html',
    styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

    options: GridOptions;
    context;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private langService: LangService,
                private branchService: BranchService) {
    }

    ngOnInit() {
        this.setupGrid();
    }

    private setupGrid() {
        this.options = <GridOptions>{};

        this.options.enableColResize = true;
        this.options.enableSorting = true;
        this.options.enableFilter = true;
        this.options.columnDefs = this.setupHeaders();
        this.context = {componentParent: this};

        this.setupRows();
    }

    private setupHeaders() {

        const headers: ColDef[] = [
            {
                field: 'edit',
                width: 24,
                minWidth: 24,
                maxWidth: 30,
                editable: false,
                suppressResize: true,
                suppressMenu: true,
                cellRendererFramework: EditRendererComponent,
                cellStyle: () => {
                    return {padding: 0};
                }
            },
            {
                headerName: 'info.name',
                field: 'name',
                width: 250,
                minWidth: 200,
                cellRenderer: 'agGroupCellRenderer'
            },
            // {
            //     headerName: 'info.description',
            //     field: 'description',
            //     width: 200,
            //     minWidth: 200
            // },
            {
                headerName: 'geo.county',
                field: 'county',
                width: 120,
                minWidth: 120
            },
            {
                headerName: 'geo.village-city',
                field: 'city',
                width: 200,
                minWidth: 200
            },
            {
                headerName: 'geo.address',
                field: 'address',
                width: 200,
                minWidth: 200
            },
            {
                headerName: 'contact.phone',
                field: 'phones',
                width: 200,
                minWidth: 200
            }
        ];

        headers.forEach((h) => {
            if (h.headerName) {
                this.langService.get(h.headerName).subscribe(m => h.headerName = m);
            }
        });

        return headers;
    }

    private setupRows() {
        this.branchService.find().subscribe(models => {
            models = this.adjustTreeModels(models);
            this.options.api.setRowData(models);
        });
    }

    private adjustTreeModels(models: BranchModel[]) {
        const treeModels = [];
        const modelMap = {};

        for (const model of models) {
            const fieldMapper = new FieldMapper(this.langService.getLanguage());
            const nameField = fieldMapper.get('name');
            model.county = model.county[nameField];

            modelMap[model.id] = model;
            if (model.parentId == null) {
                treeModels.push(model);
            } else {
                const parent = modelMap[model.parentId];
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(model);
            }
        }
        return treeModels;
    }

    private getNodeChildDetails(rowItem) {
        if (rowItem.children) {
            return {
                group: true,
                expanded: false,
                children: rowItem.children,
                key: rowItem.group
            };
        } else {
            return null;
        }
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

    public add() {
        this.router.navigate(['./-1'], {relativeTo: this.route});
    }

    public onEdit(node) {
        const model = node.data;
        this.router.navigate(['./' + model.id], {relativeTo: this.route});
    }

}
