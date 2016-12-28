import {
  inject,
  async,
} from '@angular/core/testing';

import { ToFriendlyDurationPipe } from './toFriendlyDuration.pipe';

describe('The toFriendlyDuration Pipe', () => {
  const pipe = new ToFriendlyDurationPipe();

  it('should render 3 dots when no valid value is provided', () => {
    const duration = undefined;
    const actual = pipe.transform(duration, []);
    const expected = '...';
    expect(actual).toBe(expected);
  });

  it('should render hour, no minutes and seconds', () => {
    const duration = 'PT2H33S';
    const actual = pipe.transform(duration, []);
    const expected = '02:00:33';
    expect(actual).toBe(expected);
  });

  it('should render hour, 2 digit minutes (less than 10) and seconds', () => {
    const duration = 'PT2H09M33S';
    const actual = pipe.transform(duration, []);
    const expected = '02:09:33';
    expect(actual).toBe(expected);
  });

  it('should render hour, 2 digit minutes (above 10) and seconds', () => {
    const duration = 'PT2H45M33S';
    const actual = pipe.transform(duration, []);
    const expected = '02:45:33';
    expect(actual).toBe(expected);
  });

  it('should render minutes and seconds', () => {
    const duration = 'PT4M1S';
    const actual = pipe.transform(duration, []);
    const expected = '04:01';
    expect(actual).toBe(expected);
  });

  it('should render just seconds', () => {
    const duration = 'PT35S';
    const actual = pipe.transform(duration, []);
    const expected = '00:35';
    expect(actual).toBe(expected);
  });
});
