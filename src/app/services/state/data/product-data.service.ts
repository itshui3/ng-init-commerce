import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import {
  ProductAPIService,
  ProductResponse,
  Product,
} from '../../api/productAPI.service';

export interface ProductData {
  [id: string]: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  // state
  private lastFetchedProducts: Date | undefined;
  private service: ProductAPIService;

  private products: BehaviorSubject<ProductData> = new BehaviorSubject(
    {} as ProductData
  );
  public products$ = this.products.asObservable();

  constructor(service: ProductAPIService) {
    this.service = service;
  }

  // access
  public getProducts(): Observable<ProductData> {
    if (this.shouldFetchProducts()) {
      this.fetchSubscribePushProducts();
    }

    return this.products$;
  }

  public getProduct(id: string): Observable<Product> {
    switch (this.shouldFetchProducts()) {
      case true:
        /* 2-fetches
          component subscribes to single product fetch,
          state subscribes to products fetch
        */
        this.fetchSubscribePushProducts();
        return this.fetchProduct(id);

      case false:
        return this.pipeProduct(id);

      default:
        throw new Error(`
          product-data.service.ts, [public]getProduct: 
          this.shouldFetchProducts() could not resolve boolean
        `);
    }
  }

  // strategies
  private pipeProduct(id: string): Observable<Product> {
    return this.products$.pipe(map((products) => products[id]));
  }

  private fetchProduct(id: string): Observable<Product> {
    return this.service.fetchProduct(id);
  }

  // helpers
  private shouldFetchProducts(): boolean {
    const oneHourInMs = 60 * 60 * 1000;
    if (
      !this.lastFetchedProducts ||
      new Date().getTime() - this.lastFetchedProducts.getTime() > oneHourInMs
    ) {
      return true;
    } else {
      return false;
    }
  }

  private fetchSubscribePushProducts(): void {
    this.service.fetchSomeProducts().subscribe((products) => {
      this.products.next(
        products.reduce((productsObj, product) => {
          productsObj[product.id] = product;
          return productsObj;
        }, {} as ProductData)
      );
    });
  }
}
