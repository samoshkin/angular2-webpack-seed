import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

export const validateEmail = (c: FormControl) => {
  if (c.value.indexOf('@') < 0) {
    return {
      'email': {
        valid: false
      }
    };
  }
  return null;
};

@Directive({
  selector: '[validateEmail]',
  providers: [
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
  ]
})
export class EmailValidatorDirective {
}
