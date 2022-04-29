import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { timeout } from 'rxjs';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userdetails: any = {};
  users: any = [];

  signupForm: any;

  // signup() {
  //   // this.users.push(this.userdetails);
  //   // New variable is pushed to avoid overwritting of values

  //   // Updated
  //   let register_details = { ...this.userdetails }; // spread operator - takes all the userdetails keys and puts it into temp
  //   // this.users.push(register_details);

  //   // new
  //   let url = "https://apifromashu.herokuapp.com/api/register";
  //   this.http.post(url, register_details).subscribe({
  //     next: (response:any) => {
  //       console.log("Response from api call: ", response);
  //       // let register_details = { ...this.userdetails }; // spread operator - takes all the userdetails keys and puts it into temp
  //       this.users.push(register_details);
  //     },
  //     error: (error:any) => {
  //       console.log("Error from signup api",error);
  //     }
  //   });
  // }

  signup() {
    if (this.signupForm.valid) {
      console.log('Upon Validation : ', this.signupForm);
      this.userdetails.name = this.signupForm.value.validate_name;
      this.userdetails.email = this.signupForm.value.validate_email;
      this.userdetails.password = this.signupForm.value.validate_password;
      console.log('Values to pass to the signup api', this.userdetails);
      let url = 'https://apifromashu.herokuapp.com/api/register';

      this.cakeservice.signup(url, this.userdetails).subscribe({
        next: (response: any) => {
          console.log('Response from api call: ', response);
          // this.users.push(this.userdetails);
          if (response.message == 'User Registered') {
            // this.cakeservice.showsuccess(response.message);
            this.cakeservice.showsuccess(
              'We have sent you an email in your mail id please click verify on it and then you can proceed to login'
            );
            this.cakeservice.redirect(['/login']);
          } else if (response.message == 'User Already Exists') {
            this.cakeservice.showinfo(response.message);
          } else if (response.message == 'Please Provide Details') {
            this.cakeservice.showwarning(response.message);
          } else {
            this.cakeservice.showerror(response.message);
          }
        },
        error: (error: any) => {
          console.log('Error from login api', error);
          this.cakeservice.showerror('Provide Details');
        },
      });
    } else {
      this.cakeservice.showerror('Please fill valid details');
      return;
    }
  } // Using Service

  deleteUser(index: any) {
    alert(index);
  }

  constructor(
    private http: HttpClient,
    private cakeservice: CakesService,
    private formbuileder: FormBuilder
  ) {
    // Either in ngOnInit or inside the constructor:
    this.signupForm = this.formbuileder.group({
      validate_email: ['', [Validators.required, Validators.email]],
      validate_name: ['', [Validators.required]],
      validate_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
}
