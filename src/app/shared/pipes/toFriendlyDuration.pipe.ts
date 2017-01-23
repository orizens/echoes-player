import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFriendlyDuration'
})

export class ToFriendlyDurationPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    const time = <string>value;
    if (!time) {
      return '...';
    }
    return ['PT', 'H', 'M', 'S'].reduce((prev, cur, i, arr) => {
      const now = prev.rest.split(cur);
      if (cur !== 'PT' && cur !== 'H' && !prev.rest.match(cur)) {
        prev.new.push('00');
      }
      if (now.length === 1) {
        return prev;
      }
      prev.new.push(now[0]);
      return {
        rest: now[1].replace(cur, ''),
        new: prev.new
      };
    }, { rest: time, new: [] })
    .new.filter(_time => _time !== '')
    .map(_time => _time.length === 1 ? `0${_time}` : _time)
    .join(':');
  }
}
