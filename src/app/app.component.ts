import { Component } from '@angular/core';
import {FormBuilder, Validator, Validators, MaxLengthValidator, FormControl,FormGroup,ValidatorFn, NgForm} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ValidatePassword';
validateform
ValidPas = []

email : string ="";
password : string = "";
confirmpass : string = "";

constructor(public formBuilder: FormBuilder ){

  this.validateform = formBuilder.group({
    email:['',Validators.email],
    password: ['',Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
   // confirmpass: ["", Validators.required, Validators.pattern] 
  });

  const confirmPassControl = new FormControl('',{
    validators:sameValueAs (this.validateform,'password')
  });
  
    this.validateform.addControl('confirmpass',confirmPassControl)
    function sameValueAs(group:FormGroup, controlName: string): ValidatorFn
    {
      return (control: FormControl) => {
        const myValue = control.value;
        const compareValue = group.controls[controlName].value
  
        return (myValue === compareValue) ? null : {valueDifferentFrom:controlName}
     };
   }
}

submit(){
   this.ValidPas.push({
    email: this.email,
    password: this.password,
    confirmpass: this.confirmpass})
 }
}
