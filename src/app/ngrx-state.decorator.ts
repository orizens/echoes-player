import { APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { Store } from '@ngrx/store';
let _store;

export const BOOTSTRAP_TO_ACTION_PROVIDER = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  deps: [ Store ],
  useFactory: function (s) {
    _store = s;
    return (store) => store;
  }
};

export function State(selectorFunc: Function) {
  return function (target: any, key: string) {
    let _oldInit;
    if (target.ngOnInit) {
      _oldInit = target.ngOnInit;
    }
    target.ngOnInit = function(...args) {
      if (_store) {
        this[key] = _store.let(selectorFunc);
        if (_oldInit) {
          _oldInit.apply(this, args);
        }
      }
    };
  };
}
