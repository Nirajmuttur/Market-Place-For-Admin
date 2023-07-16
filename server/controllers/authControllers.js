const {firebase,admin} = require('./../firebase/firebase')

const authenticate=(req,res,next)=>{
    const token = req.header('Authorization').replace('Bearer', '').trim()
    var user = firebase.auth().currentUser;
    if (user) {
    admin.auth().verifyIdToken(token)
    .then(function (decodedToken) {
        if(decodedToken.uid === user.uid)
        {
            req.user = user.uid
            return next()
        }
    }).catch(function (error) {
        console.log(error)
    });
    } else {
        return res.status(400).json({
            "message":"not signed in"
        })
    }
}

const sigin = (req,res)=>{
    firebase.auth().signInWithEmailAndPassword(req.body.email,req.body.password).then(async(user)=>{
        const idToken =  await firebase.auth().currentUser.getIdToken()
        const email=user.user.email
        const uid = user.user.uid
        return res.json({
            token:idToken,
            userData:{
                email:email,
                uid:uid,
            }
        })
    }).catch((error)=>{
        return res.status(400).json({
            error:"Credentials Did not match"
        })
    })
}



const sigout=(req,res)=>{
    firebase.auth().signOut().then(()=>{
        res.send({
            message:'Signed out'
        })
    })
}

module.exports={authenticate,sigin,sigout}