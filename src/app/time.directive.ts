import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTimeMask]',
})
export class TimeDirective {

  lastValue: string = '';

  constructor(public ngControl: NgControl) {

  }

  // @HostListener('change', ['$event'])
  // onModelChange(event) {
  //   this.onInputChange(event, false);
  // }

  @HostListener('keyup', ['$event'])
  keyup(event) {
    if (event.target.value.length < this.lastValue.length) {
      // Text was removed, do nothing and let the user remove text
      // via Backspace, Delete, Cut, Select and type, etc.
      this.lastValue = event.target.value;
      return;
    }
    this.onInputChange(event.target.value);
  }

  onInputChange(event) {

    let newVal: string = event.replace(/\D/g, '');

    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length === 1) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1');
    } else if (newVal.length === 2) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1:');
    } else if (newVal.length === 3) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
    } else if (newVal.length === 4) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2:');
    } else if (newVal.length === 5) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,2})/, '$1:$2:$3');
    } else if (newVal.length === 6) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,2})/, '$1:$2:$3.');
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,3})/, '$1:$2:$3.$4');
    } else {
      newVal = newVal.substring(0, 9).replace(/^(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,3})/, '$1:$2:$3.$4');
    }

    this.ngControl.valueAccessor.writeValue(newVal);
    this.lastValue = newVal;
  }
}
