import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ProductDataService,
  ProductData,
} from '../../../services/state/data/product-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products$: Observable<ProductData> | undefined;
  constructor(private productState: ProductDataService) {}
  ngOnInit() {
    this.products$ = this.productState.getProducts();
  }
}
