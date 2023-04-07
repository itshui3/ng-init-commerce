import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rather: { rate: number; count: number };
}
export type ProductList = Product[];

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  private productsURL = `https://fakestoreapi.com/products`;
  private productURL = (id: string) =>
    `https://fakestoreapi.com/products/${id}`;

  constructor(private http: HttpClient) {}

  public fetchSomeProducts(): Observable<ProductList> {
    return this.http.get<ProductList>(this.productsURL);
  }

  // needs error handling in case user navigates manually to non-existent product id
  public fetchProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.productURL(id));
  }
}
