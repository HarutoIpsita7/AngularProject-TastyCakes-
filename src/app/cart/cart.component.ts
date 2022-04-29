import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';
import { faMinusCircle, faPlus, faMinus, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: any = [];
  totalprice: any = 0;
  faMinusCircle = faMinusCircle;
  faPlus = faPlus;
  faMinus = faMinus;
  faArrowRightLong = faArrowRightLong;
  loggedIn: any = false;

  constructor(private cakeservice: CakesService, private router: Router) {
    var url = 'https://apifromashu.herokuapp.com/api/cakecart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {};
    this.cakeservice.getCartItems(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from cart items api: ', response);
        this.cartitems = response.data;
        this.cakeservice.cartQty = response.data.length;
        // this.updatetotalprice();
        this.cartitems.forEach((each: any) => {
          this.totalprice = this.totalprice + each.price * each.quantity;
        });
      },
      error: (error: any) => {
        console.log('Error from cart items api: ', error);
      },
    });
  }
  
  sendCartdata() {
    let cartDetails: any = {
      cartitems: this.cartitems,
      totalprice: this.totalprice,
    };
    this.cakeservice.getCartDatafromCartComponent(cartDetails);
  }

  increaseQty(cake: any, index: any) {
    console.log(cake);
    if (localStorage['token']) {
      // this.isadding = true;
      let myHeaders = new HttpHeaders();
      myHeaders = myHeaders.append('authtoken', localStorage['token']);
      var options = {
        headers: myHeaders,
      };
      var body = {
        cakeid: cake.cakeid,
        name: cake.name,
        price: cake.price,
        image: cake.image,
        weight: cake.weight,
      };
      let url = 'https://apifromashu.herokuapp.com/api/addcaketocart';
      this.cakeservice.addtocart(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from inc qty add to cart: ', response);
          if (response.data) {
            this.cartitems[index].quantity += 1;
            this.updatetotalprice();
            // window.location.reload();
            // this.router.navigate(['/cart']).then(() => {
            // window.location.reload();
            // });
          }
        },
        error: (error: any) => {
          console.log('Error from inc qty add to cart: ', error);
        },
      });
    } else {
      this.cakeservice.redirect(['/login']);
    }
  }

  decreaseQty(cake: any, index: any) {
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
      let url = 'https://apifromashu.herokuapp.com/api/removeonecakefromcart';
      this.cakeservice.removeonefrmcart(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from dec qty of item cart: ', response);
          if (response.message) {
            this.cartitems[index].quantity -= 1;
            this.updatetotalprice();
            // if (this.cartitems[index].quantity) {
              // this.updatetotalprice();
            // } else {
            //   window.location.reload();
            // }
            // window.location.reload();
            // this.cakeservice.redirect(['/cart']);
          }
        },
        error: (error: any) => {
          console.log('Error from dec qty of item cart: ', error);
        },
      });
    } else {
      this.cakeservice.redirect(['/login']);
    }
  }

  removeItem(cake: any, index:any) {
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
            this.cartitems.splice(index, 1);
            this.cakeservice.cartQty--;
            this.updatetotalprice();
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

  updatetotalprice() {
    this.totalprice = 0;
    for (const iterator of this.cartitems) {
      this.totalprice += iterator.price * iterator.quantity;
    }
  }

  ngOnInit(): void {
    if (localStorage['token']) {
      this.loggedIn = true;
    }
  }
}
