import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const GP_EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@((nhs).(net)|(doctors).(org))/
const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  email: any = ''
  createAccountForm: any;
  isGpEmail: boolean = false;
  

  constructor(private userSrvc: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    
   }

  ngOnInit() {
    
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.initCreateAccountForm()
  }

  initCreateAccountForm(){
    this.createAccountForm = this.formBuilder.group({
      email: [{value: this.email, disabled: true}, Validators.required],
      firstName:[null, Validators.required],
      middleName:[null],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      countryCode: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      password: [null, Validators.compose([Validators.pattern(PASSWORD_REGEX)])],
      confirmPassword: [null],

    })
  }


  fieldErrorMessage(formGroup: any, fieldName: string) {
    let isInvalid = this.isFormFieldInvalid(formGroup, fieldName);
    let message: string;

    if (isInvalid && this.createAccountForm.get(fieldName).errors.required) {
      message = 'is required';
    } else if (isInvalid && formGroup.get(fieldName).errors.pattern) {
      message = formGroup.get(fieldName).errors.pattern.requiredPattern.toString() === (this.isGpEmail ? GP_EMAIL_REGEX.toString() : EMAIL_REGEX.toString())
        ? (this.isGpEmail ? 'should end with nhs.net or doctors.org' : 'is not valid')
        : 'is not valid';
    } else if (isInvalid && formGroup.get(fieldName).errors.minlength) {
      message = `must be at least ${formGroup.get(fieldName).errors.minlength.requiredLength} characters`;
    } else if (isInvalid && formGroup.get(fieldName).errors.notUnique) {
      message = 'is already signed-up. Use another.';
    } else if (fieldName === 'confirmPassword' && !this.isPasswordMatch() && (formGroup.get(fieldName).dirty || formGroup.get(fieldName).touched)) {
      message = 'does not match';
    } else if (isInvalid && formGroup.get(fieldName).errors.isRangeInvalid) {
      message = 'invalid range';
    } else if (isInvalid && formGroup.get(fieldName).errors.invalid) {
      message = 'is invalid'
    } else {
      message = '';
    }

    return message;
  }

  isFormFieldInvalid(formGroup: any, fieldName: any) {
    return formGroup.get(fieldName).errors && (formGroup.get(fieldName).dirty || formGroup.get(fieldName).touched);
  }


  isPasswordMatch() {
     const x = this.createAccountForm.get('confirmPassword').value === this.createAccountForm.get('password').value;
     console.log("x result", x)
     return x
  }

  submit(){
    
  }



}
