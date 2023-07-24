import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(
    private router: Router,
    private flightSrvc: FlightService,
  ) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    console.log(routerState);

    this.flightSrvc.searchFlight(routerState).subscribe((res) => {
      console.log("result", res)  

      const navigationExtras: NavigationExtras = {
        state : res
      }

      this.router.navigateByUrl('/search-flight-result', navigationExtras);
    },
    (err) => {
      console.log("error", err)
    })

  }

}
