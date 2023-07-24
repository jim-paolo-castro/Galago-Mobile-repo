import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const GP_EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@((nhs).(net)|(doctors).(org))/
const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
const MOBILE_REGEX = /^[1-9][0-9]{9}$/

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  email: any = ''
  createAccountForm: any;
  isGpEmail: boolean = false;
  isLoading = false
  showPassword = false;
  showConfirmPassword = false;
  typeConfig = 'password';
  typeConfigConfirm = 'password';
  validDate = true


  constructor(
    private userSrvc: UserService,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router,
    private storageSrvc: StorageService
    ) {
    
   }

  ngOnInit() {
    
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.initCreateAccountForm()
  }

  togglePasswordShow(){
    this.showPassword =! this.showPassword
    if(this.showPassword) this.typeConfig = "text"
    else this.typeConfig = 'password'
  }

  toggleConfirmPasswordShow(){
    this.showConfirmPassword =! this.showConfirmPassword
    if(this.showConfirmPassword) this.typeConfigConfirm = "text"
    else this.typeConfigConfirm = 'password'
  }


  initCreateAccountForm(){
    this.createAccountForm = this.formBuilder.group({
      email: [{value: this.email, disabled: true}, Validators.required],
      firstName:[null, Validators.required],
      middleName:[null],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      countryCode: [null],
      number: [null, Validators.compose([Validators.pattern(MOBILE_REGEX)])],
      password: [null, Validators.compose([Validators.pattern(PASSWORD_REGEX), Validators.required])],
      confirmPassword: [null, Validators.required],

    })
  }


  // fieldErrorMessage(formGroup: any, fieldName: string) {
  //   let isInvalid = this.isFormFieldInvalid(formGroup, fieldName);
  //   let message: string;

  //   if (isInvalid && this.createAccountForm.get(fieldName).errors.required) {
  //     message = 'is required';
  //   } else if (isInvalid && formGroup.get(fieldName).errors.pattern) {
  //     message = formGroup.get(fieldName).errors.pattern.requiredPattern.toString() === (this.isGpEmail ? GP_EMAIL_REGEX.toString() : EMAIL_REGEX.toString())
  //       ? (this.isGpEmail ? 'should end with nhs.net or doctors.org' : 'is not valid')
  //       : 'is not valid';
  //   } else if (isInvalid && formGroup.get(fieldName).errors.minlength) {
  //     message = `must be at least ${formGroup.get(fieldName).errors.minlength.requiredLength} characters`;
  //   } else if (isInvalid && formGroup.get(fieldName).errors.notUnique) {
  //     message = 'is already signed-up. Use another.';
  //   } else if (fieldName === 'confirmPassword' && !this.isPasswordMatch() && (formGroup.get(fieldName).dirty || formGroup.get(fieldName).touched)) {
  //     message = 'does not match';
  //   } else if (isInvalid && formGroup.get(fieldName).errors.isRangeInvalid) {
  //     message = 'invalid range';
  //   } else if (isInvalid && formGroup.get(fieldName).errors.invalid) {
  //     message = 'is invalid'
  //   } else {
  //     message = '';
  //   }

  //   return message;
  // }

  isFormFieldInvalid(formGroup: any, fieldName: any) {
    return formGroup.get(fieldName).errors && (formGroup.get(fieldName).dirty || formGroup.get(fieldName).touched);
  }


  isPasswordMatch() {
     const x = (this.createAccountForm.get('confirmPassword').value === this.createAccountForm.get('password').value) && this.createAccountForm.get('confirmPassword').touched;
     return x
  }

  async submit(){

    this.isLoading = true
    let data = this.createAccountForm.value

    console.log(data)
    data = Object.assign({email: this.email, mobileNumber: data.countryCode + data.number}, data)
    console.log("appended data", data)
    await this.userSrvc.createAccount(data).subscribe((res) => {
      this.isLoading = false
      console.log("resposne", res)
      
      if(res.accessToken) {
        this.storageSrvc.setItem("TOKEN_KEY", `Bearer ${res.accessToken}`)
        this.router.navigate(['/home'])
      } 

    }, (err) => {
      this.isLoading = false;
      console.log("backend error", err)
    })
  }


  calculateAgeValidity(e:any) { // birthday is a date
    console.log(e)
    const birthday: any = new Date(e.detail.value)
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    console.log("agedate", ageDate)

    const result = Math.abs(ageDate.getUTCFullYear() - 1970);
    console.log("result", result)
    if(result < 18) {
      this.validDate = false
      return false
    }  else  this.validDate = true; return true

  }

}
