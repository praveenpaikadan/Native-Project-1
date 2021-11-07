import { floor } from "react-native-reanimated"
import { BASE_URL } from "./api"


const repInNum = ( rep) => {
    if(rep.includes('X')){
        try{
            // additional modifications in calories calculation formula for kg X reps goes here
            return Number(rep.split('X')[1])
        }catch{
            return 0
        }
    }else{
        return Number(rep)
    }
}

export const calculateCalories = (history, refList) => {  // refList is an on=bject with {<exerciseid>: <calories per rep>}

    var workoutsTracked = 0
    var calsBurned = 0
    if(history){
        history.forEach(dayData => {
          var workout = dayData.workout
          workoutsTracked = workoutsTracked + workout.length
          workout.forEach(exercise => {
              var calsPerRep = refList[exercise['exerciseID']]
              var totalReps = 0
              exercise.reps.forEach(rep => {
                  totalReps = totalReps + repInNum(rep)
                })
              calsBurned = calsBurned + (calsPerRep * totalReps)
          })
        })
      }

    return {caloriesBurned: calsBurned, workoutsTracked: workoutsTracked}
}


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
            var sep = value.replace('X', 'x').split('x')
            return sep[0] + ' kg X ' + (sep[1]?sep[1]:'0') + ' reps'
        }
    }catch{
        return value + type
    }
}

export const today = (ymd) => {
    var a = new Date
    var d = String(a.getDate())
    d = d.length ==1?'0'+d:d
    var m = String(a.getMonth()+1)
    var y = String(a.getFullYear())
    if(ymd){
        console.log('ymd date is ', y+ '-' + m + '-' + d )
        return  [y,m,d].join('-')
    }
    return [d,m,y].join('-')
    // return '4-11-2021'
}


export const todayInWord = (week=true) => {
    const MONTHS =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    a = new Date
    return (week?DAYS[a.getDay()] + ' ': '') + String(a.getDate()) + '-' + MONTHS[a.getMonth()] + '-' + String(a.getFullYear())
}

export const dmyToYmd = (dmy) => {
    var arr = dmy.split('-')
    var d = arr[0].length === 1? '0' + arr[0]: arr[0]
    var m = arr[1]
    var y = arr[2]
    return [y,m,d].join('-')
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