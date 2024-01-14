import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator,phoneNumberValidator } from '../authentification/password-strength.validators';
import { UserauthService } from 'src/app/Services/userauth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  defaultImage = '/assets/images/avatar.png';
  hoveredImage = '/assets/images/upload.png';

  currentImage = this.defaultImage;
  user:any={};
  myForm!: FormGroup;
  errorMesage:String='';
  constructor(private fb: FormBuilder,private service:UserauthService,private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem("connectedUser") || '{}');
      // Initialize the form group with validators
      this.myForm = this.fb.group({
        // Group for the first set of inputs
        firstSet: this.fb.group({
          // You can add specific validators here
          location: ['', Validators.required],
          name: ['', Validators.required]
        }),
  
        // Group for the second set of inputs
        contactInfo: this.fb.group({
          mobileNumber: ['', [Validators.required, ,Validators.minLength(8),Validators.maxLength(8),phoneNumberValidator]], // Example pattern for a 10-digit phone number
          emailAddress: ['', [Validators.required, Validators.email]]
        }),
  
        // Group for the third set of inputs
        security: this.fb.group({
          currentPassword: ['', [Validators.minLength(6), Validators.compose([
            Validators.required, PasswordStrengthValidator])]],
          newPassword: ['', [Validators.minLength(6), Validators.compose([
            Validators.required, PasswordStrengthValidator])]], 
        })
      });
       // Use patchValue to set initial values
    this.myForm.patchValue({
      firstSet: {
        location: this.user.adresse,
        name: this.user.name
      },
      contactInfo: {
        mobileNumber: this.user.phone,
        emailAddress: this.user.email
      },
      security: {
        currentPassword: 'Password',
        newPassword: '',
      }
    });
    
  }
  

  onHover() {
    this.currentImage = this.hoveredImage;
  }

  onLeave() {
    this.currentImage = this.defaultImage;
  }
  onSubmit() {
   if(this.user.role=='user'){
   // console.log(this.myForm.value);
    if (this.myForm.get('security.currentPassword')?.valid
    &&this.myForm.get('contactInfo.emailAddress')?.valid&&this.myForm.get('contactInfo.mobileNumber')?.valid
    &&this.myForm.get('firstSet.name')?.valid&&this.myForm.get('firstSet.location')?.valid) {
      let utilisateur={
        adresse:this.myForm.get('firstSet.location')?.value,
        nom:this.myForm.get('firstSet.name')?.value,
        email:this.myForm.get('contactInfo.emailAddress')?.value,
        number:this.myForm.get('contactInfo.mobileNumber')?.value,
        password:this.myForm.get('security.currentPassword')?.value,
        newpassword:this.myForm.get('security.newPassword')?.value

      };
      
      this.service.modifierUser(this.user.email,utilisateur).subscribe((res)=>{
        if(res.message=='please verify your credentials'){
          this.errorMesage=res.message
        }
        if(res.message=='User information updated successfully'){
          this.service.logout();
          this.snackBar.open('Profile Modifier', 'ok', {
            duration: 2000
          });

        }
        else{
          console.log(res.message);
          
        }
      });
      
      
    }
    //console.log(this.myForm.value.firstSet.name);
   }
   if(this.user.role=='livreur'){
    console.log('livreur');
    
   }
  }
}
