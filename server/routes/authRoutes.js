const express = require('express')
const authCtrl =require('./../controllers/authControllers')

const router = express.Router()

router.route('/api/auth/sigin').post(authCtrl.sigin)
router.route('/api/auth/signout').get(authCtrl.sigout)

module.exports = router