const create=(credentials,productData)=>{
    return fetch('/api/createProduct',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:productData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))

}

const list=async(credentials,signal)=>{
    try {
        let response = await fetch('/api/productList',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+credentials.t,
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const productById=async(params,credentials,signal)=>{
    try {
        let response=await fetch('/api/productById/'+params.id,{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+credentials.t,
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const updateProduct=(params,credentials,productData)=>{
    return fetch('/api/updateProduct/'+params.id,{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:productData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

const recentProduct=async(credentials,signal)=>{
    try {
        let response =await fetch('/api/recentProducts',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+credentials.t,
            },
            signal:signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct=(params,credentials)=>{
    return fetch('/api/deleteProduct/'+params.id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

export {create,list,productById,updateProduct,deleteProduct,recentProduct}