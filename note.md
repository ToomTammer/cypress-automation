npm init -y

##Setup & Adding Test
>Installing
npm install cypress --save-dev

>cypress open
npx cypress open

>Adding npm Scripts
npm run cy:open

>Add IDE (at above document)
/// <reference types="Cypress" />
///^ add IDE cypress

>Running Tests Without Cypress Studio & Working with Screenshots + Videos
///something use run it can fail because certain elements can't be selected successfully. Using a unique selector instead

npx cypress run

>can take screenshots at specific points of time.

cy.screenshot();

>other
#should() instead of then() 
///bceause when use npx cypress run can it fail because certain elements can't be selected successfully.

.then(el =>{
    expect(el.attr('class')).to.contains('invalid');
});

V
V
.should('have.attr', 'class').and('match', /invalid/);

OR 

.should((el) =>{
    expect(el.attr('class')).not.to.be.undefined;
    expect(el.attr('class')).to.contains('invalid');
});
-------------------------------------