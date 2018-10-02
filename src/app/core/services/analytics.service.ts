import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const gtag;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events#default-event-categories-and-labels
// Google Analytics Events
const Events = {
  Login: {
    NAME: 'login',
    LABEL: 'method'
  },
  Search: {
    NAME: 'search',
    LABEL: 'search_term'
  }
};

const CustomEvents = {
  VIDEO_PLAY: 'video_play'
};
@Injectable()
export class AnalyticsService {
  private projectId = window['GA_PROJECT_ID'];
  private gtag: any;

  constructor() {
    this.assignGtag();
  }

  assignGtag() {
    const hasGtagLoaded = 'gtag' in window;
    if (!hasGtagLoaded) {
      console.info('GTAG has not been loaded');
    }
    this.gtag = hasGtagLoaded ? gtag : () => undefined;
  }

  trackPage(page) {
    this.gtag('config', this.projectId, {
      page_title: page,
      page_location: location.origin,
      page_path: location.hash
    });
  }

  trackSearch(searchType) {
    this.gtag('event', Events.Search.NAME, {
      [Events.Search.LABEL]: searchType
    });
  }

  trackSignin() {
    this.gtag('event', Events.Login.NAME, { [Events.Login.LABEL]: 'Google' });
  }

  trackVideoPlay() {
    this.gtag('event', CustomEvents.VIDEO_PLAY);
  }
}
