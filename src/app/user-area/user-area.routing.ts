import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserArea } from './user-area.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'user', component: UserArea }
]);
