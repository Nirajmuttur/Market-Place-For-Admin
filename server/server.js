import app from './express'
import config from './config/config'

const pool=require('./dbConnect/dbConnectionPool')

//db connection
pool.getConnection((err,connection)=>{
    if(err){
        console.log("Server is not reachable")
    }else{
        app.listen(config.port, (err)=>{
            if(err){
                console.log(err)
            }else{
            console.info('Server started %s.',config.port)
            }
        })
    }
})




