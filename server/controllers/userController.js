const pool = require('./../dbConnect/dbConnectionPool')
const {firebase,admin} = require('./../firebase/firebase')

const create = async(req,res)=>{
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(async function (user) {
     const idToken =  await firebase.auth().currentUser.getIdToken()
     const idTokenResult =  await firebase.auth().currentUser.getIdTokenResult()
     const email=user.user.email
     const uid = user.user.uid
     const name = req.body.name
     let role
     await admin.auth().setCustomUserClaims(uid,{"role":req.body.role})
     await admin
  .auth()
  .getUser(uid)
  .then((userRecord) => {
     role = userRecord.customClaims.role
  });
     pool.getConnection((err,connection)=>{
        if(err) throw err

        connection.query('INSERT INTO firebase_user VALUES(?,?,?,?)',[uid,email,name,role],(err,rows)=>{
            connection.release()
            if(!err){
                console.log('user created')
            }else{
                console.log(err)
            }
           
        })
    })
     return res.json({
         token:idToken,
         userData:{
             email:email,
             uid:uid,
             role
         }
     })
    }).catch(function (error) {
            console.log(error)
    });
    
}

module.exports={create}