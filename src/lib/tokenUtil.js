import jwt from 'jsonwebtoken'

export const isTokenExpire = (token) => {
    if(!token) return true
    const {exp} = jwt.decode(token)
    return Date.now() >= exp * 1000
}