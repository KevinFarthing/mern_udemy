// minor note, but it looks like require() function grabs exported data

// huh, mongo supports one cluster for free users
// but you can have as many projects as you want
// and in the new project process you can build a cluster?



(process.env.NODE_ENV ==='production')
// NODE_ENV is automatically set to production on heroku, because it's nice like that

// ISSUE
// Cannot GET /auth/google/callback
// i definitely have the route, might not be doing anything? might be an issue.

// so we're committing the config file because it's using variables (formatted as SUBJECT_USE ie GOOGLE_URI)
// and we set the config vars on heroku (project, setting, config vars)