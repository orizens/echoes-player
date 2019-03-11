import { Component, OnInit } from '@angular/core';
import { AppErrorHandlerProxy } from './app-error-handler.proxy';
import { ErrorActions } from '../../store/app-core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './app-error-handler.html',
  styleUrls: ['./app-error-handler.scss']
})
export class AppErrorHandlerComponent implements OnInit {
  errorMessage$ = this.appErrorHandlerProxy.errorMessage$;
  errorShow$ = this.appErrorHandlerProxy.isShowError$;
  errorAction$ = this.appErrorHandlerProxy.errorAction$;

  constructor(public appErrorHandlerProxy: AppErrorHandlerProxy) {}

  ngOnInit(): void {}

  handleAction(errorAction: ErrorActions) {
    switch (errorAction) {
      case ErrorActions.NONE:
        break;

      case ErrorActions.RELOAD:
        this.appErrorHandlerProxy.cleanError();
        location.reload();
        break;

      default:
        break;
    }
  }
}
