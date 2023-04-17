import { TestBed } from '@angular/core/testing';

import { CartDataService } from './cart-data.service';
import { HttpHandler, HttpClient } from '@angular/common/http';

describe('CartDataService', () => {
  let service: CartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(CartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
