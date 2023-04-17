import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductAPIService } from './productAPI.service';

describe('ProductAPIService', () => {
  let service: ProductAPIService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductAPIService],
    });
    service = TestBed.inject(ProductAPIService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // public fetchSomeProducts(): Observable<ProductList>
  it('should fetch products', () => {
    const productListResp = [
      {
        id: 1,
        title: '',
        price: 5.55,
        description: '',
        category: '',
        image: '',
        rather: { rate: 5, count: 5 },
      },
    ];
    service.fetchSomeProducts().subscribe((productList) => {
      expect(productList).toEqual(productListResp);
    });

    const req = httpTestingController.expectOne(
      `https://fakestoreapi.com/products`
    );
    expect(req.request.method).toBe('GET');

    req.flush(productListResp);
  });

  // public fetchProduct(id: string): Observable<Product>
  it('should fetch a product', () => {
    const productResp = {
      id: 1,
      title: '',
      price: 5.55,
      description: '',
      category: '',
      image: '',
      rather: { rate: 5, count: 5 },
    };

    service.fetchProduct('1').subscribe((product) => {
      expect(product).toEqual(productResp);
    });

    const req = httpTestingController.expectOne(
      `https://fakestoreapi.com/products/1`
    );
    expect(req.request.method).toBe('GET');

    req.flush(productResp);
  });
});
