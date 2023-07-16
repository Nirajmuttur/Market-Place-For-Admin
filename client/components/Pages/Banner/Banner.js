import React,{useState,useEffect} from 'react'
import './Banner.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import img1 from './../../../assets/3.png'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from './../../../api/auth/auth-api'
import { list, updateBanner } from '../../../api/auth/bannerApi';
toast.configure()

function Banner() {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    publish: '',
  });
  useEffect(() => {
    const abortController =new AbortController()
    const signal=abortController.signal
    const jwt=auth.isAuthenticated()
    list({t:jwt.token},signal).then((data)=>{
      if(data.error){
        console.log(data.error)
      }else{
        setData(data)
        setState({...state,publish:data[0].publish?true:false})
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  
  const jwt=auth.isAuthenticated()
      const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
      };
      const handleChange =name=> (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        handlePublish(state.publish?0:1,name)
      };
      const handlePublish=(t,id)=>{
        let banner=new FormData()
        state.publish&&banner.append('publish',t)
        updateBanner({id:id},{t:jwt.token},banner).then((data)=>{
          if(data.error){
            toast.error(data.error)
          }else{
            toast.success(data.message)
          }
        })
      }
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'bannerimage', 
              headerName: 'Image', 
              width: 150,
              renderCell:(params)=>{
                    return(
                        <div >
                            <img className="bannerImg" src={"http://localhost:3001/dist/uploads/"+params.row.image} alt="" />
                        </div>
                    )
                } 
            },
            { field: 'type', headerName: 'BannerType', width: 150 },
            { field: 'published', headerName: 'Published', width: 150 ,
              renderCell:(params)=>{
                return(
                  <Switch
                    checked={state.publish}
                    onChange={handleChange(params.row.id)}
                    color="primary"
                    name="publish"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                )
              }
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
        <div className="banner">
             <h1 className="bannertitle">Banner</h1>
             <div className="bannerTitleContainer">
               <Link to="/addBanner">
                <button className="bannerButton">+ Add Banner</button>
               </Link>
            </div>
            <DataGrid disableSelectionOnClick rows={data} columns={columns} pageSize={10} checkboxSelection className="datagrid"/>
        </div>
    )
}

export default Banner
