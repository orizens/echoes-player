import {provideStore} from '@ngrx/store';
// reducers
import {videos} from './youtube-videos';
// Echoes State
let EchoesStore = {
	videos: []
};

export const store = provideStore({ videos }, { videos: EchoesStore.videos });