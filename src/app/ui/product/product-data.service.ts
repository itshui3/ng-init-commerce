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
  private _lastFetchedProducts: Date | undefined;
  private _service: ProductAPIService;

  private _products: BehaviorSubject<ProductList> = new BehaviorSubject(
    [] as ProductList
  );
  private _products$ = this._products.asObservable();
  private _productMap$ = this._products$.pipe(
    map((products) =>
      products.reduce((map, product) => {
        map[product.id] = product;
        return map;
      }, {} as ProductMap)
    )
  );

  constructor(service: ProductAPIService) {
    this._service = service;
  }

  // access
  public getAllProducts(): Observable<ProductList> {
    if (this._shouldFetchProducts()) {
      this._fetchProducts();
    }

    return this._products$.pipe(map((products) => Object.values(products)));
  }

  public getProductMap(): Observable<ProductMap> {
    if (this._shouldFetchProducts()) {
      this._fetchProducts();
    }
    return this._productMap$;
  }

  public getProduct(id: string): Observable<Product> {
    switch (this._shouldFetchProducts()) {
      case true:
        /* 2-fetches
          component subscribes to single product fetch,
          state subscribes to products fetch
        */
        return this.fetchProduct(id);

      case false:
        return this._pipeProduct(id);

      default:
        throw new Error(`
          product-data.service.ts, [public]getProduct: 
          this.shouldFetchProducts() could not resolve boolean
        `);
    }
  }

  // strategies
  private _pipeProduct(id: string): Observable<Product> {
    return this._productMap$.pipe(map((products) => products[id]));
  }

  private fetchProduct(id: string): Observable<Product> {
    return this._service.fetchProduct(id).pipe((product) => {
      setTimeout(() => this._fetchProducts());
      return product;
    });
  }

  // helpers
  private _shouldFetchProducts(): boolean {
    console.log(
      'checking if we should fetch products, this.lastFetchedProducts: ',
      this._lastFetchedProducts
    );
    const oneHourInMs = 60 * 60 * 1000;
    if (
      !this._lastFetchedProducts ||
      new Date().getTime() - this._lastFetchedProducts.getTime() > oneHourInMs
    ) {
      return true;
    } else {
      return false;
    }
  }

  private _fetchProducts(): void {
    console.log('fetching products...');
    this._service.fetchSomeProducts().subscribe((products) => {
      this._lastFetchedProducts = new Date();
      this._products.next(products);
    });
  }
}
