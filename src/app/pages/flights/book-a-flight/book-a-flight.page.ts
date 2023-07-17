import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-a-flight',
  templateUrl: './book-a-flight.page.html',
  styleUrls: ['./book-a-flight.page.scss'],
})
export class BookAFlightPage implements OnInit {

  tripType = 'one-way'
  isLoading = false;
  constructor() { }

  ngOnInit() {
  }

  search() {
    this.isLoading = true;
  }

  changeTripType(type: any) {
    this.tripType = type
  }

}
