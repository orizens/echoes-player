import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { throwIfAlreadyLoaded } from './module-imports.guards';

import { CoreStoreModule } from './store';
import { AppEffects } from './effects';

import { APP_SERVICES } from './services';

// export function AppEffectModules(effects: any[], runEffectFun) {
//   return AppEffects.map(function(effect){
//     return runEffectFun(effect);
//   });
// }
const AppEffectModules = [
  EffectsModule.run(AppEffects[0]),
  EffectsModule.run(AppEffects[1]),
  EffectsModule.run(AppEffects[2]),
  EffectsModule.run(AppEffects[3])
];

@NgModule({
  imports: [
    CoreStoreModule,
    // ...AppEffectModules(AppEffects, EffectsModule.run),
    ...AppEffectModules,
  ],
  declarations: [
  ],
  exports: [
    CoreStoreModule,
  ],
  providers: [
    ...APP_SERVICES
  ]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
  // }
}
