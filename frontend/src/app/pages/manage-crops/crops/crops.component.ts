import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Messages} from '../../../common/messages';

import {ViewChild, ViewEncapsulation} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { CropService } from '../../../services/crop/crop.service';
import { SelectItem } from '../../../dto/select-item.dto';

@Component({
    selector: 'crops',
    templateUrl: './crops.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./crops.component.scss']
})

export class CropsComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private cropService: CropService,
                private toastr: ToastrService) {
        // this.fetch((data) => {
        //     this.temp = [...data];
        //     this.rows = data;
        // });
    
    }

    ngOnInit() {
        this.fetchData();

        this.cropService.findCategoryItems().subscribe(data => {
            this.cropCategorySelectItems = data;
        });
    }


    editing = {};
    rows = [];
    selected = [];
    cropCategorySelectItems: SelectItem[] = [];

    //page = new Page();

    firstRow: number;
    noPerPage: number;   
    totalRecords: number = 0;
    pageNo: number = 0;
    pageSize: number = 10;

    filterMap : Map<string, string> = new Map<string, string>();


    columns = [
        {prop: 'cropCategoryId'},
        {name: 'nameRo'},
        {name: 'nameRu'}
    ];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    fetchData() {
        this.cropService.findAll(this.pageNo, this.pageSize, this.filterMap, null).subscribe(data => {
            this.rows = JSON.parse(data['items']);
            this.totalRecords = data['total_count']
        });
    }

    setPage(pageInfo){
        console.log(pageInfo);
        this.pageNo = pageInfo.offset;
        this.fetchData();
    }

    updateValue(event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    }

    public updateColumnFilter(event: any, columnName: string, filterModer: string) {
        console.log(event);
        
        let inputValue: string = event.srcElement.value;

        if (inputValue) {
            this.filterMap.set(columnName, inputValue);
        } else {
            this.filterMap.delete(columnName);
        }
        console.log(this.filterMap)

        this.fetchData();
    }

    getCropCategoryLabelById(id: number) {
        for (let item of this.cropCategorySelectItems) {
            if (item.id == id) {
                return item.name;
            }
        }
        return 'UNKNOWN';
    }

    onSelect({selected}) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        console.log('Activate Event', event);
        if (event.type == 'click') {
            this.router.navigate(['/pages/manage-crops/' + event.row.id]);
        }
    }

    public sort(event: any) {
        console.log(event);
    }

    public add() {
        this.router.navigate(['/pages/manage-crops/-1']);
    }


}
