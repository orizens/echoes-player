/// <reference path="../steps.d.ts" />

Feature('search');

Scenario('Search box is displayed with snippet', I => {
  I.amOnPage('/#/search/videos');
  I.seeAttributesOnElements('#media-search', {
    placeholder: 'Find My Echoes...'
  });
});

Scenario('Search For A Term, Submit And See Results', I => {
  I.amOnPage('/#/search/videos');
  I.fillField('#media-search', 'dream theater');
  I.click('player-search .btn-submit');
  I.waitForElement('youtube-media', 5);
  I.seeNumberOfElements('youtube-media', 50);
});

Scenario('Scroll For More Results', I => {
  I.amOnPage('/#/search/videos');
  I.fillField('#media-search', 'dream theater');
  I.click('player-search .btn-submit');
  I.scrollPageToBottom();
  I.waitForElement('.youtube-item', 5);
});
