import { Component, OnInit } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-add-cake',
  templateUrl: './add-cake.component.html',
  styleUrls: ['./add-cake.component.css'],
})
export class AddCakeComponent implements OnInit {
  faLongArrowAltRight = faLongArrowAltRight;

  constructor(private cakeservice: CakesService) {}

  ngOnInit(): void {
    if (localStorage['role'] != 'admin') {
      this.cakeservice.redirect(['/']);
    }
  }

  checkImgUplaod() {
    console.log('Checking image upload', this.cakeservice.imagePath);
    if (this.cakeservice.imagePath == '') {
      this.cakeservice.showwarning(
        'You must upload the image of the cake first before adding any details to it'
      );
    } else {
      this.cakeservice.redirect(['/addcake/adddata']);
    }
  }
}
