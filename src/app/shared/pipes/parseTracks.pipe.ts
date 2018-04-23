import { Pipe, PipeTransform } from '@angular/core';
import { MediaParserService } from '@core/services/media-parser.service';
import memo from 'memo-decorator';

@Pipe({ name: 'parseTracks' })
export class ParseTracksPipe implements PipeTransform {
  constructor(private mediaParser: MediaParserService) {}

  @memo()
  transform(value: any): any {
    return this.mediaParser.parseTracks(value);
  }
}
