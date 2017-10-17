'use strict';

let I;

module.exports = {
  _init() {
    I = require('../steps_file.js')();
  },

  // insert your locators and methods here
  selectors: {
    toggleButton: 'app-brand .brand-container',
    playlistTrack: 'now-playlist .now-playlist-track',
    clearPlaylistButton: 'now-playlist-filter .btn-clear'
  },

  toggle() {
    I.click(this.selectors.toggleButton);
  },

  clearPlaylist() {
    I.click(this.selectors.clearPlaylistButton);
  }
};
