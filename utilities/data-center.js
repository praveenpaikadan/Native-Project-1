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

const getAPIMedia = async (filename) => {
    try{
        const response = await API.get(`media/${filename}`)
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const testSubscribe = async (subscriptionDatails) => {
    
    try{
        const response = await API.post('subscription/new', subscriptionDatails )
        return response
    }catch(error){
        console.log(error)
        return error.response?error.response:{status: 101}
    }
}

const getWorkoutData = async (id) => {
    try{
        const response = await API.get('workoutdata')
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getExercise = async (id) => {
    try{
        const response = await API.get('workoutdata/exercise/'+id)
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}



const postDayWorkout = async (data) => {
    try{
        const response = await API.post('workoutdata/push', {dayWorkoutData: data})
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
} 


const postBulkDayWorkout = async (data) => {
    try{
        const response = await API.post('workoutdata/bulk', {bulkDayWorkoutData: data})
        return response
    }catch(error){
        console.log(error.response)
        return error.response?error.response:{status: 101}
    }
} 




export {checkEmail, postNewUserData, loginUser, getAPICredentials, getAPIAllLocal, getAPIAvailablePrograms, getAPIMedia, testSubscribe, getWorkoutData, getExercise, postDayWorkout, postBulkDayWorkout}