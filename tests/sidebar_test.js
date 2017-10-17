/// <reference path="../steps.d.ts" />

Feature('Sidebar');

Before((I, searchPage) => {
  searchPage.navigateToVideos();
});

Scenario('Toggle Sidebar', (I, sidebarPage) => {
  sidebarPage.toggle();
  I.see('NOW PLAYING');
});

Scenario('Queue tracks to now playlist', (I, sidebarPage, searchPage) => {
  searchPage.queueMedia(1);
  I.waitNumberOfVisibleElements(sidebarPage.selectors.playlistTrack, 1, 1);
});

Scenario('Clearing tracks form now playlist', (I, sidebarPage, searchPage) => {
  sidebarPage.toggle();
  sidebarPage.clearPlaylist();
  I.dontSeeElement(sidebarPage.selectors.playlistTrack);
});
