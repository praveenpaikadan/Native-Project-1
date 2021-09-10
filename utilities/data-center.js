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

const getAPICredentials = async () => {
    try{
        console.log("entered getAPICredentials")
        const response = await API.get('user/data')
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getAPIAllLocal = async () => {
    try{
        const response = await API.get('user/updatelocal')
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getAPIAvailablePrograms = async () => {
    try{
        const response = await API.get('subscription/availableprograms')
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}



export {checkEmail, postNewUserData, loginUser, getAPICredentials, getAPIAllLocal, getAPIAvailablePrograms}