const appUrl = 'http://localhost:4200';

export const searchFor = (query, delay = 0) =>
  cy.get('player-search input').type(query, { delay });

export const selectSuggestion = index =>
  cy.get('.ta-results .ta-item').eq(index);
// PRESETS Component
export const getActivePreset = () =>
  cy.get('app-navbar .navbar__content button-group .active');

export const toggleSidebar = () => cy.get('app-brand button').click();
