import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  menu = [
    {
      name:'Flights',
      icon: 'airplane',
      route: 'book-a-flight'
    },
    {
      name:'Hotels',
      icon: 'building-4',
      route: ''

    },

    {
      name:'ChatGPT',
      icon: 'building-4',
      route: ''

    },

    {
      name:'Insurance',
      icon: 'building-4',
      route: ''

    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
