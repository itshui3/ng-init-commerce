import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  ProductAPIService,
  Product,
  ProductList,
} from '../../services/api/productAPI.service';

export interface ProductMap {
  [id: string]: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  // state
  private lastFetchedProducts: Date | undefined;
  private service: ProductAPIService;

  private products: BehaviorSubject<ProductList> = new BehaviorSubject(
    [] as ProductList
  );
  public products$ = this.products.asObservable();
  public productMap$ = this.products$.pipe(
    map((products) =>
      products.reduce((map, product) => {
        map[product.id] = product;
        return map;
      }, {} as ProductMap)
    )
  );

  constructor(service: ProductAPIService) {
    this.service = service;
  }

  // access
  public getAllProducts(): Observable<ProductList> {
    if (this.shouldFetchProducts()) {
      this.fetchProducts();
    }

    return this.products$.pipe(map((products) => Object.values(products)));
  }

  public getProductMap(): Observable<ProductMap> {
    if (this.shouldFetchProducts()) {
      this.fetchProducts();
    }
    return this.productMap$;
  }

  public getProduct(id: string): Observable<Product> {
    switch (this.shouldFetchProducts()) {
      case true:
        /* 2-fetches
          component subscribes to single product fetch,
          state subscribes to products fetch
        */

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
    return this.productMap$.pipe(map((products) => products[id]));
  }

  private fetchProduct(id: string): Observable<Product> {
    return this.service.fetchProduct(id).pipe((product) => {
      setTimeout(() => this.fetchProducts());
      return product;
    });
  }

  // helpers
  private shouldFetchProducts(): boolean {
    console.log(
      'checking if we should fetch products, this.lastFetchedProducts: ',
      this.lastFetchedProducts
    );
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

  private fetchProducts(): void {
    console.log('fetching products...');
    this.service.fetchSomeProducts().subscribe((products) => {
      this.lastFetchedProducts = new Date();
      this.products.next(products);
    });
  }
}
