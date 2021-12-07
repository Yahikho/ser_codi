const sql = require('mssql')
require('dotenv').config()

const dbSettings = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_HOST,
    database: process.env.MSSQL_DATABASE,
}

async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (err) {
        console.log(err)
    }

}

module.exports = {getConnection, sql}