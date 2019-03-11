npm init
// in command line. use default values.
// okay, npm is the worlds largest software registry
npm install <package>
// installs the package
// so, npm init is like git init?
// comes with node.js by default

npm install --save express

// node vs express

// node is a javascript runtime environment. just a way to run js outside a browser
// express is a library that runs in the node runtime. has helpers to make dealing with http traffic easier. jquery is to doms as express is to http? maybe.

// there will be http requests to ports. node will listen on that port, and hand requests to express. We could use just node, but that would be dumb.

// express will then look at the request and decide which part of the codebase should handle it, via route handlers we will program. so far, so flask. then express will give the response to node, which will pass it back to the requestor

const express = require('express');
// 'express' library is being required.

// we're using that over
import express from 'express'
import { Script } from 'vm';
// because ^^^ is using es2015 modules. we'll use that syntax for react, but it's not always available in node

const app = express();
// generates an app of the express lib
// every route handler we create will be associated with this app. there could be several, hypothetically


app.listen(5000);
// ooh, sets app to listen on route 5000? neat.

// and then to run server it's just 
node index.js
// assuming index.js is your main file.


app.get('/', (req, res) => {
    res.send({hi: 'there'});
});
// app references the running app.
// .get creates a route handler. the param '/' is the get request address, in this case root. this is called the route.
// req is an object representing the request?
// res is an option representing the outgoing response. notice that res has the send method.
// send(stuff) sends stuff. in this case, it's a json encoded with the key hi and the value 'there'
// what the fuck datatype is that, this ain't elixir
// arrow function?

// heroku checklist
// $$$dynamic port binding
// heroku will give us a port and we need to make sure we're using the right one
const PORT = process.env.PORT || 5000
app.listen(PORT);
// heroku will define this process.env.PORT, this grabs that and uses it. || 5000 will set 5000 as the default if no process.env.PORT is set

// scripts is a command line command, which will be run on application start. same as line 37
//   asshole fuckin double quotes

// $$$specify node environment
// we want to make sure that heroku is using the correct version of node
// not surprising.
// include in package.json
"engines": {
    "node": "8.12.0",
    "npm": "6.8.0"
}

// $$$specify start Script
// include in package.json
"scripts": {
    "start": "node index.js"
},
// scripts is a command line command, which will be run on application start. same as line 37

// $$$create .gitignore file
// don't need node modules, don't want to reveal sensitive app data


// deployment process
commit codebase to git
install heroku cli and create app
deploy app with git
heroku deploys project