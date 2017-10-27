// import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
// import { inject, TestBed } from '@angular/core/testing';

// import { Observable } from 'rxjs/Observable';
// import { MediaParserService, YoutubePlayerService } from '../services';
// import { Store } from '@ngrx/store';

// import { NowPlaylistActions, LoadPlaylistAction, LoadPlaylistEndAction, PlayPlaylistAction } from '../store/now-playlist';

// import { UserProfile } from '../services/user-profile.service';
// import { NowPlaylistEffects } from './now-playlist.effects';

// describe('Now Playlist Effects', () => {
//   let runner: EffectsRunner;
//   let nowPlaylistEffects: NowPlaylistEffects;

//   beforeEach(() => {
//     const storeSpy = jasmine.createSpyObj('storeSpy', [
//       'dispatch', 'subscribe'
//     ]);
//     storeSpy.select = () => Observable.of([]);
//     storeSpy.let = () => Observable.of({});
//     const playerServiceSpy = jasmine.createSpyObj('playerServiceSpy', [
//       'seekTo'
//     ]);
//     const userProfileSpy = {
//       fetchAllPlaylistItems: jasmine.createSpy('fetchAllPlaylistItems')
//         .and.returnValue(Observable.of([])),
//       fetchMetadata: jasmine.createSpy('fetchMetadata')
//         .and.returnValue(Observable.of([]))
//     };
//     TestBed.configureTestingModule({
//       imports: [
//         EffectsTestingModule
//       ],
//       providers: [
//         NowPlaylistEffects,
//         { provide: Store, useValue: storeSpy },
//         { provide: YoutubePlayerService, useValue: playerServiceSpy },
//         { provide: UserProfile, useValue: userProfileSpy },
//         NowPlaylistActions,
//         MediaParserService
//       ]
//     });
//   });

//   beforeEach(inject([
//       EffectsRunner, NowPlaylistEffects
//     ],
//     (_runner, _nowPlaylistEffects) => {
//       runner = _runner;
//       nowPlaylistEffects = _nowPlaylistEffects;
//     }
//   ));

//   it('should queue video to playlist when SELECT', () => {
//     const action = {
//       type: NowPlaylistActions.SELECT,
//       payload: {}
//     };
//     const expected = {
//       type: NowPlaylistActions.QUEUE,
//       payload: {}
//     };
//     runner.queue(action);

//     nowPlaylistEffects.queueVideo$.subscribe(result => {
//       expect(result).toEqual(expected);
//     });
//   });

//   it('should select the next track when MEDIA HAS ENDED', () => {
//     const action = {
//       type: NowPlaylistActions.MEDIA_ENDED,
//       payload: { id: 'mocked-id' }
//     };
//     const expected = {
//       type: NowPlaylistActions.SELECT,
//       payload: action.payload
//     };
//     runner.queue(action);

//     nowPlaylistEffects.loadNextTrack$.subscribe(result => {
//       expect(result).toEqual(expected);
//     });
//   });

//   it('should update the index of now playing media when seek', () => {
//     const action = {
//       type: NowPlaylistActions.SELECT_AND_SEEK_TO_TIME,
//       payload: { media: { id: 'mocked-id' } }
//     };
//     const expected = {
//       type: NowPlaylistActions.UPDATE_INDEX,
//       payload: action.payload.media.id
//     };
//     runner.queue(action);

//     nowPlaylistEffects.selectBeforeSeekToTime$.subscribe(result => {
//       expect(result).toEqual(expected);
//     });
//   });

//   it('should seek to given time when media is seeked', inject(
//     [YoutubePlayerService], (youtubePlayerServiceSpy) => {
//     const action = {
//       type: NowPlaylistActions.SELECT_AND_SEEK_TO_TIME,
//       payload: { time: '06:30' }
//     };
//     const actual = youtubePlayerServiceSpy.seekTo;
//     runner.queue(action);

//     nowPlaylistEffects.seekToTime$.subscribe(result => {
//       expect(actual).toHaveBeenCalled();
//     });
//   }));

//   describe('Play Playlist Sequence', () => {
//     let playPlaylistAction;

//     beforeEach(() => {
//       playPlaylistAction = new LoadPlaylistAction('fake-playlist-id');
//     });

//     it('should fetch playlist items', inject(
//       [UserProfile], (userProfileSpy) => {
//       const actual = userProfileSpy.fetchAllPlaylistItems;
//       const expected = playPlaylistAction.payload;
//       runner.queue(playPlaylistAction);
//       nowPlaylistEffects.loadPlaylist$.subscribe(result => {
//         expect(actual).toHaveBeenCalledWith(expected);
//       });
//     }));

//     it('should queue playlist items', () => {
//       const action = new LoadPlaylistEndAction([]);
//       const expected = {
//         type: NowPlaylistActions.QUEUE_VIDEOS,
//         payload: action.payload
//       };
//       runner.queue(action);

//       nowPlaylistEffects.addPlaylistItems$.subscribe(result => {
//         expect(result).toEqual(expected);
//       });
//     });

//     it('should load playlist items and queue', () => {
//       const action = new LoadPlaylistAction('fake-playlist-id');
//       const expected = new LoadPlaylistEndAction([]);
//       runner.queue(action);

//       nowPlaylistEffects.loadPlaylist$.subscribe(result => {
//         expect(result).toEqual(expected);
//       });
//     });
//   });
// });
