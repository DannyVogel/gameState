# *gameState*

A progressive web app I created using React and Firebase to search for videogames and display them two one of two lists: games played and games to play. This was a great experience in managing state across multiple components and using both Firebase authentication and realtime storage, all with a mobile first design. 

Live at: https://dv-gamestate.netlify.app/ 

## Features: 
- search for games on all platforms (data provided by RAWG API)
- save to a list: Games Played or Games to Play
- Insert extra info to games saved to games played list: Date played, comments, status (playing, beat, dropped)
- sync lists across devices with account
- Game image galleries

## Upcoming features: 
- edit games in played games list (April 2023 update: added!)
- year and status filters for games played list (April 2023 update: added; more filters to come!)
- desktop version (April 2023 update: updated; more to come!)
- follow users and view their lists!

## Changelog

v. 1.9.0 - December 2023 update - Major refactor over entire codebase! I've been meaning to refactor my personal favorite and most used app to implement many things I have learned over the last few months as a professional frontend developer, while also setting the stage for new features. 

- Database restructuring: simplified structure and using single list with status attribute determining which list to show on
- Added React Router: component routing with error and 404 handling
- Zustand state management: reduced prop drilling by using store for user data and game list
- change to Tailwind CSS: style update and simplification
- DaisyUI: implemented component library in some cases; added global theme switcher
- Favicon update
- Directory restructuring: more folders and file renaming
- extracted API calls to separate files handled by controllers

v. 1.5.0 - July 2023 update!
- add loading screen on visit
- add welcome page for logged in users
- update styles to a darker version
