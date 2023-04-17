import { TestBed } from '@angular/core/testing';

import { CartAPIService } from './cart-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

fdescribe('CartAPIService', () => {
  let service: CartAPIService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartAPIService],
    });
    service = TestBed.inject(CartAPIService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart', () => {
    service.getCart().subscribe((cartFromSource) => {
      expect(cartFromSource.id).toBe(5);
    });

    const req = httpTestingController.expectOne(
      `https://fakestoreapi.com/carts/1`
    );

    expect(req.request.method).toBe('GET');

    req.flush({
      date: '',
      id: 5,
      products: [],
      userId: 1,
    });
  });

  it('should add to cart', () => {
    const resolvedCart = {
      date: '',
      id: 1,
      products: [{ productId: 1, quantity: 1 }],
      userId: 1,
    };
    service.postToCart(1, 1).subscribe((cartFromSource) => {
      expect(cartFromSource).toEqual(resolvedCart);
    });

    const req = httpTestingController.expectOne(
      `https://fakestoreapi.com/carts`
    );

    expect(req.request.method).toBe('POST');

    req.flush(resolvedCart);
  });

  // public updateItemQty(productId: number, quantity: number, prevCart$: Observable<CartWithProducts>): void
  it('should update item quantity', () => {
    const prevProducts = [
      {
        id: 1,
        title: '',
        price: 5.5,
        description: '',
        category: '',
        image: '',
        quantity: 3,
        rather: { rate: 5, count: 5 },
      },
    ];
    const nextProducts = [{ productId: 1, quantity: 1 }];
    const prevCart = {
      id: 7,
      userId: 3,
      date: `2019-12-10`,
      products: prevProducts,
    };
    const nextCart = {
      ...prevCart,
      products: nextProducts,
    };

    service.updateItemQty(1, 7, 1, prevCart).subscribe((cartFromSource) => {
      expect(cartFromSource).toEqual(nextCart);
    });

    const req = httpTestingController.expectOne(
      `https://fakestoreapi.com/carts/1`
    );

    expect(req.request.method).toBe('PATCH');

    req.flush(nextCart);
  });
});
