import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProductListComponent, ProductDetailComponent, ProductItemComponent],
  providers: [],
})
export class ProductModule {}

// in the constructor, console.log what happens
// is it getting constructed twice
