import React,{useState} from 'react'
import './Login.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import loginImage from './../../assets/3.png'
import {Redirect} from 'react-router-dom';
import { sigin } from '../../api/auth/authLogin-api'
import auth from './../../api/auth/auth-api'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const initialValues={
    email:'',
    password:'',
}

const validationSchema = Yup.object({
    email:Yup.string().email('Invalid Format').required('Required'),
    password:Yup.string().required('Required')
})


function Login(props) {
    const [cate,setCate]=useState('User')
    const handleCategory = (event) => {
        setCate(event.target.value);
    };
    const [login, setLogin] = useState({
        toggle:false,
        open:false,
        error:'',
        redirectToReferrer:false
    });

    const loginToSignUp = () =>setLogin({toggle: !(login.toggle)});
    const dialogClose =()=>setLogin({open:!(login.open)})

    const onSubmit = values=>sigin(values).then((data)=>{
        if(data.error){
            toast.error("Credentials did not match")
            setLogin({...login,error:data.error})
        }else{
            auth.authenticate(data,()=>{
                setLogin({...login,error:'',redirectToReferrer:true})
            })
        }
    });

    // const {from}=props.location.state || {
    //     from:{
    //         pathname:"/dashboard"
    //     }
    // }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      });
    // const {redirectToReferrer}=login    
    if(login.redirectToReferrer){
        return(
            <>
                <Redirect push to="/" />
            </>
        )
    }else{
        return (
            <>
            <div className="form-container">
                 <div className='form-content-left'>
                     <img className='form-img' src={loginImage} alt='spaceship' />
                 </div>
                 <div className="form-content-right">
                     <form onSubmit={formik.handleSubmit} className='form'>
                         <h1>
                         Admin Login
                         </h1>
                         <div className="form-inputs">
                             <label className='form-label' htmlFor="email">Email</label>
                             <input type="text" id="email" name="email" className='form-input' {...formik.getFieldProps('email')}></input>
                             {formik.touched.email && formik.errors.email ? (
                             <div className='error'>{formik.errors.email}</div>
                             ) : null}
                         </div>
                         <div className="form-inputs">
                             <label className='form-label' htmlFor="password">Password</label>
                             <input type="password" id="password" name="password" className='form-input' {...formik.getFieldProps('password')}></input>
                             {formik.touched.password && formik.errors.password ? (
                             <div className='error'>{formik.errors.password}</div>
                             ) : null}
                         </div>
                         
                         <button className='form-input-btn' type='submit'>
                             Sign In
                         </button>
                         {/* {login.error && (<span className="error">{login.error}</span>)} */}
                         
                     </form>
                     
                 </div>
                 
            </div>
            </>
             
         );
    }

    
    
}

export default Login;
