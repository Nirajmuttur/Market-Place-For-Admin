import React,{useState} from 'react'
import './PopupBanner.css'
import {TextField,MenuItem,Button} from '@material-ui/core'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { Link } from "react-router-dom";
import { create } from '../../../../api/auth/bannerApi';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../../../api/auth/auth-api';
toast.configure()

function PopupBanner() {
    const [values,setValues]=useState('Select Banner Type')
    const [bannerimage, setbannerimage] = useState({
        image:''
    })
    const [data, setdata] = useState({
        type:'',
        image:'',
        redirect:false
    })
    const dropList=[
        {value:'PopUp Banner'},
        {value:'Main Banner'}
    ]
    const handleCategory = (event) => {
        setValues(event.target.value);
        setdata({...data,type:event.target.value})
    };

    const handleImage=name=>e=>{
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setbannerimage({
              [name]: reader.result,
            });
            setdata({...data,[name]:e.target.files[0]})
          };
          
        reader.readAsDataURL(file);
    }
    const jwt=auth.isAuthenticated()
    const handleSubmit=()=>{
        let bannerData =new FormData()
        data.type&&bannerData.append('type',data.type)
        data.image&&bannerData.append('image',data.image)
        create({t:jwt.token},bannerData).then((data)=>{
            if(data.error){
                toast.error('Error creating banner')
            }else{
                setdata({...data,redirect:true})
                toast.success('Banner created')
            }
        })
    }
    if(data.redirect){
        return (
            <>
              <Redirect push to="/banner" />
            </>
          )
    }else{
        return (
            <div className="popupbanner">
                <h1>Add Banner</h1>
                <div className="banner2">
                    <div className="bannerform">
                        <div>
                         <span className="bannerType">Banner Type</span>
                             <TextField
                             className="attributes "
                                 margin="dense"
                                 select
                                 id="catergory"
                                 label="Catergory"
                                 type="text"
                                 variant="outlined"
                                 value={values}
                                 fullWidth
                                 onChange={handleCategory}
                             >
                                 {dropList.map((option) => (
                                     <MenuItem key={option.value} value={option.value}>
                                         {option.value}
                                     </MenuItem>
                                 ))}
                             </TextField>
                             <input accept="image/*" 
                                 id="icon-button-file"
                                 className="file"
                                 type="file" 
                                 onChange={handleImage('image')}
                             />
                             <label htmlFor="icon-button-file" className="bannerbtn">
                                 <Button variant="outlined" color="primary" component="span" >
                                 Upload Photo <FileUpload/>
                                 </Button>
                             </label>
                             <div className="btns">
                                 <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>Save </Button>
                                 <Link to="/banner" className="link">
                                     <Button variant="contained" component="span" >
                                     Cancel 
                                     </Button>
                                 </Link>
                                 
                             </div>
                        </div>
                        <div>
                            {bannerimage.image &&<img src={bannerimage.image} alt="" className="bannerimage"></img>}
                                 
                        </div>
                    </div>
                     
                </div>
            </div>
         )
    }

    
}

export default PopupBanner
