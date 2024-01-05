// app/signup/signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user-service.service';
import { UserauthService } from 'src/app/Services/userauth.service';
import { MustMatch, NumCINValidator, NumTelValidator } from 'src/app/shared/confirmPwd';

@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm !: FormGroup;

constructor(private fb: FormBuilder,
  private userService:UserauthService,
  private router: Router){}
 
    ngOnInit() {
      this.signupForm = this.fb.group({
        username: ['', [Validators.minLength(4), Validators.maxLength(10), Validators.required]],
        numCIN: ['', [Validators.required, NumCINValidator()]], 
        numTel: ['', [Validators.required, NumTelValidator()]], 
        email: ['', [Validators.email, Validators.required]],
        password: ['', [ Validators.required]],
        confirmPwd: ['', [Validators.maxLength(20), Validators.required]],
      },
      
      {
        validators: MustMatch("password", "confirmPwd")
      },
      );
      
    }
    addUser(user: any) {
      this.userService.addLivreur(user).subscribe(
        (res) =>{
          console.log(res.message);
          
        }
      )
    }
  
 onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!');
    } else {
      console.log('Please enter valid values!');
    }
 }
}