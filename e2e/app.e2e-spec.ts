import { EchoesPlayerPage } from './app.po';
import { browser } from 'protractor';

describe('Echoes Player App', () => {
  let page: EchoesPlayerPage;
  const TOTAL_RESULTS = 50;
  const REQUEST_WAIT = 3000;

  beforeEach(async () => {
    page = new EchoesPlayerPage();
    await page.navigateTo();
  });

  it('should have a title', async () => {
    const actual = await page.getTitle();
    const expected = 'Echoes Player - Open Source Media Player for Youtube';
    await expect(actual).toEqual(expected);
  });

  it('should show 50 video search results', async () => {
    await page.searchFor('ozric tentacles');
    await browser.driver.sleep(REQUEST_WAIT);
    const actual = await page.getVideoResults().count();
    const expected = TOTAL_RESULTS;
    await expect(actual).toEqual(expected);
  });
});
