# Code 201: Final Project

## User Scenario:

West Coast Entertainment (WCE) has been planning successful events since 1978 with a proven team, trusted resources, and a stress-free process to take care of all the details so you can be a guest at you next party.  In addition to event planning, WCE is also the largest provider of mock casinos in the Northwest.  A mock casino is like setting up a Las Vegas style casino without using real money.

To prepare for a mock casino, the WCE Director of Operations must generate a load sheet for the warehouse crew so the correct inventory items can be loaded in the truck for that event.  Currently he uses a blank load sheet and manually identifies the required equipment and calculates the individual inventory items manually.  This method is adequate when you only have one or two events on a weekend.  However, in December, when there are 25 events on a weekend, this becomes very time consuming and has a greater potential for making an error.  This is especially true when last minute changes are made to an event and inventory must be calculated on the fly.  

WCE would like to have a web interface that allows the user to enter the types of entertainment (primarily casino tables) that have been sold for an event.  Additionally, there should be a place to enter the required truck (and size if appropriate), along with basic client information and event location.  The data entry screen should display the requested entertainment as it is entered with an option to print the load sheet based on the entered information.

## User Stories:

### West Coast Entertainment

-	As the user, I want an intuitive and simple process to enter information, so the process is easily accomplished by any employee.
-	As the user, I want an option to make changes to the entertainment, so incorrect entries can be removed or updated.
-	As the user, I want an option to print the entered data in a check-off style load sheet, so the warehouse personnel can easily track both what needs to be loaded and what is left to load.
-	As the user, it would be nice (but not required) to save individual load sheets for each event, so they can be recalled later and reprinted.

### Team Joint Chiefs

-	As the developer, I need to create a UX/UI that is easy to use and intuitive, so that any user can easily understand how to use the app.
-	As the developer, I need to create a data model that allows the user to enter client, entertainment, and truck information, so it can be calculated and presented in a printable way.
-	As the developer, I need to create a series of constructor functions for the data, so the information can be both manipulated and stored for printing.
-	As the developer, I need to create screen readable, print formatted, output, so the user can print the results on an 8.5” x 11” sheet of paper.

### Stretch Goals:

-	As the developer, I need to create a process to store client information along with their equipment information, so the user can enter several load sheets before printing/retrieving only one or all of those load sheets.
