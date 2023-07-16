const pool = require('./../dbConnect/dbConnectionPool')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const { connection } = require('mongoose')

const create=async(req,res,next)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.multiples=true
    form.parse(req,async(err,fields,files)=>{
        if (err) {
            console.log(err)
            return res.status(400).json({
            error: "Image could not be uploaded"
            })
        }
        try {
            pool.getConnection((err,connection)=>{
                if(err) throw err
                connection.query('SELECT id FROM product_category WHERE name=?',[fields.category],(err,rows)=>{
                    // connection.release()
                        if(!err){
                            const id=rows[0].id
                            connection.query('INSERT INTO products VALUES(?,?,?,?,?,?,?,?,?)',['',fields.name,fields.description,fields.price,new Date(),'','',id,fields.stock],(err,result)=>{
                                if(!err){
                                    var newpath=[]
                                    var rawData=[]
                                    for(var i=0;i<files.image.length;i++){
                                        newpath[i] = path.join(__dirname,'uploads')+'/'+files.image[i].name
                                        rawData[i]= fs.readFileSync(files.image[i].path)
                                        try {
                                            fs.writeFile(newpath[i],rawData[i],function(err){
                                                if(err) throw err
                                            })
                                        } catch (error) {
                                            return res.status(400).json({
                                                "message":"images not created"
                                            })
                                        }
                                        
                                    }
                                    connection.query('INSERT INTO product_images VALUES(?,?,?,?,?)',['',files.image[0].name,files.image[1].name,files.image[2].name,result.insertId],(err,result)=>{
                                        connection.release()
                                        return res.status(200).json({
                                            "message":"Product Created"
                                        })
                                    })
                                    
                                }else{
                                    console.log(err)
                                    return res.status(400).json({
                                        "message":"Product Not Created"
                                    })
                                }
                            })
                        }else{
                            console.log(err)
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

const productList=async(req,res,next)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(400).json({
                    "message":"server not reachable"
                })
            }
            connection.query("SELECT products.id AS id,products.name,products.description,products.price AS sellingprice,products.stock,product_category.name AS category FROM products,product_category WHERE products.category_id=product_category.id;",(err,result)=>{
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
        
    }
}

const productById=async(req,res,next)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(400).json({
                    "message":"server not reachable"
                })
            }
            connection.query("SELECT products.name,products.description,products.price,products.stock,product_category.name AS category_name,product_images.image1,product_images.image2,product_images.image3 FROM products,product_images,product_category WHERE products.id=product_images.product_id AND product_category.id=products.category_id AND products.id=?",[req.params.id],(err,result)=>{
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
        
    }
}

const updateProduct=async(req,res)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.multiples=true
    form.parse(req,async(err,fields,files)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
            error: "Image could not be uploaded"
            })
        }
        try {
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(400).json({
                        error:"server not reachable"
                    })
                }
                if(fields){
                    connection.query("UPDATE products SET ? WHERE id=?",[fields,req.params.id],(err,result)=>{
                        if(!err){
                            if(!files.image.length){
                                var newpath= path.join(__dirname,'uploads')+'/'+files.image.name
                                var rawData= fs.readFileSync(files.image.path)
                                try {
                                    fs.writeFile(newpath,rawData,function(err){
                                        if(err) throw err
                                    })
                                    connection.query("UPDATE product_images SET image1=? WHERE product_id=?",[files.image.name,req.params.id],(err,result)=>{
                                        if(!err){
                                            return res.status(200).json({
                                                "message":"Product updated"
                                            })
                                        }
                                    })
                                } catch (error) {
                                        return res.status(400).json({
                                            error:"images not created"
                                        })
                                }
                            }else{
                                var newpath=[]
                                var rawData=[]
                                for(var i=0;i<files.image.length;i++){
                                    newpath[i] = path.join(__dirname,'uploads')+'/'+files.image[i].name
                                    rawData[i]= fs.readFileSync(files.image[i].path)
                                    try {
                                        fs.writeFile(newpath[i],rawData[i],function(err){
                                            if(err) throw err
                                        })
                                    } catch (error) {
                                            return res.status(400).json({
                                                error:"images not created"
                                            })
                                    }
                                    var im=`image${i+1}`                        
                                    connection.query(`UPDATE product_images SET image${i+1}=? WHERE product_id=?`,[files.image[i].name,req.params.id],(err,result)=>{
                                        if(err){
                                            return res.status(400).json({
                                                error:"Error in updating product"
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                "message":"Error in updating product"
            })
        }
    })
    
}

const deleteProduct=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(400).json({
                    error:"server not reachable"
                })
            }
            connection.query("DELETE FROM products WHERE ID=?",[req.params.id],(err,result)=>{
                if(!err){
                    return res.status(200).json({
                        "message":"Product Deleted Successfully"
                    })
                }else{
                    return res.status(400).json({
                        error:"Error deleting Product"
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

const recentProduct=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err){
                return res.status(400).json({
                    error:"server not reachable"
                })
            }
            connection.query("SELECT image1,product_id,products.name from product_images,products WHERE products.id=product_images.product_id ORDER BY product_images.id DESC LIMIT 8",(err,result)=>{
                connection.release()
                if(!err){
                    return res.status(200).json(result)
                }else{
                    return res.status(400).json({
                        error:"Error in fetching recent product details"
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


module.exports={create,productList,productById,updateProduct,deleteProduct,recentProduct}