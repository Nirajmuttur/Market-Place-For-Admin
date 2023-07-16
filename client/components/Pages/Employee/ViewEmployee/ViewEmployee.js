import React,{useState,useEffect} from 'react'
import './ViewEmployee.css'
import {TextField,MenuItem,Button} from '@material-ui/core'
import { useParams } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import auth from '../../../../api/auth/auth-api';
import {employeeById, updateEmployee} from './../../../../api/auth/employeeApi'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function ViewEmployee() {
    const [employee, setEmployee] = useState([])
    const [redirect, setRedirect] = useState(false)
    const {id}=useParams()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt=auth.isAuthenticated()
        employeeById({id:id},{t:jwt.token},signal).then((data)=>{
            if(data.error){
                console.log(error)
            }else{
                setEmployee(data[0])
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [id])

    const handleEmployee=name=>e=>{
        setEmployee({...employee,[name]:e.target.value})
    }

    const jwt=auth.isAuthenticated()
    const handleSubmit=()=>{
        let updateEmployeeData = new FormData()
        employee.name && updateEmployeeData.append('name',employee.name)
        employee.description&&updateEmployeeData.append('email',employee.email)
        employee.price&&updateEmployeeData.append('phone',employee.phone)
        employee.stock&&updateEmployeeData.append('role',employee.role)
        updateEmployee({id:id},{t:jwt.token},updateEmployeeData).then((data)=>{
            if(data.error){
                notify(data.error)
            }else{
                toast.success('Employee Data Updated Successfully')
                setRedirect(true)
            }
        })
    }

    if(redirect){
        return(
            <>
              <Redirect push to="/employee" />
            </>
        )
    }else{
        return (
            <div className="viewemployee">
                <div className="productTitleContainer">
                        <h1 className="productTitle">Employee</h1>
                    </div>
                <div className="employeebox">
                    <form className="employeeForm">
                        <div className="employeeFormLeft">
                                <div className="employeedetails">
                                    <label>Employee Name</label>
                                    <TextField
                                        className="attributes"
                                        margin="dense"
                                        id="name"
                                        label="Name"
                                        type="text"
                                        placeholder={employee.name}
                                        variant="outlined"
                                        onChange={handleEmployee('name')}
                                    />
                                </div>
                                <div className="employeedetails">
                                    <label>Email</label>
                                    <TextField
                                        className="attributes"
                                        margin="dense"
                                        id="email"
                                        label="Email"
                                        type="text"
                                        placeholder={employee.email}
                                        variant="outlined"
                                        onChange={handleEmployee('email')}
                                    />
                                </div>
                                <div className="employeedetails">
                                    <label>Phone Number</label>
                                    <TextField
                                        className="attributes"
                                        margin="dense"
                                        id="phone"
                                        label="Phone Number"
                                        type="number"
                                        placeholder={employee.phone}
                                        variant="outlined"
                                        onChange={handleEmployee('phone')}
                                    />
                                </div>
                                <div className="employeedetails">
                                    <label>Role</label>
                                    <TextField
                                        className="attributes"
                                        margin="dense"
                                        id="role"
                                        label="Role"
                                        type="text"
                                        placeholder={employee.role}
                                        variant="outlined"
                                        onChange={handleEmployee('role')}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <button className="updateButton" onClick={handleSubmit}>Update</button>
            </div>
        )
    }
}

export default ViewEmployee
