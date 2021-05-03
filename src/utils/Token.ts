import jwt from 'jsonwebtoken'

export const token = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: 86400 // 24 hours
    })
} 