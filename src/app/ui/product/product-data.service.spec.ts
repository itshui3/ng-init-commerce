import { TestBed } from '@angular/core/testing';
import { ProductAPIService } from '../../services/api/productAPI.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ProductDataService } from './product-data.service';

describe('ProductDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductAPIService, HttpClient, HttpHandler],
    });
    service = TestBed.inject(ProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
