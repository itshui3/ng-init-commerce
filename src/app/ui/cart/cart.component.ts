import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDataService, CartWithProducts } from './cart-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cartData$: Observable<CartWithProducts> | undefined;
  constructor(private _cartData: CartDataService) {}
  ngOnInit(): void {
    // if (this._cartData.hasInit) {
    //   return;
    // }
    this.cartData$ = this._cartData.cart$;
    this._cartData.initCart();
  }

  public deleteItem(id: number): void {
    this._cartData.deleteCartItem(id);
  }

  public modifyQty(id: number, newQty: number): void {
    if (newQty > 0) {
      this._cartData.modifyItemQty(id, newQty);
    }
  }
}
