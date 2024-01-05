import { Component, ElementRef, Renderer2  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFacebook,faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserauthService } from 'src/app/Services/userauth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { PasswordStrengthValidator,phoneNumberValidator } from './password-strength.validators';
import { mustMatch } from './confirmPwd';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  constructor(private el: ElementRef, private renderer: Renderer2,private formBuilder: FormBuilder,private userService:UserauthService,private snackbar:MatSnackBar) { 
    this.renderer.setStyle(this.el.nativeElement, 'margin-top', '30px');
  }
  icons={
    fb:faFacebook,
    g:faGoogle
  };
  user:any={};
  loginForm !: FormGroup
  signupForm!:FormGroup
  isBlocked: boolean = false;
  errorMessage: string = '';
  ngOnInit(){
    this.signupForm = this.formBuilder.group({
      name: ["", [Validators.minLength(3), Validators.required]],
      PhoneNumber:["",[Validators.required,Validators.minLength(8),Validators.maxLength(8),phoneNumberValidator]],
      email: ["", [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.compose([
        Validators.required, PasswordStrengthValidator])]],
      copassword: [""],
      
    },
      {
        validator: mustMatch("password","copassword")
      }

    )
  }
  ngAfterViewInit() {
    const signUpButton = this.el.nativeElement.querySelector('#goSignup');
    const signInButton = this.el.nativeElement.querySelector('#signIn');
    const container = this.el.nativeElement.querySelector('#container');

    signUpButton.addEventListener('click', () => {
      this.renderer.addClass(container, 'right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      this.renderer.removeClass(container, 'right-panel-active');
    });
  }

  googleSignup() {
    this.userService.loginSuccess().subscribe((res)=>{
      this.errorMessage=res.message;
     })
    }
facebookSignup() {
  window.open("http://localhost:3000/auth/facebook", "_self");
}
login() {
 this.userService.loginUser(this.user).subscribe((res)=>{
  this.errorMessage=res.message;
 })
}
/*
  this.userService.login(this.user.email, this.user.password).subscribe(
    (response: any) => {
      if (response.success) {
        // Gérer la connexion réussie
        this.openSnackBar(response.message);
      } else {
        // Gérer l'erreur de connexion en affichant un SnackBar
        this.errorMessage = response.message;
        this.openSnackBar(response.message);
      }
    }
  );
}*/

openSnackBar(message: string) {
  this.snackbar.open(message, 'Fermer', {
    duration: 5000, // Durée pendant laquelle le SnackBar est affiché (en millisecondes)
  });
}

signupUser(user:any){
  this.userService.addUser(user).subscribe((res) => {
    this.errorMessage=res.message;
    console.log(this.errorMessage);
    
    })
    

  }

}


