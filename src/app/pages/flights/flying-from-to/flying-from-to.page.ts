import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as _ from 'underscore';
import { FlightService } from 'src/app/services/flight.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-flying-from-to',
  templateUrl: './flying-from-to.page.html',
  styleUrls: ['./flying-from-to.page.scss'],
})
export class FlyingFromToPage implements OnInit {

  type: any = 'to' 
  airport = {}
  tripType: any = ''
  searchResult: any = []
  isLoading = false;
  location = ''

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private loadingCtrl: LoadingController,
    private flightSrvc: FlightService,
    private storageSrvc: StorageService) { }

  ngOnInit() {
    this.type = this.route.snapshot.queryParamMap.get('type');
    
  }

  ionViewWillEnter() {
    console.log("will enter fires in :flying")
    
    if(this.type == 'from') {
      const data: any = this.storageSrvc.getItem('FLIGHT_ORIGIN')
      if(data) {
        const savedData = JSON.parse(data)
        this.location = savedData.cityName + ' (' + savedData.cityCode + ')'
      }
    } else { // flying to
      const data: any = this.storageSrvc.getItem('FLIGHT_DESTINATION')
      if(data) {
        const savedData = JSON.parse(data)
        this.location = savedData.cityName + ' (' + savedData.cityCode + ')'
      }
    }
  }

  setLocation(airport: any) {
    this.airport = airport;

    this.showLoading()

    const params: NavigationExtras = {
      queryParams: { type: 'to'}
    }
    this.searchResult = []


    setTimeout(() => {
      const data = JSON.stringify(this.airport)
      if (this.type == 'from'){ //origin  (flying-from)

        this.storageSrvc.setItem('FLIGHT_ORIGIN', data);
        this.router.navigate(['/flying-from-to'], params);
        this.type = 'to'
        this.ionViewWillEnter()
        this.location = ''

      } else { //destination (flying-to)
        this.storageSrvc.setItem('FLIGHT_DESTINATION', data)
        this.router.navigate(['/select-dates']) 
      }

      this.airport = {}

    }, 1500);
    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...',
      duration: 1500,
    });

    loading.present();
  }

  searchAirport(e :any) {
    const value = e.detail.value
    if(value.length > 4) {
      console.log(e)
      this.isLoading = true
      this.flightSrvc.searchAirport(`airportSearch=${value}`).subscribe((res) => {
        console.log("result", res)
        const result = res.tag;

        // let arrayNew = _.map(result, )
        // let newArray = result.filter((x: any) => x.cityCode)
        let newArray = _.groupBy(result, 'cityCode')
        
        console.log("new array", newArray)
        this.searchResult = result;
        // console.log("one", this.searchResult['MNL'])
        
        // const str = JSON.stringify(this.searchResult)
        // console.log(str)

        this.isLoading = false;
      }, (err) => {
        console.log("searchAirport Error", err)
        this.isLoading = false;
        
      })
    }
  }

}
