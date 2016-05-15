import { YoutubeMediaResource } from './youtube.media.resource.d';

export interface YoutubeResource {
	kind: string;
	etag: string;
	pageInfo: Object;
	items: Array< YoutubeMediaResource >;
}