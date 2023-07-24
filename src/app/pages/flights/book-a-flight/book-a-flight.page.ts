import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment'; 
import { FlightService } from 'src/app/services/flight.service';

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
    private flightSrvc: FlightService,
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
        if(this.tripType !== 'one-way') this.router.navigate(['/select-dates'])
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
    const origin = JSON.parse(this.flyingFromStorage) 
    const destination = JSON.parse(this.flyingToStorage)

    let dateOfDeparture  = this.departureDate 
    const data = {
      
      OriginDestinationInformations: [
        {
          DepartureDateTime: moment(this.departureDate).format('YYYY/MM/DD'),
          OriginLocationCode: origin.cityCode,
          DestinationLocationCode: destination.cityCode
        }
      ],
      PassengerTypeQuantities: this.getTravelersToSubmit(),
      TravelPreferences: {
        MaxStopsQuantity: "All",
        CabinPreference: this.getPreferredClass(),
        Preferences: {
          CabinClassPreference: {
            CabinType: this.getPreferredClass(),
            PreferenceLevel: "Restricted"
          }
        },
        AirTripType: "OneWay"
      }

    }

    console.log("The data to submit:", data)

    // const details = { 
    //   departureDate: this.departureDate,
    //   passengers: this.getTravelersToSubmit(),
    //   preferredClass:
    //  }

    const navigationExtras: NavigationExtras = {
      state : data
    }

    this.router.navigateByUrl('/loader', navigationExtras)

  }

  inputsValid(){
    if (this.flyingFrom != '' && this.flyingFrom != '' && this.departureDate != '' && this.travelers != '' && this.preferredClass != '') return true
    else return false  
  }

  getTravelersToSubmit(){
    
    const savedTravelers: any = this.storageSrvc.getItem("PASSENGERS")
    const travelers = JSON.parse(savedTravelers)
    
    let arr = []
    if(travelers.ADT > 0) arr.push({ Code: "ADT", Quantity: (travelers.ADT).toString() })
    if(travelers.CHD > 0) arr.push({ Code: "CHD", Quantity: (travelers.CHD).toString() })
    if(travelers.INF > 0) arr.push({ Code: "INF", Quantity: (travelers.INF).toString() })

    return arr
  }

  getPreferredClass() {
    const preferrence: any = this.storageSrvc.getItem("CABIN_PREFERENCE")
    let value = ''
    switch (preferrence) {
      case 'economy':
        value =  "Y"
        break;
      
      case 'business':
        value =  "C"
        break;

      case 'first':
        value =  "F"
        break;

      case 'premium-economy':
        value =  "S"
        break;
    
      default:
        break;
    }

    return value

  }

}
