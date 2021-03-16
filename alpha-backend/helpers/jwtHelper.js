const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (data) => {
        return jwt.sign(data, '!@#$%^&*')
    },
    verifyToken: (req, res, next) => {
        const token = req.body.token
        if (!token) return res.status(400).send('no token')
        try {
            const result = jwt.verify(token, '!@#$%^&*')
            req.user = result
            next()
            console.log(token)
            console.log(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}