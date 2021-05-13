import request from 'supertest'
import { app } from './../app'
import { 
    setupDatabase,
    userOneId,
    userTwoId,
    userOne,
 } from './fixtures/db'

beforeEach(setupDatabase)

describe('User Controller ', () => {
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

    test('Should get user by ID', async () => {
    
        const token = await global.login()
    
        await request(app)
            .get('/api/user/1')
            .set('x-access-token', token)
            .send()
            .expect(200)
    })

    test('Should add new user', async () => {
    
        const token = await global.login()

        const user = {
            username: 'Nino',
            login: new Date().toISOString(),
            password: '1234567890098765432',
            age: 25,
            is_deleted: false
        }
    
        await request(app)
            .post('/api/user')
            .set('x-access-token', token)
            .send(user)
            .expect(201)
    })

    test('Should add users to a group', async () => {
    
        const token = await global.login()

        const group = {
            name: 'R/W Group',
            permission: ['READ', 'WRITE']
        }

        const groupResponse = await request(app)
                                    .post('/api/group')
                                    .set('x-access-token', token)
                                    .send(group)
                                    .expect(201)

        const usersToGroup = {
            groupId: groupResponse.body.id,
            userIds: [userOneId, userTwoId]
        }

    
        await request(app)
                .post('/api/add-users-to-group')
                .set('x-access-token', token)
                .send(usersToGroup)
                .expect(201)
    })

    test('Should update user by ID', async () => {
    
        const token = await global.login()

        const user = {
            id: '1',
            username: 'Yukino',
            login: new Date().toISOString(),
            password: '1234567890098765432',
            age: 25,
            is_deleted: false
        }
    
        await request(app)
            .put('/api/user')
            .set('x-access-token', token)
            .send(user)
            .expect(200)
    })

    test('Should soft delete user by ID', async () => {
    
        const token = await global.login()
    
        await request(app)
            .delete('/api/user/1')
            .set('x-access-token', token)
            .send()
            .expect(200)
    })
})

