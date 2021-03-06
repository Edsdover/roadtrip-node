'use strict';

var Secrets;

try{
  Secrets = require('./secrets');
}catch(ex){}

var env = process.env.NODE_ENV || 'development';

var common = {
  FIREBASE_SECRET: Secrets ? Secrets.FIREBASE_SECRET : process.env.FIREBASE_SECRET,
  FIREBASE_EXPIRE: 24
};

var environments = {
  development: {
    PORT: 8000,
    MONGO_URL: 'mongodb://localhost/roadtrip-dev'
  },
  test: {
    PORT: 0,
    MONGO_URL: 'mongodb://localhost/roadtrip-test'
  },
  production: {
    PORT: 0,
    MONGO_URL: 'mongodb://heroku_app36605629:q61fq2u2clmb97vohac7n3gi3p@ds031962.mongolab.com:31962/heroku_app36605629'
  }
};

var environment = environments[env];

Object.keys(common).forEach(function(key){
  environment[key] = common[key];
});

console.log('environment:', environment);

exports.environment = environment;
