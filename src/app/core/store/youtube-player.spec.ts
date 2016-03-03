import {
  it,
  inject,
  injectAsync,
  describe,
  expect,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// import {Component, provide} from 'angular2/core';
// import {BaseRequestOptions, Http} from 'angular2/http';
// import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import { player } from './youtube-player';
import { PLAY, QUEUE, TOGGLE_PLAYER, STATE_CHANGE } from './youtube-player';
import { YoutubeMediaMock } from '../../../../test/mocks/youtube.media.item';

describe('The Youtube Player reducer', () => {
    it('should return current state when no valid actions have been made', () => {
        const state = { mediaId: 'mocked...' };
        const actual = player(state, {type: 'INVALID_ACTION', payload: {}});
        const expected = state;
        expect(actual).toBe(expected);
    });

    it('should set the new media id by the new PLAYED youtube media item', () => {
        const state = { mediaId: 'mocked', media: {}};
        const actual = player(state, { type: PLAY, payload: YoutubeMediaMock });
        const expected = state;
        expect(actual.mediaId).toBe(YoutubeMediaMock.id.videoId);
    });

    it('should toggle visibility of the player', () => {
      const state = { mediaId: 'mocked', showPlayer: false };
        const actual = player(state, { type: TOGGLE_PLAYER, payload: true });
        const expected = state;
        expect(actual.showPlayer).toBe(expected.showPlayer);
    });

    it('should change the state of the player', () => {
      const state = { mediaId: 'mocked', playerState: 0 };
        const actual = player(state, { type: STATE_CHANGE, payload: 1 });
        const expected = state;
        expect(actual.playerState).toBe(expected.playerState);
    });
});
