import React from 'react'
import './UserList.css'
import { DataGrid } from '@material-ui/data-grid';

function UserList() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        },
        {
          field: 'phoneNo',
          headerName: 'Phone No.',
          sortable: false,
          width: 130,
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon@gmail.com',phoneNo:7894561230 },
        { id: 2, lastName: 'Snow', firstName: 'Jon', email: 'jon@gmail.com',phoneNo:7894561230 },
        { id: 3, lastName: 'Snow', firstName: 'Jon', email: 'jon@gmail.com',phoneNo:7894561230 },
        { id: 4, lastName: 'Snow', firstName: 'Jon', email: 'jon@gmail.com',phoneNo:7894561230 },
        { id: 5, lastName: 'Snow', firstName: 'Jon', email: 'jon@gmail.com',phoneNo:7894561230 },
      ];
    return (
        <div className="userList">
            <DataGrid disableSelectionOnClick rows={rows} columns={columns} pageSize={10} checkboxSelection />
        </div>
    )
}

export default UserList
