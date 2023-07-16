const mysql = require('mysql')

//db connection
const pool = mysql.createPool({
    connectionLimit:100,
    host:"localhost",
    user:"root",
    password:'',
    database:"ebay"
})

module.exports=pool;