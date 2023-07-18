import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.page.html',
  styleUrls: ['./email-confirmation.page.scss'],
})
export class EmailConfirmationPage implements OnInit {

  email: any = 'test@gmail.com'
  constructor(private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  openEmail(){
    this.router.navigate(['/create-account'], {queryParams: {email: this.email}})
  }

}
