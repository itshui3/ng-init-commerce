import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/services/api/productAPI.service';
import { ProductDataService } from 'src/app/services/state/data/product-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public product$: Observable<Product> | undefined;
  constructor(
    private route: ActivatedRoute,
    private productState: ProductDataService
  ) {}
  ngOnInit() {
    this.route.params
      .pipe<string>(map((p) => p['productId']))
      .subscribe((id) => (this.product$ = this.productState.getProduct(id)));
  }

  public logRender() {
    console.log(`successfully rendered product detail component`);
  }
}
