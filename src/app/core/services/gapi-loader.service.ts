import { Injectable } from '@angular/core';
// import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CLIENT_ID } from './constants';


@Injectable()
export class GapiLoader {
  private _api: Observable<any>;
  private api: Subject<any>;

  constructor() { }

  load (api: string) {
    return this.createApi(api);
  }
  _loadApi (api: string, observer) {
    const gapi = window['gapi'];
    const gapiAuthLoaded = gapi && gapi.auth2 && gapi.auth2.getAuthInstance();
    if (gapiAuthLoaded && gapiAuthLoaded.currentUser) {
      return observer.next(gapiAuthLoaded);
    }
    gapi.load(api, response => observer.next(response));
  }

  createApi (api: string) {
    const api$ = new Subject();
    const gapi = window['gapi'];
    // this._api = new Observable(observer => {
    const isGapiLoaded = gapi && gapi.load;
    const onApiLoaded = () => this._loadApi(api, api$);
    if (isGapiLoaded) {
      onApiLoaded();
    } else {
      window['apiLoaded'] = onApiLoaded;
    }
    // });
    // return this._api;
    return api$;
  }
}
