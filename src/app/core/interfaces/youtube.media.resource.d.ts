export interface YoutubeMediaResource {
	kind: string;
	etag: string;
	id: string;
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: Object;
		channelTitle: string;
		categoryId: string;
		liveBroadcastContent: string;
		localized: Object;
	},
	contentDetails: any;
	statistics: any;
}