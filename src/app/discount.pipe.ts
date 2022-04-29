import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  // Pipes are used for differen presentation

  transform(value: any, ...args: any[]): any {
    return value + " -- 10 %";
  }

}
