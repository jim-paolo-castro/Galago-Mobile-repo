import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passengers-input',
  templateUrl: './passengers-input.page.html',
  styleUrls: ['./passengers-input.page.scss'],
})
export class PassengersInputPage implements OnInit {

  adults = 1
  children = 1
  infants = 1
  isLoading = false

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next(){
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
  }

}
