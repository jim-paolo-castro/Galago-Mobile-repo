import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-preferred-class',
  templateUrl: './preferred-class.page.html',
  styleUrls: ['./preferred-class.page.scss'],
})
export class PreferredClassPage implements OnInit {

  selected = ''
  isLoading = false
  constructor(
    private router: Router,
    private storageSrvc: StorageService
    ) { }

  ngOnInit() {
    const data = this.storageSrvc.getItem('CABIN_PREFERENCE')
    if(data) this.selected = data;
  }

  next(){
    this.storageSrvc.setItem("CABIN_PREFERENCE", this.selected)
    this.router.navigate(['/book-a-flight'])
  }

  select(type: string) {
    this.selected = type;
    console.log(this.selected)
  }

}
