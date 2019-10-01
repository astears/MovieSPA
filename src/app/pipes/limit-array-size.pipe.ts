import {Pipe, PipeTransform} from '../../../node_modules/@angular/core';

@Pipe({
  name: 'limitArrSize'
})
export class LimitArraySizePipe implements PipeTransform{

  constructor() {}

  transform(array: any[], newSize: string) {
    let size = parseInt(newSize);
    if (array === undefined) {return null}
    if (size > array.length) {
      return array;
    }
    return array.slice(0, size);
  }
}
