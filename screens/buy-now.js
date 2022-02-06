import * as React from "react";
import {
  View,
  Text,
  Platform,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,

} from "react-native";
import { StatusBar } from "expo-status-bar";
import { sc, themeColors, globalFonts } from "../styles/global-styles";
import { ButtonType1 } from "../components/buttons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SubHeader } from "../components/subheader";
import { formPageStyles } from "../styles/form-pages-styles";
import { testSubscribe } from "../utilities/data-center";
import { WorkoutContext } from "../components/workout-context";
import { getFullMediaUrlIfRelative } from "../utilities/helpers";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { BASE_URL } from "../utilities/api";

export default BuyNow = ({ navigation, route }) => {

  

  const { resetWorkoutData } = React.useContext(WorkoutContext)
  const {data} = route.params
  console.log(data)
  var bgImage = getFullMediaUrlIfRelative(data.coverImage)

  const [selected, setSelected] = React.useState(-1) 
  
  const buyNowPressHandler = async () => {

    // Payment Handling here
    var selectedSubscription = data.subscriptionOptions[selected]
    selectedSubscription.programName = data.programName
    selectedSubscription.programID = data._id
    selectedSubscription.planID = selectedSubscription._id  
    console.log(selectedSubscription)
    
    // TBD => Payment handling goes here

    console.log(selectedSubscription)
    navigation.navigate('PaymentPage', {data: selectedSubscription, type: 'new'})
    return
  }

  const backHandler = () => {
    setSelected(-1)
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />
      <ImageBackground
        source={{uri:bgImage}}
        style={{flex: 1}}
      >
        <View style={styles.overlay}>
          <SubHeader
            text={data.programName}
            styling={styles.header}
            onPress={backHandler}
          />

          <View style={styles.contentContainer}>
              <Text style={styles.about}>
                Choose the type of plan you want to proceed with. If you need a different plan contact your trainer
              </Text>
              <View style={{flex: 1, margin: 10*sc}}>
                <ScrollView>
                  {data.subscriptionOptions? data.subscriptionOptions.map((item, index) => 
                  <TouchableWithoutFeedback key={index} onPress={() => setSelected(index)}>
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: selected !== index
                          ? themeColors.tertiary1
                          : themeColors.tertiary2,
                      },
                    ]}
                  >
                    <View style={styles.planContainer}>
                      <Text
                        style={[
                          styles.planHeading,
                          {
                            color: selected !== index
                              ? themeColors.secondary2
                              : themeColors.tertiary1,
                          },
                        ]}
                      >
                        {item.planType}
                      </Text>
                      <Text
                        style={[
                          styles.planContent,
                          {
                            color: selected !== index
                              ? themeColors.secondary2
                              : themeColors.tertiary1,
                  
                          },
                        ]}
                      >
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <View style={styles.row}>
                        <FontAwesome5 name="rupee-sign" {...rupeeIconStyling} />
                        <Text
                          style={[
                            priceContent,
                            {
                              color: selected !== index
                                ? themeColors.secondary2
                                : themeColors.tertiary1,
                            },
                          ]}
                        >
                          {item.priceInRs}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <FontAwesome5
                          name="rupee-sign"
                          {...smallrupeeIconStyling}
                        />
                        <Text
                          style={[
                            styles.priceContent1,
                            {
                              color: selected !== index
                                ? themeColors.secondary2
                                : themeColors.tertiary1,
                            },
                          ]}
                        >
                          {!item.paymentReccurence ? item.priceInRs/data.durationWeeks : item.priceInRs/item.paymentReccurence*data.daysPerWeek} / week
                          {/* {item.priceInRs/(item.paymentReccurence?item.paymentReccurence:(data.daysPerWeek))}/week */}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>) : null}
              </ScrollView>
            <Feather name="chevrons-down" size={20*sc} style={{alignSelf:'center', color: themeColors.primary2}}/>
              
            </View>

            <View>
              <ButtonType1
                arrow={false}
                disabled={selected === -1?true:false}
                text={"Buy Now"}
                styling={{ width: 320 * sc }}
                onClick = {() => buyNowPressHandler()}
                />
                <TouchableOpacity onPress={() => {navigation.navigate('WebPage', {url: BASE_URL+'/subscription-terms', heading: 'Terms and conditions'})}}>
                  <Text style={styles.footText}>Subscription Terms & Details</Text>
                </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const rupeeIconStyling = {
  size: 22 * sc,
  color: themeColors.secondary2,
};

const smallrupeeIconStyling = {
  size: 12 * sc,
  color: themeColors.secondary2,
};
const heading = { ...formPageStyles.mainHeading };

const priceContent = {
  color: themeColors.tertiary1,
  fontFamily: globalFonts.primaryRegular,
  marginLeft: 5 * sc,
  fontSize: 20 * sc,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.87)",
  },

  header: {
    ...Platform.select({
      ios: {
        marginTop: 30 * sc,
      },
    }),
  },

  contentContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },

  about: {
    color: themeColors.secondary2,
    fontSize: 14 * sc,
    fontFamily: globalFonts.primaryRegular,
    marginVertical: 10 * sc,
    paddingRight: 30 * sc,
    paddingLeft: 30 * sc,
    textAlign: "center",
    lineHeight: 20 * sc,
    letterSpacing: 1.2 * sc,
  },

  card: {
    borderRadius: 10 * sc,
    elevation: 2 * sc,
    shadowOffset: { width: 5 * sc, height: 5 * sc },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2 * sc,
    alignItems: "center",
    width: 320 * sc,
    minHeight: 90 * sc,
    borderRadius: 10 * sc,
    margin: 5 * sc,
    flexDirection: "row",
    padding: 10 * sc,
  },

  cardContainer: {
    marginVertical: 30 * sc,
  },

  footText: {
    textAlign:'center',
    color: themeColors.secondary2,
    fontSize: 14 * sc,
    fontFamily: globalFonts.primaryRegular,
    letterSpacing: 1.2 * sc,
    marginTop: 10 * sc,
    marginBottom: 30 * sc,
  },

  row: {
    flexDirection: "row",
    marginVertical: 5 * sc,
  },

  planContainer: {
    flex: 1,
  },

  planHeading: {
    ...formPageStyles.subHeading,
    fontFamily: globalFonts.primaryMedium,
  },

  planContent: {
    fontSize: 14 * sc,
    fontFamily: globalFonts.primaryRegular,
    marginTop: 5 * sc,
  },

  priceContainer: {
    // flex: 1,
    minWidth: 80*sc,
    justifyContent:'flex-start',
    // backgroundColor:'pink',
    height:'100%',
    marginLeft: 10 * sc,
    color: themeColors.tertiary1,
    fontFamily: globalFonts.primaryRegular,
  },

  priceContent1: {
    ...priceContent,
    fontSize: 12 * sc,
  },
});
