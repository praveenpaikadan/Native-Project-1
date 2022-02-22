import { floor } from "react-native-reanimated"
import { BASE_URL } from "./api"


const repInNum = (rep) => {
    if(rep && typeof(rep) === 'string'){
        if(rep.includes('X')){
            try{
                // additional modifications in calories calculation formula for kg X reps goes here
                console.log('...............', rep)
                return Number(rep.split('X')[1])
            }catch{
                return 0
            }
        }else{
            return Number(rep)
        }
    }else{
        return 0
    }
        
}

export const convDecimalTime = (decimalTime) => {   // input eg : 6.5 for returning 06: 30 AM
    let dt  = Number(decimalTime)
    let hour24 = Math.floor(dt)
    let minFrac = dt - hour24
    let hrString = String(hour24 <= 12 ? hour24 : hour24 - 12)
    let amOrPm = dt > 12 ? "PM" : "AM"
    let minString = String(Math.round(60*minFrac))
    minString = minString.length === 1? '0'+minString: minString
    return hrString+ ":"+minString + " "+amOrPm
}

export const calculateCalories = (history, refList) => {  // refList is an on=bject with {<exerciseid>: <calories per rep>}

    var workoutsTracked = 0
    var calsBurned = 0
    if(history){
        history.forEach(dayData => {
          var workout = dayData.workout
          workoutsTracked = workoutsTracked + workout.length
          {/*
          workout.forEach(exercise => {
              // Needs to review this approach
              var calsPerRep = refList[exercise['exerciseID']]?refList[exercise['exerciseID']]:0
              var totalReps = 0
              exercise.reps.forEach(rep => {
                  totalReps = totalReps + repInNum(rep)
                })
              calsBurned = calsBurned + (calsPerRep * totalReps)
          })
        */}
        })
      }

    

    if(workoutsTracked > 9999){
        workoutsTracked = String(Math.floor(workoutsTracked/1000) + 'k')
    }

    {/*
    calsBurned = (calsBurned/1000).toFixed(2)
    if(calsBurned <10){
        null;
    }else{
        calsBurned = Math.floor(calsBurned)
        if(calsBurned > 99999999){
            calsBurned = String(Math.floor(calsBurned/1000000) + 'm')
        }else if(calsBurned > 9999){
            calsBurned = String(Math.floor(calsBurned/1000) + 'k')
        }
    }
     */}
    return {caloriesBurned: calsBurned, workoutsTracked: workoutsTracked}
}

export const format_target = (value, type) => {
    try{
        if (type === 'seconds') {
            if (Number(value) > 120){
                return Math.round(Number(value)/60) + ' mins'
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

    if(d.length === 1){
        d = '0' + d
    }

    if(m.length === 1){
        m = '0' + m
    }
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
    var a = new Date
    return (week?DAYS[a.getDay()] + ' ': '') + String(a.getDate()) + '-' + MONTHS[a.getMonth()] + '-' + String(a.getFullYear())
}

export const dmyToYmd = (dmy) => {
    var arr = dmy.split('-')
    var d = arr[0].length === 1? '0' + arr[0]: arr[0]
    var m = arr[1]
    var y = arr[2]

    if(d.length === 1){
        d = '0' + d
    }

    if(m.length === 1){
        m = '0' + m
    }

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

export const convertMongooseDateString = (date) => {
    const MONTHS =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if(date){
        var dateObj = new Date(date)
        var date = dateObj.getDate()
        var month = dateObj. getMonth()
        var year = dateObj. getFullYear()
        var day = dateObj.getDay()
        var returnVal = DAYS[day] + " " + date+ " "+MONTHS[month] + " "+year
        return returnVal  
    }else{
        return null
    }
    
}
export const getImageUrl  = (filename, level) => {
    if(level == 'open'){
        return BASE_URL+'/media/'+ filename
    }
}

export const convertdd_mm_yyyyStringToTime = (inpDate) => {
    // input dd-mm-yyy
    let a = inpDate.split("-")
    let b = a[1]+"/"+a[0]+"/"+a[2]
    let dateObj = new Date(b)
    return dateObj.getTime()
}

export const getFullMediaUrlIfRelative = (potRelUrl) => {
    if(!potRelUrl){
        return potRelUrl
    }
    if(potRelUrl.substring(0, 7) === `/media/` ){
        return BASE_URL + potRelUrl
    }else{
        return potRelUrl
    }
}

export const calculateBMI = (height, weight) => {
    var bmi = weight/(height*height/10000)
    var cond = null
    var col = 'orange'
    if(bmi<18.5){cond = 'UNDER WEIGHT'; col = 'orange'}
    else if(bmi>=18.5 && bmi<25 ){cond = 'HEALTHY'; col = 'green'}
    else if(bmi>=25 && bmi<30 ){cond = 'OVER WEIGHT'; col = 'orange'}
    else{cond = 'OBESE'; col = 'red'}

    return {value: bmi.toFixed(1), condition: cond, color: col}
}