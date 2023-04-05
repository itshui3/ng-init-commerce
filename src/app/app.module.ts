import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './ui/product/product.module';
import { HeaderNavComponent } from './home/header-nav/header-nav.component';
import { FooterInfoComponent } from './home/footer-info/footer-info.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ProductModule],
  providers: [],
  declarations: [AppComponent, HomeComponent, HeaderNavComponent, FooterInfoComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
