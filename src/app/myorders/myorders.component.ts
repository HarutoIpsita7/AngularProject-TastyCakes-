import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';
import { faSadTear } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  faSadTear = faSadTear;
  orderitems: any;

  constructor(private cakeservice: CakesService) {
    var url = 'https://apifromashu.herokuapp.com/api/cakeorders';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {};
    this.cakeservice.getCartItems(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from ordered items api: ', response);
        this.orderitems = response.cakeorders.reverse();
      },
      error: (error: any) => {
        console.log('Error from ordered items api: ', error);
      },
    });
  }

  ngOnInit(): void {}
}
