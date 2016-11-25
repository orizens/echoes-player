import { Action } from '@ngrx/store';

/* Action Creator Factory
 * ======================
 * Creates typed action creators functions
 * 
 * const addTodo = ActionCreatorFactory.create<string>('ADD_TODO')
 * 
 **/
class ActionCreator<T> implements Action {
  constructor(
    public type: string = 'NOT_SET',
    public payload?: T
  ) {}
}

export class ActionCreatorFactory {
  static create?<T>(type: string, defaultPayloadValue?: any) {
    return (payload?: T) => new ActionCreator<T>(type, payload || defaultPayloadValue);
  }
}
