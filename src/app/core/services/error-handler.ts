import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppApi } from '../api/app.api';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const appApi = this.injector.get(AppApi);
    console.log('There was an ERROR:', error);
    appApi.notifyError(error);
  }
}
