import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { CartWithProducts } from 'src/app/ui/cart/cart-data.service';

export interface CartFromSource {
  date: string;
  id: number;
  products: { productId: number; quantity: number }[];
  userId: number;
}

type CartToSource = Pick<CartFromSource, 'date' | 'userId' | 'products'>;

@Injectable({
  providedIn: 'root',
})
export class CartAPIService {
  private cartsURL = `https://fakestoreapi.com/carts`;
  private cartURL = `https://fakestoreapi.com/carts/1`;
  constructor(private http: HttpClient) {}

  public getCart(): Observable<CartFromSource> {
    return this.http.get<CartFromSource>(this.cartURL);
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

  public deleteCartItem(
    productId: number,
    prevCart$: Observable<CartWithProducts>
  ): void {
    const prevCartTake$ = prevCart$.pipe(take(1));
    prevCartTake$.subscribe((prevCart) => {
      const newSourceCart: CartToSource = {
        userId: prevCart.userId,
        date: prevCart.date,
        products: prevCart.products
          .filter((product) => product.id !== productId)
          .map((product) => {
            return {
              productId: product.id,
              quantity: product.quantity,
            };
          }),
      };
      this.http.put<{ id: number }>(this.cartURL, newSourceCart);
    });
  }

  public updateItemQty(
    productId: number,
    quantity: number,
    prevCart$: Observable<CartWithProducts>
  ): void {
    prevCart$.subscribe((prevCart) => {
      const newSourceCart: CartToSource = {
        userId: prevCart.userId,
        date: prevCart.date,
        products: [{ productId, quantity }],
      };
      this.http.patch<{ id: number }>(this.cartURL, newSourceCart);
    });
  }
}
