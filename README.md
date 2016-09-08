#Music History

Long running project with multiple iterations.  Current state is using modular RequireJS construction and ECMAScript 6 via the Babel transpiler.

Allows for submission & viewing of songs with filters by album/artist/genre and a full-text search.

###Requirements:
- [Node.js](https://nodejs.org/)
- Installation of _http-server_ via `npm install -g http-server`
- Installation of _bower_ via `npm install -g bower`
- A Github account

###Post Cloning:
- Inside the _lib_ directory:
  - Run `npm install`
  - Run `bower install`
- Inside the main repo directory:
 - Run `http-server`
 - Make note of the URL returned after running `http-server`
- Navigate to that URL in your browser of choice

###Usage:
- Authenticate with Github
- Add Music menu option allows for adding of new songs to the database
- View Music provides filtering of the added songs via the form to the left
