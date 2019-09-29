import { PipeTransform, Pipe } from '../../../node_modules/@angular/core';

@Pipe({
  name: "FormatHeader"
})
export class FormatHeaderPipe implements PipeTransform {

  transform(header: string) {
     return header.split("_").map((word) => {return word.charAt(0).toUpperCase() + word.slice(1)}).join(" ") + " Movies";
    }
}
