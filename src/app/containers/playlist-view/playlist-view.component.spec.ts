// import { TestBed, inject } from '@angular/core/testing';
// import { HttpModule } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';

// import { PlaylistViewComponent } from './playlist-view.component';
// import { PlaylistViewService } from './shared/playlist-view.service';
// import { PlaylistView } from './shared/playlist-view.model';

// describe('a playlist-view component', () => {
// 	let component: PlaylistViewComponent;

// 	// register all needed dependencies
// 	beforeEach(() => {
// 		TestBed.configureTestingModule({
// 			imports: [HttpModule],
// 			providers: [
// 				{ provide: PlaylistViewService, useClass: MockPlaylistViewService },
// 				PlaylistViewComponent
// 			]
// 		});
// 	});

// 	// instantiation through framework injection
// 	beforeEach(inject([PlaylistViewComponent], (PlaylistViewComponent) => {
// 		component = PlaylistViewComponent;
// 	}));

// 	it('should have an instance', () => {
// 		expect(component).toBeDefined();
// 	});
// });

// // Mock of the original playlist-view service
// class MockPlaylistViewService extends PlaylistViewService {
// 	getList(): Observable<any> {
// 		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
// 	}
// }
