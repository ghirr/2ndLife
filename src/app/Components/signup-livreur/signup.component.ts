// app/signup/signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user-service.service';
import { MustMatch, NumCINValidator, NumTelValidator } from 'src/app/shared/confirmPwd';

@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm !: FormGroup;

constructor(private fb: FormBuilder,
  private userService: UserService,
  private router: Router){}
 
    ngOnInit() {
      this.signupForm = this.fb.group({
        username: ['', [Validators.minLength(4), Validators.maxLength(10), Validators.required]],
        numCIN: ['', [Validators.required, NumCINValidator()]], 
        numTel: ['', [Validators.required, NumTelValidator()]], 
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(20), Validators.required]],
        confirmPwd: ['', [Validators.maxLength(20), Validators.required]],
      },
      
      {
        validators: MustMatch("password", "confirmPwd")
      },
      );
      
    }
    addUser(user: any) {
      this.userService.addUser(user).subscribe(
        () =>{
          this.router.navigate(['']);
        }
      )
    }
  
   /* addUser(user: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      this.userService.addUser(user).subscribe(
        () => {
          this.router.navigate(['admin']);
        }
      );
    }
    
   signup(user) {
    this.addUser(user);
  }*/
 onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!');
    } else {
      console.log('Please enter valid values!');
    }
 }
}