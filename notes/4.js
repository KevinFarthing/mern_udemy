// not much consistency in the express community for layout
// we'll add a routes file and services folder


require('./routes/authRoutes')(app);
// that's valid. what the shit?
// requiring authRoutes returns a function, so just passing the require() another parameter is valid

// http is stateless
// we communicate between client and server via http requests
// by default http has no way to pass user data. one request is a log in, but that's not passed to a data request

// so what we do is have the server pass a unique identifier back to the client
// this is used to sign all requests made to the signature. like an ssl handshake?

// cookie based authentication
// so inside the http header we'll have something called set-cookie
// the browser will grab that cookie and append that to all subsequent requests

// this is all handled by browser, which is cool because we can just ignore it in the javascript

// aso what in the oath token is a unique identifier. we still need to log something like a username in our db
// profile.id?
// yep. duh.

// pretty basic. when user oauths, check db for their google profile id.
// if present, log in. yaaay
// else, make record in db. log in. yaaay

// mongo is schemaless?
// records can have different properties
// weird
// id: 1, height:150
// id: 2, likes: austen
// ^^^ totally valid

// mongo has collections, which contain records (tables and rows)
// mongoose uses a model class, which represents an entire collection
// mongoose model instances are model instances representing one records inside a collection

// to install module
npm install --save mongoose

// time to make a model class

const Schema = mongoose.Schema;
const { Schema } = mongoose;
// ^^^ exact same thing. the second version uses a technique called destructuring
// brackets detect that mongoose has a property called schema, and assigns it to the variable schema

// mongoose wants to know what we have in the database ahead of time
// which kind of contradicts the structureless nature of mongo, but that's stupid anyway.


const userSchema = new Schema({
    googleId: String
});
// like static typing. tells app that googleId will be a string.

mongoose.model('users', userSchema);
// tells app that we want to create a new model called 'users'.
// if it already exists it will access the existing version
// else it will create the record

// not using require in mongoose
// not using mongoose in testing environments
// oh shit, yeah. require will run every time it's accessed, so you can call the model class multiple times when testing
// and since mongo is reactive like that, it'll create a new record in the database every time
// bad


mongoose.model('users');
// interesting and scary
// mongoose.model with one parameter is a request! it will load something from the schema
// mongoose.model with two params is a submission, and will load something IN

new User({ googleId: profile.id }).save();
// .save() method required to push new records to database

// ah, shit. it's creating a new record every time.

User.findOne({ googleId: profile.id })
// finds one record in the User Model where googleId field = profile.id
// buuuut it's asynchronous
// so you can't do currentUser = User.findOne()
// instead the findOne query returns a promise?


(accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if(existingUser) {
                // user exists! log in.
                done(null, existingUser);
            } else {
                // user don't! create user!
                new User({ googleId: profile.id }).save();
                // huh, second param in User model is automatically filled with {googleId:profile.id}?
            }
        })
}
// so findOne 'returns' a promise, which eventually returns data
// a promise is a piece of string and i promise there's a user id on the end of it. pull in the string.
// you determine what to do with that promise via promise.then(stuff)
// in this case, findOne's promise returns a value of existing user, so .then() waits and when the promised data appears, assigns it to existingUser
// so that done param. that's a function. calling it will tell passport that everything is done
// takes 2 params
// 1 and error. 2. a record.
// nice, .save() by default returns the new record on completion
// we can just use .save().then()