import React,{useState} from 'react'
import './NewProduct.css'
import {TextField,MenuItem,Button} from '@material-ui/core'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import auth from '../../../../api/auth/auth-api'
import { create } from '../../../../api/auth/productsApi'
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function NewProduct() {
  const [values,setValues]=useState('Mysore Silk Saree')
  const [product,setProduct]=useState({
    name:'',
    description:'',
    category:'',
    price:'',
    image1:'',
    image2:'',
    image3:'',
    stock:'',
    error:'',
    redirect:false
})
const handleCategory = (event) => {
  setValues(event.target.value);
  setProduct({...product,category:event.target.value})
};
const handleChange=name=>event=>{
  const value=event.target.value
  setProduct({...product,[name]:value})
}
const handleImages=name=>event=>{
  if(event.target.files){
    setProduct({...product,[name]:event.target.files[0]})
  }
}

const notify = ()=>{ 
  
  // Calling toast method by passing string
  toast.success('Product Created Successfull') 
}
  const dropDownList = [
    {value:'Banarasi Silk Saree'},
        {value:'Kasheeda Saree'},
        {value:'Khun Saree'},
        {value:'Assam Silk Saree'},
        {value:'Kasuti Saree'},
        {value:'Chanderi Saree'},
        {value:'Tant Saree'},
        {value:'Kanjeevaram Sarees'},
        {value:'Batik Print Sarees'},
        {value:'Tussar silk Sarees'},
        {value:'Assam muga silk sarees'},
        {value:'Dhakai Jamdani Sarees'},
        {value:'Panchampalli Sarees'},
        {value:'Mysore Silk Saree'},
        {value:'Cotton Sarees'},
        {value:'Patola Sarees'},
        {value:'Leheriya Sarees'},
        {value:'Maheshwari Sarees'},
        {value:'Mundum Neriyathum'},
        {value:'Bhagalpuri Silk Sarees'},
        {value:'Pattu Sarees'},
]
const jwt = auth.isAuthenticated()
const onSubmit=()=>{
  let productData=new FormData()
  product.name&&productData.append('name',product.name)
  product.description&&productData.append('description',product.description)
  product.category&&productData.append('category',product.category)
  product.price&&productData.append('price',product.price)
  product.stock&&productData.append('stock',product.stock)
  product.image1&&productData.append('image',product.image1)
  product.image2&&productData.append('image',product.image2)
  product.image3&&productData.append('image',product.image3)
  console.log(product)
  create({t:jwt.token},productData).then((data)=>{
    if(data.error){
      console.log(data)
      setProduct({...product,error:data.error})
    }else{
      setProduct({...product,redirect:true,error:''})
      notify()
    }
  })
}
if(product.redirect){
    return (
      <>
        <Redirect push to="/productlist" />
      </>
    )
}else{
  return (
    <>
      <div className="newProduct">
        <h1>Add New Product</h1>
        <div className="addProductItem">
        <TextField
        className="attributes"
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      
                      variant="outlined"
                      onChange={handleChange('name')}
                  />
                  <TextField
                  className="attributes"
                      autoFocus
                      margin="dense"
                      id="desc"
                      label="Description"
                      type="text"
                      
                      variant="outlined"
                      onChange={handleChange('description')}
                  />
                  <TextField
                  className="attributes "
                      margin="dense"
                      select
                      autoFocus
                      id="catergory"
                      label="Catergory"
                      type="text"
                      variant="outlined"
                      value={values}
                      fullWidth
                      onChange={handleCategory}
                  >
                  {dropDownList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          {option.value}
                      </MenuItem>
                  ))}
                   </TextField>
                  <TextField
                  className="attributes"
                      autoFocus
                      margin="dense"
                      id="price"
                      label="Price"
                      type="text"
                      
                      variant="outlined"
                      onChange={handleChange('price')}
                  />
                  <TextField
                  className="attributes"
                      autoFocus
                      margin="dense"
                      id="stock"
                      label="Stock"
                      type="text"
                      
                      variant="outlined"
                      onChange={handleChange('stock')}
                  />
        </div>
        <div className="addProductImage">
        <input accept="image/*" 
                      id="icon-button-file"
                      className="file"
                      type="file" 
                      onChange={handleImages('image1')}
                  />
                  <label htmlFor="icon-button-file">
                  <Button variant="contained" color="secondary" component="span">
                  Upload Photo1 <FileUpload/>
                  </Button>
                  </label>
                  <input accept="image/*" 
                      id="icon-button-file2"
                      className="file"
                      type="file" 
                      onChange={handleImages('image2')}
                  />
                  <label htmlFor="icon-button-file2">
                  <Button variant="contained" color="secondary" component="span">
                  Upload Photo2 <FileUpload/>
                  </Button>
                  </label>
                  <input accept="image/*" 
                      id="icon-button-file3"
                      className="file"
                      type="file" 
                      onChange={handleImages('image3')}
                  />
                  <label htmlFor="icon-button-file3">
                  <Button variant="contained" color="secondary" component="span" >
                  Upload Photo3 <FileUpload/>
                  </Button>
                  </label>
        </div>
        
        <Button className="addProductButton" color="primary" variant="contained" onClick={onSubmit}>Create</Button>
      </div>
      
    </>
  )
}
    
}

export default NewProduct
