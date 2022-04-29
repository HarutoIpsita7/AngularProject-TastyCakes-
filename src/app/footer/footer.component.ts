import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  projecttitle: any = 'Tasty Cakes!';
  projectsubtitle: any = 'FullyVegan';
  year: any = '2021';

  ngOnInit(): void {}
}
