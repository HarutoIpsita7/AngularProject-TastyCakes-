import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-cartempty',
  templateUrl: './cartempty.component.html',
  styleUrls: ['./cartempty.component.css'],
})
export class CartemptyComponent implements OnInit {
  order: any = {};

  constructor(private cakeservice: CakesService) {}

  ngOnInit(): void {
    if (!Object.keys(this.cakeservice.orderDetails)?.length) {
      this.cakeservice.redirect(['/']);
    } else {
      this.order = this.cakeservice.orderDetails;
    }
  }

  // removeOrderdetails = () => {
  //   this.cakeservice.orderDetails = '';
  // };
}
