import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-book-a-flight',
  templateUrl: './book-a-flight.page.html',
  styleUrls: ['./book-a-flight.page.scss'],
})
export class BookAFlightPage implements OnInit {

  tripType = 'one-way'
  isLoading = false;
  flyingFrom = ''
  flyingTo = ''
  constructor(private router: Router) { }

  ngOnInit() {
  }

  search() {
    this.isLoading = true;
  }

  changeTripType(type: any) {
    this.tripType = type
  }

  openFromToPage(type: any) {
    let query = {}
    if (type == 'from') query = { type: type, location: this.flyingFrom, tripType: this.tripType }
    else query = { type: type, location: this.flyingTo, tripType: this.tripType }

    const params: NavigationExtras = {
      queryParams: query
    }

    this.router.navigate(['/flying-from-to'], params)
  }

}
