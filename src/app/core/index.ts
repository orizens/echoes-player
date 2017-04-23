import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-imports.guards';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';

// export function AppEffectModules(effects: any[], runEffectFun) {
//   return AppEffects.map(function(effect){
//     return runEffectFun(effect);
//   });
// }

@NgModule({
  imports: [
    CoreStoreModule,
    // ...AppEffectModules(AppEffects, EffectsModule.run),
    ...AppEffectsModules,
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
