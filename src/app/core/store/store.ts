import {provideStore} from '@ngrx/store';
// reducers
import {videos} from './youtube-videos';
import {player} from './youtube-player';
// Echoes State
let echoes = {
	videos: [],
	player: {}
};

export const store = provideStore({
	videos, player
});