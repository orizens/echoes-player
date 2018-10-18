/// <reference types="Cypress" />

import {
  searchFor,
  getActivePreset,
  toggleSidebar,
  selectSuggestion
} from '../components.api';
import * as sidebarApi from '../sidebar.api';

context('Echoes Player', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  // https://on.cypress.io/interacting-with-elements
  it('should allow typing a search term', () => {
    // https://on.cypress.io/type
    const query = 'ambient';
    searchFor(query, 100).should('have.value', query);
  });

  it('should have "Any" preset active by default', () => {
    getActivePreset().should('have.text', ' Any ');
  });

  it('should search by clicking the search icon', () => {
    const query = 'ambient';
    const searchUrl = 'https://www.googleapis.com/youtube/v3/search*';
    const videosUrl = 'https://www.googleapis.com/youtube/v3/videos*';
    cy.server();
    cy.route('GET', searchUrl).as('getSearchResults');
    cy.route('GET', videosUrl).as('getVideoResults');

    cy.clearLocalStorage();
    searchFor(query).type('{esc}');
    selectSuggestion(2).click();

    cy.wait(['@getSearchResults', '@getVideoResults']);

    cy
      .get('youtube-videos youtube-list youtube-media')
      .should('have.length', 50)
  });

  it('should play a video', () => { });

  it('should collapse sidebar', () => {
    sidebarApi.toggleSidebar()
      .get('app-sidebar')
      .should('have.class', 'closed')
      .get('app-brand button')
      .should('not.be.visible');
  });

  it('should show sidebar', () => {
    sidebarApi.toggleSidebar()
    cy.get('app-sidebar')
      .should('have.class', 'closed').as('sidebar')
    sidebarApi.toggleSidebarWithHeader();
    cy.get('@sidebar')
      .should('not.have.class', 'closed')
      .get('app-brand button')
      .should('be.visible');
  });
});
