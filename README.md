# Dashboard Framework

### Step 1: Install Node.js from the Node Website.
We recommend Node version 4.1 or above. You can check your node version by running this:
$ node -v
vv4.1...
### Step 2: Install Dependencies
npm install
### Running the App
ng serve
### Then visit http://localhost:4200 in your browser.

## How to add a widget to the project
#### *  Navigate to    :   \DashboardFrameworkPFE\src\app\dashlets\simpledashlets\
#### *  Copie-paste your component there 
#### *  Import your component in index.ts like the samples provided 
If  you want to use our features like saving the state of the widget and load it to let the user continue from where he left every time he opens the application, you will just extends our class named 'DashletBaseComponent'

In this class you can use the method 'SaveContentState(data)' and you will find your previous data in an attribute named 'StoredData'

## Provide a demo for the end user
If you want to help your clients understand how the dashboard and its widgets work, you can create a video showing a demo, and by adding the ID of the YouTube video in the 'YoutubeID' attribute and your clients will now be able to watch it when they need help.
 
## Testing
Testing is important for big projects. So we have good old js combo!

App is configured for running end-to-end (via [Protractor](http://www.protractortest.org/)) and unit (via [Karma](https://karma-runner.github.io)) tests

`npm run e2e` shortcut for executing end-to-end tests. 
`npm run test` for unit tests.


