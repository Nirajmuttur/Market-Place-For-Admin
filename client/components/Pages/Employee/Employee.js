import React,{useState,useEffect} from 'react'
import './Employee.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import {Link} from 'react-router-dom'
import {list,deleteEmployee} from './../../../api/auth/employeeApi'
import auth from '../../../api/auth/auth-api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function Employee() {
      const [data, setData] = useState([]);
      useEffect(() => {
        const abortController =new AbortController()
        const signal=abortController.signal
        const jwt=auth.isAuthenticated()
        list({t:jwt.token},signal).then((data)=>{
          if(data.error){
            console.log(data.error)
          }else{
            setData(data)
          }
        })
        return function cleanup(){
          abortController.abort()
        }
      }, [])
    
      const notify = name=>{ 
        // Calling toast method by passing string
          toast.success(name) 
      }
      const jwt=auth.isAuthenticated()
      const handleDelete = (id) => {
        deleteEmployee({id:id},{t:jwt.token}).then((data)=>{
          if(data.error){
              notify(data.error)
          }else{
            toast.success('Employee Deleted Successfully')
          }
        })
        setData(data.filter((item) => item.id !== id));
      };
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'name', headerName: 'Employee Name', width: 200 },
            {
              field: 'email',
              headerName: 'Email',
              width: 150,
            },
            {
              field: 'phone.no',
              headerName: 'Phone',
              width: 150,
            },
            {
              field: 'role',
              headerName: 'Role',
              width: 150,
            },
            {
              field: "action",
              headerName: "Action",
              width: 150,
              renderCell: (params) => {
                return (
                  <>
                    <Link to={"/editEmployee/" + params.row.id}>
                      <button className="employeeListEdit">Edit</button>
                    </Link>
                    <DeleteOutline
                      className="employeeListDelete"
                      onClick={() => handleDelete(params.row.id)}
                    />
                  </>
                );
              },
            },
          ];
          
    return (
        <div className="employee">
            <div className="employeeTitleContainer">
                <h1 className="employeeTitle">Employee List</h1>
                <Link to="/newEmployee">
                    <button className="employeeAddButton">+ Add new</button>
                </Link>
            </div>
            <DataGrid disableSelectionOnClick rows={data} columns={columns} pageSize={10} checkboxSelection className="datagrid"/>
        </div>
    )
}

export default Employee
