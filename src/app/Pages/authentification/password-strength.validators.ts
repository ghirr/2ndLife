import { AbstractControl, ValidationErrors } from "@angular/forms"

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

    let value: string = control.value || '';

    if (!value) {
        return null
    }

    let upperCaseCharacters = /[A-Z]+/g
    if (upperCaseCharacters.test(value) === false) {
        return { passwordStrength: `Upper case required` };
    }

    let lowerCaseCharacters = /[a-z]+/g
    if (lowerCaseCharacters.test(value) === false) {
        return { passwordStrength: `lower case required` };
    }


    let numberCharacters = /[0-9]+/g
    if (numberCharacters.test(value) === false) {
        return { passwordStrength: `number required` };
    }

    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (specialCharacters.test(value) === false) {
        return { passwordStrength: `Special char required` };
    }
    return null;
}
export const phoneNumberValidator=function (control: AbstractControl): ValidationErrors | null {
    let phoneNumber : string = control.value || '';
    let n = /^[259]/;
    if (!phoneNumber) {
        return null
    }
   
  if (!n.test(phoneNumber)) {
    return { invalidPhoneNumber: "commence par 2, 5 ou 9" };
  }
  return null; // Validation passed
}