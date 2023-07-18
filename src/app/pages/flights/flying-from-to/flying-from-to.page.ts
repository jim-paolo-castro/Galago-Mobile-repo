import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-flying-from-to',
  templateUrl: './flying-from-to.page.html',
  styleUrls: ['./flying-from-to.page.scss'],
})
export class FlyingFromToPage implements OnInit {

  type: any = 'to' 
  location = ""
  tripType: any = ''

  constructor(private router: Router, private route: ActivatedRoute, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.type = this.route.snapshot.queryParamMap.get('type');
    this.tripType = this.route.snapshot.queryParamMap.get('tripType');
  }

  setLocation(loc: any) {
    this.location = loc;

    let query = {}
    if (this.type == 'from') {query = { type: 'to', tripType: this.tripType}}
    else query = { type: 'from', tripType: this.tripType }

    const params: NavigationExtras = {
      queryParams: query
    }

    this.showLoading()

    setTimeout(() => {
      this.router.navigate(['/flying-from-to'], params);
      console.log('set timeout works')
      this.location = ''
      if (this.type == 'from') this.type = 'to'
      else this.router.navigate(['/select-dates'])
    }, 1500);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...',
      duration: 1500,
    });

    loading.present();
  }

}
