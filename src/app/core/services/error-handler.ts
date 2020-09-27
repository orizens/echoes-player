import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppApi } from '../api/app.api';

const HandledErrors = ['HttpErrorResponse'];
const DimissedErrors = ['popup_closed_by_user'];
const isYoutubeApiError = error =>
  error?.error?.error?.errors;
const isString = message => typeof message === 'string';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse | any) {
    const appApi = this.injector.get(AppApi);
    if (!DimissedErrors.includes(error.name)) {
      const sanitizedError = isYoutubeApiError(error)
        ? error.error.error.errors[0]
        : error;
      console.error('There was an ERROR:', error);
      const errorPayload = isString(sanitizedError) ? { message: error } : { message: `${error?.message}\n${error?.error?.error?.message}` };
      appApi.notifyError(errorPayload);
    }
  }
}
