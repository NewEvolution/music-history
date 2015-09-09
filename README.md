#Music History

Long running project with multiple iterations.  Current state is using modular RequireJS construction and ECMAScript 6 via the Babel transpiler.

Allows for submission & viewing of songs with filters by album/artist/genre and a full-text search.

###Requirements:
- Node.js https://nodejs.org/en/
- Installation of http-server via _npm install -g http-server_
- A Github account
- Your own fork of this repo
- A local clone of your fork of this repo
- Register your fork as a developer application: https://github.com/settings/developers
- An account on Firebase: https://www.firebase.com/
- New empty Firebase app
- In your Firebase app's login and auth page, enable Github authentication
- Copy the GitHub Client ID & GitHub Client Secret from your fork's developer application page into your Firebase app's Github authentication fields

###Post Cloning Your Fork Locally:
- Modify _javascripts/authentication.js_, replacing the Firebase URL with your own Firebase app's URL
- Inside the _lib_ directory:
  - Run _npm install_
  - Run _bower install_
- Inside the main repo directory:
 - Run _http-server_
 - Make note of the port number returned after running _http-server_
- Navigate to http://localhost:[your-port-number]

###Usage:
- Authenticate with Github
- Add Music menu option allows for adding of new songs to the database
- View Music provides filtering of the added songs via the form to the left