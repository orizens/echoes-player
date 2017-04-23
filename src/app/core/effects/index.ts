import { EffectsModule } from '@ngrx/effects';

import { AppPlayerEffects } from './app-player.effects';
import { NowPlaylistEffects } from './now-playlist.effects';
import { UserProfileEffects } from './user-profile.effects';
import { PlayerSearchEffects } from './player-search.effects';
import { AppSettingsEffects } from './app-settings.effects';

export const AppEffectsModules = [
  EffectsModule.run(AppPlayerEffects),
  EffectsModule.run(NowPlaylistEffects),
  EffectsModule.run(UserProfileEffects),
  EffectsModule.run(PlayerSearchEffects),
  EffectsModule.run(AppSettingsEffects)
];
