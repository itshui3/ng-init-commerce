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
export type ProductResponse = Product[];

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  private productsURL = `https://fakestoreapi.com/products`;
  private productURL = (id: string) =>
    `https://fakestoreapi.com/products/${id}`;

  constructor(private http: HttpClient) {}

  public fetchSomeProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.productsURL);
  }

  public fetchProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.productURL(id));
  }
}
