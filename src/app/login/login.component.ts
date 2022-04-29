import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loggedIn: any = false;
  loggedInUserName: any = '';
  userdetails: any = {};

  constructor(
    private http: HttpClient,
    private cakeservice: CakesService,
    private formbuilder: FormBuilder
  ) {
    this.loginForm = this.formbuilder.group({
      validate_email: ['', [Validators.required, Validators.email]],
      validate_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (localStorage['token']) {
      this.loggedIn = true;
      this.loggedInUserName = localStorage['user_name'];
    }
  }

  // login() {
  //   let login_details = { ...this.userdetails };
  //   let url = "https://apifromashu.herokuapp.com/api/login";

  //   this.http.post(url, login_details).subscribe({
  //     next: (response:any) => {
  //       console.log("Response from api call: ", response);
  //       // this.users.push(register_details);
  //     },
  //     error: (error:any) => {
  //       console.log("Error from login api",error);
  //     }
  //   });
  // }

  updateNav() {
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
        this.cakeservice.cartQty = response.data?.length;
        let totalprice: any = 0;
        response.data.forEach((each: any) => {
          totalprice = totalprice + each.price * each.quantity;
        });
        this.cakeservice.getCartDatafromCartComponent({
          cartitems: response.data,
          totalprice: totalprice,
        });
        // this.cakeservice.cartDetails = response.message.length;
      },
      error: (error: any) => {
        console.log('Error from cart items api: ', error);
      },
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Upon Validation : ', this.loginForm);
      this.userdetails.email = this.loginForm.value.validate_email;
      this.userdetails.password = this.loginForm.value.validate_password;
      console.log('Values to pass to the signup api', this.userdetails);
      let login_details = { ...this.userdetails };
      let url = 'https://apifromashu.herokuapp.com/api/login';

      this.cakeservice.login(url, login_details).subscribe({
        next: (response: any) => {
          console.log('Response from api call: ', response);
          if (response.token) {
            this.loggedIn = true;
            localStorage['token'] = response.token;
            localStorage['user_name'] = response.name;
            let text = 'Hello, ' + localStorage['user_name'];
            this.cakeservice.showsuccess(text);
            console.log(response.role);
            localStorage['role'] = 'user';
            this.cakeservice.redirect(['/']);
            localStorage['loggedInUser'] = response.email;
            this.updateNav(); // Somehow works fine without this also
          } else if (response.message == 'Invalid Credentials') {
            this.cakeservice.showerror(response.message);
          }
        },
        error: (error: any) => {
          console.log('Error from login api', error);
          // this.cakeservice.showerror("Invalid Credentials");
          this.cakeservice.showerror(error.error.message);
        },
      });
    } else {
      this.cakeservice.showerror('Please fill valid details');
      return;
    }
  } // Using Service
}
