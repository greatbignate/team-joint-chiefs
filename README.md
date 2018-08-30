# team-joint-chiefs

## Included Files

### Standard Files
* [readme.md](readme.md) - THIS FILE.
* [user_stories.md](user_stories.md) - Contains User Scenario (Project Domain) and breakout of user stories.
* [group_agreement.md](group_agreement.md) - Group agreement to establish group expectations and dyanmics.
* [project_timeline.md](project_timeline.md) - Contains both projected timeline and daily agenda items.
* .gitignore and .eslintrc.json - files to support coding structure and git management.

### HTML
* [index.html](index.html) - Home page.  Allows the user to enter and verify the data to be processed.  Links to ABOUT US through the nav and the print preveiw page through a button that is available after confirm entered data. Accessible from both print.html and about.html.
* [print.html](print.html) - displays the prinatable list of inventory items based on the users data entry.  ONLY visiable after clicking the print preview button during data confirmation.  Has a button to initiate the Windows Print Dialog.
* [about.html](about.html) - Displays picture and summary information about Team Joint Chiefs.  Accesible from both index.html and print.html.

### CSS
* [reset.css](css/reset.css) - CSS file from Eric Meyer(http://meyerweb.com/eric/tools/css/reset/ ) to clear all built in browser styling.
* [style.css](css/style.css) - CSS file that establishs consistent feel across all pages.
* [form.css](css/form.css) - CSS file to style information that is unique to index.html.
* [print.css](css/print.css) - CSS file to style information that is unique to print.html.
* [about.css](css/about.css) - CSS file to style information that is unique to about.html.

### JavaScript
* [app.js](/js/app.js) - Contains JavaScript that defines the data model for the app and stores collected information in local storage. Used by both index.html and print.html.
* [form.js](/js/form.js) - Contains JavaScript that integrates the form process with the data model.  Used by index.html.
* [print.js](/js/print.js) - Contains JavaCript that retrieves the saved data, processes it to create the inventory, and renders the printable information.

## 24 August 2018 (Friday)
- (ALL) Established team protocols as reflected in group_agreement.md
- (ALL) Started basic project timeline as refelcted in project_timeline.md

## 26 August 2018 (Sunday)
- (DC) Populated .eslintrd.json and .gitignore with required information.
- (DC) Created initial User Story setup for team approval. Located in user_stories.md
- (DC) Renamed home.html to print.html to better represent the flow of pages.

## 27 August 2018 (Monday)
- (NV-Driver DC-Nav) Converted literal objects to constructors, built initial draft of submit process functions.
- (R/J) Completed HTML Form with id's for input fields and buttons.
- (R/J) added some styiling to the index page.
- (NV-Driver DC-Nav) refined submit process functions, added local storage functionality, linked HTML references.

## 28 August 2018 (Tuesday)
- (JE-Driver RM-Nav) Completed MVP for the front-end; print page to be finished once JS ready.
- (DC-Driver NV-Nav) Worked on creating a data sctructure to store only the required inventory
- (DC) Refactored intial table render.

## 28 August 2018 (Wednesday)
- (RM - Driver DC - Nav) Identified font, restructured input form, integrated texas holdem chairs into the object, "Craps" and "Roulette" now toggle info.
- (JE-Driver NV-Nav) Started framework for print page, populating functions into print.js.
- (RM - Driver DC - Nav) Edit button repopulates the entry form with given values. Created Pit Boss and Craps. Home page is MVP.
- (JE-Driver NV-Nav) Data rendering to print js page, need to add 1 function then at MVP.
- (NV) All data items functional into print page. Minor edits required, to include placing title function into selector logic, separating craps table equipment from craps tub if deemed necessary. Still need to fix button functionality.
- (DC) Light refactoring of confiramtion list render.  Fixed button on Print Preview to open windows print dialog box. Updated (readme.md) and (project_timeline.md).

## 28 August 2018 (Thursday)
- (NV) fixed table ID dynamic creation logic, linter errors. Cleaned some corpse code out of print.js.



## 28 August 2018 (Friday)