const create=(credentials,bannerData)=>{
    return fetch('/api/createbanner',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:bannerData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))

}

const list=async(credentials,signal)=>{
    try {
        let response = await fetch('/api/listbanner',{
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

const updateBanner=(params,credentials,bannerData)=>{
    return fetch('/api/updatebanner/'+params.id,{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:bannerData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

export {create,list,updateBanner}