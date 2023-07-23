import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedDate: any =''
  isLoading = false
  
  constructor(
    private router: Router,
    private storageSrvc: StorageService) { }

  ngOnInit() {
    const data: any = this.storageSrvc.getItem('DEPARTURE_DATE') 
    this.selectedDate =  data ? new Date(data).toISOString() : this.dateNow; 
    this.departureDate = this.selectedDate;
  }

  dateChanged(e: any) {
    console.log(e)
    this.departureDate = e;
  }

  next() {
    this.storageSrvc.setItem('DEPARTURE_DATE', this.departureDate)
    this.router.navigate(['/passengers-input'])
  }

}
