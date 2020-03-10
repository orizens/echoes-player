import { createSelector } from '@ngrx/store';
import { IAppCore, IAppError } from './app-core.reducer';
import { EchoesState } from '@store/reducers';

export const getAppCore = (state: EchoesState) => state.appCore;
export const getAppTheme = createSelector(
  getAppCore,
  (state: IAppCore) => state.theme
);
export const getAllAppThemes = createSelector(
  getAppCore,
  (state: IAppCore) => state.themes
);
export const getAppThemes = createSelector(
  getAppCore,
  getAppTheme,
  getAllAppThemes,
  (appLayout, theme: string, themes: string[]) => ({
    selected: theme,
    themes: themes.map(_theme => ({ label: _theme, value: _theme }))
  })
);
export const getAppVersion = createSelector(
  getAppCore,
  (state: IAppCore) => state.version
);
export const getSidebarCollapsed = createSelector(
  getAppCore,
  (state: IAppCore) => !state.sidebarExpanded
);
export const selectError = createSelector(
  getAppCore,
  (state: IAppCore) => state.error
);
export const selectErrorMessage = createSelector(
  selectError,
  (error: IAppError) => error.message
);
export const selectIsErrorShow = createSelector(
  selectError,
  (error: IAppError) => error.show
);
export const selectErrorAction = createSelector(
  selectError,
  (error: IAppError) => error.action
);

export const selectShowAddToPlaylist = createSelector(
  getAppCore,
  (state: IAppCore) => state.show.addToPlaylist
);

export const selectMediaToPlaylist = createSelector(
  getAppCore,
  (state: IAppCore) => state.show.media
);
