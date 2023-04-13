'use strict';

const prompt = require('prompt-sync')({sigint: true});

function signup() {
  let account = [];
  let username = prompt('Enter a username to signup with: ');
  let password = prompt('Create a password for this account: ')

  account = [username, password];

  return account;
}

console.log(signup());