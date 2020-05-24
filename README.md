# css-clock

The clock that uses 0 front-end javascript.

This was built as a way to show that there are other ways to do common things.

## How it works

The key here is zero front-end javascript.
The server runs on a simple nodejs backend which dynamically generates a CSS file to initiate the CSS Animations with the correct delays.

Once the client has the time set, the animations will repeat indefinitely.

## Show me it in action!

You can start the server with a simple `node server.js`.

Make sure to have all clock.css, clock-animations.css, clock.html and server.js all in the same folder.
