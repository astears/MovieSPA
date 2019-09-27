import {Pipe, PipeTransform} from '../../../node_modules/@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncateOverviewPipe implements PipeTransform{
  
  constructor() {}

  transform(overview: string) {
    if(overview.length > 220) {
      return overview.slice(0, 216) + '...'
    }
    else {
      return overview;
    }
  }
}