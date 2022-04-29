import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';
import { faAdd } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  faAdd = faAdd;
  userdetails: any = {};

  // addAddress() {
  //   alert('Adding Details');
  // }

  sendAddress() {
    let userCheckoutDetails = {
      name: this.userdetails.name,
      address: this.userdetails.address,
      city: this.userdetails.city,
      pincode: this.userdetails.pincode,
      phone: this.userdetails.phone,
    };
    console.log(userCheckoutDetails);
    
    this.cakeservice.getUserDataFromAddressComponent(userCheckoutDetails);

    this.cakeservice.redirect(['/checkout/payment'])
  }

  constructor(private cakeservice: CakesService) {}

  ngOnInit(): void {}
}
