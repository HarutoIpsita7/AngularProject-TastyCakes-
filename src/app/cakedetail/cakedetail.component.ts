import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CakesService } from '../cakes.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cakedetail',
  templateUrl: './cakedetail.component.html',
  styleUrls: ['./cakedetail.component.css'],
})
export class CakedetailComponent implements OnInit {
  cakeid: any;
  cake: any = {};
  isadding: any = false;
  faCartPlus = faCartPlus;

  constructor(
    private route: ActivatedRoute,
    private cakeservice: CakesService
  ) {
    this.cakeid = this.route.snapshot.params['cakeid'];

    var url = 'https:apifromashu.herokuapp.com/api/cake/' + this.cakeid;
    this.cakeservice.getCakeDetails(url).subscribe({
      next: (response: any) => {
        console.log('Response from cake details api', response);
        this.cake = response.data;
      },
      error: (error: any) => {
        console.log('Error from cake details api: ', error);
      },
    });
  }

  ngOnInit(): void {}

  addtocart() {
    if (localStorage['token']) {
      this.isadding = true;
      let myHeaders = new HttpHeaders();
      myHeaders = myHeaders.append('authtoken', localStorage['token']);
      var options = {
        headers: myHeaders,
      };
      var body = {
        cakeid: this.cake.cakeid,
        name: this.cake.name,
        price: this.cake.price,
        image: this.cake.image,
        weight: this.cake.weight,
      };
      let url = 'https://apifromashu.herokuapp.com/api/addcaketocart';
      this.cakeservice.addtocart(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from add to cart: ', response);
          if (response.message == 'Added to cart') {
            this.cakeservice.showsuccess(response.message);
            this.cakeservice.redirect(['/cart']);
          }
        },
        error: (error: any) => {
          this.cakeservice.showerror('Could not add to cart');
          console.log('Error from add to cart: ', error);
        },
      });
    } else {
      this.cakeservice.redirect(['/login']);
    }
  }
}
