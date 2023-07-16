const pool = require('./../dbConnect/dbConnectionPool')
const formidable = require('formidable')
const {firebase,admin} = require('./../firebase/firebase')


const updateAdmin=(req,res)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Error in form"
            })
        }
        try {
            pool.getConnection((err,connection)=>{
                if(err){
                    return res.status(400).json({
                        error: "Error in creating employee data"
                    })
                }
                let data={}
                if(fields.name){
                    data.name=fields.name
                }
                if(fields.password){
                    var user = firebase.auth().currentUser;
                        if(user){
                            admin.auth().updateUser(user.uid,{
                                password:fields.password
                            }).then((userRecord)=>{
                                return res.status(200).json({
                                    "message": "Updated Successfully"
                                })
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }else {
                            return res.status(400).json({
                                error: "Not logged in"
                            })
                        }
                }
                if(fields.email){
                        var user = firebase.auth().currentUser;
                        if(user){
                            admin.auth().updateUser(user.uid,{
                                email:fields.email
                            }).then((userRecord)=>{
                               console.log('')
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }else {
                           console.log("notlogged in")
                        }
                    data.email=fields.email
                }
                if(fields.phone){
                    data.phone=fields.phone
                }
                if(fields.email||fields.phone||fields.name){
                    connection.query("UPDATE admin SET ? WHERE ID=1",[data],(err,result)=>{
                        if(!err){
                            return res.status(200).json({
                                "message": "Updated Successfully"
                            })
                        }else{
                            return res.status(400).json({
                                error: "Error in updating admin data"
                            })
                        }
                    })
                }
                
            })
        } catch (error) {
            return res.status(400).json({
                error: "Error in database connection"
            })
        }
    })
}

module.exports={updateAdmin}