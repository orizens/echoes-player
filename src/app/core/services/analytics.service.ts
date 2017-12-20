import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

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

  constructor() { }

  trackPage(page) {
    gtag('config', this.projectId, {
      'page_title': page,
      'page_location': location.origin,
      'page_path': location.hash
    });
  }

  trackSearch() {
    gtag('event', Events.Search.NAME);
  }

  trackSignin() {
    gtag('event', Events.Login.NAME, { [Events.Login.LABEL]: 'Google' });
  }

  trackVideoPlay() {
    gtag('event', CustomEvents.VIDEO_PLAY);
  }
}
