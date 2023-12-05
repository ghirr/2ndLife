import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-pwd',
  templateUrl: './recover-pwd.component.html',
  styleUrls: ['./recover-pwd.component.css']
})
export class RecoverPWDComponent {
  title = 'Recover Password';

 resetForm: FormGroup;

 constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
 }

 onSubmit() {
    if (this.resetForm.valid) {
      console.log('Form submitted with', this.resetForm.value);
    } else {
      console.log('Form is invalid', this.resetForm.errors);
    }
 }

 onCancel() {
    console.log('Form canceled');
 }

}
