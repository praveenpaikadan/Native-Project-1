import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight, ScrollView, TouchableWithoutFeedback, ActivityIndicator} from "react-native";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { AuthContext } from "../components/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import { DietPlanGraphics } from "../assets/svgs/svg-graphics";
import { ProfilePhoto } from "../components/profile-photo";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { convDecimalTime, today, todayInWord } from "../utilities/helpers";
import { ElevatedCardTypeOne } from "../components/cards";
import { ButtonType1 } from "../components/buttons";
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from "react-native-svg"
import { getCompleteDietPlan } from "../utilities/data-center";
import flashMessage from "../utilities/flash-message";
import { MessageBox1 } from "../components/message-box";
import { EmptyPaper } from "../assets/svgs/svg-graphics";

const createContentsList = (contents) => {
    return contents.map((item) => {return item.content})
}

const DietPlanModel = ({visible, dietItem, setVisible}) => {

    const styles = StyleSheet.create({
        overlay: {
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        },
      
        modalContainer: {
          width: "90%",
          backgroundColor: themeColors.secondary2,
          padding: 20 * sc,
          borderRadius: 20*sc,
          height: '80 %',
          paddingVertical: 30*sc
        },
      
        headingContainer: {
          justifyContent: "center",
          alignItems: "center",
          height: 30 * sc,
          marginBottom: 30*sc
        },
      
        heading: {
          fontFamily: globalFonts.primaryBold,
          color: themeColors.tertiary1,
          marginTop: 10 * sc,
          marginBottom: 5*sc,
          // letterSpacing: 0.5 * sc,
          fontSize: 18 * sc,
          lineHeight: 23 * sc,
          paddingHorizontal: 5*sc,
        },
      
        line: {
          width: "100%",
          height: 5 * sc,
          backgroundColor: themeColors.primary2,
          marginBottom: 15 * sc,
        },

        content:{
            fontFamily: globalFonts.primaryRegular,
            opacity: 0.7,
            paddingVertical: 5*sc
        },

        time:{
            fontFamily: globalFonts.primaryLight,
            opacity: 0.5,
            fontSize: 12
        },
      
        row: {
          flexDirection: "row",
          justifyContent: "center",
        },
      
        button: {
          marginHorizontal: 70 * sc,
          marginVertical: 10 * sc,
        },
      
        buttonText: {
          fontSize: 15 * sc,
        },
        button1: {
          marginHorizontal: 2 * sc,
          marginVertical: 10 * sc,
        },
      
        buttonText1: {
          fontSize: 12 * sc,
        },
      });
      

    return(
        <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={{position: 'absolute', right: 20*sc, top: 20*sc}}>
                <TouchableOpacity style={{width: 30*sc, height: 30*sc, alignItems:'center', justifyContent: 'center'}} onPress={() => setVisible(false)}>
                    <FontAwesome5
                        name="window-close"
                        size={17*sc}
                        color={themeColors.primary1}
                    />    
                </TouchableOpacity>
                
            </View>

            <View style={styles.headingContainer}>
              <Text style={styles.heading}>{dietItem.title}</Text>
              <Text style={styles.time}>Reccomended Time: {convDecimalTime(dietItem.time)}</Text>
            </View>

            <View style={styles.line}></View>

            <ScrollView>
                {createContentsList(dietItem.contents).map((subItem, index) => {
                    return (<Text key={index} style={styles.content} >{subItem}</Text>)
                })}
            </ScrollView>
  
              </View>
            </View>
      </Modal>
    )
}

function BMIGraphics(props) {
  return (
    <Svg
      width={166}
      height={91}
      viewBox="0 0 166 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M166 83A83.002 83.002 0 0083 0 83 83 0 000 83h8.489a74.511 74.511 0 01149.022 0H166z"
        fill="url(#paint0_radial_0_1)"
      />
      <Circle r={8} transform="matrix(1 0 0 -1 83 83)" fill="#C4C4C4" />
      <Defs>
        <RadialGradient
          id="paint0_radial_0_1"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`rotate(${(-90) + props.angle} 47 36) scale(185)`}
        >
          <Stop stopColor="#FF4C00" />
          <Stop offset={1} stopColor="#FF4C00" stopOpacity={0} />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

const BMI = ({weight, height}) => {
    var bmi = weight/(height*height/10000)
    var min = 10
    var max = 60
    var startAngle = 0
    var endAngle = 180/ (max-min)*bmi
    var pointerWidth = 70
    var pointerLength = 2
    const [angle, setAngle] = useState(startAngle)
    const [text, setText] = useState('--')
    var cond //condion 
    var col  //color

    if(bmi<18.5){cond = 'UNDER WEIGHT'; col = 'orange'}
    else if(bmi>=18.5 && bmi<25 ){cond = 'HEALTHY'; col = 'green'}
    else if(bmi>=25 && bmi<30 ){cond = 'OVER WEIGHT'; col = 'orange'}
    else{cond = 'OBESE'; col = 'red'}

    const raiseAngle = () => {
        var a = startAngle // angle
        var i = setInterval(() => {
            if(a < endAngle){
                setAngle(a)
                a = a + 5
            }else{
                setAngle(endAngle)
                clearInterval(i)
                setTimeout(() => {   
                    setText(cond)
                }, 100)
            }
        }, 30)}

    const dipAngle = () => {
        setText('--')
        var a = endAngle // angle
        var i = setInterval(() => {
            if(a > startAngle){
                setAngle(a)
                a = a - 10
            }else{
                setAngle(startAngle)
                clearInterval(i)
                raiseAngle()
            }
        }, 30)}

    useEffect(() => {
        setText('--')
        setAngle(startAngle)
        raiseAngle()
        
    }, [])

    return(
        <TouchableWithoutFeedback onPress={() => {dipAngle()}}>

            <View style={{position: 'relative', transform:[{scale: 1*sc}]}}>
                <View style={{position: 'absolute', width: '100%', top: 20,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily: globalFonts.primaryBold, fontSize: 15, opacity: 0.2 }}>{'BMI'}</Text>
                    <Text style={{fontFamily: globalFonts.primaryBold, fontSize: 25, opacity: 0.4 }}>{Math.round(angle/180*(max-min) * 10) / 10}</Text>
                    <Text style={{fontFamily: globalFonts.primaryRegular, marginTop: 28, opacity: 0.8, color: col}}>{text}</Text>
                </View>
                
                <BMIGraphics angle={angle}/>
                <View style={{                      // pointer
                    width: pointerWidth, 
                    height: pointerLength, 
                    backgroundColor: themeColors.primary1, 
                    position:'absolute', 
                    bottom: 7, 
                    left: 48,
                    transform:[{rotateZ: `${angle}deg`}, {translateX:  -1 * pointerWidth/2}]}
                    }></View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const RecommendedDiet = ({dayDiet}) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalContent, setModalContent] = React.useState(dayDiet[0])


    return(
        <View style={{marginTop: 10*sc, marginTop: 10*sc, flex: 1} } >
        <DietPlanModel visible={modalVisible} dietItem={modalContent} setVisible={setModalVisible} />
        <Text style={{...styles.boldText, paddingLeft: 12*sc, }}>Reccomended Diet: </Text>
        <View style={{flex: 1}}>
            <FlatList
                data={dayDiet}
                keyExtractor={ (item, index) => String(index)}
                horizontal
                style={{height: '100%'}}
                renderItem={({ item, index, separators }) => (
                    <ElevatedCardTypeOne styling={{
                        margin: 10*sc,
                        marginTop: 5*sc,
                        width: 200*sc, 
                        elevation: 7,
                        backgroundColor: 'white',
                        borderRadius: 8*sc,
                    }}>
                        <TouchableHighlight key={index}
                            activeOpacity={0.6}
                            underlayColor= 'rgba(255, 76, 0, 0.2)'
                            onPress={() => {setModalContent(item); setModalVisible(true)}}
                            style={{width:'100%', height: '100%', padding: 14*sc}}
                            >
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10*sc,}}>
                                    <Text style={{...styles.mealHeading, marginRight: 8*sc}}>{item.title}</Text>
                                    <FontAwesome5
                                        name="clock"
                                        size={13*sc}
                                        color={themeColors.secondary1}
                                        style={{opacity: 0.5, marginRight:2*sc}}
                                        />
                                        <Text style={{...styles.mealHeading}}>{convDecimalTime(item.time)}</Text>
                                </View>
                                
                                <ScrollView>
                                    {createContentsList(item.contents).map((subItem, index) => {
                                        return (<Text key={index} style={styles.mealItem} >{subItem}</Text>)
                                    })}
                                </ScrollView>
                            </View>
                        </TouchableHighlight>
                        <View style = {{width: '100%', position: 'absolute', bottom: 0, height: 40*sc, backgroundColor: themeColors.primary1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: globalFonts.primaryLight, color: 'white', fontSize: 12*sc}}>Tap to expand</Text>
                        </View>
                    </ElevatedCardTypeOne>
                )}
            />
        </View>
    </View>
    )
}
export default DietPlan = ({ navigation, route }) => {

  const {day, programID} = route.params
  const {dayWorkout} = React.useContext(WorkoutContext);
  const {credentials} = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(0)
  const compExist = React.useRef(true)
  const [reloadSwich, setReloadSwitch] = React.useState(true)
  const [noData, setNoData] = React.useState(false)
  const [target, setTarget] = React.useState([])
  const [dayDiet, setDayDiet] = React.useState([])
  const [water, setWater] = React.useState(0)

  React.useEffect(() => {

    var savedDP = null 
    var savedWater = null
    AsyncStorage.getItem('dietPlan')
    .then((saved) => {
        try{
            if(saved && compExist.current){
                savedDP = JSON.parse(saved).data
                savedWater = JSON.parse(saved).water
                console.log(savedDP[day-1])
                setTarget(savedDP[day-1].target)
                setDayDiet(savedDP[day-1].plan)
                setWater(savedWater)
                setLoading(1)
              }
        }catch{
            null
        }
     
    })

    getCompleteDietPlan(programID)
    .then((response) => {
      if(compExist.current){
        switch (response.status) {
          case 200:
            if(response.data){
                var data = response.data.dietPlan
                AsyncStorage.setItem('dietPlan', JSON.stringify({date: today(), data: data, water:response.data.water }))
                setTarget(data[day-1].target)
                setDayDiet(data[day-1].plan)
                setWater(response.data.water)
            }else{
                setNoData(true)
            }
            setLoading(1)
            break;
          default:
            if(savedDP){
              flashMessage('Showing saved diet plan. Check your internet and try again obtain latest one.', 'info')
            }else{
              setLoading(-1)
            }
            break; 
          }
      }  
    })

    return (() => {compExist.current = false})

  }, [reloadSwich])

  var program = dayWorkout?dayWorkout.programName:'You have no active programs. Contact your trainer'

//   var target = [
//     {param: 'Calories',min: 1800, max: 2000, unit: "kCal"},
//     {param: 'Carbs', min: 200, max: 0, unit: "g"},
//     {param: 'Protein', min: 140, max: 0, unit: "g"},
//     {param: 'Fat', min: 40, max: 50, unit: "g"},
//   ]

//   var dayDiet = [
//       {title: 'Wake Up', time: 6.5, contents: [{content: 'Drink Warm water - 500ml', _id: 'dsfsadfv'}]}
//     ]

  const [backBtnDisabled, setBackBtnDisabled] = useState(false)
  return (
    <View ref={compExist} style={{width: '100%', height: '100%'}}>
        <View>
            <StatusBar style="light" translucent={true} />
            <DietPlanGraphics style={{width: '100%'}}/>
            <TouchableOpacity style={{          //Back Button
                position: 'absolute', 
                top:35*sc, 
                left: 15*sc}} 
                disabled={backBtnDisabled}
                onPress={() => {setBackBtnDisabled(true);navigation.goBack()}}>
                <FontAwesome5
                    name="chevron-left"
                    size={25*sc}
                    color={themeColors.secondary2}
                /></TouchableOpacity>
            <Text style={{                      // Heading
                position: 'absolute', 
                top: 30*sc, 
                left: 45*sc,
                fontFamily: globalFonts.primaryRegular,
                fontSize: 30*sc,
                color: themeColors.primary2,
                }}>Diet Plan</Text>

            <Text style={{                      // Program
                position: 'absolute', 
                top: 65*sc, 
                left: 45*sc,
                fontFamily: globalFonts.primaryRegular,
                fontSize: 12*sc,
                color: themeColors.primary2,
                width: 250*sc,
                }}>{program}</Text>

            <TouchableOpacity                    
                style={{                      // Hamburger
                    position: 'absolute',
                    top: 35*sc,
                    right: 20*sc,
                }}
                onPress={() => {navigation.openDrawer()}}>
                <Feather 
                name="menu" 
                size={30 * sc} 
                color={themeColors.secondary2} 
                /></TouchableOpacity>
                
            <View style={{                     // Profile avatar
                ...styles.avatar, 
                position:'absolute', 
                top: 110*sc, 
                left: 20*sc,
                width: 100*sc, 
                height: 100*sc}}>
                <ProfilePhoto 
                    style={styles.image} 
                    filename={credentials.profilePhoto?credentials.profilePhoto.filename:null} 
                /></View>

            <View style={{
                position: 'absolute',
                top: 80*sc,
                right: 23*sc,
                alignItems: 'flex-end',
            }}>
                <Text style={{
                    fontFamily: globalFonts.primaryLight,
                    opacity: 0.8,
                    textShadowColor: 'rgba(0,0,0,0.5)', 
                    textShadowOffset: { width: 0, height: 1},
                    textShadowRadius: 30,
                    }}>Day</Text>
                
                <Text style={{
                    marginRight: -7*sc,
                    marginTop: -10*sc,
                    fontFamily: globalFonts.primaryBold,
                    fontSize:70*sc,
                    color: 'white',
                    elevation: 100,
                    color: "white", 
                    textShadowColor: 'rgba(0,0,0,0.5)', 
                    textShadowOffset: { width: 0, height: 1},
                    textShadowRadius: 30, 
        
                }}>{dayWorkout.day>9?dayWorkout.day:'0'+dayWorkout.day}</Text>
                <Text style={{
                    fontFamily: globalFonts.primaryLight,
                    marginTop: -12*sc,
                    marginRight: -3*sc,
                    color: themeColors.primary2,
                    fontSize: 22*sc,
                    elevation: 100,
                    color: "white", 
                    textShadowColor: 'rgba(0,0,0,0.5)', 
                    textShadowOffset: { width: 0, height: 1},
                    textShadowRadius: 30, 
                }}
                >{todayInWord().split(' ')[0]}</Text>
                <Text style={{
                    fontFamily: globalFonts.primaryLight,
                    marginRight: -3*sc,
                    color: themeColors.secondary1,
                    fontSize: 14*sc,
                    opacity: 0.6,
                }}
                >{todayInWord().split(' ')[1].replace('-', ' ').replace('-', ' ')}</Text>
                
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('EditProfile')}}
                    style={{                  // Height and weight
                    position: 'absolute', 
                    top: 30*sc,
                    right: 105*sc,
                    width: 100*sc,
                    flexDirection: 'row',
                    height:80*sc
                    }}>

                    <View style={{
                        alignItems: 'center',                    
                        marginBottom: 10*sc,
                        justifyContent:'space-evenly',
                        }}>
                        <FontAwesome5
                            name="weight"
                            size={17*sc}
                            color={themeColors.secondary2}
                        />
                        <FontAwesome5
                            name="ruler-vertical"
                            size={17*sc}
                            color={themeColors.secondary2}
                        />
                        
                    </View>
                    
                    <View style={{
                        alignItems: 'center',                    
                        marginBottom: 10*sc,
                        justifyContent:'space-evenly',
                        alignItems:'flex-start',
                        marginLeft:10*sc
                        }}>   
                        <View style={{
                            flexDirection: 'row',
                            alignItems:'flex-start'
                            }}>
                            <Text style={{
                                fontFamily: globalFonts.primaryMedium,
                                color: themeColors.primary2,
                                marginRight: 5*sc
                            }}>{credentials.weight} kg</Text>
                            <FontAwesome5
                            name="edit"
                            size={10*sc}
                            color={themeColors.secondary2}
                            />
                        </View>
                        
                        <View style={{
                            flexDirection: 'row',
                            alignItems:'flex-start'
                            }}>
                            <Text style={{
                                fontFamily: globalFonts.primaryMedium,
                                color: themeColors.primary2,
                                marginRight: 5*sc
                            }}>{credentials.height} cm</Text>
                            <FontAwesome5
                            name="edit"
                            size={10*sc}
                            color={themeColors.secondary2}
                            />
                        </View>
                    </View>   
                    <Text style={{
                        fontFamily: globalFonts.primaryLight,
                        color: themeColors.primary2,
                        fontSize: 10*sc,
                        position: 'absolute',
                        bottom: 6*sc,
                        left: 14*sc
                    }}
                    >(Tap to edit)</Text>             
                </TouchableOpacity>
            </View>
        </View>

        {loading === 1?

        (!noData?<View style={{flex: 1,}}>
            <View style={{position: 'absolute', right: 12*sc, top: 10*sc}}> 
                <BMI height={credentials.height} weight={credentials.weight}/>
            </View>
            
            <View style={{marginTop: 10*sc, paddingLeft: 12*sc, height: 90*sc}}> 
                <Text style={styles.boldText}>Day {dayWorkout.day} targeted intake</Text>
                <View>
                    {target.map((item, index) => {
                        let valueKey = String(item.min) + (([0, item.min].includes(item.max))?' ':('-'+item.max+' ')) + item.unit
                        return(
                            <View key={index} style={{flexDirection: 'row'}}>
                                <Text style={styles.paramText}>{item.param}:  </Text>
                                <Text style={styles.valueText}>{valueKey}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
            <RecommendedDiet dayDiet={dayDiet}/>
        </View>:
        
        // if response is 200 null
        <View style={{flex:1, justifyContent: 'center', marginBottom: 100*sc}}>
            <MessageBox1 
            setReload={() => {setReloadSwitch(!reloadSwich)}} 
            reloadbutton={true}
            message = 'You have no dietplans assigned. Please contact trainer...'
            ><EmptyPaper /></MessageBox1>
        </View>
        )
        
        :
        
        
        (loading === 0?
            <View style={{flex:1, justifyContent: 'center', marginBottom: 100*sc}}>
                <ActivityIndicator style={{alignSelf: 'center', }}size={70} color={themeColors.primary1}/>
            </View>
            : 
            <View style={{flex:1, justifyContent: 'center', marginBottom: 100*sc}}>
                <MessageBox1
                setReload={() => {setLoading(0), setReloadSwitch(!reloadSwich)}} 
                message = 'Something Happened. Please check your internet'
                />
            </View>
        )}


        {!noData?<View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 70*sc}}>
                {water?
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10*sc}}>
                    <View style={{display: 'flex', alignItems: 'center'}}>
                    <FontAwesome5
                        name="glass-whiskey"
                        size={26*sc}
                        color={themeColors.primary1}
                        style={{opacity: 0.9, marginRight:2*sc}}
                        />
                    <Text style={{fontSize:9*sc}}>(250ml)</Text>
                    </View>
                    <Text style={{fontFamily: globalFonts.primaryMedium, opacity: 0.8}}> X {water}</Text>
                </View>:<View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10*sc}}></View>}
                <ButtonType1
                    text={'VIEW YOUR COMPLETE DIET PLAN'}
                    styling={{width: 8*sc, borderBottomRightRadius: 0, borderTopRightRadius: 0, paddingLeft:10*sc}}
                    textStyling={{fontSize: 10*sc, textAlign: 'right'}}
                    onClick={() => {navigation.navigate('Root', {screen: 'ComplateDietPlan'})}}
                />
        </View>:null}
    </View>
  );
};

/* Vector 69 */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: themeColors.tertiary2,
  },

  headerBanner: {
    width: '100%',
    backgroundColor: 'yellow'
  },

  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'pink',
  },

  footer:{
    height: 60*sc,  
    width: '100%', 
    backgroundColor: 'green', 
    flexDirection: 'row',
    justifyContent:'space-between'
},

  avatar:{
    width: 150 * sc,
    height: 150 * sc,
    borderRadius: 75 * sc,
    borderWidth: 3 * sc,
    borderColor: themeColors.primary2,
    overflow: 'hidden',
  },

  image:{
      width:'100%',
      height: '100%'
  },

  boldText:{
      fontFamily: globalFonts.primaryRegular,
      fontSize: 15*sc,
      opacity: 0.8,
      paddingVertical: 5*sc

  },

  paramText:{
    fontFamily: globalFonts.primaryLight,
    fontSize: 13*sc,
    opacity: 0.7,
},
  valueText:{
    fontFamily: globalFonts.primaryLight,
    fontSize: 13*sc,
    opacity: 0.5,
},
  mealHeading: {
    fontSize: 14*sc,
      fontFamily: globalFonts.primaryRegular,
      opacity: 0.7,
  },
  mealItem: {
      fontFamily: globalFonts.primaryLight,
      fontSize: 13*sc,
      opacity: 0.6,
      lineHeight: 15*sc,
      paddingVertical: 4*sc
  }
});
