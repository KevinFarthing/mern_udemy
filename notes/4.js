// not much consistency in the express community for layout
// we'll add a routes file and services folder


require('./routes/authRoutes')(app);
// that's valid. what the shit?
// requiring authRoutes returns a function, so just passing the require() another parameter is valid