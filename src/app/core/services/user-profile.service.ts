import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/buffer';
import { of } from 'rxjs/observable/of';

import { YoutubeApiService } from './youtube-api.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { Authorization } from './authorization.service';

import { GoogleBasicProfile } from '../store/user-profile';
import { IUserProfile } from '../store/user-profile/user-profile.reducer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const INIT_STATE: IUserProfile = {
  access_token: '',
  playlists: [],
  data: {},
  nextPageToken: '',
  profile: {},
  viewedPlaylist: ''
};

@Injectable()
export class UserProfile {
  isSearching: Boolean = false;
  public playlistInfo: YoutubeApiService;
  public playlists: YoutubeApiService;
  public playlistApi: YoutubeApiService;

  public userProfile$: Observable<IUserProfile>;
  private userProfileSubject: BehaviorSubject<IUserProfile>;

  constructor(
    private http: Http,
    private zone: NgZone,
    private youtubeVideosInfo: YoutubeVideosInfo,
    private authorization: Authorization
  ) {

    this.userProfileSubject = new BehaviorSubject(INIT_STATE);
    this.userProfile$ = this.userProfileSubject.asObservable();

    this.playlistInfo = new YoutubeApiService({
      url: 'https://www.googleapis.com/youtube/v3/playlistItems',
      http: this.http,
      idKey: 'playlistId',
      config: {
        mine: 'true'
      }
    }, authorization);

    // TODO - extract to a Model / Reducer?
    // Reducer - because nextPageToken is changed
    // Model - new _config should be recreated easily with a new nextPageToken
    this.playlists = new YoutubeApiService({
      url: 'https://www.googleapis.com/youtube/v3/playlists',
      http: this.http,
      config: {
        mine: 'true',
        part: 'snippet,id,contentDetails'
      },
    }, authorization);

    this.playlistApi = new YoutubeApiService({
      url: 'https://www.googleapis.com/youtube/v3/playlists',
      http: this.http,
      idKey: 'id',
      config: {
        part: 'snippet,id,contentDetails'
      },
    }, authorization);
  }

  getPlaylists(isNewPage: boolean) {
    const hasAccessToken = this.playlists.hasToken();
    if (!hasAccessToken) {
      return;
    }
    if (isNewPage) {
      this.playlists.resetPageToken();
    }
    // TODO - extract to a reducer or/and an @Effect - SEARCH_START, SEARCH_COMPLETED
    this.isSearching = true;
    return this.playlists.getList();
  }

  resetPageToken() {
    this.playlists.config.set('pageToken', '');
  }

  fetchPlaylist(playlistId: string) {
    return this.playlistApi.list(playlistId);
  }

  fetchPlaylistItems(playlistId: string, pageToken = '') {
    // const token = this.playlists.config.get('access_token');
    if ('' === pageToken) {
      this.playlistInfo.config.delete('pageToken');
    } else {
      this.playlistInfo.config.set('pageToken', pageToken);
    }
    return this.playlistInfo
      .list(playlistId)
      .switchMap(response => {
        const videoIds = response.items.map(video => video.snippet.resourceId.videoId).join(',');
        return this.youtubeVideosInfo.api.list(videoIds);
      });
  }

  fetchAllPlaylistItems(playlistId: string) {
    let items = [];
    const subscriptions: Subscription[] = [];
    const items$ = new Subject();
    let nextPageToken = '';
    const fetchMetadata = (response) => {
      const videoIds = response.items.map(video => video.snippet.resourceId.videoId).join(',');
      nextPageToken = response.nextPageToken;
      return this.youtubeVideosInfo.api.list(videoIds);
    };
    const collectItems = (videos) => {
      items = [...items, ...videos];
      if (nextPageToken) {
        fetchItems(playlistId, nextPageToken);
      } else {
        items$.next(items);
        subscriptions.forEach(_s => _s.unsubscribe());
        items$.complete();
      }
    };
    const fetchItems = (id, token) => {
      this.playlistInfo.config.set('pageToken', token);
      const sub = this.playlistInfo.list(id)
        .switchMap((response) => fetchMetadata(response))
        .subscribe((response) => collectItems(response));
      subscriptions.push(sub);
      return sub;
    };
    fetchItems(playlistId, '');
    return items$.take(1);
  }

  isTokenValid(token) {
    const accessToken = this.playlists.config.get('access_token');
    // TODO - should check if the current accessToken is still valid - google api
    return accessToken === token;
  }

  toUserJson (profile): GoogleBasicProfile {
    const _profile: GoogleBasicProfile = {};
    if (profile) {
      _profile.imageUrl = profile.getImageUrl();
      _profile.name = profile.getName();
    }
    return _profile;
  }

  fetchMetadata (items: GoogleApiYouTubeVideoResource[]) {
    const videoIds = items.map(video => video.id).join(',');
    return this.youtubeVideosInfo.api.list(videoIds);
  }

  updateToken(token: string) {
    // case UserProfileActions.UPDATE_TOKEN:
    //   return { ...state, access_token: action.payload, playlists: [] };

    // @Effect()
    //   updateToken$ = this.actions$
    //     .ofType(UserProfileActions.UPDATE_TOKEN)
    //     .map(toPayload)
    //     .map((token: string) => (this.auth.accessToken = token))
    //     .switchMap(token =>
    //       this.userProfile.getPlaylists(true).catch((error: Error) => {
    //         console.log(`error in fetching user's playlists ${error}`);
    //         return of(error);
    //       })
    //     )
    //     .map(response => this.userProfileActions.updateData(response));

    this.userProfileSubject.next({
      ...this.userProfileSubject.getValue(),
      access_token: token,
      playlists: []
    });

    this.authorization.accessToken = token;

    this.getPlaylists(true).catch((error: Error) => {
      console.log(`error in fetching user's playlists ${error}`);
      return of(error);
    }).subscribe(response => this.updateData(response));
  }

  private updateData(response: any) {
    // case UserProfileActions.UPDATE:
    //   return { ...state, data: action.payload };

    // @Effect()
    //   addUserPlaylists$ = this.actions$
    //     .ofType(UserProfileActions.UPDATE)
    //     .map(toPayload)
    //     .map((data: any) => this.userProfileActions.addPlaylists(data.items));

    // @Effect()
    //   updateNextPageToken$ = this.actions$
    //     .ofType(UserProfileActions.UPDATE)
    //     .map(toPayload)
    //     .map(data => {
    //       const nextPageToken = data.nextPageToken;
    //       return nextPageToken
    //         ? this.userProfileActions.updatePageToken(data.nextPageToken)
    //         : this.userProfileActions.userProfileCompleted();
    //     });

    this.userProfileSubject.next({
      ...this.userProfileSubject.getValue(),
      data: response
    });

    this.addPlayList(response.items);

    const nextPageToken = response.nextPageToken;
    return nextPageToken
      ? this.updatePageToken2(response.nextPageToken)
      : this.userProfileCompleted();
  }

  private addPlayList(items: any) {
    // case UserProfileActions.ADD_PLAYLISTS:
    //   return { ...state, playlists: [...state.playlists, ...action.payload] };

    const userProfile = this.userProfileSubject.getValue();
    this.userProfileSubject.next({
      ...userProfile,
      playlists: [...userProfile.playlists, ...items]
    });
  }

  private updatePageToken2(nextPageToken: any) {
    // case UserProfileActions.UPDATE_NEXT_PAGE_TOKEN:
    //   return { ...state, nextPageToken: action.payload };

    // @Effect()
    //   getMorePlaylists$ = this.actions$
    //     .ofType(UserProfileActions.UPDATE_NEXT_PAGE_TOKEN)
    //     .map(toPayload)
    //     .switchMap((pageToken: string) => {
    //       this.userProfile.updatePageToken(pageToken);
    //       return this.userProfile.getPlaylists(false);
    //     })
    //     .map(response => this.userProfileActions.updateData(response));
    //

    this.userProfileSubject.next({
      ...this.userProfileSubject.getValue(),
      nextPageToken
    });

    this.updatePageToken(nextPageToken);
    this.getPlaylists(false).subscribe(response => {
      // this.userProfileActions.updateData(response));
      // ??? again and again and again?
      this.updateData(response);
    });
  }

  private userProfileCompleted() {
      // ??? what is this for? too many action placeholders
  }

  userProfileRecieved(profile: gapi.auth2.BasicProfile) {
    // @Effect()
    //   userProfileRecieved$ = this.actions$
    //     .ofType(UserProfileActions.USER_PROFILE_RECIEVED)
    //     .map(toPayload)
    //     .map(profile => this.userProfile.toUserJson(profile))
    //     .map((profile: GoogleBasicProfile) => this.userProfileActions.updateUserProfile(profile));

    this.updateUserProfile(this.toUserJson(profile));
  }


  private updateUserProfile(profile: GoogleBasicProfile) {
    // case UserProfileActions.UPDATE_USER_PROFILE:
    //   return { ...state, profile: action.payload };

    this.userProfileSubject.next({
      ...this.userProfileSubject.getValue(),
      profile
    });
  }

  signOut() {
    // case UserProfileActions.LOG_OUT:
    //   return { ...initialUserState };

    this.userProfileSubject.next({
      ...INIT_STATE,
    });
  }

  private updatePageToken(pageToken: string) {
    this.playlists.config.set('pageToken', pageToken);
  }
}
