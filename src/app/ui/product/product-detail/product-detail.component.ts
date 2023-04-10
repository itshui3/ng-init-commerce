import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/services/api/productAPI.service';
import { ProductDataService } from 'src/app/ui/product/product-data.service';
import { CartDataService } from '../../cart/cart-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public product$: Product | undefined;
  public stepperQty: number = 1;
  constructor(
    private _route: ActivatedRoute,
    private _productState: ProductDataService,
    private _cartService: CartDataService
  ) {}
  ngOnInit() {
    this._route.params
      .pipe<string>(map((p) => p['productId']))
      .subscribe((id) =>
        this._productState
          .getProduct(id)
          .subscribe((product) => (this.product$ = product))
      );
  }

  public increment() {
    this.stepperQty++;
  }

  public decrement() {
    if (this.stepperQty > 1) {
      this.stepperQty--;
    }
  }

  public addToCart() {
    if (this.stepperQty > 0 && this.product$) {
      this._cartService.addToCart(this.product$?.id, this.stepperQty);
    }
  }

  private _isValidPrice(price: number) {
    return true;
  }

  public priceDismantler(price: number): { dollar: string; cents: string } {
    if (!this._isValidPrice(price)) {
      console.error(
        `
      in: [product-detail.component.ts priceDismantler]
      price found to be invalid
      price: `,
        price
      );
    }
    const priceDismantled = price.toString().split('.');
    return {
      dollar: priceDismantled[0],
      cents: priceDismantled[1],
    };
  }

  public logRender() {
    console.log(`successfully rendered product detail component`);
  }
}
