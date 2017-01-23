import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(values: any, args: any) {
    const term = args.length ? args.toLowerCase() : '';
    const matchString = (key) => {
      if (typeof key === 'string') {
        return key.toLowerCase().indexOf(term) > -1;
      }
      return Object.keys(key).some(prop => matchString(key[prop]));
    };
    return values.filter(matchString);
  }
}
