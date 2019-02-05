import { browser, element, by } from 'protractor';
import { protractor } from 'protractor';

export class EchoesPlayerPage {
  getTitleInput() {
    return element(by.css('input[formcontrolname=title]'));
  }

  getPlaylistTracks() {
    return element.all(by.css('now-playlist .now-playlist-track'));
  }

  getNowPlayingTitleCount() {
    return element.all(by.css('.playlist-header'));
  }

  // actions
  async clear() {
    return await element(by.css('.btn-clear')).click();
  }

  removeTrack(trackIndex = 0) {
    return this.getPlaylistTracks()
      .get(trackIndex)
      .all(by.css('.remove-track'))
      .click();
  }

  addTrack(params) {}
}
