import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ProductAPIService,
  ProductResponse,
} from '../../../services/api/productAPI.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: ProductResponse = [];
  service: Subscription = new Subscription();

  constructor(private productsService: ProductAPIService) {}

  ngOnInit() {
    this.service = this.productsService.fetchSomeProducts().subscribe({
      next: (products) => (this.products = products),
      error: console.error,
    });
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }
}
