import request from 'supertest'
import { app } from './../app'
import { User } from './../models'
import { 
    setupDatabase,
    userOneId,
    userTwoId,
    userOne,
    userTwo
 } from './fixtures/db'

beforeEach(setupDatabase)


test('Should login existing user', async () => {
    const response = await request(app).post('/api/login').send({
        username: userOne.username,
        password: '1234567890'
    }).expect(200)
    expect(response.body.accessToken).toBeTruthy()
})

test('Should get all users', async () => {

    const token = await global.login()

    await request(app)
        .get('/api/users/all')
        .set('x-access-token', token)
        .send()
        .expect(200)
})