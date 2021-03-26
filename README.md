# PROJECT 01
## BALLN App
* [Live Link](https://stevenstefanov.github.io/nba-game-locator/)
* [Repo Link](https://github.com/stevenstefanov/nba-game-locator)

## Description
This is a sports app leveraging 2 APIs, the first being the NBA API which will retrieve game statistics for a team and the second API will retrieve the team's future games and ticket information. This will assist the user with getting their favorite NBA team's most updated stats and future games ticket information.

## Usage/Acceptance Criteria
The app will perfom the following logic:
* The app will display a dropdown which will display a list of all NBA teams.
* Once the user selects their team, the user will click on the Submit button.
* Upon hitting Submit, the app will store user selection in localStorage object and load a page displaying information about their team's stats, future dated games with ticketmaster link information.

## Basketball API Key Install
To successfully run the app, user will need to obtain an API key for the Basketball API. To do so, user will need to go to https://rapidapi.com/api-sports/api/api-basketball, create an account and get a personal API key. Once obtained, the key must be input in index.js on line 35 and in results.js on line 61. Once saved, the app will run fully.

## Preview of App
* This is how the app looks

![Screenshot](./assets/images/userQuery.JPG)

![Screenshot](./assets/images/index.jpg)
# License
* MIT