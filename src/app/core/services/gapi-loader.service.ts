import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GapiLoader {
  private _api: Observable<any>;
  private api: Subject<any>;

  constructor() {}

  loadGoogleApi(api, api$) {
    const gapi = 'https://apis.google.com/js/api.js';
    const script = document.createElement('script');
    script.addEventListener('load', () => this._loadApi(api, api$));
    script.setAttribute('src', gapi);
    document.body.appendChild(script);
  }

  load(api: string) {
    const api$ = this.createApi(api);
    this.loadGoogleApi(api, api$);
    return api$;
  }

  _loadApi(api: string, api$) {
    const gapi = window['gapi'];
    const gapiAuthLoaded = gapi && gapi.auth2 && gapi.auth2.getAuthInstance();
    if (gapiAuthLoaded && gapiAuthLoaded.currentUser) {
      api$.complete(gapiAuthLoaded);
    } else {
      gapi.load(api, response => api$.next(response));
    }
  }

  createApi(api: string) {
    const api$ = new Subject();
    return api$;
  }
}
