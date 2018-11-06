import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[appEqualPasswords]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualPasswordsDirective, multi: true }]
})
export class EqualPasswordsDirective implements Validator {

  constructor() { }

  validate(c: AbstractControl): { [key: string]: any; } {
    if (!c.value || (c.value.password === c.value.passwordCheck)) {
      return null;
    } else {
      return { 'appEqualPasswords': { value: c.value } };
    }
  }
}
