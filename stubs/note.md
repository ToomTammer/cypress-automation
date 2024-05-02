>Stubs, Spies, Fixtures & Manipulating

#Stubs
>>>Replace existing methods
 - A replacement for an existing function/ method
 - Used for evaluating & controlling function calls
 - Dose replace the function

#Spies
>>>Add listeners to existing methods
 - A listener that's attached to a function / method
 - Used for evaluating / asserting function calls
 - Dose not change or replace the function

#Fixtures
>>>Stroe dummy testing data in central place
>>>Acess via fixture() and use in your tests

#Manipulating
>>>Use cy.clock() to manipulate the clock
>>>Then use cy.tick() to advance time
