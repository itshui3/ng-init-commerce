import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './ui/product/product.module';
import { CartModule } from './ui/cart/cart.module';
import { HeaderNavComponent } from './home/header-nav/header-nav.component';
import { FooterInfoComponent } from './home/footer-info/footer-info.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
    CartModule,
  ],
  providers: [],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderNavComponent,
    FooterInfoComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
