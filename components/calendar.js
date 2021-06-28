import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { globalFonts, sc, themeColors } from '../styles/global-styles';
import { AntDesign } from '@expo/vector-icons';




export const BodyCalendar = () => {

  const today=new Date()
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  
  
  const [day, setDay] = useState(today.getDate())
  const [month, setMonth] = useState(today.getDate())
  const [year, setYear] = useState(today.getDate())
  

  const CalenderHeader = ({date}) => {
    return(
      <View style={{
        flexDirection:'row', 
        width:'100%', 
        justifyContent:'flex-start',
        alignItems:'center',
        opacity:0.6,
        fontSize:12*sc,
        marginTop:10*sc,
        paddingBottom:5*sc,
        borderBottomWidth: 1*sc,
        borderBottomColor:themeColors.tertiary1}}>
        <Text style={{
          fontFamily:globalFonts.primaryBold,
          paddingRight:10,
          fontSize:12*sc
          }}>{months[date.getMonth()]}</Text>
        <Text style={{
          fontFamily:globalFonts.primaryLight,
          paddingRight:10,
          fontSize:12*sc
          }}>{date.getFullYear()}</Text>

          <View style={{
            flex:1,
            flexDirection:'row',
            justifyContent:'flex-end',
          }}>
            <AntDesign name="caretleft" size={14*sc} color="black" onPress={(date)=>{date.setMonth(4)}}/>
            <AntDesign name="caretright" size={14*sc} color="black" style={{marginLeft:6*sc}}/>
          </View>
      </View>
    )}
  
  
  return(
    <View>
    
    
    <Calendar
      // Initially visible month. Default = Date()
      current= {Date()}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2021-01-01'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'2050-01-01'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {console.log('selected day', day)}}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {console.log('selected day', day)}}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy MM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {console.log('month changed', month)}}
      // Hide month navigation arrows. Default = false
      hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={(direction) => (<Arrow/>)}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={false}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={false}
      // Show week numbers to the left. Default = false
      showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={subtractMonth => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Disable left arrow. Default = false
      disableArrowLeft={true}
      // Disable right arrow. Default = false
      disableArrowRight={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter.
      renderHeader={(date) => (<CalenderHeader date = {date}/>)}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}







      style={{
        borderRadius:20*sc,
        height: 310,
        width:300,
        backgroundColor:themeColors.tertiary2
      }}
      // Specify theme properties to override specific styles for calendar parts. Default = {}
      theme={{
        backgroundColor: themeColors.tertiary2,
        calendarBackground: themeColors.tertiary2,
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: themeColors.primary1,
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        textDayFontFamily: globalFonts.primaryMedium,
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: globalFonts.primaryBold,
        textDayHeaderColor: globalFonts.primaryLight,
        // textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 13*sc,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 13*sc
      }}
    />
    </View>
  )}

