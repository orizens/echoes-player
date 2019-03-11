/// <reference path="../steps.d.ts" />

const App = {
  HOME: 'http://localhost:4200',
  Api: {
    SEARCH: 'https://www.googleapis.com'
  },
  Components: {
    Typeahead: {
      BACKDROP: '.ta-backdrop',
      RESULTS: '.ta-results'
    }
  }
};

Feature('Search');

Before(I => {
  I.amOnPage(App.HOME);
});

Scenario('See Page', I => {
  I.see('ECH');
  I.see('ES');
});

Scenario('Search and get results', async I => {
  const query = 'pulse8 chillstep';
  I.fillField('Find My Echoes...', query);
  I.waitForElement(App.Components.Typeahead.RESULTS);
  I.click(App.Components.Typeahead.BACKDROP);
  I.click('Any');
  I.waitForText('Chillstep', 2);
  const results = await I.grabNumberOfVisibleElements('.youtube-list-item');
  I.see('Chillstep', '.youtube-list-item');
  I.seeNumberOfElements('.youtube-list-item', results);
});

Scenario('Search for more results', async I => {
  const query = 'dream theater';
  I.fillField('Find My Echoes...', query);
  I.waitForElement(App.Components.Typeahead.RESULTS);
  I.click(App.Components.Typeahead.BACKDROP);
  I.click('Any');
  I.waitForText(query, 2);
  I.scrollPageToBottom();
  I.waitForText(query, 2);
  const results = await I.grabNumberOfVisibleElements('.youtube-list-item');
  I.seeNumberOfElements('.youtube-list-item', 100);
});
