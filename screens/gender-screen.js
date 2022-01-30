import * as React from "react";
import { View, Text, TouchableOpacity, } from "react-native";
import {
  CreateAccountGraphics,
  GenderFemaleGraphics,
  GenderMaleGraphics,
} from "../assets/svgs/svg-graphics";
import { ButtonType1 } from "../components/buttons";
import { ElevatedCardTypeOne } from "../components/cards";
import { formPageStyles } from "../styles/form-pages-styles";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import DateTimePicker from '@react-native-community/datetimepicker';


export default GenderScreen = ({ navigation, route }) => {

  const [maleSelected, setMaleSelected] = React.useState(false);
  const [femaleSelected, setFemaleSelected] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [validationMessage, setValidationMessage] = React.useState("");
  const [dob, setDob] = React.useState(null);
  const [show, setShow] = React.useState(false);


  const selectionHandlerMale = () => {
    setMaleSelected(true);
    setFemaleSelected(false);
    setGender("male");
    setValidationMessage("");
  };
  const selectionHandlerFemale = () => {
    setMaleSelected(false);
    setFemaleSelected(true);
    setGender("female");
    setValidationMessage("");
  };

  const buttonClickHandler = () => {
    
    if (gender === "") {
      setValidationMessage("Select your gender ...");
      // ToastAndroid.show("Select your gender", ToastAndroid.BOTTOM);
      return    
    } 
    if(!dob){
      setValidationMessage("Select Date of Birth");
      return
    }
   
    var userData = {...route.params.userData, gender: gender, dob: dob}
    navigation.push("HeightWeight", {userData});
  
  };

  return (
    <View
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.headerGraphicsContainer}>
          <CreateAccountGraphics style={{ width: "100%" }} />
          <View style={{...styles.heading, transform: [{translateY: -20*sc}]}}>
            <Text style={styles.mainHeading}>What is your Gender and Date of Birth?</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={{...styles.cardscontainer}}>
            <TouchableOpacity onPress={selectionHandlerMale}>
              <ElevatedCardTypeOne
                styling={maleSelected ? styles.cardSelected : styles.card}
              >
                <GenderMaleGraphics size={"75%"} />
                <Text style={styles.genderTag}>Male</Text>
              </ElevatedCardTypeOne>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectionHandlerFemale}>
              <ElevatedCardTypeOne
                styling={femaleSelected ? styles.cardSelected : styles.card}
              >
                <GenderFemaleGraphics size={"75%"} />
                <Text style={styles.genderTag}>Female</Text>
              </ElevatedCardTypeOne>
            </TouchableOpacity>
          </View>

          <View style={{
            width: 300*sc, 
            height: 50*sc,
            borderWidth:2,
            borderColor: themeColors.primary1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
            }}>
              <TouchableOpacity onPress={() => {setShow(true)}}>
              <Text style={{
                color: themeColors.primary1,
                fontFamily: globalFonts.primaryBold,
                fontSize: 18*sc
              }}>{dob?dob:'SELECT DOB'}</Text></TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.errorText}>{validationMessage}</Text>
            <ButtonType1
              styling={styles.submitButton}
              text={"NEXT"}
              onClick={buttonClickHandler}
              textStyling={{fontSize: 20*sc}}
              arrow={20*sc}
            />
          </View>
          

          <View style={styles.footContainer}></View>
        </View>
      </View>
      {show&&<DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'} 
          is24Hour={false}
          display="default"
          maximumDate={new Date()}
          onChange={(value) => {
            setShow(false);
            if(value.type !== 'dismissed'){
              var d = value['nativeEvent']['timestamp']
              var yr = new Date(d).toString().split(' ')[3]
              var arr = new Date(d).toLocaleDateString().split('/')
              var modDS = arr[1]+'-'+arr[0]+'-'+yr
              setDob(modDS)  
            }
          }}
        />}
    </View>
  );
};

const styles = formPageStyles;
