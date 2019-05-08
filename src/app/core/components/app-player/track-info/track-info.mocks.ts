import { PipeTransform, Pipe, Injectable } from '@angular/core';

@Pipe({ name: 'parseTracks' })
export class ParseTracksMockPipe implements PipeTransform {
  constructor() {}

  transform(value: any): any {
    return value;
  }
}

@Injectable()
export class MediaParserServiceMock {
  extractTracks() {}
  extractTime() {}
}
