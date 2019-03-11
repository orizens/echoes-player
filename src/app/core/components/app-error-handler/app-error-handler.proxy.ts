import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppApi } from '@api/app.api';
import { EchoesState } from '@store/reducers';
import * as fromAppCore from '../../store/app-core';

@Injectable()
export class AppErrorHandlerProxy {
  errorMessage$ = this.store.pipe(select(fromAppCore.selectErrorMessage));
  isShowError$ = this.store.pipe(select(fromAppCore.selectIsErrorShow));
  errorAction$ = this.store.pipe(select(fromAppCore.selectErrorAction));

  constructor(private store: Store<EchoesState>, private appApi: AppApi) {}

  toggleError() {
    this.store.dispatch(new fromAppCore.ToggleError());
  }

  cleanError() {
    this.store.dispatch(new fromAppCore.CleanError());
  }
}
