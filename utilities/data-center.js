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
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const loginUser = async (data) => {
    try{
        const response = await API.post('login', data)
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

export {checkEmail, postNewUserData, loginUser}