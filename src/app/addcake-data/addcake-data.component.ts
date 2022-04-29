import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addcake-data',
  templateUrl: './addcake-data.component.html',
  styleUrls: ['./addcake-data.component.css'],
})
export class AddcakeDataComponent implements OnInit {
  imgAddress: any = '';
  addCakeForm: any;

  constructor(
    private cakeservice: CakesService,
    private formbuilder: FormBuilder
  ) {

    this.addCakeForm = this.formbuilder.group({
      validate_name: ['', [Validators.required]],
      validate_price: ['', [Validators.required]],
      validate_description: ['', [Validators.required]],
      validate_ingredients: ['', [Validators.required]],
      validate_type: ['', [Validators.required]],
      validate_weight: ['', [Validators.required]],
      validate_eggless: ['', [Validators.required]],
    });
  }

  addCake() {
    if (this.addCakeForm.valid) {
      let url = 'https://apifromashu.herokuapp.com/api/addcake';
      // let myheaders = new HttpHeaders();
      // myheaders = myheaders.append('authtoken', localStorage['token']);
      // let options = {
      //   headers: myheaders,
      // };
      let options = {
        headers: new HttpHeaders().append('authtoken', localStorage['token']),
      };
      let body = {
        name: this.addCakeForm.value.validate_name,
        price: this.addCakeForm.value.validate_price,
        description: this.addCakeForm.value.validate_description,
        ingredients: this.addCakeForm.value.validate_ingredients,
        image: this.imgAddress,
        type: this.addCakeForm.value.validate_type,
        weight: this.addCakeForm.value.validate_weight,
        eggless: this.addCakeForm.value.validate_eggless,
      };
      this.cakeservice.addCake(url, body, options).subscribe({
        next: (response: any) => {
          console.log('Response from add cake api: ', response);
          if (response.message == "Success") {
            this.cakeservice.showsuccess('Cake added successfully');
            this.cakeservice.redirect(['/'])
          } else {
            this.cakeservice.showerror(response.errorMessage.message)
          }
        },
        error: (error) => {
          console.log('Error from add cake api: ', error);
        },
      });
    } else {
      this.cakeservice.showerror('Please fill valid details');
    }
  }

  ngOnInit(): void {
    // this.imgAddress = this.cakeservice.imagePath;
    this.imgAddress = this.cakeservice.sendImagePath();
    console.log("Img at addcake", this.imgAddress);
  }
}
