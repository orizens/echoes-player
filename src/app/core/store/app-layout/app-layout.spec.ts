import { inject, async } from '@angular/core/testing';
import { Themes, DEFAULT_THEME } from '../../../app.themes';

import * as AppLayout from './index';

describe('The App Settings Reducer', () => {
  const appLayout = AppLayout.appLayout;
  const createState = (props = {}) => {
    const defaultState: AppLayout.IAppSettings = {
      sidebarExpanded: false,
      requestInProcess: false,
      version: {
        semver: '',
        isNewAvailable: false,
        checkingForVersion: false
      },
      theme: DEFAULT_THEME,
      themes: Themes.sort()
    };
    return { ...defaultState, ...props };
  };

  it('should return current state when no valid actions have been made', () => {
    const state = createState();
    const actual = appLayout(state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should should check for version', () => {
    const state = createState();
    const newState = appLayout(state, new AppLayout.CheckVersion());
    const actual = newState.version.checkingForVersion;
    expect(actual).toBeTruthy();
  });

  describe('Version Update - When Version is empty:', () => {
    let state;
    const mockedAppPackageJson = {
      version: '3.2.0'
    };

    beforeEach(() => {
      state = createState();
    });

    it('should update the version when version is an empty string', () => {
      const newState = appLayout(state, new AppLayout.RecievedAppVersion(mockedAppPackageJson));
      const actual = newState.version.semver;
      const expected = mockedAppPackageJson.version;
      expect(actual).toBe(expected);
    });

    it('should NOT notify of new version when version is an empty string', () => {
      const newState = appLayout(state, new AppLayout.RecievedAppVersion(mockedAppPackageJson));
      const actual = newState.version.isNewAvailable;
      expect(actual).toBeFalsy();
    });
  });

  describe('Version Update - When Version is available:', () => {
    let state;
    const mockedAppPackageJson = {
      version: '3.3.0'
    };

    beforeEach(() => {
      state = createState();
    });

    it('should notify of new update when a newer version is available', () => {
      state.version.semver = '3.2.0';
      const newState = appLayout(state, new AppLayout.RecievedAppVersion(mockedAppPackageJson));
      const actual = newState.version.isNewAvailable;
      expect(actual).toBeTruthy();
    });

    it('should NOT update semver when a newer version is available', () => {
      state.version.semver = '3.2.0';
      const newState = appLayout(state, new AppLayout.RecievedAppVersion(mockedAppPackageJson));
      const actual = newState.version.semver;
      const expected = state.version.semver;
      expect(actual).toMatch(expected);
    });
  });

  describe('Version Update - after approving update:', () => {
    let state;
    const mockedAppPackageJson = {
      version: '3.3.0'
    };

    beforeEach(() => {
      state = createState();
      state.version.semver = '3.2.0';
      state.version.isNewAvailable = true;
    });

    it('should update semver when a newer version is already available', () => {
      const newState = appLayout(state, new AppLayout.RecievedAppVersion(mockedAppPackageJson));
      const actual = newState.version.semver;
      const expected = mockedAppPackageJson.version;
      expect(actual).toMatch(expected);
    });

    it('should restore status of new version availability to false', () => {
      const newState = appLayout(state, new AppLayout.RecievedAppVersion(mockedAppPackageJson));
      const actual = newState.version.isNewAvailable;
      expect(actual).toBeFalsy();
    });
  });
});
