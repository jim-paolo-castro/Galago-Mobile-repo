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
  returnDate : any= ''
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
    const prefferedClass = this.storageSrvc.getItem("CABIN_PREFERENCE");
    const passengers = this.storageSrvc.getItem("PASSENGERS");

    this.setDefaultValue(prefferedClass, passengers);
  }

  private setDefaultValue(prefferedClass: string | null, passengers: string | null) {
    if (!prefferedClass) this.storageSrvc.setItem("CABIN_PREFERENCE", 'economy');
    if (!passengers) {
      const data = { ADT: 1, CHD: 0, INF: 0 };
      this.storageSrvc.setItem("PASSENGERS", JSON.stringify(data));
    }
  }

  ionViewWillEnter(){ //look for saved data in localStorage
    console.log("viewwillenter")
    const keys = ['FLIGHT_ORIGIN', 'FLIGHT_DESTINATION', 'DEPARTURE_DATE', 'RETURN_DATE', 'PASSENGERS', 'CABIN_PREFERENCE', "TRIP_TYPE"]
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      const item = this.storageSrvc.getItem(element)
      if (item !== null) {
        let data:any;
        if(element !== 'CABIN_PREFERENCE' && element !=='DEPARTURE_DATE' && element !=='RETURN_DATE' && element !=='TRIP_TYPE') data = JSON.parse(item)
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

          case 'RETURN_DATE':
            this.returnDate = moment(data).format('MMM DD, YYYY')
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

          case 'TRIP_TYPE':
              this.tripType = data
              break;

          default:
            break;
        }
        
      }
    }
  }

  changeTripType(type: any) {
    this.tripType = type
    this.storageSrvc.setItem("TRIP_TYPE", type)
    if(type === 'one-way') {
      this.returnDate = ''
      this.storageSrvc.removeItem("RETURN_DATE")
    } 
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
        this.router.navigate(['/select-dates'], { queryParams: { type: 'departure', tripType: this.tripType}})
        break;
      case "return-date":
        if(this.tripType !== 'one-way') this.router.navigate(['/select-dates'],  { queryParams: { type: 'return', tripType: this.tripType}})
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

    // this.isLoading = true;
    const origin: any = JSON.parse(this.flyingFromStorage) 
    const destination: any = JSON.parse(this.flyingToStorage)

    // let dateOfDeparture  = this.departureDate 
    
    const data = {
      
      OriginDestinationInformations: this.getOriginDestinationInfo(origin, destination),
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
        AirTripType: this.tripType == 'one-way' ? 'OneWay' : 'Circle'
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

  getOriginDestinationInfo(origin: any, destination: any){
    let OriginDestinationInformations = [{
      DepartureDateTime: moment(this.departureDate).format('YYYY/MM/DD'),
      OriginLocationCode: origin.cityCode,
      DestinationLocationCode: destination.cityCode
    }]

    if(this.tripType ==='round-trip') OriginDestinationInformations.push({
      DepartureDateTime: moment(this.returnDate).format('YYYY/MM/DD'),
      OriginLocationCode: destination.cityCode,
      DestinationLocationCode: origin.cityCode
    })

    return OriginDestinationInformations
  }

}
