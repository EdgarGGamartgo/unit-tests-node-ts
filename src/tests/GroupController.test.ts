import request from 'supertest'
import { app } from './../app'
import { Group } from './../models'
import { 
    setupDatabase,
    userOneId,
    userTwoId,
    userOne,
    userTwo
 } from './fixtures/db'

beforeEach(setupDatabase)


test('Should get all groups', async () => {

    const token = await global.login()

    await request(app)
        .get('/api/groups')
        .set('x-access-token', token)
        .send()
        .expect(200)
})