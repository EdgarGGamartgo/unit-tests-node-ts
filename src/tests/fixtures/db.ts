import { User, Group } from './../../models'
import { v4 as uuidv4 } from 'uuid';
import { app } from './../../app'
import request from 'supertest'

declare global {
    namespace NodeJS {
        interface Global {
            login(): Promise<string>
        }
    }
}

export const userOneId = uuidv4()
export const userOne = {
    id: userOneId,
    username: 'Edgar',
    login: '2021-04-02T03:25:12.876Z',
    password: '$2y$12$ToaeHboyrDE73.ATIoKH7e5Vuc0D9xA7XZfLHvxqudSzfFX2gjZJ2',
    age: 25,
    is_deleted: false
}

export const userTwoId = uuidv4()
export const userTwo = {
    id: userTwoId,
    username: 'Andrea',
    login: '2020-04-02T03:25:12.876Z',
    password: '$2y$12$eSl0JeaFwHBM9fBVFQ6fd.Qxt0sq1jwuFYf4EFSKKGmgZSPMzlK0G',
    age: 20,
    is_deleted: false
}

export const group = {
    name: 'READ Group',
    permission: ['READ']
}

export const setupDatabase = async () => {
    await User.sync({ force: true })
    await Group.sync({ force: true })
    await User.create(userOne)
    await User.create(userTwo)

    global.login = async () => {
        const username = 'Edgar'
        const password = '1234567890'
    
        const response = await request(app)
            .post('/api/login')
            .send({
                username, password
            })
            .expect(200)
    
    
        return response.body.accessToken
        
    }

}
