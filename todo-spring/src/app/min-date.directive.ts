import { Directive } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import * as moment from 'node_modules/moment/moment';
@Directive({
  selector: '[appMinDate]'
})
export class MinDateDirective {

  static dateMinimum(): ValidatorFn {
    let date = Date.now()
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isAfter(validationDate) ? null : {
        'date-minimum': true
      };
    };
  }

}
