import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferred-class',
  templateUrl: './preferred-class.page.html',
  styleUrls: ['./preferred-class.page.scss'],
})
export class PreferredClassPage implements OnInit {

  selected = ''
  isLoading = false
  constructor(private router: Router) { }

  ngOnInit() {
  }

  next(){
    this.router.navigate(['/book-a-flight'])
  }

  select(type: string) {
    this.selected = type;
    console.log(this.selected)
  }

}
