/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() =>{
    cy.clock();
    cy.fixture('user-location.json').as('userLocation');
    cy.visit('/').then( win =>{

      cy.get('@userLocation').then(fackPosition => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .as('getUserPosition')
        .callsFake((cb) => {
          setTimeout(() =>{
            cb(fackPosition);
          }, 100);
        });
      });

    });
    cy.stub(win.navigator.clipboard, 'writeText')
      .as('saveToClipboard')
      .resolves();

    cy.spy(win.localStorage, 'setItem').as('storeLocation');
    cy.spy(win.localStorage, 'getItem').as('getStoreLocation');
  });

  it('should fetch the user location', () => {

    // cy.stub(window.navigator.geolocation, 'getCurrentPosition');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');

    //button is disable
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched!'); ///contain();
  });

  it('should share a location URL', () => {
    cy.visit('/');
    cy.get('[data-cy="name-input"]').type('John Mar');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.called');

    cy.get('@userLocation').then(fakePosition => {
      const {latitude, longitude} = fakePosition.coords
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Mar')}`)); //lat,long,name
    });

    cy.get('@storeLocation').should(
      'have.been.calledWithMatch',
      /John Mar/,
      new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Mar')}`)); //lat,long,name

    cy.get('@storeLocation').should('have.been.called');
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getStoreLocation').should('have.been.called');
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', visible);
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');
  });


});
