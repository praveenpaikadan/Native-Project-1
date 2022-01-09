import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { themeColors, sc, globalFonts } from "../styles/global-styles";
import { Header } from "../components/header";
import { HistoryList } from "./subscreens/history-list";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../components/auth-context";
import { convertMongooseDateString } from "../utilities/helpers";

export default WorkoutPlan = ({navigation, route}) => {

  // case when previous program workouts have to be displayed.
  if(route.params){
    var {data} = route.params
  }

  const [total, setTotal] = React.useState(0)
  const {credentials} = React.useContext(AuthContext)

  var paymentPayload = {}
  paymentPayload.programID = credentials.currentWorkout.programID
  paymentPayload.receiptID = credentials.currentWorkout.receiptID

  // to pass to history list
  const goToRenewPaymentPage = () => {
    navigation.navigate('PaymentPage', {data: paymentPayload, type: 'renew'})
  } 

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header
        backButton={true}
        onPress={navigation.goBack}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={styles.headingContainer}>

        <View style={styles.headingLeftBox}>

          <View style={{marginLeft: 10*sc}}>
            <Text style={styles.headingText}>{!data?'WORKOUT PLAN':'WORKOUT HISTORY'}</Text>
            {data?<Text style={styles.totalWorkouts}>PROGRAM: {data.program?data.program.programName:'N/A'}</Text>:null}
            {data?<Text style={styles.totalWorkouts}>START DATE: {data.startDate?convertMongooseDateString(data.startDate):'N/A'}</Text>:null}
            <Text style={styles.totalWorkouts}>TOTAL WORKOUTS TRACKED: {total}  </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headingRightBox} onPress={() => {navigation.navigate('PreviousWorkoutHistory')}}>
          <FontAwesome5 name="history" {... menuIconStyling} />
        </TouchableOpacity>

      </View>

      <View style={styles.listContainer}>
        <HistoryList data={data} setTotal={setTotal} goToRenewPaymentPage={goToRenewPaymentPage}/>
        <Feather name="chevrons-down" {...chevronIconStyling} />
      </View>
    </View>
  );
};

const menuIconStyling = {
  color: themeColors.secondary2,
  size: 22 * sc,
};

const chevronIconStyling = {
  color: themeColors.primary1,
  size: 30 * sc,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  headingContainer: {
    backgroundColor: themeColors.tertiary1,
    flexDirection: 'row',
    width: "100%",
    paddingVertical: 10 * sc,
    justifyContent: "space-between",
    alignItems: "center",

  },

  headingRightBox:{
    marginRight: 12*sc,
    padding: 5*sc
  },

  headingLeftBox:{
    marginLeft:10*sc,
    flexDirection:'row'
  },

  headingLeftIcon: {
    justifyContent:'center'
  },

  headingText: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    fontSize: 16 * sc,
    letterSpacing: 1.2 * sc,
  },

  totalWorkouts: {
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.secondary2,
    fontSize: 10 * sc,
    marginTop: 5 * sc,
    letterSpacing: 0.5 * sc,
  },

  listContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10 * sc,
  },
});
