import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'user', loadChildren: 'app/containers/user/index#UserModule' }
];
