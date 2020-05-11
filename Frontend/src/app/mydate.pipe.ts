import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mydate'
})
export class MydatePipe implements PipeTransform {
    transform(aDate: Date, withTime?:boolean) {
        let time = "";
        if (withTime) {
            time = "  " + aDate.getHours() + ":" + aDate.getMinutes() + aDate.getSeconds();
        }

        return aDate.getDay() + "." + aDate.getMonth() + "." + aDate.getFullYear() + time;
    }
}