import React,{useState} from 'react'
import './NewEmployee.css'
import {TextField,Button} from '@material-ui/core'
import {create} from './../../../../api/auth/employeeApi'
import auth from '../../../../api/auth/auth-api'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
import {Redirect} from 'react-router-dom';

function NewEmployee() {
    const [employee,setEmployee]=useState({
        name:'',
        email:'',
        phone:'',
        role:'',
        error:'',
        redirect:false
    })

    const handleChange=name=>event=>{
        const value=event.target.value
        setEmployee({...employee,[name]:value})
    }

    const notify = ()=>{ 
        // Calling toast method by passing string
        toast.success('Employee Created Successfull') 
    }

    const jwt = auth.isAuthenticated()
    const onSubmit=()=>{
        let employeeData=new FormData()
        employee.name&&employeeData.append('name',employee.name)
        employee.email&&employeeData.append('email',employee.email)
        employee.phone&&employeeData.append('phone',employee.phone)
        employee.role&&employeeData.append('role',employee.role)
        console.log(employee)
        create({t:jwt.token},employeeData).then((data)=>{
            if(data.error){
                console.log(data)
                setEmployee({...employee,error:data.error})
            }else{
                setEmployee({...employee,redirect:true,error:''})
                notify()
            }
        })
    }

    if(employee.redirect){
        return(
            <>
                <Redirect push to="/employee" />
            </>
        )
        
    }else{
        return (
            <div className="newemployee">
                <h1>Add New Employee</h1>
                <div className="addemployee">
                      <TextField
                          className="attributes"
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Name"
                          type="text"
                          
                          variant="outlined"
                          onChange={handleChange('name')}
                      />
                      <TextField
                      className="attributes"
                          
                          margin="dense"
                          id="email"
                          label="Email"
                          type="text"
                          
                          variant="outlined"
                          onChange={handleChange('email')}
                      />
                      <TextField
                      className="attributes"
                          
                          margin="dense"
                          id="phone"
                          label="Phone Number"
                          type="text"
                          
                          variant="outlined"
                          onChange={handleChange('phone')}
                      />
                      <TextField
                      className="attributes"
                          
                          margin="dense"
                          id="role"
                          label="Role"
                          type="text"
                          
                          variant="outlined"
                          onChange={handleChange('role')}
                      />
                      
                </div>
                <Button className="addEmployeeButton" color="primary" variant="contained" onClick={onSubmit} >Add</Button>
            </div>
        )
    }

    
}

export default NewEmployee
