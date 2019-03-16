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
      this.errorHandler.handleError({
        message: ErrorMessages.OFFLINE
      } as Error);
      return EMPTY;
    }
    return next.handle(req).pipe(
      tap(
        event => {},
        err => {
          this.errorHandler.handleError({
            message: `${ErrorMessages.RESPONSE_ERROR}, More Details: ${
              err.message
            }`
          } as Error);
          if (err.status === 404) {
          }
        }
      )
    );
  }
}
