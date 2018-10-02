import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FuelExpensesListComponent} from './fuel-expenses-list.component';

describe('FuelExpensesComponent', () => {
    let component: FuelExpensesListComponent;
    let fixture: ComponentFixture<FuelExpensesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelExpensesListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelExpensesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
