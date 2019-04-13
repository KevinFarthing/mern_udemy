// sweet, updating from old http request syntax
// technically a findone request, special mongoose callback function 
// the technique it used was a straightforward promise syntax
// too bad that's not what you used at work. oi.

// hypothetical ajax function to retrieve json
// fetch is part of the standard library
// https://rallycoding.herokuapp.com/api/music_albums

function fetchAlbums() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
        .then(res => res.json())
        .then(json => console.log(json));
}

fetchAlbums()
// fetch returns a promise
// promises always connect with a .then() thingie, which will by default accept a response parameter
// the response will be json data, so to read it as a json we call res.json()
// this is also a promise. i don't know why. json.parse() might be better. investigate the use case.
// remember we're calling undefined functions with these .thens
// specifically arrow or fat arrow functions
// we skip the function and return keywords (both are implicit), and cut to the params => into function commands
param1 => console.log(param1);
(param2, param3) => console.log(param2,param3);
// progress is happening, I guess.
// return is implicit - ish?
const m = (x, y) => { x * y };
// doesn't work
const m = (x, y) => { return x * y };
// does. hmph.

// wtf. es2017 introduced new code for fetch().then(). that's cool
// the purpose of this new code is to make fetch() look more synchronous. what? why!
// new syntax is called async await
async function fetchAlbums() {
// const fetchAlbums = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()
        
    console.log(json);
}
// weird, prints out "promise, pending"
// yeah, this is more straightforward


// front end stuff now
// note on design philosophy - teacher recommends explicitely declaring whether you're working on the front end or back end at any given time
// juggling both is an easy way to end up with spaghetti code

// react router?
// ugh, this is familiar. it's not dissimilar to joomla modules

// set up react, react redux, and react router

// so proper root is going to be client index.js (data layer control (redux)), which will go to app.js (rendering layer control (react router))
// App.js is what will show the modules

// create-react-app requires and expects an index.js

// in the client side we're using import instead of require()
// on the front end we're using webpack and babble, which give us 2016es modules
// backend only has node
// only real difference is yntax

// client/public/index.html is a template. we will be inserting our front end modules inside it
// access using div id root, which is an empty div set in index.html
// like so
cd client
npm install --save redux react-redux react-router-dom

ReactDom.render(<App />, document.querySelector('#root'));

// redux is a library to hold the state information
// at the top is the Redux Store


// oof, this is getting serious
const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
    <Provider store ={store}><App /></Provider>,
    document.querySelector('#root')
);
// we've created a redux store inside of a Provider
// provider is a component that makes the store accessible to every component in the app
// store is a keyword for the provider tag, like href. here we have set the store keyword to contain the store constant we've instantiated above

// new folder inside src called reducers
// contains an index.js. this is convention so we can always just import from index.js. worth it. remember the parable of isset, is_null, and empty

// in index.js we're importing { combineReducers } from redux, and our custom reducer from adjacent file
// basically we add t he custom reducer to {combineReducers} and export that.
export default combineReducers({
    auth: authReducer
}); // that simple.

// in index.js, whatever keys we provide to the exported object mirror the keys in the state object
// then in the client/src/index.js we run
import reducers from './reducers';
// reducers is a built in object, so that should automatically access the export in index.js

// so we have authreducer now. it has been imported into index.js. what do we do with it
// authreducer records whether or not the user is logged in, so it needs to be linked with the mongodb/oauth stuff from earlyer

// we'll use react router to determine what the user should see depending on state based on the route

// again, app.js is responsible for the view level stuff, like react router
// index.js is responsible for all the redux setup

// BrowserRouter is a react-router-dom eh, object, which gets passed into the App constant like an html tag
<div>
<BrowserRouter>

</BrowserRouter>
</div>
// it expects to contain only one child, so can't do
<div></div>
<div></div>
// instead do
<div>
    <div></div>
    <Route path="/" component={Landing} /> 
    <div></div>
</div>
// route syntax also pictured above
const Landing = () => <h2>Landing</h2>;
// is defined in the same file

// oh shit. Route path='/'
// will run on EVERY route that contains '/'
// BrowserRouter checks the route on all paths
// to enforce exact matches, pass an exact option to Route
<Route path="/" exact={true} component={Landing} /> 
<Route path="/" exact component={Landing} />
// exact defaults to true.
// sometimes we won't want exact, as in surveys/otherstuff, if we always want the default surveys stuff shown.

// we have static components here. We can also make class components, which are neat because we can use methods to display content depending on state factors
// class components should render() { return (html) }

// materialize css
npm install --save materialize-css
// basically the same as pip install flask-bootstrap

// create-react-app automatically included a webpack
// webpack takes a big old pile of javascript file and spits out a consolidated file
// aaaand it also works with css
// when we use webpack to import with 
import O from 'thing';
// js will assume that the source is a javascript file
// not true here
// therefore we need to use
import 'thing.css';
// ALSO we're not giving any path details!
// webpack assumes that if no path is specified, it's an npm module and searches node_modules

// next up is an api!
// current user api. probably will pass user details from backend to frontend

cd client
npm install --save axios redux-thunk

// axios seems like a way to make requests (we're usign get)

// redux thunk
// action creaters return an action , which produce new values for state and send that to 
// thunk creates actions that don't require you to return an action. more of a funnel?
// thunk instead sends actions to the dispatch function, which passes the state changes to store

// next up we refactor to update the app based on logged on status
// no shit we're not sourcing this to the header!
// logged in status is relevant all over the place, we want it to be part of the app!
// oh my, app is a functional component? as in functional programming???
// ah, we're refactoring it to make it object oriented, to support the class state
// hm.


export default connect(null, actions)(App);
// connect the first set of args are reserved for Mapdisptachtoprops. we're not using map, so null for now, and the latter is the actions we want to pass to App

// Shit! didn't export fetchuser, just declared it as a constant!
// got a typeerror when i tried to use it in App

// potential error after 83. should be console.logging 4 actions, only getting 2
// (user data is not showing up)

// cool thing, arrow functions containing ONE EXPRESSION don't need curly braces or the return keyword

// FUUUUUUCK found the problem with fetchUser not working
// from src/index.js
const store = createStore(() => reducers, {}, applyMiddleware(reduxThunk));
// should be
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// where the hell did the arrow function come from?
// good news is that it was in the flow it ought to have been
// and wasn't some kind of voodoo

import { Link } from 'react-router-dom';
<Link
to={this.props.auth ? '/surveys' : '/'}
className="left brand-logo"
>
    Emaily
</Link>
// link is like a magic object. the server will return it to the client as an <a> tag
// i'm not sure why we don't just concat inside the href value of <a>