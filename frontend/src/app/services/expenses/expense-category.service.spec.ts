import { TestBed, inject } from '@angular/core/testing';

import { ExpensesService } from './machinery-expense.service';

describe('ExpenseCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpensesService]
    });
  });

  it('should be created', inject([ExpensesService], (service: ExpensesService) => {
    expect(service).toBeTruthy();
  }));
});
