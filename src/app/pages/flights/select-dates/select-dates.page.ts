import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-select-dates',
  templateUrl: './select-dates.page.html',
  styleUrls: ['./select-dates.page.scss'],
})
export class SelectDatesPage implements OnInit {

  // dateRange: { from: string; to: string; };
  // type:  // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  dateNow: String = new Date().toISOString();
  minimumDate: String = new Date().toISOString();
  departureDate: any = ''
  returnDate: any = ''
  selectedDate: any =''
  isLoading = false
  type: any = ''
  tripType:any  = ''
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageSrvc: StorageService) { }

  ngOnInit() {
    console.log("nginit fires")
    this.type = this.route.snapshot.queryParamMap.get('type');
    this.tripType = this.route.snapshot.queryParamMap.get('tripType');

    if (this.type == 'departure') {
      const departureDate: any = this.storageSrvc.getItem('DEPARTURE_DATE') 
      
      this.selectedDate =  departureDate ? departureDate : this.dateNow; 
      this.departureDate = this.selectedDate;
      this.minimumDate = this.dateNow

    } else {

      this.setNewSelectedDateforReturn();
      this.returnDate = this.selectedDate;
      console.log("return", this.returnDate)
    }
    
  }

  private setNewSelectedDateforReturn() {
    const returnDate: any = this.storageSrvc.getItem('RETURN_DATE');
    const departureDate: any = this.storageSrvc.getItem('DEPARTURE_DATE');

    if (returnDate) {
      this.selectedDate = returnDate;
      this.departureDate = returnDate;
    } else {
      if (departureDate) {
        this.selectedDate = departureDate;
        this.departureDate = returnDate;
      }
      else this.selectedDate = this.dateNow;
    }

    this.minimumDate = departureDate ? departureDate : this.dateNow;
  }

  dateChanged(e: any) {
    console.log(e)
    if (this.type == 'departure') this.departureDate = e;
    else this.returnDate = e
  }

  next() {
    if(this.type =='departure') {
      this.storageSrvc.setItem('DEPARTURE_DATE', this.departureDate);

      if(this.tripType == 'one-way') {
        this.router.navigate(['/passengers-input'])
      } else {
        this.type = 'return'
        this.setNewSelectedDateforReturn()
        this.returnDate = this.selectedDate;
      }
    }
    else {
      this.storageSrvc.setItem('RETURN_DATE', this.returnDate)
      this.router.navigate(['/passengers-input'])
    }
  }

}
