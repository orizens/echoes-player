import { browser, element, by } from 'protractor';

export class EchoesPlayerPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getTitleInput() {
    return element(by.css('input[formcontrolname=title]'));
  }

  getVideoResults() {
    return element.all(by.css('youtube-videos youtube-list .youtube-list-item'));
  }

  // getTalkText(index: number) {
  //   return this.getTalks().get(index).getText();
  // }
}
