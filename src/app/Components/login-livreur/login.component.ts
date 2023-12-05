import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
 });

 onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!');
    } else {
      console.log('Please enter valid username and password!');
    }
 }
}