import { YoutubeItems } from './youtube.search.mock';
import { Injectable } from 'angular2/core';

@Injectable()
export class YoutubeSearch {

	search(){
		return YoutubeItems;
	}
}