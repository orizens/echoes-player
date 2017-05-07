import { Injectable } from '@angular/core';

@Injectable()
export class MediaParserService {

  private HH_MM_SSre = /(\d{1,2}):\d{2}:?\d{0,2}/;
  private LINE_WITH_TRACKre = /([a-zA-Z \S\d]){0,}(\d{1,2}:\d{2}:{0,1}\d{0,2})+([a-zA-Z \S]){0,}/;

  constructor() { }

  extractTracks(media: GoogleApiYouTubeVideoResource) {
    // const re = /(([0-9]{0,1}[0-9]):([0-9][0-9]){0,1}:{0,1}([0-9][0-9]){0,1}\s*)([\w\s/]*[^ 0-9:/\n\b])/;
    const LINE_WITH_TRACKre = /([a-zA-Z \S\d]){0,}(\d{1,2}:\d{2}:{0,1}\d{0,2})+([a-zA-Z \S]){0,}/;
    const hasTracksRegexp = new RegExp(LINE_WITH_TRACKre, 'gmi');
    const tracks = media.snippet.description.match(hasTracksRegexp);
    // make sure there's a first track
    if (tracks && tracks.length && !tracks[0].includes('00:0')) {
      tracks.unshift('00:00');
    }
    return tracks;
  }

  extractTime(track: string) {
    const HH_MM_SSre = this.HH_MM_SSre;
    const title = track.match(HH_MM_SSre);
    return title;
  }

  verifyTracksCue(tracks: string[]) {
    const HH_MM_SSre = this.HH_MM_SSre;
    const isCueValid = tracks
      .map((track: string) => this.extractTime(track))
      .every((track, index, arr) => {
        const prev = index > 0 ?  this.toNumber(arr[index - 1][0]) : false;
        const current = this.toNumber(track[0]);
        return prev ? current > prev : true;
      });
    return isCueValid;
  }

  parseTracks(tracks: string[] = []) {
    let _tracks = [];
    const isFormatValid = this.verifyTracksCue(tracks);
    if (isFormatValid && tracks) {
      const re = this.HH_MM_SSre;
      _tracks = tracks
        .filter((track: string) => {
          const isTrack = re.test(track);
          return isTrack;
        });
    }
    return _tracks;
  }

  /**
   * converts time format of HH:MM:SS to seconds
   * @param time string
   */
  toNumber (time: string): number {
    const timeUnitRatio = {
      '3': 60 * 60, // HH
      '2': 60, // MM
      '1': 1
    };
    return time.split(':').reverse()
      .map((num: string) => parseInt(num, 10))
      .reduce((acc: number, current: number, index: number, arr: number[]) => {
        return acc + (current * +timeUnitRatio[index + 1]);
      }, 0);
  }
}
