import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment'; 

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
  departureDate : any= ''
  travelers = ''
  preferredClass = ''
  flyingFromStorage = ''
  flyingToStorage = ''

  constructor(
    private router: Router,
    private storageSrvc: StorageService) { }

  ngOnInit() {
    console.log("ngOninit fires!!!!")
  }

  ionViewWillEnter(){ //look for saved data in localStorage
    const keys = ['FLIGHT_ORIGIN', 'FLIGHT_DESTINATION', 'DEPARTURE_DATE', 'PASSENGERS', 'CABIN_PREFERENCE']
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      const item = this.storageSrvc.getItem(element)
      if (item !== null) {
        let data:any;
        if(element !== 'CABIN_PREFERENCE' && element !=='DEPARTURE_DATE') data = JSON.parse(item)
        else data = item

        switch (element) {
          case 'FLIGHT_ORIGIN':
            this.flyingFromStorage = item
            this.flyingFrom = data.cityName + ' (' + data.cityCode + ')'
            break;
          case 'FLIGHT_DESTINATION':
            this.flyingToStorage = item
            this.flyingTo = data.cityName + ' (' + data.cityCode + ')'
            break;
          case 'DEPARTURE_DATE':
            this.departureDate = moment(data).format('MMM DD, YYYY')
            break;
          case 'PASSENGERS':

            let str = data.ADT +  ' Adult'
            if(data.CHD > 0) str += ', ' + data.CHD + ' Child'
            if(data.INF > 0) str += ', ' + data.INF + ' Infant'

            this.travelers = str
            break;
          case 'CABIN_PREFERENCE':
              this.preferredClass = data
              break;

          default:
            break;
        }
        
      }
    }
  }

  changeTripType(type: any) {
    this.tripType = type
  }

  changeFromToLocation(){
    let to = this.flyingTo
    let from = this.flyingFrom

    this.flyingFrom = to
    this.flyingTo = from

    this.storageSrvc.setItem('FLIGHT_ORIGIN', this.flyingToStorage)
    this.storageSrvc.setItem('FLIGHT_DESTINATION', this.flyingFromStorage)

    let toStorage = this.flyingToStorage
    let fromStorage = this.flyingFromStorage

    this.flyingFromStorage = toStorage
    this.flyingToStorage = fromStorage

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

  inputsValid(){
    if (this.flyingFrom != '' && this.flyingFrom != '' && this.departureDate != '' && this.travelers != '' && this.preferredClass != '') return true
    else return false  
  }

}
