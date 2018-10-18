/// <reference types="Cypress" />

export const toggleSidebar = () => cy.get('app-brand button').click();
export const toggleSidebarWithHeader = () => cy.get('app-brand .brand-container').click();
export const navigateToExplore = (params) => cy.get('app-navigator .list-group-item').eq(0).click();
export const getPlaylistFilter = () => cy.get('now-playlist-filter');
export const clickFindCurrentlyPlayingTrack = () => getPlaylistFilter().find('.playlist-header').click();
export const clearPlaylist = () => getPlaylistFilter().filter('.btn-clear').click();
export const filterPlaylistWith = (query, delay = 0) => getPlaylistFilter().find('.playlist-filter .playlist-search').type(query, { delay })
export const clearPlaylistFilter = () => getPlaylistFilter().find('.playlist-filter .text-danger');
export const getPlaylist = () => cy.get('now-playlist');
export const getTrack = (index) => getPlaylist().find('now-playlist-track').eq(index);
export const getAllTrack = (index) => getPlaylist().get('now-playlist-track');
export const playTrackWithTitle = (index) => getTrack(index).find('.video-title').click();
export const playTrackWithThumbnail = (index) => getTrack(index).find('.video-thumb').click();