const updateAdmin=(credentials,adminData)=>{
    return fetch('/api/update/admin',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:adminData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

export {updateAdmin}