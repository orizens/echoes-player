import { browser, element, by } from 'protractor';
import { protractor } from 'protractor';

export class EchoesPlayerPage {
  async navigateTo() {
    return await browser.get('/');
  }

  async getTitle() {
    return await browser.getTitle();
  }

  getTitleInput() {
    return element(by.css('input[formcontrolname=title]'));
  }

  getVideoResults() {
    return element.all(
      by.css('youtube-videos youtube-list .youtube-list-item')
    );
  }

  async searchFor(query: string) {
    await element(by.css('.form-search input')).sendKeys(query);
    return await element(by.css('.form-search .btn-submit')).click();
  }
}
