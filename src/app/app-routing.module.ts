import { NgModule, inject } from '@angular/core';

import { RouterModule, Routes, Router } from '@angular/router';
import { AuthDataService } from './ui/auth/auth-data.service';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './ui/product/product-list/product-list.component';
import { ProductDetailComponent } from './ui/product/product-detail/product-detail.component';
import { CartComponent } from './ui/cart/cart.component';
import { LoginComponent } from './ui/auth/login/login.component';

const authGuard = () => {
  const auth = inject(AuthDataService);
  const router = inject(Router);
  if (!!auth.getAuthToken()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthDataService],
})
export class AppRoutingModule {}
