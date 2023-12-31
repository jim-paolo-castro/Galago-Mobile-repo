import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
// import { stringify } from 'querystring';
import { UserService } from 'src/app/services/user.service';

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
  typeConfig = 'password';
  email: any = ''

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private userSrvc:UserService,
    private storageSrvc: StorageService
    ) { }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  togglePasswordShow(){
    this.showPassword =! this.showPassword
    if(this.showPassword) this.typeConfig = "text"
    else this.typeConfig = 'password'
    
    console.log(this.showPassword)
  }

   async submitPassword() {
    
    this.isLoading = true;
    const data = { 
      email: this.email,
      password: this.password
    }
    console.log("To pass: ", data)

    await this.userSrvc.signIn(data).subscribe((res) => {
      console.log("sign-in result:", res)
      if(res.accessToken) {

        this.storageSrvc.setItem("TOKEN_KEY", `Bearer ${res.accessToken}` )
        this.router.navigate(['/home'])
      }
      this.isLoading = false
    }, (err) => {
      console.log(err);
      // if(typeof err === "object") console.log(err)
      this.hasError = true
      this.isLoading = false
    })

  }


}
