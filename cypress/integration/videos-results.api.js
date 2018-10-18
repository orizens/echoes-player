/// <reference types="Cypress" />

export const getVideosResults = () => cy.get('youtube-videos youtube-list youtube-media');
export const queueTracks = (amount) => {
  getVideosResults()
    .filter(index => index < amount)
    .each((el, index) => el.find('.first-action').click())
}
