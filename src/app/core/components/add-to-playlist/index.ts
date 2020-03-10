import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { AddToPlaylistComponent } from './add-to-playlist.component';

@NgModule({
  imports: [SharedModule],
  exports: [AddToPlaylistComponent],
  declarations: [AddToPlaylistComponent],
  providers: [],
})
export class AddToPlaylistModule { }
