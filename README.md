# EPI-USE_EmployeeTree
## Overview
To implement this technical assignment I made use of Angular, with Angular Material, and Firebase's cloud storage called Firestore. Users are able to login, view their hierarchy and edit their own schedule as well as employees that report to them. 

### Functionality

* When the the user first visits the website they are greeted with a login screen.
  - Attempts to access other pages of the web app will redirect the user back to the login page, if they are not logged in.
  - If incorrect user details are provided a message is displayed to indicate the credentials are incorrect.
  - Passwords were hashed when they were stored on the database using bcrypt.
* Once the user successfully logs in they will be taken to the Home screen, where the Hierarchy is currently being displayed.
  - The hierarchy only displays the Employee Tree of the currently logged in employee.
  - To view the Schedule Management Screen, the user can click on the tab called "Schedule Management".
* On the Hierarchy Screen, if the user has employees reporting to them, there will be an arrow next to their title and employee ID that they can click to expand the tree and display the employees that report to them. If the user is an intern, with no one that reports to them, then they will only see their Title and employee ID.
* On the Manage Schedule Screen the user is able to add, edit and delete items in their schedule.
  - If a user has employees reporting to them, they can enter the employee's ID who's schedule they want to edit.
  - This will display that employee's schedule in a table where the user can add, edit and delete items.
  - If the employee ID the user entered is not the ID of an employee reporting to them then no schedule will be displayed.
  - Users can thus only edit their own schedule and the schedule of employees reporting to them.
  - When changes are made to the user's schedule the page will refresh and once the user goes back to the Manage Schedule Screen, the changes will be visible. For changes made to employees working under the user, the employee's ID will need to be entered again to view the changes. 
* To logout the user needs to go to the Logout screen and click the Logout button.
  - If the user logs out, they won't be able to access the other pages of the website.

### Bugs

* If a user logs out and then logs back in immediately, the hierarchy will not display correctly but it is fixed once the page is refreshed. The user is still able to correctly add, edit and delete schedule items.


## Architecture

![ArchitevtureDiagram](https://user-images.githubusercontent.com/93199902/185946555-53f7d7fc-c1da-4022-b362-b0696faf7976.jpg)

## Setup
