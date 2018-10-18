/// <reference types="Cypress" />

import * as sidebarApi from '../sidebar.api';
import * as videosResult from '../videos-results.api';
import * as playerControls from '../player-controls.api';

context('Echoes Player', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

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
  it('should play a video by clicking the title', () => {
    videosResult.queueTracks(3);
    sidebarApi.getAllTrack().should('have.length', 3);
    sidebarApi.playTrackWithTitle(1).as('currentTrack');
    playerControls.getMediaTitle().then($title => {
      cy.get('@currentTrack').should('contain', $title.text());
    });
  });

});
