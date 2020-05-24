const http = require('http');

const fs = require('fs');

const htmlPage = fs.readFileSync('clock.html').toString();
const clockCSS = fs.readFileSync('clock.css').toString();
const animationCSS = fs.readFileSync('clock-animations.css').toString();

var unresolvedRequests = {};

function createUUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

function cssAnimations(latency) {
  var time = new Date();
  time += latency;
  time = new Date(time).getTime() / 1000;

  return animationCSS
    .replace(/_SECONDS_/g, time % 60)
    .replace(/_MINUTES_/g, time % 3600)
    .replace(/_HOURS_/g, time % (60 * 60 * 12));
}

function cssClock(importUrl) {
  return clockCSS.replace(/_NEWURL_/g, importUrl);
}

function html() {
  return htmlPage;
}

const server = http.createServer((req, res) => {
  var fullUrl = req.headers.host + req.url;
  if (Object.keys(unresolvedRequests).includes(req.url)) {
    // Calculate latency, say we know them
    var latency = new Date() - unresolvedRequests[req.url];
    delete unresolvedRequests[req.url];

    res.writeHead(200, {
      'Content-Type': 'text/css',
    });

    res.end(cssAnimations(latency));
  } else if (req.url == '/clock.css') {
    var newUrl = '/' + createUUID().replace('-', '') + '.css';
    unresolvedRequests[newUrl] = new Date();

    res.writeHead(200, {
      'Content-Type': 'text/css',
    });

    res.end(cssClock(newUrl));
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    res.end(html());
  }
});

server.listen(8080);
