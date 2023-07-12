import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {

  isLoading = false;
  email = '';
  hasError = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submitEmail() {
    this.isLoading = true;
    setTimeout(() => {
      console.log(this.email)
      if (this.email == 'test@gmail.com') this.router.navigate(['/login-password'])
      else {
        this.isLoading = false
        this.hasError = true
      }
    }, 3000);
  }

}
