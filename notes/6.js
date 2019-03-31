// woot woot, react baby!

sudo npm install -g create-react-app
// starter program for react apps?

create-react-app client
// creates a react app named client
// got a whole folder and everything in root
// wtf it has its own server
// anyway, installs react, react-dom, and react-scripts

// from the install notes
npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd client
  npm start

// yikes, npm start is pretty slow
// localhost:3000 says Edit src/App.js and save to reload.

// so at a guess, we'll have the react server running, and different routes in our backend will serve pages from there?
// express servers ONLY job is to assemble json data
// js server serves web formats which will use that data
// so, i was right-ish.

// main reason we're using this 2 server setup is because create-react-app is the best way to setup react


// running the client and the server
// there's an easy way and a hard way?
// ah, yes. the hard way is two terminal windows, and your run in both.

// or just use a package called concurrently.
// to do so, add this
"client": "npm run start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""
// to "scripts" in the server package.json
// and also install concurrently.
npm install --save concurrently
// all it does is run the two commands (run server/run client) simultaneously.
// side note, dammit
// could have been using run server this whole time, instead of node index.js
// run server accesses the "script" command in package.json labelled "server". so, arbitrary.
// actually, npm run server

// this concurrently thing is pretty damn cool...




// hiccup
// in react we want an oath link
// express has the oath flow ready to go
// is this supposed to be surprising? href=auth/google goes to localhost:3000/auth/google
// because DUH
// typing out the full path is stupid
// so instead we add the following under "private" in client package.json
"proxy": {
  "/auth/google": {
    "target": "http://localhost:5000"
  }
},
// which automatically routes "auth/google" to localhost:5000
// this is not stupid because now we only need to change it in one place

// everything between this and hiccup is LIES due to deprecation
// to actually do this use the instructions below.

// whoops, using cra 2
// therefore will get the following errors
[1] When specified, "proxy" in package.json must be a string.
[1] Instead, the type of "proxy" was "object".
[1] Either remove "proxy" from package.json, or make it a string.

// the fix
// in client/ directory, install
npm install http-proxy-middleware --save

// create setupProxy.js in client/src/
// then add proxies to setupProxy.js
const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}
// end setupProxy
// remove old proxy scripts code from client package.json

// restart servers with npm run dev

// oh, hm. have to add the new url (localhost:3000/auth/google/callback) to the apis.

// some people are fixing this by adding changeorigin:true to the proxy.
// that fucks everything up.


// huh, crazy
// in production react will compile into an app, and that will run on the same server as express
// so all this proxy stuff is only for dev

// nooo, go more into cors

// whoa
// proxy takes the request, copies it, and sends it to express?
// express reads it, determines what it's supposed to do in express, and then tells client what express would do with that request
// that's why we need to confirm localhost:3000!