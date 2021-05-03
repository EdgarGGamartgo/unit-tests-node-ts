import { User } from './../models'
import { Response, Request, NextFunction } from 'express'
import { BadRequestError } from '@oregtickets/common'
import { ErrorHandler } from './../handlers'

export const CheckDuplicateUsername = async (req: Request, res: Response, next: NextFunction )  => {
    const { username } = req.body
    const { method } = req
    try {
        const user = await User.findOne({
            where: {
                username 
            }
        })
        if (user) {
            throw new BadRequestError('Failed! Username is already in use!')
        }
        next()
    } catch (e) {
        ErrorHandler(req.body, method, e, 'Cant Check Duplicate Username!')
    }

}