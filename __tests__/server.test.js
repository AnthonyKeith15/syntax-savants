'use strict'

const server = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');
const request = supertest(server.server);

beforeAll(async() => {
  await db.sync();
})

afterAll(async () => {
  await db.drop();
})

describe("Testing V2 routes", () => {
  let admin = {
    username: 'admin',
    password: 'password',
    role: 'admin'
  }
  let token = '';

  test('POST into food/racketEntry', async () => {
    let racketEntryWithoutstatus = {
      player_id: 299,
      stringer_id: 38,
      racket_name: "test racket",
    }

    let racketEntryWithoutStringer = {
      player_id: 7,
      racket_name: "test racket",
      status: 'Received'
    }

    let response = await request.post('/signup').send(admin);
    token = response.body.user.token

    const withoutStatusResponse = await request.post('/api/v2/racketEntry').set('Authorization', `Bearer ${token}`).send(racketEntryWithoutstatus);
    const withoutStringerResponse = await request.post('/api/v2/racketEntry').set('Authorization', `Bearer ${token}`).send(racketEntryWithoutStringer);
    
    expect(withoutStatusResponse.body.racket_name).toEqual('test racket');
    expect(withoutStringerResponse.body.racket_name).toEqual('test racket');
  })

  test('GET all from racketEntry', async () => {
    const listOfEntries = await request.get('/api/v2/racketEntry').set('Authorization', `Bearer ${token}`);

    console.log(listOfEntries.body);
    expect(listOfEntries.body[0].player_id).toEqual(299);
    expect(listOfEntries.body[1].player_id).toEqual(7);
  });

  test('GET racketEntry with ID', async () => {
    const withoutStatusResponse = await request.get('/api/v2/racketEntry/2').set('Authorization', `Bearer ${token}`);
    const withoutStringerResponse = await request.get('/api/v2/racketEntry/2').set('Authorization', `Bearer ${token}`);

    expect(withoutStatusResponse.body.name).toEqual('banana');
    expect(withoutStringerResponse.body.name).toEqual('shirt');
  });

  xtest('PUT racketEntry with ID', async () => {
    let updatedRacketEntryWithoutstatus = {
      name: 'apple',
      calories: 200,
      type: 'fruit'
    }

    let updatedRacketEntryWithoutStringer = {
      name: 'pants',
      color: 'black',
      size: 'medium'
    }

    const withoutStatusResponse = await request.put('/api/v2/racketEntry/2').set('Authorization', `Bearer ${token}`).send(updatedRacketEntryWithoutstatus);
    const withoutStringerResponse = await request.put('/api/v2/racketEntry/2').set('Authorization', `Bearer ${token}`).send(updatedRacketEntryWithoutStringer);

    expect(withoutStatusResponse.body.name).toEqual('apple');
    expect(withoutStringerResponse.body.name).toEqual('pants');
  });

  xtest('DELETE racketEntry with ID', async() => {
    const withoutStatusResponse = await request.delete('/api/v2/racketEntry/2').set('Authorization', `Bearer ${token}`);
    const withoutStringerResponse = await request.delete('/api/v2/racketEntry/2').set('Authorization', `Bearer ${token}`);

    expect(withoutStatusResponse.body).toEqual(1);
    expect(withoutStringerResponse.body).toEqual(1);
  })
})