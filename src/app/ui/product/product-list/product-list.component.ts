import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProductAPIService,
  ProductResponse,
} from '../../../services/api/productAPI.service';
import { ProductDataService } from '../../../services/state/data/product-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products$: Observable<ProductResponse> | undefined;
  constructor(private productState: ProductDataService) {}
  ngOnInit() {
    this.products$ = this.productState.getProducts();
  }
}
