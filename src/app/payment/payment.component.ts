import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';
import { faCheckCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  isLoggedIn: boolean = false;
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  totalprice: any;
  cakes: any = [];
  userdetails: any = {};
  orderdetails: any = {};

  constructor(private cakeservice: CakesService) {}

  placeorder() {
    var url = 'https://apifromashu.herokuapp.com/api/addcakeorder';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakes: this.cakes,
      price: this.totalprice,
      name: this.userdetails.name,
      address: this.userdetails.address,
      city: this.userdetails.city,
      pincode: this.userdetails.pincode,
      phone: this.userdetails.phone,
    };
    console.log(body);
    
    this.cakeservice.placeOrder(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from add cake order api: ', response);
        this.orderdetails = response.order;
        this.cakeservice.orderDetails = response.order;
        // console.log(this.cakeservice.orderDetails);
        // this.updatetotalprice();
        if (response.messageg == 'order placed') {
          this.cakeservice.showsuccess(response.messageg);
          this.cakeservice.cartQty = 0;
          this.cakeservice.redirect(['success']);
        } else if (response.error) {
          this.cakeservice.showwarning(response.error);
        }
      },
      error: (error: any) => {
        this.cakeservice.showerror('Order couldnot be plcaed');
        console.log('Error from add cake order api: ', error);
      },
    });
  }

  removeItem(cake: any, index: any) {
    if (localStorage['token']) {
      // this.isadding = true;
      let myHeaders = new HttpHeaders();
      myHeaders = myHeaders.append('authtoken', localStorage['token']);
      var options = {
        headers: myHeaders,
      };
      var body = {
        cakeid: cake.cakeid,
      };
      let url = 'https://apifromashu.herokuapp.com/api/removecakefromcart';
      this.cakeservice.removeonefrmcart(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from remove item from cart: ', response);
          if (response.message == 'Removed whole cake  item from cart') {
            // this.cakeservice.redirect(['/cart']);
            // window.location.reload();
            this.totalprice -= (this.cakes[index].quantity * this.cakes[index].price);
            this.cakes.splice(index, 1);
            this.cakeservice.cartQty--;
          }
        },
        error: (error: any) => {
          console.log('Error from remove item from cart: ', error);
        },
      });
    } else {
      this.cakeservice.redirect(['/login']);
    }
  }

  ngOnInit(): void {
    if (localStorage['token']) {
      this.checkAddress();
      let cartDetails = this.cakeservice.sendCartDetails();
      this.userdetails = this.cakeservice.sendUserDetails();
      console.log(cartDetails);
      console.log(this.userdetails);
      this.totalprice = cartDetails.totalprice;
      this.cakes = cartDetails.cartitems;
    } else {
      this.cakeservice.showinfo("You must login first to place orders")
      this.cakeservice.redirect(['/login']);
    }
  }

  checkAddress() {
    console.log(
      'Checking address',
      this.cakeservice.userCheckoutDetails,
      ' and condition value',
      Object.keys(this.cakeservice.userCheckoutDetails)?.length
    );
    if (!Object.keys(this.cakeservice.userCheckoutDetails)?.length) {
      this.cakeservice.showwarning(
        'You must fill your address first then make payment'
      );
      this.cakeservice.redirect(['/checkout/address']);
    } 
  }

  // ngDoCheck() {
  //   let cartDetails = this.cakeservice.sendCartDetails();
  //   this.userdetails = this.cakeservice.sendUserDetails();
  //   // console.log(cartDetails);
  //   // console.log(this.userdetails);
  //   this.totalprice = cartDetails.totalprice;
  //   this.cakes = cartDetails.cartitems;
  // };
}
