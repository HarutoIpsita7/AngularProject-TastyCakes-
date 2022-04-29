import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CakesService {
  loggedInUser: any;
  userCheckoutDetails: any = {};
  cartDetails: any = {};
  imagePath: any = '';
  cartQty: any;
  orderDetails: any = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  PORT = 8080;

  redirect(path: any) {
    this.router.navigate(path);
  }

  signup(url: any, body: any) {
    return this.http.post(url, body);
  }

  login(url: any, body: any) {
    return this.http.post(url, body);
  }

  forgot(url: any, body: any) {
    return this.http.post(url, body);
  }

  addtocart(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  removeonefrmcart(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  getCartItems(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  uploadImage(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  placeOrder(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  addCake(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  getCakeDetails(url: any) {
    return this.http.get(url);
  }

  searchCakes(url: any) {
    return this.http.get(url);
  }

  ascending(data: any) {
    data.sort((obj1: any, obj2: any) => {
      return obj1.price - obj2.price;
    });
    return data;
  }

  descending(data: any) {
    data.sort((obj1: any, obj2: any) => {
      return obj2.price - obj1.price;
    });
    return data;
  }

  descending_attri(data: any, property: any) {
    data.sort((obj1: any, obj2: any) => {
      return obj2[property] - obj1[property];
    });
    return data;
  }

  showsuccess(text: any) {
    this.toastr.success(text);
  }

  showerror(text: any) {
    this.toastr.error(text);
  }

  showwarning(text: any) {
    this.toastr.warning(text);
  }

  showinfo(text: any) {
    this.toastr.info(text);
  }

  getCartDatafromCartComponent(cartDetails: any) {
    this.cartDetails = cartDetails;
  }
  sendCartDetails() {
    return this.cartDetails;
  }

  getUserDataFromAddressComponent(userCheckoutDetails: any) {
    this.userCheckoutDetails = userCheckoutDetails;
    // console.log("added addr",this.userCheckoutDetails);
  }
  sendUserDetails() {
    // console.log('sending addr', this.userCheckoutDetails);
    return this.userCheckoutDetails;
  }

  getImagePath(imagePath: any) {
    this.imagePath = imagePath;
    console.log('added img', this.imagePath);
  }
  sendImagePath() {
    console.log('sending img', this.imagePath);
    return this.imagePath;
  }
}
