/*
 * Testing a Service
 * More info: https://angular.io/docs/ts/latest/guide/testing.html
 */
import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { YoutubeApiService } from './youtube-api.service';

describe('YoutubeApiService', () => {
  let authSpy;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('authSpy', ['signIn']);
    authSpy.accessToken = 'testing';
  });

  it('should reset config when instansiated', () => {
    spyOn(YoutubeApiService.prototype, 'resetConfig').and.callThrough();
    const service = new YoutubeApiService({}, authSpy);
    const actual = service.resetConfig;
    const expected = 1;
    expect(actual).toHaveBeenCalledTimes(expected);
  });


  it('should create authorization header when accessToken exists', () => {
    const token = 'mocked-token-for-test';
    const service = new YoutubeApiService({}, authSpy);
    authSpy.accessToken = token;
    const actual = service.createHeaders();
    const expected = 'authorization';
    expect(actual.get(expected)).toContain(token);
  });


  it('should set url, http and idKey by the options', () => {
    const options = {
      url: 'mocked-url',
      http: {},
      idKey: 'mocked-idkey'
    };
    const service = new YoutubeApiService(options, authSpy);
    expect(service.url).toMatch(options.url);
    expect(service.idKey).toMatch(options.idKey);
  });

  it('should set configuration when instansiated', () => {
    spyOn(YoutubeApiService.prototype, 'setConfig').and.callThrough();
    const options = {
      url: 'mocked-url',
      http: {},
      idKey: 'mocked-idkey',
      config: {
        mine: 'true'
      }
    };
    const service = new YoutubeApiService(options, authSpy);
    const actual = service.setConfig;
    const expected = 1;
    expect(actual).toHaveBeenCalledTimes(expected);
  });

  it('should check that the token exists', () => {
    const token = 'fake token';
    const service = new YoutubeApiService({}, authSpy);
    const actual = service.hasToken();
    expect(actual).toBeTruthy();
  });

});
