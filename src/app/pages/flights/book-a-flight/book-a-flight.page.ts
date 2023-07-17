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

  openPage(page: string) {
    switch (page) {
      case "departure-date":
        this.router.navigate(['/select-dates'])
        break;
      case "return-date":
        this.router.navigate(['/select-dates'])
        break;
      case "passengers":
        this.router.navigate(['/passengers-input'])
        break;
      case "preferred-class":
        this.router.navigate(['/preferred-class'])
        break;
        
      default:
        break;
    }
  }

  search(){
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/search-flight-result']);
      this.isLoading = false
    }, 2000);
  }

}
