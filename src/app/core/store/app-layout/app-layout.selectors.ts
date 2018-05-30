import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppSettings } from './app-layout.reducer';
import { EchoesState } from '@store/reducers';

export const getAppSettings = (state: EchoesState) => state.appLayout;
export const getAppTheme = createSelector(getAppSettings, (state: IAppSettings) => state.theme);
export const getAllAppThemes = createSelector(getAppSettings, (state: IAppSettings) => state.themes);
export const getAppThemes = createSelector(getAppSettings, getAppTheme, getAllAppThemes, (appLayout, theme: string, themes: string[]) => ({
  selected: theme,
  themes: themes.map(_theme => ({ label: _theme, value: _theme }))
}));
export const getAppVersion = createSelector(getAppSettings, (state: IAppSettings) => state.version);
export const getSidebarCollapsed = createSelector(getAppSettings, (state: IAppSettings) => !state.sidebarExpanded);
