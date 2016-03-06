import {provideStore} from '@ngrx/store';
// reducers
import {videos} from './youtube-videos';
import {player} from './youtube-player';
import {nowPlaylist} from './now-playlist';

// Echoes State
let echoes = {
	videos: [],
	player: {}
};

export const store = provideStore({
	videos, player, nowPlaylist
});