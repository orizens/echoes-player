import { EffectsModule } from '@ngrx/effects';

import { AppPlayerEffects } from './app-player.effects';
import { AnalyticsEffects } from './analytics.effects';
import { NowPlaylistEffects } from './now-playlist.effects';
import { UserProfileEffects } from './user-profile.effects';
import { PlayerSearchEffects } from './player-search.effects';
import { AppCoreEffects } from './app-core.effects';
import { RouterEffects } from './router.effects';

export const AppEffectsModules = EffectsModule.forRoot([
  AppPlayerEffects,
  NowPlaylistEffects,
  UserProfileEffects,
  PlayerSearchEffects,
  AppCoreEffects,
  RouterEffects,
  AnalyticsEffects
]);
