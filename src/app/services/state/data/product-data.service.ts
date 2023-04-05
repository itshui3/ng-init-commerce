import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ProductAPIService,
  ProductResponse,
} from '../../api/productAPI.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private lastFetchedProducts: Date | undefined;
  private service: ProductAPIService;

  private products: BehaviorSubject<ProductResponse> = new BehaviorSubject(
    [] as ProductResponse
  );
  public products$ = this.products.asObservable();
  // given that products is receiving .next pushes,
  // how does products.asObservable() become informed of changes?

  constructor(service: ProductAPIService) {
    this.service = service;
  }

  getProducts(): Observable<ProductResponse> {
    const oneHourInMs = 60 * 60 * 1000;
    if (
      !this.lastFetchedProducts ||
      new Date().getTime() - this.lastFetchedProducts.getTime() > oneHourInMs
    ) {
      this.service.fetchSomeProducts().subscribe(products => {
        this.products.next(products);
      });
    }
  
    return this.products$;
  }
}
