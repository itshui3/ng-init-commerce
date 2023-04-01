import { Component } from '@angular/core';
import {
  ProductdataService,
  ProductResponse,
} from '../../../services/productdata.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  private products: ProductResponse = [];

  constructor(private productsService: ProductdataService) {}

  ngOnInit() {
    this.productsService.fetchSomeProducts().subscribe((products) => {
      this.products = products;
      console.log('fetched products', products);
    });
  }
}
