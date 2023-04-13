'use strict';

const prompt = require('prompt-sync')({sigint: true});

function signin() {
  let credentials = [];
  let username = prompt('Username: ');
  let password = prompt('Password: ', {echo: ''})

  credentials = [username, password];

  return credentials;
}

console.log(signin());