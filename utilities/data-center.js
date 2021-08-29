import API from './api'


const checkEmail = async (data) => {
    try{
        const response = await API.post('checkemail', data)
        return response
    }catch(error){
        return error.response
    }
}


const postNewUserData = async (data) => {
    try{
        const response = await API.post('signup', data)
        return response
    }catch(error){
        return error.response
    }
}

const loginUser = async (data) => {
    const res = await API.post(BASE_URL+'/login', data)
    console.log(res.data)
}

export {checkEmail, postNewUserData, loginUser}