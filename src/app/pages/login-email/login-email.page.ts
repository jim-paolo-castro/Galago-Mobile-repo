import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {

  isLoading = false;
  email = '';
  hasError = false;

  constructor(private router: Router, private userSrvc:UserService) { }

  ngOnInit() {
    
  }

  async submitEmail() {

    this.isLoading = true;

    await this.userSrvc.verifyEmail(this.email).subscribe((res) => {
      this.isLoading = false
      console.log("verifying result:", res)
      if (res) this.router.navigate(['/login-password'], {queryParams: {email: this.email}})
      else this.router.navigate(['/email-confirmation'], {queryParams: {email: this.email}})
    }, (err) => {
      console.log(err);
      if(typeof err === "object") console.log(JSON.stringify(err))
      this.hasError = true
      this.isLoading = false
    })
   
  }

}
