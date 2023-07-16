import React,{useState,useEffect} from 'react'
import './ViewProduct.css'
import {TextField,MenuItem,Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom';
import {  Publish } from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import { productById, updateProduct } from '../../../../api/auth/productsApi';
import auth from '../../../../api/auth/auth-api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function ViewProduct() {
    const [product, setProduct] = useState([])
    const [productImage,setProductImage]=useState({
        image1:'',
        image2:'',
        image3:'',
        updateImage1:false,
        updateImage2:false,
        updateImage3:false,
        redirect:false
    })

    const handleImage=name=>e=>{
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setProductImage({
                ...productImage,
              [name]: reader.result,
            });
            setProduct({...product,[name]:e.target.files[0]})
          };
        reader.readAsDataURL(file);
    }

    const handleProduct=name=>e=>{
        setProduct({...product,[name]:e.target.value})
    }

    const {id}=useParams()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt=auth.isAuthenticated()
        productById({id:id},{t:jwt.token},signal).then((data)=>{
            if(data.error){
                console.log(error)
            }else{
                setProduct(data[0])
                
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [id])

    const notify = name=>{ 
      // Calling toast method by passing string
        toast.success(name) 
    }

    const jwt=auth.isAuthenticated()
    const handleSubmit=()=>{
        let updateProductData = new FormData()
        product.name && updateProductData.append('name',product.name)
        product.description&&updateProductData.append('description',product.description)
        //product.category_name&&updateProductData.append('category',product.category_name)
        product.price&&updateProductData.append('price',product.price)
        product.stock&&updateProductData.append('stock',product.stock)
        productImage.image1&&updateProductData.append('image',product.image1),
        
        productImage.image2&&updateProductData.append('image',product.image2)
        productImage.image3&&updateProductData.append('image',product.image3)
        updateProduct({id:id},{t:jwt.token},updateProductData).then((data)=>{
            if(data.error){
                notify(data.error)
            }else{
                setProductImage({...productImage,redirect:true})
                toast.success('Product Updated Successfully')
            }
        })
    }
    if(productImage.redirect){
        return (
          <>
            <Redirect push to="/productlist" />
          </>
        )
    }else{
        return (
        
            <div className="viewProduct">
               <div className="productTitleContainer">
                    <h1 className="productTitle">Product</h1>
                </div>
                <div className="productTop">
                    <div className="productTopRight">
                        <div className="productInfoTop">
                            <img src={productImage.image1? productImage.image1:"http://localhost:3001/dist/uploads/"+product.image1} alt="" className="productInfoImg" />
                            <span className="productName">{product.name}</span>
                        </div>
                        <div className="productInfoBottom">
                            <div className="productInfoItem">
                                <span className="productInfoKey">Name:</span>
                                <span className="productInfoValue">{product.name}</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productInfoKey">Description:</span>
                                <span className="productInfoValue">{product.description}</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productInfoKey">Price:</span>
                                <span className="productInfoValue">{product.price}</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productInfoKey">in stock:</span>
                                <span className="productInfoValue">{product.stock}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="productBottom">
                    <form className="productForm">
                        <div className="productFormLeft">
                        
                            <div className="productdetails">
                                <label>Product Name</label>
                                <TextField
                                    className="attributes"
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label={product.name}
                                    type="text"
                                    placeholder={product.name}
                                    variant="outlined"
                                    onChange={handleProduct('name')}
                                />
                                {/* <input type="text" placeholder={product.name} /> */}
                            </div>
                            <div className="productdetails">
                                <label>In Stock</label>
                                <TextField
                                    className="attributes"
                                    autoFocus
                                    margin="dense"
                                    id="stock"
                                    label={product.stock}
                                    type="text"
                                    placeholder={product.stock}
                                    variant="outlined"
                                    onChange={handleProduct('stock')}
                                />
                                {/* <input type="text" placeholder={product.stock} /> */}
                            </div>
                            <div className="productdetails">
                                <label>Price</label>
                                <TextField
                                    className="attributes"
                                    autoFocus
                                    margin="dense"
                                    id="price"
                                    label={product.price}
                                    type="text"
                                    placeholder={product.price}
                                    variant="outlined"
                                    onChange={handleProduct('price')}
                                />
                                {/* <input type="text" placeholder={product.price} /> */}
                            </div>
                            <div className="productdetails">
                                <label>Description</label>
                                <TextField
                                    className="attributes"
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label={product.description}
                                    type="text"
                                    placeholder={product.description}
                                    variant="outlined"
                                    onChange={handleProduct('description')}
                                />
                                {/* <input type="text" placeholder={product.price} /> */}
                            </div>
                        </div>
                    </form>
                </div>
                <div className=" productBottom">
                    <div className="productFormRight">
                    <div className="productUpload">
                            <img src={productImage.image1? productImage.image1:"http://localhost:3001/dist/uploads/"+product.image1} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} onChange={handleImage('image1')}/>
                        </div>
                        <div className="productUpload">
                            <img src={productImage.image2? productImage.image2:"http://localhost:3001/dist/uploads/"+product.image2} alt="" className="productUploadImg" />
                            <label for="file2">
                                <Publish/>
                            </label>
                            <input type="file" id="file2" style={{display:"none"}} onChange={handleImage('image2')}/>
                        </div> 
                        <div className="productUpload">
                            <img src={productImage.image3? productImage.image3:"http://localhost:3001/dist/uploads/"+product.image3} alt="" className="productUploadImg" />
                            <label for="file3">
                                <Publish/>
                            </label>
                            <input type="file" id="file3" style={{display:"none"}} onChange={handleImage('image3')}/>
                        </div>   
                            
                    </div>
                    <button className="productButton" onClick={handleSubmit}>Update</button>
                </div>
                
            </div>
        )
    }

    
}

export default ViewProduct
