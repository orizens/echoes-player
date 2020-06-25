import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./containers/user/index').then(m => m.UserModule) }
];
