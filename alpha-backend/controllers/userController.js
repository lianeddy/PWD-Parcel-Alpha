// const db = require('../database')
// const { createToken } = require('../helpers/jwtHelper')
// const { asyncQuery } = require('../helpers/queryHelper')

// module.exports = {
//     login: async (req, res) => {
//         try {
//             const userQuery = await asyncQuery(`SELECT * FROM users WHERE ${db.escape(req.body.username)} IN (username, email) AND password=${db.escape(req.body.password)}`)
//             if (userQuery.length === 0) return res.status(400).send('Invalid username and/or password')
//             let token = createToken({ id: userQuery[0].id_user, username: userQuery[0].username })
//             userQuery[0].token = token
//             res.status(200).send(userQuery[0])
//         } catch (err) {
            
//         }
//     },
   
//     keepLogin: async (req, res) => {        
//         try {
//             const getUser = `SELECT * FROM users WHERE username="${req.user.username}"`
//             const result = await asyncQuery(getUser)
//             res.status(200).send(result[0])
//         }
//         catch (err) {
//             console.log(err)
//             res.status(400).send(err)
//         }
//     },
    
// }