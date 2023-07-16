import React,{useState} from 'react'
import './OrderList.css'
import { DataGrid } from '@material-ui/data-grid';
import {Link} from 'react-router-dom'
import {Visibility} from '@material-ui/icons'

function OrderList() {
    const rows = [
        { id: 1, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        { id: 2, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        { id: 3, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        { id: 4, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        { id: 5, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        { id:6, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        { id: 7, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        { id: 8, date: '26 July', customerName: 'Saree' ,status:'active',total:'Rs.699'},
        
      ];
      const [data, setData] = useState(rows);
      const columns = [
        { field: 'id', headerName: 'Order', width: 120 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'customerName', headerName: 'Customer Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'total', headerName: 'Total', width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
              return (
                <>
                  <Link to={"/order/" + params.row.id}>
                    <button className="orderListEdit"><Visibility className="viewicon"/> View</button>
                  </Link>
                </>
              );
            },
          },
      ];
          
    return (
        <div className="orderList">
            <div className="orderTitleContainer">
                <h1 className="orderTitle">OrderList</h1>
            </div>
            <DataGrid disableSelectionOnClick rows={data} columns={columns} pageSize={10} checkboxSelection className="datagrid"/>
        </div>
    )
}

export default OrderList
