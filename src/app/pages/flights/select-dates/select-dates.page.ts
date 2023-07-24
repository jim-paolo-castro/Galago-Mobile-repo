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
    this.type = this.route.snapshot.queryParamMap.get('type');
    this.tripType = this.route.snapshot.queryParamMap.get('tripType');

    if (this.type == 'departure') {
      const data: any = this.storageSrvc.getItem('DEPARTURE_DATE') 
      this.selectedDate =  data ? new Date(data).toISOString() : this.dateNow; 
      this.departureDate = this.selectedDate;
    } else {
      const data: any = this.storageSrvc.getItem('RETURN_DATE') 
      this.selectedDate =  data ? new Date(data).toISOString() : this.dateNow; 
      this.returnDate = this.selectedDate;
      console.log("return", this.returnDate)
    }
    
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
      }
      
    }
    else {
      this.storageSrvc.setItem('RETURN_DATE', this.returnDate)
      this.router.navigate(['/passengers-input'])
    }
  }

}
