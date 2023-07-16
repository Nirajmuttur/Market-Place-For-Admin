const sigin = async (user)=>{
    try {
        let response = await fetch('/api/auth/sigin',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            credentials:'include',
            body:JSON.stringify(user)
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const signout = async()=>{
    try {
        let response = await fetch('/api/auth/signout',{
            method:'GET'
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export {sigin,signout}