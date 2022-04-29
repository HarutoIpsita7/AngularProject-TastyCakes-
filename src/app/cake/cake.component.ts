import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  // @Input() name: any
  // @Input() price: any
  // @Input() image: any
  // @Input() description: any
  // Combination
  @Input() cakedata : any

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showCakeDetails() {
    this.router.navigate(['/detail',this.cakedata.cakeid])
  }

}
