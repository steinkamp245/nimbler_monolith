import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[appPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true }]
})
export class PasswordDirective implements Validator {

  constructor() { }
  validate(c: AbstractControl): { [key: string]: any; } {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#?!@+\*%^&*-]{8,30}$/i;
    if (!c.value || re.test(c.value)) {
      return null;
    } else {
      let result: string;
      if (c.value.length < 8) {
        result = 'Your password must have 8 characters';
      } else if (c.value.length > 30) {
        result = 'Your password cant have more than 30 characters';
      } else if (!(/\d/.test(c.value))) {
        result = 'Your password must contain at least 1 number';
      } else if (!re.test(c.value)) {
        result = 'Your password contains unaccceptable characters';
      }
      return { 'appPassword': { value: result } };
    }
  }
}