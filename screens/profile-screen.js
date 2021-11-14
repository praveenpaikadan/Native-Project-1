import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextPropTypes,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  globalFonts,
  themeColors,
  sc,
  globalStyles,
} from "../styles/global-styles";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ElevatedCardTypeOne } from "../components/cards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../components/auth-context";
import { WorkoutContext } from "../components/workout-context";
import { calculateCalories } from '../utilities/helpers'
import ProfilePhotoPicker from "../components/image-picker";
import { ProfilePhoto } from "../components/profile-photo";
import { postProfilePhoto } from "../utilities/data-center";
import flash from "../utilities/flash-message";
import { BASE_URL } from "../utilities/api";
import { Logout } from "../components/logout";

export default ProfileScreen = ({ navigation }) => {

  const [image, setImage ] = React.useState(null)

  const { credentials, resetCredentials } = React.useContext(AuthContext)
  const { workoutData } = React.useContext(WorkoutContext)
  var {workoutsTracked, caloriesBurned} = calculateCalories(workoutData.history, workoutData.calsPerRepList)

  const calcAge = (dob) => {
    var today = new Date()
    var yob = Number(dob.split('-')[2])
    return today.getFullYear() - yob 
  }

  const uploadImage = (image) => {

    const createFormData = () => {
      var data = new FormData();
      var arr = image.uri.split('.') 
      var ext = arr[arr.length - 1]

      data.append("profilephoto", {
        name: credentials.name + '-profile.'+ext,
        type: image.type+'/ext',
        uri:
          Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
      });

      return data;
    };

    // posting of profile to server goes here

    postProfilePhoto(createFormData())
    .then((response) => {
      switch (response.status) {
        case 200:
          flash('Succesfully changed profile photo', 'success', 1500)
          setImage(image.uri)
          resetCredentials(response.data)
          break
        default:
          flash('Failed to change profile photo. Check you internet.', 'danger')
          break; 
        }
    })
  }

  //Needs modification
  const logout = () => {
    AsyncStorage.removeItem("Credentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <View style={styles.iconContainer}>
            <Feather name="chevron-left" {...backIconStyling} />
          </View>
        </TouchableOpacity>

        <Text style={styles.heading}>PROFILE</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <View style={styles.iconContainer}>
            <Ionicons name="settings" {...settingsIconStyling} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>

        <View style={styles.avatar}>

          {/* <Image
              style={styles.image}
              source={image?{uri: image}:require("../assets/images/profile.jpg")}
            /> */}

          <ProfilePhoto style={styles.image} filename={credentials.profilePhoto?credentials.profilePhoto.filename:null} source={image?image.uri:null}/>
        </View>
        <ProfilePhotoPicker style={styles.pencilContainer} setImage={setImage} uploadImage={uploadImage}>
            <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
          </ProfilePhotoPicker>

        <Text style={styles.userName}>{credentials.name}</Text>
      </View>
      <View style={styles.userDetailsContainer}>
        <View>
          <View style={styles.unitContainer}>
            <Text style={styles.quantity}>{credentials.weight}</Text>
            <Text style={styles.unit}>kg</Text>
          </View>
          <Text style={styles.parameter}>WEIGHT</Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <View style={styles.unitContainer}>
            <Text style={styles.quantity}>{credentials.height}</Text>
            <Text style={styles.unit}>cm</Text>
          </View>
          <Text style={styles.parameter}>HEIGHT</Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <View style={styles.unitContainer}>
            <Text style={styles.quantity}>{calcAge(credentials.dob)}</Text>
            <Text style={styles.unit}>y</Text>
          </View>
          <Text style={styles.parameter}>AGE</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <ElevatedCardTypeOne styling={styles.programCard}>
          <FontAwesome5 name="dumbbell" {...dumbbellIconStyling} />
          <View>
            <Text style={styles.programStatus}>ACTIVE PROGRAM</Text>
            <Text style={styles.programName}>{workoutData?workoutData.program.programName:'NO ACTIVE PROGRAMS'}</Text>
          </View>
        </ElevatedCardTypeOne>
        <View style={styles.workoutCardConatiner}>
          <ElevatedCardTypeOne styling={styles.workoutCard}>
            <FontAwesome5 name="running" {...runIconStyling} />
            <View>
              <Text style={styles.workoutHeading}>WORKOUTS{"\n"}TRACKED</Text>
              <Text style={styles.workoutText}>{workoutsTracked}</Text>
            </View>
          </ElevatedCardTypeOne>
          <ElevatedCardTypeOne styling={styles.workoutCard}>
            <FontAwesome5 name="gripfire" {...fireIconStyling} />
            <View>
              <Text style={styles.workoutHeading}>WORKOUTS{"\n"}TRACKED</Text>
              <Text style={styles.workoutText}>{caloriesBurned} Kcal</Text>
            </View>
          </ElevatedCardTypeOne>
        </View>
        <Logout style={{ alignSelf: "flex-start" }} >
          <ElevatedCardTypeOne styling={styles.signOut}>
            <Feather name="log-out" {...signOutIconStyling} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </ElevatedCardTypeOne>
      </Logout>
      </View>
    </View>
  );
};

const backIconStyling = {
  size: 30 * sc,
  color: themeColors.secondary2,
};
const settingsIconStyling = {
  size: 25 * sc,
  color: themeColors.secondary2,
};
const pencilIconStyling = {
  size: 25 * sc,
  color: themeColors.secondary2,
};
const dumbbellIconStyling = {
  size: 30 * sc,
  color: themeColors.primary1,
};
const runIconStyling = {
  size: 35 * sc,
  color: themeColors.primary1,
};
const fireIconStyling = {
  size: 30 * sc,
  color: themeColors.primary1,
};
const signOutIconStyling = {
  size: 25 * sc,
  color: themeColors.primary1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.tertiary1,
    width: "100%",
    paddingTop: 30 * sc,
  },

  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20 * sc,
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconContainer: {
    width: 35 * sc,
    height: 35 * sc,
    borderRadius: 5 * sc,
    borderColor: themeColors.primary2,
    borderWidth: 1 * sc,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.primary2,
    fontSize: 20 * sc,
    letterSpacing: 1.5 * sc,
  },

  avatar:{
    width: 150 * sc,
    height: 150 * sc,
    borderRadius: 75 * sc,
    borderWidth: 3 * sc,
    borderColor: themeColors.primary2,
    overflow: 'hidden',
  },

  topContainer: {
    alignItems: "center",
    marginTop: 20 * sc,
    
  },

  image: {
    width: 150 * sc,
    height: 150 * sc,
    // borderRadius: 75 * sc,
    // borderWidth: 3 * sc,
    // borderColor: themeColors.primary2,
  },

  pencilContainer: {
    width: 50 * sc,
    height: 50 * sc,
    borderRadius: 25 * sc,
    backgroundColor: themeColors.tertiary1,
    borderColor: themeColors.primary2,
    borderWidth: 3 * sc,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100 * sc,
    marginTop: -50 * sc,
  },

  userName: {
    marginVertical: 10 * sc,
    marginTop: 15 * sc,
    fontFamily: globalFonts.primaryBold,
    color: themeColors.primary2,
    fontSize: 20 * sc,
    letterSpacing: 1.5 * sc,
  },

  userDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20 * sc,
    paddingHorizontal: 40 * sc,
    justifyContent: "space-between",
  },

  unitContainer: {
    flexDirection: "row",
  },

  quantity: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.primary2,
    fontSize: 35 * sc,
    letterSpacing: 1.2 * sc,
    marginRight: 5 * sc,
  },

  unit: {
    fontFamily: globalFonts.primaryLight,
    color: themeColors.primary2,
    alignSelf: "flex-end",
    marginBottom: 6 * sc,
  },

  parameter: {
    fontFamily: globalFonts.primaryLight,
    color: themeColors.primary2,
    textAlign: "center",
    marginVertical: 5 * sc,
  },

  line: {
    width: 2 * sc,
    height: 45 * sc,
    backgroundColor: themeColors.primary2,
    marginBottom: 5 * sc,
  },

  cardContainer: {
    alignItems: "center",
  },

  programCard: {
    width: 320 * sc,
    height: 60 * sc,
    backgroundColor: themeColors.primary2,
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20 * sc,
  },

  programStatus: {
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.primary1,
    textAlign: "center",
    fontSize: 12 * sc,
  },

  programName: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    fontSize: 15 * sc,
    marginTop: 5 * sc,
    width: 230*sc,
    textAlign: 'center'
  },

  workoutCardConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20 * sc,
  },

  workoutCard: {
    width: 150 * sc,
    height: 60,
    backgroundColor: themeColors.primary2,
    opacity: 0.7,
    marginVertical: 10 * sc,
    paddingHorizontal: 15 * sc,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  workoutHeading: {
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.primary1,
    fontSize: 12 * sc,
    textAlign: "center",
    letterSpacing: 1.2 * sc,
  },

  workoutText: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    fontSize: 15 * sc,
    textAlign: "center",
    letterSpacing: 1.2 * sc,
  },

  signOut: {
    width: 100 * sc,
    height: 40 * sc,
    backgroundColor: themeColors.primary2,
    opacity: 0.7,
    marginTop: 40 * sc,
    marginLeft: 20 * sc,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8 * sc,
  },

  signOutText: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
  },
});
