const util = require('util')
const database = require('../database')

module.exports = {
    generateQuery: (body) => {
        let result = ''
        for (let property in body) { 
            result += ` ${property} = ${database.escape(body[property])},`
        }
        return result.slice(0, -1)
    },
    asyncQuery: util.promisify(database.query).bind(database)
}