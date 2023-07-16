const create=(credentials,employeeData)=>{
    return fetch('/api/addEmployee',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:employeeData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))

}

const list=async(credentials,signal)=>{
    try {
        let response = await fetch('/api/employeelist',{
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

const employeeById=async(params,credentials,signal)=>{
    try {
        let response=await fetch('/api/employeeById/'+params.id,{
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

const updateEmployee=(params,credentials,empData)=>{
    return fetch('/api/updateEmployee/'+params.id,{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
        body:empData
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

const deleteEmployee=(params,credentials)=>{
    return fetch('/api/deleteEmployee/'+params.id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t,
        },
    }).then((response)=>{
        return response.json()
    }).catch((err)=>console.log(err))
}

export {create,list,deleteEmployee,updateEmployee,employeeById}