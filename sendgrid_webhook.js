var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'lkjhlkjhagagerdagaedc' }, function(err, tunnel) {
  console.log('LT running')
});