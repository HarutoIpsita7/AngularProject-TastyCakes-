import { Component, OnInit } from '@angular/core';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CakesService } from '../cakes.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css'],
})
export class UploadimageComponent implements OnInit {
  imageForm: any = {};
  faImage = faImage;
  imageFile: any;;

  constructor(
    private formbuilder: FormBuilder,
    private cakeservice: CakesService
  ) {
    this.imageForm = this.formbuilder.group({
      validate_url: ['', [Validators.required]],
    });
  }

  getFile(event: any) {
    this.imageFile = event.target.files[0];
  };

  addImg() {
    if (this.imageForm.valid) {
      console.log(this.imageFile);
      var url = 'https://apifromashu.herokuapp.com/api/upload';
      let formdata = new FormData();
      formdata.append("file", this.imageFile);
      let myheaders = new HttpHeaders();
      myheaders = myheaders.append('authtoken', localStorage['token']);
      var options = {
        headers: myheaders,
      };
      this.cakeservice.uploadImage(url, formdata, options).subscribe({
        next: (response: any) => {
          console.log('Response from upload api: ', response);
          this.cakeservice.imagePath = response.imageUrl;
          this.cakeservice.getImagePath(response.imageUrl);
          console.log(this.cakeservice.imagePath)
          this.cakeservice.redirect(['/addcake/adddata'])
        },
        error: (error: any) => {
          console.log('Error from upload api: ', error);
        },
      });
    } else {
      console.log('Value of validator', this.imageForm);
      this.cakeservice.showerror('Please fill valid details');
    }
  }

  ngOnInit(): void {}
}
