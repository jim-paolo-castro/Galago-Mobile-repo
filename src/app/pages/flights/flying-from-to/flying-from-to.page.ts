import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as _ from 'underscore';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flying-from-to',
  templateUrl: './flying-from-to.page.html',
  styleUrls: ['./flying-from-to.page.scss'],
})
export class FlyingFromToPage implements OnInit {

  type: any = 'to' 
  location = ""
  tripType: any = ''
  searchResult : any
  isLoading = false

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private loadingCtrl: LoadingController,
    private flightSrvc: FlightService) { }

  ngOnInit() {
    this.type = this.route.snapshot.queryParamMap.get('type');
    this.tripType = this.route.snapshot.queryParamMap.get('tripType');
  }

  setLocation(loc: any) {
    this.location = loc;

    let query = {}
    if (this.type == 'from') {query = { type: 'to', tripType: this.tripType}}
    else query = { type: 'from', tripType: this.tripType }

    const params: NavigationExtras = {
      queryParams: query
    }

    this.showLoading()

    setTimeout(() => {
      this.router.navigate(['/flying-from-to'], params);
      console.log('set timeout works')
      this.location = ''
      if (this.type == 'from') this.type = 'to'
      else this.router.navigate(['/select-dates'])
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
      this.flightSrvc.searchAirport(`cityName=${value}`).subscribe((res) => {
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
