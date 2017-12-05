import { NgModule} from '@angular/core';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';
import { APP_APIS } from './api';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [...APP_SERVICES, ...APP_RESOLVERS, ...APP_APIS]
})
export class CoreModule {
}
