import { Routes, RouterModule } from '@angular/router';
// import { Home } from './home';
// import { About } from './about';
// import { NoContent } from './no-content';

import { YoutubeVideos } from './youtube-videos';
import { UserArea } from './user-area';


// import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: YoutubeVideos },
  { path: 'user',  component: UserArea }
  // { path: 'home',  component: Home }
  // { path: 'about', component: About },
  // {
    // path: 'detail', loadChildren: () => System.import('./+detail')
  // },
  // { path: '**',    component: NoContent },
];
