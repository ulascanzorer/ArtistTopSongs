# ArtistTopSongs
A web app which allows users to get the top tracks of an artist using Spotify. It uses Node.js (Express.js) for backend and Vue.js for frontend. 

## Using it locally
In order to run the app locally, add a .env file to the root directory with the following content:
```
SPOTIFY_API_ID=YOUR_SPOTIFY_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_SECRET
```
To access YOUR_SPOTIFY_ID and YOUR_SPOTIFY_SECRET simply create an application on the Spotify Api website and copy the values that you find there after creating your application.

After that, run this to install the dependencies:
```
npm install
```
and finally to launch the app:
```
node server.js
```
...and now the app should be running on http://localhost:3000!

Website url: https://artisttopsongs.onrender.com/
