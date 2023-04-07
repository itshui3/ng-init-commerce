import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductDataService } from '../product-data.service';
import { ProductList } from 'src/app/services/api/productAPI.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products$: Observable<ProductList> | undefined;
  public logRender = () => {
    this.products$?.subscribe((products) =>
      console.log(
        'ProductListComponent has rendered, current products: ',
        products
      )
    );
  };
  constructor(private _productState: ProductDataService) {}
  ngOnInit() {
    this.products$ = this._productState.getProducts();
  }
}
