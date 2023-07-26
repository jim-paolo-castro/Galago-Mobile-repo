import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-passengers-input',
  templateUrl: './passengers-input.page.html',
  styleUrls: ['./passengers-input.page.scss'],
})
export class PassengersInputPage implements OnInit {

  adults = 1
  children = 0
  infants = 0
  isLoading = false
  totalPassengers = 1

  constructor(
    private router: Router,
    private storageSrvc: StorageService,
    ) { }

  ngOnInit() {
   const data = this.storageSrvc.getItem('PASSENGERS')
   if(data) {
    const parsedData = JSON.parse(data)
    this.adults = parsedData.ADT
    this.children = parsedData.CHD
    this.infants = parsedData.INF
   }
  }

  next(){
    const data = {ADT: this.adults, CHD: this.children, INF: this.infants}
    this.storageSrvc.setItem("PASSENGERS", JSON.stringify(data))
    this.router.navigate(['/preferred-class'])
  }

  decrement(type: any) {
    switch (type) {
      case 'adults':
        this.adults--
        break;
      
      case 'children':
        this.children--
        break;

      case 'infants':
        this.infants--
        break;
  
      default:
        break;
    }
    this.updateTotalPassenger()
  }

  increment(type: any) {
    switch (type) {
      case 'adults':
        this.adults++
        break;
      
      case 'children':
        this.children++
        break;

      case 'infants':
        this.infants++
        break;
  
      default:
        break;
    }

    this.updateTotalPassenger()

  }

  updateTotalPassenger(){
    this.totalPassengers = this.adults + this.children + this.infants;
    console.log("passenges", this.totalPassengers)
  }


}
