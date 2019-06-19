// dev
//     bundle.js ->     create-react-app
//     api data ->     proxy                -> node/express API

// prod
//     bundle.js -> public assets
//     api data ->node/express

//  push to heroku -> tell heroku to install all deps -> heroku builds client project
//  push to CI -> run tests and shit -> CI builds and commits client -> CI pushes build to heroku

// so both the main app and the client app have a package.json
// BUT heroku will hit the main package.json, and never care about the client one
// so all the goods have to be present in main

// a ci server is a server that can run tests or checks or whatever over the code base
// so gitlab?