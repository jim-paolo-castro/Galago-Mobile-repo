import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-search-flight-result',
  templateUrl: './search-flight-result.page.html',
  styleUrls: ['./search-flight-result.page.scss'],
})
export class SearchFlightResultPage implements OnInit {

  departureDate: any = ''
  passengers = 0
  preferredClass: any = ''
  origin: any = {}
  destination: any = {}

  results:any = ['one', 'two', "ad", "asd", "ad", "adasd", "asd"]
  constructor(
    private router: Router,
    private storageSrvc: StorageService
  ) { }

  ngOnInit() {
    const routerState:any = this.router.getCurrentNavigation()?.extras.state;
    console.log("Data from loader", routerState)
    this.results = routerState.Data;
    this.departureDate = this.storageSrvc.getItem("DEPARTURE_DATE")

    const x: any = this.storageSrvc.getItem("PASSENGERS")
    let person = JSON.parse(x)
    for (const key in person) {
        if(person[key] > 0) this.passengers += person[key]
    }
    console.log("number of passengers:", this.passengers)

    this.preferredClass = this.storageSrvc.getItem("CABIN_PREFERENCE")

    const origin: any = this.storageSrvc.getItem("FLIGHT_ORIGIN")
    this.origin = JSON.parse(origin)

    const destination: any = this.storageSrvc.getItem("FLIGHT_DESTINATION")
    this.destination = JSON.parse(destination)

  }


  transformMinute(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    let min = minutes > 0 ? minutes + ' mins' : ''
    let hr = hours > 0 ? this.getHour(hours, minutes) : '' 
    return hr + ' ' + min;
  }

  getHour(hours: any, minutes: any) {
    let dataHour = ''
    if(hours > 1 && minutes == 0) dataHour = hours + ' hours'
    else if(hours > 1 && minutes > 0) dataHour = hours + ' hrs'
    else if(hours < 2 && minutes == 0) dataHour = hours + ' hour'
    return dataHour
  }

  goBackToBookPage() {
    this.router.navigate(['/book-a-flight'])
  }
}
