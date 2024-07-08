import { TestBed } from '@angular/core/testing';

import { GeneradorUrlService } from './generador-url.service';

describe('GeneradorUrlService', () => {
  let service: GeneradorUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneradorUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
