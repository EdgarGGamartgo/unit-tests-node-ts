import request from 'supertest'
import { app } from './../app'
import { 
    setupDatabase,
    group
 } from './fixtures/db'

beforeEach(setupDatabase)

describe('Group Controller', () => {

    test('Should create new group', async () => {

        const token = await global.login()

        await request(app)
            .post('/api/group')
            .set('x-access-token', token)
            .send(group)
            .expect(201)
    })

    test('Should get all groups', async () => {

        const token = await global.login()
    
        await request(app)
            .get('/api/groups')
            .set('x-access-token', token)
            .send()
            .expect(200)
    })

})

