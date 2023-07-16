const pool = require('./../dbConnect/dbConnectionPool')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const { connection } = require('mongoose')

const create=async(req,res,next)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if (err) {
            return res.status(400).json({
                error: "Error in creating employee data"
            })
        }
        try {
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(400).json({
                        error: "Database connection error"
                    })
                }
                connection.query("INSERT INTO employee VALUE(?,?,?,?,?)",['',fields.name,fields.email,fields.phone,fields.role],(err,result)=>{
                    connection.release()
                    if(!err){
                        return res.status(200).json({
                            "message":"Employee Created"
                        })
                    }else{
                        return res.status(400).json({
                            error: "Error in creating employee data"
                        })
                    }
                })
            })
        } catch (error) {
            return res.status(400).json({
                error: "Error in creating employee data"
            })
        }
    })
}

const listEmployee=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(400).json({
                    error: "Database connection error"
                })
            }
            connection.query("SELECT * FROM employee",(err,result)=>{
                connection.release()
                if(!err){
                    return res.json(result)
                }else{
                    return res.status(400).json({
                        error: "Error in getting employee list"
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error: "Database connection error"
        })
    }
}

const updateEmployee=async(req,res)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Error in updating employee data"
            })
        }
        try {
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(400).json({
                        error:"server not reachable"
                    })
                }
                connection.query("UPDATE employee SET ? WHERE ID=?",[fields,req.params.id],(err,result)=>{
                    if(!err){
                        return res.status(200).json({
                            "message":"Employee updated"
                        })
                    }else{
                        return res.status(400).json({
                            err:"Error"
                        })
                    }
                })
            })
        } catch (error) {
            return res.status(400).json({
                error:"server not reachable"
            })
        }
    })
}

const employeeById=async(req,res,next)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(400).json({
                    "message":"server not reachable"
                })
            }
            connection.query("SELECT * FROM employee WHERE ID=?",[req.params.id],(err,result)=>{
                connection.release()
                if(!err){
                    let product=result
                    return res.json(product)
                }else{
                    console.log(err)
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error:"server not reachable"
        })
    }
}

const deleteEmployee=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(400).json({
                    error:"server not reachable"
                })
            }
            connection.query("DELETE FROM employee WHERE ID=?",[req.params.id],(err,result)=>{
                if(!err){
                    return res.status(200).json({
                        "message":"Employee Deleted Successfully"
                    })
                }else{
                    return res.status(400).json({
                        error:"Error deleting Employee"
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error:"server not reachable"
        })
    }
}

module.exports={create,listEmployee,deleteEmployee,updateEmployee,employeeById}