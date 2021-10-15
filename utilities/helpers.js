import { BASE_URL } from "./api"

export const format_target = (value, type) => {
    try{
        if (type === 'seconds') {
            if (Number(value) > 120){
                return Math.round(Number(value)) + ' mins'
            }else{
                return value + ' secs' 
            }
        }else if( type === 'reps'){
            return value + ' reps'
        }else{
            sep = value.replace('X', 'x').split('x')
            return sep[0] + ' kg X ' + sep[1] + ' reps'
        }
    }catch{
        return value + type
    }
}

export const today = () => {
    a = new Date
    return String(a.getDate()) + '-' + String(a.getMonth()) + '-' + String(a.getFullYear())
}

export const makeMediaUrl = (filename, secured=false) => {
    return `${BASE_URL}/${secured?'protected-media':'media'}/${filename}`
}
