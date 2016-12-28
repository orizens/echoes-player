import {
  inject,
  async,
} from '@angular/core/testing';

import { ToFriendlyDurationPipe } from './toFriendlyDuration.pipe';

fdescribe('The toFriendlyDuration Pipe', () => {
  const pipe = new ToFriendlyDurationPipe();

  it('should render 3 sections when given 2', () => {
    const duration = 'PT2H33S';
    const actual = pipe.transform(duration, []);
    const expected = '02:33';
    expect(actual).toBe(expected);
  });
});
