/// <reference path="../steps.d.ts" />

Feature('Search');

Before((I, searchPage) => {
  searchPage.navigateToVideos();
});

Scenario('Search box is displayed with snippet', (I, searchPage) => {
  searchPage.seePlaceholder();
});

Scenario('Search For A Term, Submit And See Results', (I, searchPage) => {
  searchPage.searchForMedia('dream theater');
  I.waitForElement('youtube-media', 5);
  I.seeNumberOfElements('youtube-media', 50);
});

Scenario('See automcomplete when typing a term', (I, searchPage) => {
  searchPage.typeSearchTerm('dream theater');
  I.waitNumberOfVisibleElements(searchPage.selectors.typeaheadItems, 10, 10);
});

Scenario('Scroll For More Results', (I, searchPage) => {
  searchPage.searchForMedia('dream theater');
  I.wait(5);
  searchPage.searchForMore();
  I.seeNumberOfElements('youtube-media', 100, 5);
});

Scenario('Selecting a preset to search with', (I, searchPage) => {
  searchPage.serachWithPreset('dream theater', 'Albums');
  I.see('Albums', { css: searchPage.selectors.activePreset });
  I.waitForElement('youtube-media', 5);
  I.seeNumberOfElements('youtube-media', 50);
});
