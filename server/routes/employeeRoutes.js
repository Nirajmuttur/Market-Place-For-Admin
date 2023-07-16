const express = require('express')
const empCtrl=require('./../controllers/empComtroller')
const authCtrl=require('./../controllers/authControllers')
const router = express.Router()

router.route('/api/addEmployee').post(empCtrl.create)
router.route('/api/employeelist').get(empCtrl.listEmployee)
router.route('/api/updateEmployee/:id').put(empCtrl.updateEmployee)
router.route('/api/employeeById/:id').get(empCtrl.employeeById)
router.route('/api/deleteEmployee/:id').delete(empCtrl.deleteEmployee)

module.exports=router