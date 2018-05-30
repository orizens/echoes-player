import { Subscription, Observable, of, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { AppApi } from '@api/app.api';
import { switchMap, retry, filter, take } from 'rxjs/operators';

interface INpmPackageJson {
  version: number;
  [param: string]: any;
}

function verifyPackage(packageJson: INpmPackageJson) {
  return packageJson.hasOwnProperty('version');
}

@Injectable()
export class VersionCheckerService {
  private interval = 1000 * 60 * 60;
  private protocol = 'https';
  private prefix = 'raw.githubusercontent.com';
  private repo = 'orizens/echoes-player';
  private repoBranch = 'gh-pages';
  private pathToFile = 'assets/package.json';
  public url = `${this.protocol}://${this.prefix}/${this.repo}/${
    this.repoBranch
  }/${this.pathToFile}`;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private appApi: AppApi
  ) {}

  check() {
    return this.http.get(this.url);
  }

  start() {
    let checkTimer: Subscription;
    this.zone.runOutsideAngular(() => {
      checkTimer = timer(0, this.interval)
        .pipe(switchMap(() => this.check()), retry(), filter(verifyPackage))
        .subscribe(response => this.appApi.recievedNewVersion(response));
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
      .pipe(retry(), filter(verifyPackage), take(1))
      .subscribe(response => this.appApi.notifyNewVersion(response));
  }
}
