Blindside coding test

The application can be started via a terminal using the following command:

- npm run start

Please note that due to API constraints the application needs to be hosted on:
http://localhost:3000

Features

- This application uses Auth0 to log users in, authenticate them and log them out. Without logging in other application features are not accessible.
- Once logged in, users can navigate a video storage api via the main search page input bar or the nav search bar which is only accessible when not on the search page or videos are not currently loading.
- Once a search has been initiated, the application will then send users to the results page where their parameters are input into the search query and extracted with a React hook.
  This query is then sent to the API using the axios package.
- When results are fetched using axios, they are then interpreted in an easily digestable and paginated format in the results page. Users can click on any video to fetch that video's data, or select the next page (if applicable) to load more videos.
- When a video is clicked on, it will send the user to the video's individual page which contains the embedded video, a paginated (if applicable) list of related videos and a comments section.
- Users can leave comments and toggle the comments section on and off. Comments are not saved when changing pages.

API used: https://developer.vimeo.com/api/guides/start
