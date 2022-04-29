import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private cakeservice:CakesService) {}

  ngOnInit(): void {
    if (!localStorage['token']) {
      this.cakeservice.showinfo('You must login first to place orders');
      this.cakeservice.redirect(['/login']);
    }
  }

  checkAddress() {
    console.log("Checking address", this.cakeservice.userCheckoutDetails , " and condition value", Object.keys(this.cakeservice.userCheckoutDetails)?.length);
    if (!Object.keys(this.cakeservice.userCheckoutDetails)?.length) {
      this.cakeservice.showwarning(
        'You must fill your address first then make payment'
      );
    } else {
      this.cakeservice.redirect(['/checkout/payment']);
    }
  }
}
