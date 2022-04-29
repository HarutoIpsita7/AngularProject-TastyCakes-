// import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchitems: any = [];
  searchedFor: String = '';

  constructor(
    private route: ActivatedRoute,
    private cakeservice: CakesService
  ) {
    this.route.queryParams.subscribe((query: any) => {
      // Directly writting the function in the constructor does not work proprly so write it in this function it will get
      // let searchtext = this.route.snapshot.queryParams['q'];
      let searchtext = query['q'];
      this.searchedFor = searchtext;
      let url =
        'https://apifromashu.herokuapp.com/api/searchcakes?q=' + searchtext;

      this.cakeservice.searchCakes(url).subscribe({
        next: (response: any) => {
          console.log('Response from search cakes api: ', response);
          this.searchitems = response.data;
        },
        error: (error) => {
          console.log('Error from search cakes api: ', error);
        },
      });
    });
  }

  ngOnInit(): void {}
}
