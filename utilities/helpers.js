import { floor } from "react-native-reanimated"
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
            return sep[0] + ' kg X ' + (sep[1]?sep[1]:'0') + ' reps'
        }
    }catch{
        return value + type
    }
}

export const today = () => {
    a = new Date
    // return String(a.getDate()) + '-' + String(a.getMonth()+1) + '-' + String(a.getFullYear())
    return '4-11-2021'
}

export const makeMediaUrl = (filename, secured=false) => {
    return `${BASE_URL}/${secured?'protected-media':'media'}/${filename}`
}

export const formatIntervel = (secs) => {
    try{
        secs = Number(secs)
        return secs<120?secs + ' seconds': Math.round(secs/60) + ' minutes' 
    }catch{
        return secs + ' seconds'
    }
}