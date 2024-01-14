import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserauthService } from 'src/app/Services/userauth.service';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm !: FormGroup;
  message:any='';
  constructor(private userService:UserauthService,private fb: FormBuilder){}
  ngOnInit() {
  this.loginForm = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
 });
}

 
 loginUser(user:any){
  this.userService.loginLivreur(user).subscribe(
    (res) =>{
      this.message=res.message;
    }
  )
}
}