import { Injectable } from '@angular/core';
import {
  CartAPIService,
  CartFromSource,
} from 'src/app/services/api/cart-api.service';
import {
  scan,
  tap,
  BehaviorSubject,
  firstValueFrom,
  combineLatest,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private cart: BehaviorSubject<CartFromSource> = new BehaviorSubject(
    {} as CartFromSource
  );
  public cart$ = this.cart.asObservable();
  constructor(private _cartService: CartAPIService) {}

  public async initCart() {
    const fetchedCart = await firstValueFrom(this._cartService.getCart());
    this.cart.next(fetchedCart);
  }

  public async addToCart(id: number, qty: number) {
    const cartState = await firstValueFrom(this.cart$);
    let cartStateAndResp: [
      Observable<CartFromSource>,
      Observable<CartFromSource>
    ];

    if (JSON.stringify(cartState) === '{}') {
      console.log('resolving empty cartState case');

      cartStateAndResp = [
        this._cartService.getCart(),
        this._cartService.postToCart(id, qty),
      ];
    } else {
      console.log('resolving previously init cartState case');

      cartStateAndResp = [this.cart$, this._cartService.postToCart(id, qty)];
    }

    combineLatest(cartStateAndResp)
      .pipe(
        tap((comboCart) => {
          const entireCart = comboCart[0];
          const postRespCart = comboCart[1];

          const productsHash = entireCart.products.reduce(
            (productsHash, product) => {
              productsHash[product.productId] = product.quantity;
              return productsHash;
            },
            {} as { [id: string]: number }
          );

          postRespCart.products.forEach((product) => {
            if (product.productId in productsHash) {
              productsHash[product.productId] += product.quantity;
            } else {
              productsHash[product.productId] = product.quantity;
            }
          });

          const mergedProducts = Object.entries(productsHash).map(([k, v]) => {
            return { productId: +k, quantity: v };
          });

          this.cart.next({
            id: postRespCart.id,
            userId: postRespCart.userId,
            date: postRespCart.date,
            products: mergedProducts,
          });
        })
      )
      .subscribe();
  }
}
