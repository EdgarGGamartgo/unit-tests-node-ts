import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { UserController, GroupController } from './controllers'
import { errorHandler, NotFoundError } from '@oregtickets/common'
import cors from 'cors'
import { AddHeader } from './middlewares'

const app = express()
app.use(cors())
app.use(AddHeader);
app.set('trust proxy', true)
app.use(json())

app.use(UserController)
app.use(GroupController)

app.all('*', async(req, res) => {
    throw new NotFoundError()
})

// Custom middleware to handle all unhandled errors. I've built this package as a NPM Public Package
app.use(errorHandler)

export { app }