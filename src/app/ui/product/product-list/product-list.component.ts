import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductDataService } from '../../../services/state/data/product-data.service';
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
  constructor(private productState: ProductDataService) {}
  ngOnInit() {
    this.products$ = this.productState.getProducts();
  }
}
