// passport issues
// it will automate oath flow
// but it requires reaching in

// passport library is constructed weirdly
// there are 2!
// 1. passport
// the core library. general helpers and passport strategies (at least 1), which are the oath for google, and oath for twitter, etc.
// 2.


// Since the main goal of using http://localhost:5000/* was to show the redirect error a few lectures later,  we can do one of two things here:
// 1. Leave the authorized URI Redirect blank, since we will be fixing this later.
// 2. Enter http://localhost:5000/auth/google/callback now, since that is what it will be changed to in a later lecture.




// In the upcoming lecture "Enabling Google OAuth API" we can skip the step of enabling the Google+ API since we will no longer be using it.
// In the lecture "Google Strategy Options" we need to add one line to our Passport call:
// userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// Put this line in the strategy like so:

// passport.use(
//   new GoogleStrategy(
//     {
//         clientID: keys.googleClientID,
//         clientSecret: keys.googleClientSecret,
//         callbackURL: '/auth/google/callback',
//         userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//    },

// then disable the api in the google cloud manager

// clientID
//     Public DOMSettableTokenList, can be shared freely?
//     identifies our app to google servers

// clientSecret
//     private token: keep secret?
//     anyone who gets it can access higher level priviledges in our app

// neat, since we declared
module.export{
    key:value
}
// in config/keys.js
// we can import the key as a variable elsewhere by using
const keys = require('./config/keys');
// with the require string as the path to the keys file

// okay, flow is fiddly for passport
// forward users request to google. on google, user is asked to Validate
// user validates -> google then REDIRECTS back to our site at the callback url with a code in the get
// the callback url will be set as a parameter in the google strategy object

// on our side, put user on hold, take the code from the url (get request, duh)
// our side: send request to google with code included(the code we got from google. what?)
// google sees code and replies with details about the user

// using those details from google, we create a user entry in our database.


app.get('/auth/google',()=>console.log('stuff'));
// ^basic route declaration. executes the arrow function every time we hit that route


// passport does a nice thing
passport.use(
    new GoogleStrategy({}));
        // passport knows by default that there is a passport, identifiable by the string google
        // in, for example, passport.authenticate('google');
        // obviously you have to go from passport -> interaction -> string 'google'

// further
// when we declare
app.get('auth/google',passport.authenticate('google', {
    scope: ['profile','email']
}));
// the scope references parameters that google expects, and requests that google give us access to

// Error: redirect_uri_mismatch
// well, crap


// nope, not crap
// ,passport.authenticate('google', {
// automatically goes to the GoogleStrategy (magic?)
// in the authorized redirect uris you can determine what address you send the user to from google
// we're using /auth/google/callback
// point is that this is set in the google console

// npm install --save nodemon
"dev": "nodemon index.js
// ^add to package.json[scripts]