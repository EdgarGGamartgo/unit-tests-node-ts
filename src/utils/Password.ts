import bcrypt from 'bcryptjs'
import { NotAuthorizedError } from '@oregtickets/common'

export const passwordIsValid = (requestPassword: string, userPassword: string) => {
    const password = bcrypt.compareSync(
        requestPassword,
        userPassword
    )

    if (!password) {
        throw new NotAuthorizedError()
    }
} 