import React,{useState,useEffect} from 'react'
import './ProductList.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { deleteProduct, list } from '../../../api/auth/productsApi';
import auth from '../../../api/auth/auth-api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function ProductList() {
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
    deleteProduct({id:id},{t:jwt.token}).then((data)=>{
      if(data.error){
          notify(data.error)
      }else{
        toast.success('Product Deleted Successfully')
      }
    })
    setData(data.filter((item) => item.id !== id));
  };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Product Name', width: 200 },
        {
          field: 'category',
          headerName: 'Category',
          width: 150,
        },
        {
          field: 'stock',
          headerName: 'Stock',
          width: 150,
        },
        {
          field: 'sellingprice',
          headerName: 'Selling Price',
          width: 150,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/product/" + params.row.id}>
                  <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(params.row.id)}
                />
              </>
            );
          },
        },
      ];
      
      
    return (
        <div className="productList">
           <div className="productTitleContainer">
                <h1 className="productTitle">Products</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <DataGrid disableSelectionOnClick rows={data} columns={columns} pageSize={10} checkboxSelection className="datagrid"/>
        </div>
    )
}

export default ProductList
