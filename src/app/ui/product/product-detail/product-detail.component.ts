import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/services/api/productAPI.service';
import { ProductDataService } from 'src/app/ui/product/product-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public product$: Observable<Product> | undefined;
  constructor(
    private _route: ActivatedRoute,
    private _productState: ProductDataService
  ) {}
  ngOnInit() {
    this._route.params
      .pipe<string>(map((p) => p['productId']))
      .subscribe((id) => (this.product$ = this._productState.getProduct(id)));
  }

  public logRender() {
    console.log(`successfully rendered product detail component`);
  }
}
