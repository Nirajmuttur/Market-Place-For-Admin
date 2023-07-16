import React,{useState} from 'react'
import './AccountSettings.css'
import {TextField,Button} from '@material-ui/core'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
import {Redirect} from 'react-router-dom';
import { updateAdmin } from '../../../api/auth/admin=api';
import auth from './../../../api/auth/auth-api'

function AccountSettings() {
    const [admin, setadmin] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        confirmPassword:''
    })

    const handleChange=name=>e=>{
        setadmin({...admin,[name]:e.target.value})
    }

    const jwt=auth.isAuthenticated()
    const handleSubmit1=()=>{
        let updateAdminData = new FormData()
        admin.name && updateAdminData.append('name',admin.name)
        admin.email&&updateAdminData.append('email',admin.email)
        admin.phone&&updateAdminData.append('phone',admin.phone)
        updateAdmin({t:jwt.token},updateAdminData).then((data)=>{
            if(data.err){
                toast.error('Password did not match') 
            }else{
                toast.success('Update Successfull')
            }
        })
    }

    const notify = ()=>{ 
        // Calling toast method by passing string
        toast.error('Password did not match') 
    }

    const handleSubmit2=()=>{
        if(admin.password!=admin.confirmPassword){
            notify()
        }else{
            let updateAdminData2= new FormData()
            admin.password && updateAdminData2.append('password',admin.password)
            updateAdmin({t:jwt.token},updateAdminData2).then((data)=>{
                if(data.err){
                    toast.error('Password did not match') 
                }else{
                    toast.success('Update Successfull')
                }
            })
        }
    }

    return (
        <div className="account">
            <h1>Settings</h1>
            <div className="basicinfo">
                <span>Basic Information</span>
                <hr/>
                <div className="basicinfobody">
                    <div className="group">
                        <label className="col-sm-3">Full Name</label>
                            <TextField
                            className="col-sm-9"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            variant="outlined"
                            onChange={handleChange('name')}
                            />
                    </div>
                    <div className="group">
                        <label className="col-sm-3">Email</label>
                            <TextField
                            className="col-sm-9"
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="text"
                            variant="outlined"
                            onChange={handleChange('email')}
                            />
                    </div>
                    <div className="group">
                        <label className="col-sm-3">Phone </label>
                            <TextField
                            className="col-sm-9"
                            autoFocus
                            margin="dense"
                            id="phone"
                            label="+91xxxxxxxxxx"
                            type="number"
                            variant="outlined"
                            onChange={handleChange('phone')}
                            />
                    </div>
                    <Button variant="contained" color="primary" className="btn1" onClick={handleSubmit1}>Save Changes</Button>
                </div>
            </div>
            <div className="passwordinfo">
                <span>Change Password</span>
                <hr/>
                <div className="basicinfobody">
                    <div className="group">
                        <label className="col-sm-3">New Password</label>
                            <TextField
                            className="col-sm-9"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter New Password"
                            type="password"
                            variant="outlined"
                            onChange={handleChange('password')}
                            />
                    </div>
                    <div className="group">
                        <label className="col-sm-3">Confirm Password</label>
                            <TextField
                            className="col-sm-9"
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Confirm New Password"
                            type="password"
                            variant="outlined"
                            onChange={handleChange('confirmPassword')}
                            />
                    </div>
                    <Button variant="contained" color="primary" className="btn1" onClick={handleSubmit2}>Save Changes</Button>
                </div>
            </div>
            
        </div>
    )
}

export default AccountSettings
