import { Injectable } from '@angular/core';
import {
  CartAPIService,
  CartFromSource,
} from 'src/app/services/api/cart-api.service';
import {
  take,
  map,
  tap,
  BehaviorSubject,
  combineLatest,
  Observable,
} from 'rxjs';
import { Product } from 'src/app/services/api/productAPI.service';
import {
  ProductDataService,
  ProductMap,
} from '../product/product-data.service';

export interface ProductInCart extends Product {
  quantity: number;
}
export interface CartWithProducts {
  date: string;
  id: number;
  products: ProductInCart[];
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private alreadyFetched: boolean = false;
  private cart: BehaviorSubject<CartWithProducts> = new BehaviorSubject(
    {} as CartWithProducts
  );
  public cart$ = this.cart.asObservable();
  constructor(
    private _cartAPIService: CartAPIService,
    private _productStateService: ProductDataService
  ) {}

  public async initCart() {
    if (this.alreadyFetched === true) {
      return;
    }
    this.alreadyFetched = true;
    const productMapAndCart$ = combineLatest([
      this._productStateService.getProductMap(),
      this._cartAPIService.getCart(),
    ]);
    const cartWithProducts$ = productMapAndCart$.pipe(
      map<[ProductMap, CartFromSource], CartWithProducts>(
        ([productMap, cart]) => {
          const productsInCart: ProductInCart[] = [];

          cart.products.forEach((product) =>
            productsInCart.push({
              ...productMap[product.productId],
              quantity: product.quantity,
            })
          );

          return {
            ...cart,
            products: productsInCart,
          };
        }
      )
    );
    cartWithProducts$.subscribe((c) => this.cart.next(c));
  }

  public async addToCart(id: number, qty: number) {
    if (!this.alreadyFetched) {
      console.log('resolving empty cartState case');
      this.initCart();
    }
    const cartStateRespMap: [
      Observable<CartWithProducts>,
      Observable<CartFromSource>,
      Observable<ProductMap>
    ] = [
      this.cart$,
      this._cartAPIService.postToCart(id, qty),
      this._productStateService.getProductMap(),
    ];

    combineLatest(cartStateRespMap)
      .pipe(
        take(1),
        tap((comboCart) => {
          const entireCart = comboCart[0];
          const postRespCart = comboCart[1];
          const productMap = comboCart[2];

          const productsQtyHash = entireCart.products.reduce(
            (productsHash, product) => {
              productsHash[product.id] = product.quantity;
              return productsHash;
            },
            {} as { [id: string]: number }
          );

          postRespCart.products.forEach((product) => {
            if (product.productId in productsQtyHash) {
              productsQtyHash[product.productId] += product.quantity;
            } else {
              productsQtyHash[product.productId] = product.quantity;
            }
          });

          const mergedProducts = Object.entries(productsQtyHash).map(
            ([k, v]) => {
              return { ...productMap[+k], quantity: v };
            }
          );

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

  public deleteCartItem(id: number): void {
    const cart = this.cart.getValue();

    this.cart.next({
      ...cart,
      products: cart.products.filter((product) => product.id !== id),
    });
  }

  public modifyItemQty(id: number, newQty: number): void {
    const cart = this.cart.getValue();
    this._cartAPIService.updateItemQty(1, id, newQty, cart).subscribe();

    this.cart.next({
      ...cart,
      products: cart.products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: newQty,
          };
        } else {
          return product;
        }
      }),
    });
  }
}
