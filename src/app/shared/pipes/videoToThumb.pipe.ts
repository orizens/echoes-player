import { Pipe, PipeTransform } from '@angular/core';
import { extractThumbUrl } from '../utils/media.utils';
import memo from 'memo-decorator';

@Pipe({ name: 'videoToThumb' })
export class VideoToThumbPipe implements PipeTransform {
  @memo()
  transform(value: any): any {
    const thumb = extractThumbUrl(value);
    return thumb || '';
  }
}
