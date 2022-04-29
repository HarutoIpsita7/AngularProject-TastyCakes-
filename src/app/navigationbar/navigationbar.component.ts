import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CakesService } from '../cakes.service';
import {
  faSearch,
  faCartPlus,
  faSignIn,
  faSignOut,
  faShoppingBag,
  faCake,
} from '@fortawesome/free-solid-svg-icons';
import { HttpHeaders } from '@angular/common/http';

// If written in @Component decorator a separate instance of Services is provided
// providers: [CakesService],   // Separate Instance of CakeService is provided

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
  
})
export class NavigationbarComponent implements OnInit {
  faSearch = faSearch;
  faCartPlus = faCartPlus;
  faSignIn = faSignIn;
  faSignOut = faSignOut;
  faShoppingBag = faShoppingBag;
  faCake = faCake;

  projecttitle: any = 'Tasty Cakes!';
  projectsubtitle: any = 'FullyVegan';
  
  adminUsers: any = ['haruto.ipsita7@gmail.com'];
  loggedInUser: any;
  ngOnInit(): void {}
  isAdmin: any = false;
  isLoggedIn: any;
  searchtext: any;
  lengthCart: any;
  totalprice: any;

  constructor(private cakeservices: CakesService, private router: Router) {
    this.isLoggedIn = localStorage['token'] ? true : false;
    // If the local storage in the browser is having the tokenit is true else false
    if (this.isLoggedIn) {
      var url = 'https://apifromashu.herokuapp.com/api/cakecart';
      let myheaders = new HttpHeaders();
      myheaders = myheaders.append('authtoken', localStorage['token']);
      var options = {
        headers: myheaders,
      };
      var body = {};
      this.cakeservices.getCartItems(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from cart items api: ', response);
          this.cakeservices.cartQty = response.data?.length;
          response.data.forEach((each: any) => {
            this.totalprice = this.totalprice + each.price * each.quantity;
          });
          this.cakeservices.getCartDatafromCartComponent({
            cartitems: response.data,
            totalprice: this.totalprice,
          });
        },
        error: (error: any) => {
          console.log('Error from cart items api: ', error);
        },
      });
    }
  }

  ngDoCheck() {
    if (localStorage['token']) {
      this.isLoggedIn = true;
      if (this.adminUsers.includes(localStorage['loggedInUser'])) {
        this.isAdmin = true;
        localStorage['role'] = 'admin';
      }
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
    this.lengthCart = this.cakeservices.cartQty;
  }

  logout() {
    this.cakeservices.showwarning('Successfully Logged Out');
    localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  search() {
    if (this.searchtext) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchtext },
      });
    }
    
  }
}

// alert(this.cakeservices.PORT);
// alert("Hello this option is not yet available!");