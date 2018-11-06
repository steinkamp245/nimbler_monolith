import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true }]
})
export class EmailDirective implements Validator {
  constructor() { }
  validate(c: AbstractControl): { [key: string]: any; } {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!c.value || re.test(c.value)) {
      return null;
    } else {
      return { 'appEmail': { value: c.value } };
    }
  }
}
