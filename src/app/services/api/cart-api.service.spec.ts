import { TestBed } from '@angular/core/testing';

import { CartAPIService } from './cart-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CartAPIService', () => {
  let service: CartAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(CartAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
