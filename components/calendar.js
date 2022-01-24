import React, { useState, useEffect,  useRef } from 'react';
import { View, Text } from 'react-native';
import {Agenda} from 'react-native-calendars';
import { globalFonts, sc, themeColors } from '../styles/global-styles';
import LottieView from 'lottie-react-native';
import { today, dmyToYmd } from '../utilities/helpers';
import { WorkoutCard } from '../components/workout-card';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Spinner1 } from './loading-spinner';

// All date s used in this component is of the form yyyy/mm/dd. use the function dmyToYmd() to convert if dates are in dd/mm/yyy format. 
const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


const DateBanner = ({date}) => {  //date in yyyy-mm-dd format 
  var weekName = DAYS[new Date(date).getDay()]
  var arr = date.split('-')
  var day = arr[2]
  var month = months[arr[1]-1]
  var year = arr [0]
  
  return(
    <View style={{ marginTop: 10*sc,flexDirection: 'row', alignSelf:'flex-start', padding: 10*sc, height: 125*sc}}>
      <Text style={{ opacity: 0.9,fontFamily: globalFonts.primaryLight, fontSize: 105*sc, color: themeColors.primary1, paddingTop: 0, transform: [{translateY: -22*sc}]}}>{day}</Text>
      <View style={{flex: 1, paddingLeft: 2*sc}}>

          <View>
            <Text style={{fontFamily: globalFonts.primaryBold, opacity: 0.4}}>{month}</Text>
            <Text style={{fontFamily: globalFonts.primaryLight, fontSize: 20*sc}}>{year}</Text>
          </View>

        <View>
          <Text style={{opacity: 0.7,fontFamily: globalFonts.primaryLight, fontSize: 42*sc, color: themeColors.primary1, alignSelf:'flex-start'}}>{weekName}</Text>
        </View>
      </View>
    </View>
  )
  
}

const DownKnob = ({text=true}) => {
  const [open, setOpen] = useState(false)
  return(
    <View style={{width: '100%'}}
    >{!text?
    <View style={{width:100, height: 8*sc, backgroundColor: themeColors.tertiary1, borderRadius: 10, opacity: 0.1, transform: [{translateY: 8}], elevation: 10 }} >
    </View>: <Text style={{fontFamily: globalFonts.primaryLight, paddingTop: 5*sc, fontSize: 12*sc, opacity: 0.5, color: themeColors.tertiary1}}>Swipe down for calender</Text>}
    </View>
  )
}

const WorkoutCardCover = ({selectedDate, item, programName}) => {

  var dA = selectedDate.split('-')
  return (
    <ScrollView style={{flex: 1}}>
    <View style={{flex: 1, alignItems: 'center',  marginBottom: 20*sc}}> 
        <WorkoutCard
        day={item.day}
        date={dA[2]}
        month={'--'}
        year={dA[1]}
        programName={programName}
        muscles={'TBD-Target'}
        calories='TBD-calories' 
        focus={true}
        data={item}
        tick={true}
        noCardLook={true}
      /> 
    </View>
    </ScrollView>

  )
}


const Banner = ({date, item, programName}) => {
  return (
    <View style={{flex: 1}}>
    <DateBanner date = {date}/>
    {!item?
    <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>   
      <Text style={{fontSize: 30*sc, fontFamily: globalFonts.primaryRegular, opacity: 0.8, textAlign: 'center', transform: [{translateY: 30*sc}], opacity: 0.1, width: 300*sc}}>No workouts done on this day !!!</Text>
      <LottieView
          autoPlay={true}
          style={{
            width: 200,
            height: 200,
            transform: [{translateY: 0*sc}]
            // backgroundColor: '#eee',
          }}
          source={require('../assets/lottie/lazyCat.json')}
        />
    </View>
    :<WorkoutCardCover selectedDate={date} item={item} programName={programName}/>
    // : null
    }
    </View>
  )
}



export const AgendaCalendar = () => {

  const [items, setItems] = useState({});
  const [marked, setMarked] = useState({});

  const [programName, setProgram] = useState(null);

  // const [day, setDay] = useState(today.getDate())
  // const [month, setMonth] = useState(today.getDate())
  // const [year, setYear] = useState(today.getDate())
  const [downText, setDownText] = useState(true)
  const [selectedDate, setSelectedDate] = useState(today(true))
  const [loading, setLoading] = useState(true);

  const compRef = useRef(null)
  
  useEffect(() => {
    setLoading(true)
    AsyncStorage.getItem('workoutData')
    .then((res) => {
      var tempItem = {}
      var tempMarked = {}
      var programName = ""
      if(res){
        var response = JSON.parse(res)
        if(response.history){
          response.history.forEach((dayDetail) => {
            var date = dmyToYmd(dayDetail.dateCompleted)
            tempItem[date] = dayDetail
            tempMarked[date] = {marked: true}
            programName = response.program.programName
          })
        }
      }
      if(compRef){
        console.log('Updating statesssssssssssssssssssss')
        console.log(programName, '\n\n\n',tempItem,   '\n\n\n',  tempMarked, '\n\n\n')
        setProgram(programName)
        setItems(tempItem)
        setMarked(tempMarked)
        setLoading(false)
        setTimeout(() => {setDownText(false)}, 1000)
      }    
    })
  }, [])

  
  if(loading){
    return(
      <View style={{width: '100%', height: '50%', backgroundColor: themeColors.primary2, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner1 />
      </View>
    )
  }

  return(
      <Agenda ref={compRef}
      initialNumToRender={1}
    // The list of items that have to be displayed in agenda. If you want to render item as empty date
    // the value of date key has to be an empty array []. If there exists no value for date key it is
    // considered that the date in question is not yet loaded
    items={{}}
    // Callback that gets called when items for a certain month should be loaded (month became visible)
    // loadItemsForMonth={(month) => {console.log('trigger items loading')}}
    // Callback that fires when the calendar is opened or closed
    // onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
    // Callback that gets called on day press
    onDayPress={(day) => {setSelectedDate(day.dateString)}}
    // Callback that gets called when day changes while scrolling agenda list
    // onDayChange={(day) => {console.log('day changed')}}
    // Initially selected day
    selected={selectedDate}
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    minDate={'2021-10-01'}
    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    maxDate={today(true)}
    // Max amount of months allowed to scroll to the past. Default = 50
    pastScrollRange={18}
    // Max amount of months allowed to scroll to the future. Default = 50
    futureScrollRange={1}
    // Specify how each item should be rendered in agenda
    // renderItem={(item, firstItemInDay) => {return (<View></View>);}}
    // Specify how each date should be rendered. day can be undefined if the item is not first in that day
    renderDay={(day, item) => {return (<WorkoutCardCover selectedDate={selectedDate} item={item} programName={programName} />);}}
    // Specify how empty date content with no items should be rendered
    // renderEmptyDate={() => {return (<View />);}}
    // Specify how agenda knob should look like
    renderKnob={() => {return (<DownKnob text = {downText}/>);}}
    // Specify what should be rendered instead of ActivityIndicator
    renderEmptyData = {() => {return (<Banner date={selectedDate} item={items[selectedDate]} programName={programName}/>);}}
    // Specify your item comparison function for increased performance
    // rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
    // Hide knob button. Default = false
    hideKnob={false}
    // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
    showClosingKnob={true}
    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
    markedDates={marked}
    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
    disabledByDefault={true}
    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
    // onRefresh={() => console.log('refreshing...')}
    // Set this true while waiting for new data from a refresh
    refreshing={false}
    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
    refreshControl={null}
    // Agenda theme
    theme={{
      selectedDayBackgroundColor: themeColors.primary1,
      dotColor: themeColors.primary1,
      agendaDayTextColor: themeColors.primary1,
      dayTextColor: themeColors.primary1,
      textDisabledColor: themeColors.tertiary3,
      // monthTextColor: themeColors.primary1,
      textSectionTitleColor: themeColors.primary1,
  
      // ...calendarTheme,
      agendaDayTextColor: 'yellow',
      agendaDayNumColor: 'green',
      agendaTodayColor: 'red',
      agendaKnobColor: 'blue'
    }}
    // Agenda container style
    style={{}}
  />
    )
}