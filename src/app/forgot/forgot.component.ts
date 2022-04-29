import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  forgotForm: any;
  userdetails: any = {};

  constructor(
    private formbuilder: FormBuilder,
    private cakeservice: CakesService
  ) {
    this.forgotForm = this.formbuilder.group({
      validate_email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  forgotpass() {
    if (this.forgotForm.valid) {
      console.log('Upon Validation : ', this.forgotForm);
      this.userdetails.email = this.forgotForm.value.validate_email;
      this.userdetails.password = this.forgotForm.value.validate_password;
      console.log('Values to pass to the forgot api', this.userdetails);
      let forgot_details = { ...this.userdetails };
      let url = 'https://apifromashu.herokuapp.com/api/recoverpassword';
      console.log('Values to pass to the forgot api', forgot_details);

      this.cakeservice.forgot(url, forgot_details).subscribe({
        next: (response: any) => {
          console.log('Response from recover password api call: ', response);
          if (response.message == 'Password Sent to your email') {
            this.cakeservice.showinfo(response.message + "Please check the details and log in again");
            this.cakeservice.redirect(['/login']);
          } else if (response.message == 'No Such Email exists') {
            this.cakeservice.showinfo('Its an unregistered email. Please checkyour email and try again. If this is the correct mail addess then no accounts with such a mail is registerd');
          } else {
            this.cakeservice.showinfo('Sorry! please signup again');
            this.cakeservice.redirect(['/signup']);
          }
        },
        error: (error: any) => {
          console.log('Error from login api', error);
          this.cakeservice.showerror('Error occured cnt complete the request');
          this.cakeservice.redirect(['/']);
          // this.cakeservice.showerror("Invalid Credentials");
          // this.cakeservice.showerror(error.error.message);
        },
      });
    } else {
      this.cakeservice.showerror('Please fill valid details');
      return;
    }
  }
}
