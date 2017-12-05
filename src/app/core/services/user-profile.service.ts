import { Injectable, NgZone } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { YoutubeApiService } from './youtube-api.service';
import { Authorization } from './authorization.service';

import { GoogleBasicProfile, IUserProfile } from '../models/user-profile';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AsyncLocalStorage } from 'angular-async-local-storage';

const INIT_STATE: IUserProfile = {
  access_token: '',
  playlists: [],
  profile: {},
  viewedPlaylist: ''
};

@Injectable()
export class UserProfile {
  public userProfile$: Observable<IUserProfile>;
  private userProfileSubject: BehaviorSubject<IUserProfile>;

  constructor(private zone: NgZone,
              public youtubeApiService: YoutubeApiService,
              private authorization: Authorization,
              private localStorage: AsyncLocalStorage) {

    this.userProfileSubject = new BehaviorSubject(INIT_STATE);
    this.userProfile$ = this.userProfileSubject.asObservable();

    this.localStorage.getItem('user-profile')
      .filter(data => data !== null).subscribe((data) => {
      this.userProfileSubject.next(data);
    });

    this.userProfileSubject.filter(l => l !== INIT_STATE)
      .distinctUntilChanged()
      .switchMap(user => {
        return this.localStorage.setItem('user-profile', user);
      }).subscribe();

    authorization.authData$.subscribe(googleUser => {
      if (googleUser === null) {
        this.userProfileSubject.next({
          ...INIT_STATE,
        });
      } else {
        this.updateToken(googleUser.getAuthResponse().access_token);
        this.userProfileRecieved(googleUser.getBasicProfile());
      }
    });
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

    this.youtubeApiService.fetchAllPlaylists().catch((error: Error) => {
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

    this.addPlayList(response);

    this.userProfileCompleted();
    // const nextPageToken = response.nextPageToken;
    // return nextPageToken
    //   ? this.updatePageToken(response.nextPageToken)
    //   : this.userProfileCompleted();
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

  private toUserJson(profile): GoogleBasicProfile {
    const _profile: GoogleBasicProfile = {};
    if (profile) {
      _profile.imageUrl = profile.getImageUrl();
      _profile.name = profile.getName();
    }
    return _profile;
  }


}
