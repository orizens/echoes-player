'use strict';

let I;

module.exports = {
  _init() {
    I = require('../steps_file.js')();
  },

  // locators
  selectors: {
    input: '#media-search',
    submitButton: 'player-search .btn-submit',
    typeaheadItems: 'player-search .results .list-group-item',
    activePreset: 'app-navbar button-group .active',
    mediaCardFront: 'app-search youtube-list li:nth-child(1) .front.face'
  },

  attributes: {
    placeholder: 'Find My Echoes...'
  },

  navigateToVideos() {
    I.amOnPage('/#/search/videos');
  },

  // insert your locators and methods here
  searchForMedia(query) {
    this.typeSearchTerm(query);
    I.click(this.selectors.submitButton);
  },

  typeSearchTerm(query) {
    I.fillField(this.selectors.input, query);
  },

  searchForMore() {
    I.scrollPageToBottom();
    I.wait(5);
  },

  serachWithPreset(query, preset) {
    this.typeSearchTerm(query);
    I.click(preset);
  },

  seePlaceholder() {
    I.seeAttributesOnElements(this.selectors.input, {
      placeholder: this.attributes.placeholder
    });
  },

  queueMedia(index) {
    I.click({
      css: `${this.selectors.mediaCardFront} button:nth-child(${index})`
    });
  }
};
