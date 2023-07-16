const pool = require('./../dbConnect/dbConnectionPool')
const {firebase,admin} = require('./../firebase/firebase')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
// import fs from 'fs'

const create = async(req,res,next)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if (err) {
            return res.status(400).json({
            error: "Image could not be uploaded"
            })
        }
        console.log(fields)
        
        var user = firebase.auth().currentUser;
        var newpath = path.join(__dirname,'uploads')+'/'+files.image.name
        var rawData= fs.readFileSync(files.image.path)
        try {
            fs.writeFile(newpath,rawData,function(err){
                if(err) throw err
            })
            pool.getConnection((err,connection)=>{
                if(err) throw err
                connection.query('INSERT INTO shop VALUES(?,?,?,?,?,?)',['',fields.name,newpath,user.uid,new Date(),null],(err,rows)=>{
                    connection.release()
                    if(!err){
                        return res.status(400).json({
                            "message":"Shop Created"
                        })
                    }else{
                        console.log(err)
                    }
                })
            })
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                "message":"enable to create"
            })
        }
    })
}

module.exports={create}