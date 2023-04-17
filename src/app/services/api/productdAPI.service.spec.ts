import { TestBed } from '@angular/core/testing';

import { ProductAPIService } from './productAPI.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('ProductAPIService', () => {
  let service: ProductAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(ProductAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
