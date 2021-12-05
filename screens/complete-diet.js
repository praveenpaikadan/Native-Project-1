import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableNativeFeedback} from "react-native";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { StatusBar } from "expo-status-bar";
import { getCompleteDietPlan } from "../utilities/data-center";
import { MessageBox1 } from "../components/message-box";
import { ElevatedCardTypeOne } from "../components/cards";
import { RecommendedDiet } from "./diet-plan";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ButtonType1 } from "../components/buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { today } from "../utilities/helpers";
import flashMessage from "../utilities/flash-message";


export const DayCard = ({dayDiet, active, setActive, index}) => {

    return (
        <ElevatedCardTypeOne styling={{...cardStyles.card, overflow: 'visible', ... !active?{height: 140}:{}}}>

            <View style={{flexDirection: 'row'}}>
                
                <View style={{   /// day label
                    height: 40*sc,
                    width: 50*sc,
                    backgroundColor: themeColors.primary1,
                    transform: [{translateX: -7*sc}, {translateY: 20*sc}],
                    elevation:7,
                    shadowOffset: { width:5*sc, height: 5*sc},
                    shadowColor:'#333',
                    shadowOpacity:0.3,
                    shadowRadius: 2*sc,
                    overflow:'hidden',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                    <Text style={{color: themeColors.secondary2, fontFamily: globalFonts.primaryMedium}}>Day</Text>
                    <Text style={{color: themeColors.secondary2, fontFamily: globalFonts.primaryBold}}>{dayDiet.day}</Text>
                </View>

                <View style={{marginTop: 10*sc, paddingLeft: 12*sc, height: 90*sc}}> 
                    <Text style={styles.boldText}>Targeted intake</Text>
                        <View>
                            {dayDiet.target.map((item, index) => {
                                let valueKey = String(item.min) + (([0, item.min].includes(item.max))?' ':('-'+item.max+' ')) + item.unit
                                return(
                                    <View key={index} style={{flexDirection: 'row'}}>
                                        <Text style={cardStyles.paramText}>{item.param}:  </Text>
                                        <Text style={cardStyles.valueText}>{valueKey}</Text>
                                    </View>
                                )
                            })}
                        </View>
                </View>

            </View>
            {active?<View style={{height: 200*sc}}>
                <RecommendedDiet dayDiet={dayDiet.plan}/>
            </View>:null}
            <View style={{position: 'relative', top: 0}}>
                <ButtonType1 
                invertColor={true}
                text={active?'COLLAPSE':'EXPAND'}
                textStyling={{fontSize: 12*sc}}
                styling={{small: 10*sc, borderTopRightRadius: 0, borderTopLeftRadius: 0, height:40*sc, backgroundColor: 'rgba(0,0,0,0.07)'}}
                arrow={false}
                onClick={() => {active?setActive(-1):setActive(index)}}
                />
            </View>
        </ElevatedCardTypeOne>
    );
  };
  
  const cardStyles = StyleSheet.create({
   
    card: {
      width: 340 * sc,
      minHeight: 110 * sc,
      marginVertical: 5 * sc,
      backgroundColor: themeColors.primary2,
      justifyContent: "center",
      marginHorizontal: 10*sc,
      marginVertical: 5*sc
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
  });

export default CompleteDietPlan = ({ navigation, route }) => {

  const {programID, day} = route.params
  const [loading, setLoading] = React.useState(0)
  const [data, setData] = React.useState({})
  const [reloadSwich, setReloadSwitch] = React.useState(true)
  const [dietPlan, setDietPlan] =  React.useState([])

  const [active, setActive] = React.useState(-1)
  var scrollRef = React.useRef(null)
  var scrollEvent      // to unsubscribe n goin back before executing
  
  React.useEffect(() => {

    AsyncStorage.getItem('dietPlan')
    .then((saved) => {
      if(saved && scrollRef){
        setDietPlan(JSON.parse(saved).data)
        setLoading(1)
      }
    })

    getCompleteDietPlan(programID)
    .then(async (response) => {
      if(scrollRef){
        switch (response.status) {
          case 200:
            setDietPlan(response.data.dietPlan)
            AsyncStorage.setItem('dietPlan', JSON.stringify({date: today(), data: response.data.dietPlan, water: response.data.water}))
            setLoading(1)
            setTimeout(() => {
              if(scrollRef && scrollRef.current){
                scrollRef.current.scrollTo({
                  y: 150 * (day - 1) + 10,
                  animated: true,
                });
                setTimeout(() => {
                  setActive(day-1)
              }, 200)
              }
            }, 200)
            break;
          default:
            var saved = await AsyncStorage.getItem('dietPlan')
            console.log(saved)
            if(saved){
              setDietPlan(JSON.parse(saved).data)
              flashMessage('Showing saved diet plan. Check your internet and try again obtain latest one.', 'info')
              setLoading(1)
            }else{
              setLoading(-1)
            }
            
            break; 
          }
      }  
    })

    return (() => {})

  }, [reloadSwich])

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header title={'Diet Plan'} backButton={true} onPress={() => {navigation.goBack()}} onPressMenu={() => navigation.openDrawer()} />
      {loading === 1?
      <View style={styles.contentContainer}>
      {/*Content Starts here */}

      <View>
          <Text
            style={{
                fontFamily: globalFonts.primaryLight,
                width: 250*sc,
                opacity: 0.8,
                alignSelf: 'center',
                textAlign: 'center',
                paddingVertical: 12*sc
            
            }}
          
          >Custom Diet plan for you designed by your trainer.</Text>
        <ScrollView 
        style={styles.scrollContainer}
        ref={scrollRef}
        >
            <View style={{marginBottom: 10*sc, marginTop: 5*sc}}>
            {dietPlan.map((item, index) => {
                return(
                    <TouchableWithoutFeedback 
                        key={String(index)}
                    >
                        <DayCard 
                            index={index}
                            dayDiet={item}
                            active ={active === index}
                            setActive={setActive}
                        /> 
                    </TouchableWithoutFeedback>
                )
            })}
            </View>
        </ScrollView>
        </View>
      {/*Content Ends here */}

      </View>:
      (loading === 0?
      <View style={{flex:1, justifyContent: 'center', marginBottom: 100*sc}}>
        <ActivityIndicator style={{alignSelf: 'center', }}size={70} color={themeColors.primary1}/>
      </View>: 
       <View style={{flex:1, justifyContent: 'center', marginBottom: 100*sc}}>
        <MessageBox1
          setReload={() => {setLoading(0), setReloadSwitch(!reloadSwich)}} 
          message = 'Something Happened. Please check your internet'
        />
      </View>
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: themeColors.tertiary2,
    alignItems:"center"
},
  scrollContainer: {
    height: '100%'
  }

});
