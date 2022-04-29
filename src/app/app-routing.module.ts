import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCakeComponent } from './add-cake/add-cake.component';
import { AddcakeDataComponent } from './addcake-data/addcake-data.component';
import { AddressComponent } from './address/address.component';
import { CakedetailComponent } from './cakedetail/cakedetail.component';
import { CartComponent } from './cart/cart.component';
import { CartemptyComponent } from './cartempty/cartempty.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyordersComponent } from './myorders/myorders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'addcake',
    component: AddCakeComponent,
    children: [
      { path: '', component: UploadimageComponent },
      { path: 'uploadimg', component: UploadimageComponent },
      { path: 'adddata', component: AddcakeDataComponent },
    ],
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      { path: '', component: AddressComponent },
      { path: 'address', component: AddressComponent },
      { path: 'payment', component: PaymentComponent },
    ],
  },
  { path: 'success', component: CartemptyComponent },
  { path: 'orders', component: MyordersComponent },
  { path: 'detail/:cakeid', component: CakedetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
