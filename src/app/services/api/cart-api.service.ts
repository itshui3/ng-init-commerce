import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartFromSource {
  date: string;
  id: number;
  products: { productId: number; quantity: number }[];
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartAPIService {
  private cartsURL = `https://fakestoreapi.com/carts`;
  constructor(private http: HttpClient) {}

  public getCart(): Observable<CartFromSource> {
    return this.http.get<CartFromSource>(this.cartsURL + '/1');
  }

  public postToCart(productId: number, quantity: number) {
    const date = new Date('December 10, 2019');

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return this.http.post<CartFromSource>(this.cartsURL, {
      userId: 1,
      date: formattedDate,
      products: [{ productId, quantity }],
    });
  }
}
