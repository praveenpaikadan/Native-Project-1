import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { globalFonts, themeColors } from '../styles/global-styles';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { sc } from '../styles/global-styles'

const currentDate = () => {
    const today = new Date();
    const month = parseInt(today.getMonth()+1);
    const day = parseInt(today.getDay()+1);
    switch (month) {
        case 1:
             let mmm = 'Jan';
             date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 2:
            mmm = 'Feb';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 3:
            mmm = 'Mar';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 4:
            mmm = 'Apr';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 5:
            mmm = 'May';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 6:
            mmm = 'Jun';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 7:
            mmm = 'Jul';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 8:
            mmm = 'Aug';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 9:
            mmm = 'Sep';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 10:
            mmm = 'Oct';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 11:
            mmm = 'Nov';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
        case 12:
            mmm = 'Dec';
            date = today.getDate() + '-' + mmm + '-' + today.getFullYear();
            break;
    }

    switch (day) {
        case 1:
            dddd = 'Sunday';
            return dayDate = dddd + ' ' + date;
            break;
        case 2:
            dddd = 'Monday';
            return dayDate = dddd + ' ' + date;
            break;
        case 3:
            dddd = 'Tuesday';
            return dayDate = dddd + ' ' + date;
            break;
        case 4:
            dddd = 'Wednesday';
            return dayDate = dddd + ' ' + date;
            break;
        case 5:
            dddd = 'Thursday';
            return dayDate = dddd + ' ' + date;
            break;
        case 6:
            dddd = 'Friday';
            return dayDate = dddd + ' ' + date;
            break;
        case 7:
            dddd = 'Saturday';
            return dayDate = dddd + ' ' + date;
            break;
    }
}
currentDate();


export const BodyCalendar = ({children}) => {
    const [closeCalendar, setCloseCalendar] = useState(true)
    
    return(
        <Modal transparent={true} visible={closeCalendar? true : false}>
            <View style={{...styles.overlay}}>
                <View style={styles.container}>
                    <View 
                        style={styles.line}>
                    </View>
                    <View style={styles.headingContainer}>
                        <View style={styles.headingContent}>
                            <FontAwesome5 name="calendar-alt" {...calendarIconStyling} />
                            <Text style={styles.heading}>BODY CALENDAR</Text> 
                        </View>
                        <TouchableOpacity onPress={() => setCloseCalendar(false)}>
                            <AntDesign name="closecircle" {...closeIconStylingSmall} />
                        </TouchableOpacity>
                        
                    </View>
                    
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{dayDate}</Text>
                        <View style={styles.viewButtonContainer}>
                            <View style={styles.verticalLine}></View>
                            <FontAwesome5 name="calendar-alt" {...calendarIconStylingSmall} />
                            <TouchableWithoutFeedback>
                            <Text style={styles.buttonText}>VIEW</Text>
                            </TouchableWithoutFeedback>
                            
                        </View>
                        
                    </View>
                    <View style={styles.childrenContainer}>
                        {children}
                    </View>
                </View>  
            </View>
        </Modal>
            
        
    );
}

const calendarIconStyling = {
    color: themeColors.secondary2,
    size: 20*sc
}

const calendarIconStylingSmall = {
    color: themeColors.tertiary1,
    size: 15*sc
}
const closeIconStylingSmall = {
    color: themeColors.primary2,
    size: 20*sc
}

const styles = StyleSheet.create({
    overlay:{
        width:'100%',
        height: '90%',
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    container:{
        justifyContent:'flex-end',
        height:'100%'
    },

    line:{
        width:'100%',
        height:5*sc,
        backgroundColor:themeColors.primary1
    },

    headingContainer:{
        flexDirection:'row',
        padding:10*sc,
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor:themeColors.tertiary1
    },

    headingContent:{
        flexDirection:'row',
        alignItems:'center',
    },

    heading:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.secondary2,
        paddingLeft: 10*sc,
        fontSize:18*sc
    

    },

    dateContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5*sc,
        backgroundColor:themeColors.primary1
    },

    date:{
        color:themeColors.secondary2,
        fontFamily:globalFonts.primaryMedium,
    },

    viewButtonContainer:{
        flexDirection:'row',
        alignItems:'center'
    },

    verticalLine:{
        width:2*sc,
        height:20*sc,
        backgroundColor:themeColors.tertiary1,
        marginRight:5*sc
    },

    buttonText:{
        marginLeft:5*sc,
        color:themeColors.secondary2,
        fontFamily:globalFonts.primaryMedium,
    },

    childrenContainer:{
        backgroundColor:themeColors.secondary2,
        
    },


})