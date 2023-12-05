import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

// Validator pour numCIN
export function NumCINValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const numCIN = control.value;
  
      // Vérifie si numCIN est composé de 8 chiffres
      const isEightDigits = /^\d{8}$/.test(numCIN);
  
      // Vérifie si le premier chiffre est 0 ou 1
      const isFirstDigitValid = /^[01]/.test(numCIN);
  
      if (isEightDigits && isFirstDigitValid) {
        return null; // Valide
      } else {
        return { numCIN: true }; // Invalide
      }
    };
  }

  // Validator pour numTel
export function NumTelValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const numTel = control.value;
  
      // Vérifie si numTel est composé de 8 chiffres
      const isEightDigits = /^\d{8}$/.test(numTel);
  
      // Vérifie si le premier chiffre est 2, 4, 5 ou 9
      const isFirstDigitValid = /^[2459]/.test(numTel.charAt(0));
  
      if (isEightDigits && isFirstDigitValid) {
        return null; // Valide
      } else {
        return { numTel: true }; // Invalide
      }
    };
  }