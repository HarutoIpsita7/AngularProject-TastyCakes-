import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ngx-toaster
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ngx-ui-loader
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

import { LoginComponent } from './login/login.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CakeComponent } from './cake/cake.component';
import { SignupComponent } from './signup/signup.component';
import { CakelistComponent } from './cakelist/cakelist.component';
import { HomeComponent } from './home/home.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SearchComponent } from './search/search.component';
import { AddCakeComponent } from './add-cake/add-cake.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CakedetailComponent } from './cakedetail/cakedetail.component';
import { CartComponent } from './cart/cart.component';
import { HighlightDirective } from './highlight.directive';
import { DiscountPipe } from './discount.pipe';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyordersComponent } from './myorders/myorders.component';
import { CartemptyComponent } from './cartempty/cartempty.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { AddcakeDataComponent } from './addcake-data/addcake-data.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationbarComponent,
    CarouselComponent,
    CakeComponent,
    SignupComponent,
    CakelistComponent,
    HomeComponent,
    ForgotComponent,
    SearchComponent,
    AddCakeComponent,
    PageNotFoundComponent,
    CakedetailComponent,
    CartComponent,
    HighlightDirective,
    DiscountPipe,
    CheckoutComponent,
    AddressComponent,
    PaymentComponent,
    MyordersComponent,
    CartemptyComponent,
    UploadimageComponent,
    AddcakeDataComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
