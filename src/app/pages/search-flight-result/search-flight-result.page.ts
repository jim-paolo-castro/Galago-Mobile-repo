import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight-result',
  templateUrl: './search-flight-result.page.html',
  styleUrls: ['./search-flight-result.page.scss'],
})
export class SearchFlightResultPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    console.log("Data from loader", routerState)

  }

}
