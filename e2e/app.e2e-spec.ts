import { EchoesPlayerPage } from './app.po';

describe('echoes-player App', () => {
  let page: EchoesPlayerPage;

  beforeEach(() => {
    page = new EchoesPlayerPage();
    page.navigateTo();
  });


  it('should have a title', () => {
    const actual = page.getTitle();
    const expected = 'Echoes Player - Open Source Media Player for Youtube';
    expect(actual).toEqual(expected);
  });

  it('should show 50 video search results', () => {
    const actual = page.getVideoResults().count();
    const expected = 50;
    expect(actual).toEqual(expected);
  });
});
