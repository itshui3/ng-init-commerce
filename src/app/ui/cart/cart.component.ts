import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDataService } from './cart-data.service';
import { CartFromSource } from 'src/app/services/api/cart-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cartData$: Observable<CartFromSource> | undefined;
  constructor(private _cartData: CartDataService) {}
  ngOnInit(): void {
    this.cartData$ = this._cartData.cart$;
    this._cartData.initCart();
  }
}
