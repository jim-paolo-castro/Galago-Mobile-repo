import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-dates',
  templateUrl: './select-dates.page.html',
  styleUrls: ['./select-dates.page.scss'],
})
export class SelectDatesPage implements OnInit {

  // dateRange: { from: string; to: string; };
  // type:  // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  dateNow: String = new Date().toISOString();
  departureDate = ''
  isLoading = false
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  dateChanged(e: any) {
    console.log(e)
    this.departureDate = e;
  }

  next() {
    this.router.navigate(['/passengers-input'])
  }

}
