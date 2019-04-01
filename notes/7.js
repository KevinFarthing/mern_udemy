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

