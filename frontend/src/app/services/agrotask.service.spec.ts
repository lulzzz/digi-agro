import { TestBed, inject } from '@angular/core/testing';

import { AgroTaskService } from './agrotask.service';

describe('AgroTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgroTaskService]
    });
  });

  it('should be created', inject([AgroTaskService], (service: AgroTaskService) => {
    expect(service).toBeTruthy();
  }));
});
