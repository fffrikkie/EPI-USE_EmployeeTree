# EPI-USE_EmployeeTree

The code for can be found on the master branch.

## Overview
To implement this technical assignment I made use of Angular, with Angular Material, and Firebase's cloud storage called Firestore. Users are able to login, view their hierarchy and edit their own schedule as well as employees that report to them. A user that isn't logged in won't have access to the features provided.

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
  - For the Edit Item and Delete Item buttons to become enabled the user needs to click on a schedule item in the table.
* To logout the user needs to go to the Logout screen and click the Logout button.
  - If the user logs out, they won't be able to access the other pages of the website.

### Bugs

* If a user logs out and then logs back in immediately, the hierarchy will not display correctly but it is fixed once the page is refreshed. The user is still able to correctly add, edit and delete schedule items.


## Architecture

![ArchitevtureDiagram](https://user-images.githubusercontent.com/93199902/185946555-53f7d7fc-c1da-4022-b362-b0696faf7976.jpg)

## Setup

* Clone the repo in a folder on your system.
* Change directories to the EPI-USE_EmployeeTree (`cd EPI-USE_EmployeeTree` if you cloned the repository using a terminal)
* Switch to the master branch with `git checkout master`
* Type `npm install` and wait for the necessary packages to install.
* Then type `ng serve` to host the web app on your localhost.
* If it compiled successfully, type `localhost:4200` in your web browser's URL bar.

## Screenshots

### LOGIN

![login](https://user-images.githubusercontent.com/93199902/185972641-983831de-ebb1-40f5-b9dd-2d8d7b11b6ce.png)

### HOME

![home](https://user-images.githubusercontent.com/93199902/185972791-5bb0ce15-0104-4f9a-9c3d-2bc53db5f7d3.png)

### HIERARCHY (EXPANDED)

![hierarchy](https://user-images.githubusercontent.com/93199902/185972970-cef84214-38f9-45e1-837e-08fd7b03b7c3.png)


### MANAGE SCHEDULE

![manageSchedule](https://user-images.githubusercontent.com/93199902/185973207-03c1de4e-8ca8-47e8-ab93-ebbd9f6b215f.png)

### MANAGE SCHEDULE (ADD ITEM)

![addItem](https://user-images.githubusercontent.com/93199902/185975863-9e66bd00-93f5-4eb6-8576-90ed672b026b.png)

### MANAGE SCHEDULE (EDIT ITEM AND VIEW OTHER EMPLOYEE SCHEDULE)

![subEdit](https://user-images.githubusercontent.com/93199902/185976070-1f01f5e4-6bc2-48d0-89c8-82b4eadd77ab.png)

### LOGOUT

![logout](https://user-images.githubusercontent.com/93199902/185976147-8ca4c0b5-706f-494a-8cb9-0f2f82fd08dd.png)
