import { Observable } from 'rxjs/Observable';
import { IAppSettings } from './app-layout.reducer';
import { EchoesState } from '../reducers';

export function getAppLayout$(state$: Observable<EchoesState>): Observable<IAppSettings> {
  return state$.select(state => state.appLayout);
}

export function getAppVersion$(state$: Observable<EchoesState>): Observable<any> {
  return state$.select(state => state.appLayout.version);
}

