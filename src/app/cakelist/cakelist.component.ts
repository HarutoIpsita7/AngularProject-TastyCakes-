import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css'],
})
export class CakelistComponent implements OnInit {
  constructor(
    private cakeservices: CakesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    let url = 'https://apifromashu.herokuapp.com/api/allcakes';
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Response from api call: ', response);
        this.cakes = response.data;
      },
      error: (error: any) => {
        console.log('Error from all cakes api', error);
      },
    });
  }

  cakes: any = [];

  ascending_price() {
    this.cakes = this.cakeservices.ascending(this.cakes);
    this.cakeservices.showsuccess('Sorted in ascending order');
  }

  descending_price() {
    this.cakes = this.cakeservices.descending(this.cakes);
    this.cakeservices.showsuccess('Sorted in descending order');
  }

  ngOnInit(): void {}
  
}


// cakes: any = [
  //   {
  //     image: "assets/cherryberrycupcake.jpg",
  //     name: "Cherryberry Cup Cake",
  //     price: 75,
  //     description: "Cupcake with Strawberry flavoured Icing and Cherry Toping",
  //     offer: "-10%",
  //     offerprice: "Rs 67.5",
  //     bestseller: true
  //   },
  //   {
  //     image: "assets/fairycakehouse.jpg",
  //     name: "Fairy Tower Cake",
  //     price: 3000,
  //     description:"Vanila cake tower for Birthdays beautifully decorated with 5 fairies",
  //     offer: "",
  //     offerprice: "",
  //     bestseller: false
  //   },
  //   {
  //     image:"assets/cupcaketree.jpg",
  //     name: "Cup Cake Tree Cake",
  //     price: 5000,
  //     description:"Celebration cake made up of vanila cup cake decorated like christmass tree",
  //     offer: "-10%",
  //     offerprice: "Rs 4500",
  //     bestseller: false
  //   },
  //   {
  //     image:"assets/orange-strawberry-chocolate-pastry.jpg",
  //     name: "Tri-Pastry",
  //     price: 360,
  //     description:"Tri person pack of 3 pastries i.e., chocolate, orange and strawberry flavour",
  //     offer: "",
  //     offerprice: "",
  //     bestseller: true
  //   }
  // ]

  // showsuccess(text:any) {
  //   this.toastr.success("Successfully "+text)
  // }

  // descending_ratings() {
  //   console.log(this.cakes);
  //   this.cakes = this.cakeservices.descending_attri(this.cakes, 'ratings');
  //   this.cakeservices.showsuccess('Sorted in descending order of ratings');
  // }

  // changeport() {
  //   this.cakeservices.PORT = 4200;
  // }

  // viewport() {
  //   alert(this.cakeservices.PORT);
  // }

// ascending_name() { this.cakes.sort();}