import * as React from "react";
import {
  View,
  Text,
  Platform,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,

} from "react-native";
import { StatusBar } from "expo-status-bar";
import { sc, themeColors, globalFonts } from "../styles/global-styles";
import { ButtonType1 } from "../components/buttons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SubHeader } from "../components/subheader";
import { formPageStyles } from "../styles/form-pages-styles";
import { testSubscribe } from "../utilities/data-center";
import { WorkoutContext } from "../components/workout-context";

export default BuyNow = ({ navigation, route }) => {

  const { resetWorkoutData } = React.useContext(WorkoutContext)
  const {data, bgImage} = route.params

  const [selected, setSelected] = React.useState(-1) 
  
  const buyNowPressHandler = async () => {

    // Payment Handling here
    var selectedSubscription = data.subscriptionOptions[selected]
    selectedSubscription.programName = data.programName
    selectedSubscription.programID = data._id
    selectedSubscription.planID = selectedSubscription._id  
    console.log(selectedSubscription)
    
    // TBD => Payment handling goes here

    var response = await testSubscribe(selectedSubscription)
    switch (response.status) {
      case 200:
        console.log(response.data)

        // TBD => payment confirmation here
        resetWorkoutData(response.data)
        navigation.navigate("Home")
        break;
      case 401:
        flash('Authorization failed. Please sign in again', 'danger', time=10000)
        // TBD => Login redirect here
        break;
      case 101:
        flash('Oops Something Happened ...Please check your Internet and try again', 'danger', time=10000)
        break;
      default:
        if(response.data.message){
          flash(response.data.message, 'info')
        }
        break; 
      }
  }

  const backHandler = () => {
    setSelected(-1)
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />
      <ImageBackground
        source={bgImage}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <SubHeader
            text={data.programName}
            styling={styles.header}
            onPress={backHandler}
          />

          <View style={styles.contentContainer}>
            <Text style={heading}>Personal Trainer</Text>
            <Text style={styles.about}>
              Choose the type of plan you want to proceed with. If you need a different plan contact your trainer
            </Text>
            <View style={styles.cardContainer}>
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
                      {'TBD'}/week
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>) : null}
                
              
            </View>
            <ButtonType1
              arrow={false}
              disabled={selected === -1?true:false}
              text={"Buy Now"}
              styling={{ width: 320 * sc }}
              onClick = {() => buyNowPressHandler()}
              />
            <Text style={styles.footText}>Subscription Terms & Details</Text>
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
    height: "100%",
    marginTop: 40 * sc,
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
    height: 90 * sc,
    borderRadius: 10 * sc,
    margin: 5 * sc,
    flexDirection: "row",
    padding: 10 * sc,
  },

  cardContainer: {
    marginVertical: 30 * sc,
  },

  footText: {
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
    flex: 2,
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
    flex: 1,
    marginLeft: 10 * sc,
    color: themeColors.tertiary1,
    fontFamily: globalFonts.primaryRegular,
  },

  priceContent1: {
    ...priceContent,
    fontSize: 12 * sc,
  },
});
