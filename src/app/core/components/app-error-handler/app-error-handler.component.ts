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
        this.toggleError();
        break;

      case ErrorActions.RELOAD:
        this.reload();
        break;

      default:
        break;
    }
  }

  reload() {
    this.appErrorHandlerProxy.cleanError();
    location.reload();
  }

  toggleError() {
    this.appErrorHandlerProxy.toggleError();
  }

  close() {
    this.handleAction(ErrorActions.NONE);
  }

  reset(){
    this.appErrorHandlerProxy.cleanError();
    window.localStorage.clear();
    location.reload();
    // this.handleAction(ErrorActions.RELOAD);
  }
  
}
