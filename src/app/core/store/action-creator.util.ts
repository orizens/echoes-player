import { Injectable, NgModule } from '@angular/core';
import { Action } from '@ngrx/store';

/* Action Creator Factory
 * ======================
 * Creates typed action creators functions
 * 
 * const addTodo = ActionCreatorFactory.create<string>('ADD_TODO')
 * 
 **/
export class ActionCreator<T> implements Action {
  constructor(
    public type: string = 'NOT_SET',
    public payload?: T
  ) {}
}
@Injectable()
export class ActionCreatorFactory {
  static create?<T>(type: string, defaultPayloadValue?: any) {
    return (payload?: T): Action => {
      const _payload = payload || typeof payload !== 'undefined' ? payload : defaultPayloadValue;
      return new ActionCreator<T>(type, _payload);
    };
  }

  create?<T>(type: string, defaultPayloadValue?: any) {
    return ActionCreatorFactory.create<T>(type, defaultPayloadValue);
  }
}

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    ActionCreatorFactory
  ]
})
export class NgrxActionCreatorFactoryModule { }
