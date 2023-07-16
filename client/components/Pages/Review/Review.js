import React,{useState} from 'react'
import './Review.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Review() {
    const rows = [
        { id: 1, name: 'Saree', customer: 'Snow' ,review:'Good Quality',rating:'9'},
        
      ];
      const [data, setData] = useState(rows);
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'name', headerName: 'Product Name', width: 200 },
            {
              field: 'customer',
              headerName: 'Customer',
              width: 150,
            },
            {
              field: 'review',
              headerName: 'Review',
              width: 150,
            },
            {
              field: 'rating',
              headerName: 'rating',
              width: 150,
            },
          ];
          
    return (
        <div className="review">
            <div className="reviewTitleContainer">
                <h1 className="reviewTitle">Products Review</h1>
            </div>
            <DataGrid disableSelectionOnClick rows={data} columns={columns} pageSize={10} checkboxSelection className="datagrid"/>
        </div>
    )
}

export default Review
