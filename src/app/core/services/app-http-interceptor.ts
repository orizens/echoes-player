import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { AppErrorHandler } from './error-handler';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorMessages } from '../store/app-core';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private errorHandler: AppErrorHandler) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const onLine = navigator.onLine;
    if (!onLine) {
      this.handleError(ErrorMessages.OFFLINE);
      return EMPTY;
    }
    return next.handle(req).pipe(
      tap(
        event => {},
        err => {
          this.handleError(err);
          if (err.status === 404) {
          }
        }
      )
    );
  }

  handleError(error: Error | any) {
    this.errorHandler.handleError(error);
  }
}
