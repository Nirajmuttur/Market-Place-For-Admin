const pool = require('./../dbConnect/dbConnectionPool')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const { connection } = require('mongoose')
const { result } = require('lodash')

const create=async(req,res)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.multiples=true
    form.parse(req,async(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        try {
            var newpath
            var rawData
                newpath= path.join(__dirname,'uploads')+'/'+files.image.name
                rawData= fs.readFileSync(files.image.path)
                try {
                    fs.writeFile(newpath,rawData,function(err){
                        if(err) throw err
                    })
                } catch (error) {
                    return res.status(400).json({
                        "message":"images not created"
                    })
                }
            pool.getConnection((err,connection)=>{
                if(err) throw err
                connection.query("INSERT INTO banner VALUES (?,?,?,?)",['',files.image.name,fields.type,fields.publish?fields.publish:false],(err,result)=>{
                    if(!err){
                        return res.status(200).json({
                            "message":"Banner Created"
                        })
                    }else{
                        return res.status(400).json({
                            error: "Error creating banner"
                        })
                    }
                })
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                "message":"enable to create"
            })
        }
    })
}

const listBanner=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            connection.query("SELECT * FROM banner",(err,result)=>{
                connection.release()
                if(!err){
                    return res.json(result)
                }else{
                    return res.status(400).json({
                        error: "Error "
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            "message":"enable to fetch details"
        })
    }
}

const updateBanner=async(req,res)=>{
    try {
        const form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req,async(err,fields,files)=>{
            if(err){
                return res.status(400).json({
                    "message":"enable to update details"
                })
            }
            console.log(fields)
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(400).json({
                        "message":"server error"
                    })
                }
                connection.query("UPDATE banner SET ? WHERE id=?",[fields,req.params.id],(err,result)=>{
                    if(!err){
                        return res.status(200).json({
                            "message":"Banner Updated"
                        })
                    }else{
                        return res.status(400).json({
                            "message":"enable to update details"
                        })
                    }
                })
            })
        })
        
    } catch (error) {
        return res.status(400).json({
            "message":"server error"
        })
    }
}

module.exports={create,listBanner,updateBanner}