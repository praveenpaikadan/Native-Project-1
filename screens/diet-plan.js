import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList, TouchableHighlight, ScrollView, TouchableWithoutFeedback } from "react-native";
import { TabMenu } from "../components/tab-menu";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import ProgramList from "./subscreens/program-list";
import TrackNowSubScreen from "./subscreens/track-now";
import { AuthContext } from "../components/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import ProfileBox from "../components/profilebox";
import BodyCalendar from "../components/body-calendar";
import MyWorkouts from "./modal/my-workouts";
import { DietPlanGraphics } from "../assets/svgs/svg-graphics";
import { ProfilePhoto } from "../components/profile-photo";
import { FontAwesome5 } from "@expo/vector-icons";
import { cos } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { convDecimalTime, todayInWord } from "../utilities/helpers";
import { ElevatedCardTypeOne } from "../components/cards";
import { ButtonType1 } from "../components/buttons";
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from "react-native-svg"


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
    const [rs, setRs] = useState(true)  //render switch
    const [text, setText] = useState('--')
    var cond //condion 
    var col  //color

    if(bmi<18.5){cond = 'UNDER WEIGHT'; col = 'orange'}
    else if(bmu>=18.5 && bmi<25 ){cond = 'HEALTHY'; col = 'green'}
    else if(bmu>=25 && bmi<30 ){cond = 'OVER WEIGHT'; col = 'orange'}
    else{cond = 'OBESE'; col = 'red'}


    useEffect(() => {
        setText('--')
        setAngle(startAngle)
        var i 
        let a = 0
        i = setInterval(() => {
            if(a < endAngle){
                setAngle(a)
                a = a + 5
            }else{
                a = endAngle
                clearInterval(i)
                setTimeout(() => {   
                    setText(cond)
                }, 500)
            }
        }, 30)
    }, [rs])

    return(
        <TouchableWithoutFeedback onPress={() => {setRs(!rs)}}>
            <View style={{position: 'relative', transform:[{scale: 1*sc}]}}>
                <View style={{position: 'absolute', width: '100%', top: 20,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily: globalFonts.primaryBold, fontSize: 15, opacity: 0.2 }}>{'BMI'}</Text>
                    <Text style={{fontFamily: globalFonts.primaryBold, fontSize: 25, opacity: 0.4 }}>{Math.round(angle/180*(max-min) * 10) / 10}</Text>
                    <Text style={{fontFamily: globalFonts.primaryRegular, marginTop: 28, opacity: 0.8, color: col}}>{text}</Text>
                </View>
                
                <BMIGraphics angle={angle}/>
                <View style={{
                    width: pointerWidth, 
                    height: pointerLength, 
                    backgroundColor: themeColors.primary1, 
                    position:'absolute', 
                    bottom: 7, 
                    left: 47.5,
                    transform:[{rotateZ: `${angle}deg`}, {translateX:  -1 * pointerWidth/2}]}
                    }></View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default DietPlan = ({ navigation, route }) => {

  const {dayWorkout} = React.useContext(WorkoutContext);
  const {credentials} = React.useContext(AuthContext)

  var program = dayWorkout?dayWorkout.programName:'You have no active programs. Contact your trainer'

  var target = [
    {param: 'Calories',min: 1800, max: 2000, unit: "kCal"},
    {param: 'Carbs', min: 200, max: 0, unit: "g"},
    {param: 'Protein', min: 140, max: 0, unit: "g"},
    {param: 'Fat', min: 40, max: 50, unit: "g"},
  ]

  var dayDiet = [
      {title: 'Wake Up', time: 6.5, content: ['Drink Warm water - 500ml']},
      {title: 'Morning Snack', time: 7.5, content: ['Black Coffee (1 cup)', 'Black coffee(1cup)', 'Almonds(8 or 15g)','Date(2 or 15g)' ]},
      {title: 'Breakfast', time: 8.5, content: ['Brown bread (2 or 90g )', 'peanut butter (2 table spoon or 30g)', 'Mixed berries(100g)', 'Egg whites(2)']},
      {title: 'Lunch', time: 12.5, content: ['Brown rice(1.5cup or 150g)', 'Vegetables :1/2 cup(25g)', 'Chicken breast(120g)']},
      {title: 'Pre workout', time: 15.5, content: ['BCCA(1 scoop or 11g)', 'Banana(100g)', 'Chicken breast(120g)']},
      {title: 'After workout', time: 17.5, content: ['Whey protein in water (1 scoop or 30g)', 'One fruit(small Apple /half mango/orange/Pine apple small/mosambi/guava/papaya small', 'Chicken breast(120g)', 'Mutta puffs', 'Manga juice with straw']},
      {title: 'Dinner', time: 20.5, content: ['egg Whites :2', 'Vegetable salad:1cup or 100g']},
      {title: 'Before Sleep', time: 21.0, content: ['1/2 scoop casein (10g) in half cup skimmed milk']},
  ]
  return (
    <View style={{width: '100%', height: '100%'}}>
        <View>
            <StatusBar style="light" translucent={true} />
            <DietPlanGraphics style={{width: '100%'}}/>
            <TouchableOpacity style={{          //Back Button
                position: 'absolute', 
                top:35*sc, 
                left: 15*sc}} 
                onPress={console.log('Back')}>
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
                style={{
                    position: 'absolute',
                    top: 35*sc,
                    right: 20*sc,
                }}
                onPress={() => {console.log('Hamburger Pressed')}}>
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
                
                <View style={{
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
                </View>
            </View>
        </View>

        <View style={{flex: 1,}}>

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

            <View style={{marginTop: 10*sc, marginTop: 10*sc, flex: 1} } >
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
                                borderRadius: 25*sc,
                            }}>
                                <TouchableHighlight key={index}
                                    activeOpacity={0.6}
                                    underlayColor= 'rgba(255, 76, 0, 0.2)'
                                    onPress={() => alert('Pressed!')}
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
                                            {item.content.map((subItem, index) => {
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

        </View>

        <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 70*sc}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10*sc}}>
                    <FontAwesome5
                        name="glass-whiskey"
                        size={26*sc}
                        color={themeColors.primary1}
                        style={{opacity: 0.9, marginRight:2*sc}}
                        />
                    <Text style={{fontFamily: globalFonts.primaryMedium, opacity: 0.8}}> X {6}</Text>
                </View>
                <ButtonType1
                    text={'VIEW YOUR COMPLETE DIET PLAN'}
                    styling={{width: 8*sc, borderBottomRightRadius: 0, borderTopRightRadius: 0, paddingLeft:10*sc}}
                    textStyling={{fontSize: 10*sc, textAlign: 'right'}}
                />
        </View>


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
