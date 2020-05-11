import { AbstractControl, ValidationErrors } from '@angular/forms'

export class FilemanValidators
{
    static doesNotContainSpace (control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string).indexOf(' ') > -1) {
            return { doesNotContainSpace : true}
        }
        return null;
    }
}