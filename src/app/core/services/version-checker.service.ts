import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { Http } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as AppLayout from '../store/app-layout';

import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';

@Injectable()
export class VersionCheckerService {
  private interval = 1000 * 60 * 60;
  private protocol = 'https';
  private prefix = 'raw.githubusercontent.com';
  private repo = 'orizens/echoes-player';
  private repoBranch = 'gh-pages';
  private pathToFile = 'assets/package.json';
  public url = `${this.protocol}://${this.prefix}/${this.repo}/${this.repoBranch}/${this.pathToFile}`;

  constructor(private http: Http, private zone: NgZone, private store: Store<EchoesState>) {}

  check() {
    return this.http.get(this.url);
  }

  start() {
    let checkTimer: Subscription;
    this.zone.runOutsideAngular(() => {
      checkTimer = Observable.timer(0, this.interval)
        .switchMap(() => this.check())
        // .catch((err) => {
        //   console.log(err);
        //   return Observable.of(err);
        // })
        .retry()
        .filter(response => response && response.status === 200)
        .subscribe(response => {
          this.store.dispatch(new AppLayout.RecievedAppVersion(response.json()));
        });
    });
    return checkTimer;
  }

  updateVersion() {
    if (window) {
      window.location.reload(true);
    }
  }

  checkForVersion() {
    return this.check()
      .retry()
      .filter(response => response && response.status === 200)
      .take(1)
      .subscribe(this.notifyNewVersion.bind(this));
  }

  notifyNewVersion(response) {
    this.store.dispatch(new AppLayout.RecievedAppVersion(response.json()));
  }
}
