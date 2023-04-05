import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
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
  private URL: string = `https://fakestoreapi.com/products/`;

  constructor(private http: HttpClient) {}

  fetchSomeProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.URL);
  }
}
