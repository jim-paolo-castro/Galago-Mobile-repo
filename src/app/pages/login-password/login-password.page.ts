import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.page.html',
  styleUrls: ['./login-password.page.scss'],
})
export class LoginPasswordPage implements OnInit {
  isLoading = false;
  password = "";
  showPassword = false;
  hasError = false;
  typeConfig = 'password'

  constructor(private router: Router) { }

  ngOnInit() {
  }

  togglePasswordShow(){
    this.showPassword =! this.showPassword
    if(this.showPassword) this.typeConfig = "text"
    else this.typeConfig = 'password'
    
    console.log(this.showPassword)
  }

  submitPassword() {
    this.isLoading = true;
    setTimeout(() => {
      console.log(this.password)
      if (this.password == 'password') this.router.navigate(['/home'])
      else {
        this.isLoading = false
        this.hasError = true
      }
    }, 3000);
  }


}
