import React from "react";
import {View, Text,TextInput, StyleSheet, ToastAndroid, ActivityIndicator} from "react-native";
import {themeColors, globalFonts, sc} from "../styles/global-styles";
import { Fontisto } from "@expo/vector-icons";
import { ButtonType1 } from "./buttons";


// target = item.item.targetReps
// unit

export const RepInput = ({reRender, dv, type, dataChangeHandler}) => {
  
    const handleSaveButtonClick = () => {
      setField1(field1.trim())
      if (type === 2) {
        if (!['0', '--', 0, ''].includes(field1) &&  !['0', '--', 0, ''].includes(field2)){
          dataChangeHandler(field1+'X'+field2)
        }else{
          ToastAndroid.show("Enter both weight and reps ...", ToastAndroid.BOTTOM);
        }
      }else{
        if (!['0', '--', 0].includes(field1)){
          dataChangeHandler(field1)
        }else{
          ToastAndroid.show(`Enter ${type===0?'reps':'minutes'} ...`, ToastAndroid.BOTTOM);
        }
      }
    }


    const [field1, setField1] = React.useState('0')
    const [field2, setField2] = React.useState('0')

    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
      const setDefault = async () => {
        var dv1, dv2
        if(type == 2 && !!dv){
          dv1 = dv.split('X')[0]
          dv2 = dv.split('X')[1]?dv.split('X')[1]:0
        }else{
          dv1 = dv
          dv2= 0
        }
        setField1(String(dv1))
        setField2(String(dv2))}

      setDefault()
      .then(() => {setLoading(false)})

    }, [reRender, dv])

    if(loading){
      return <View style={{height: 75, justifyContent:'center', alignItems:'center'}}><ActivityIndicator size='large' color={themeColors.primary1}/></View>
    }
    return (
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>YOUR HIT: </Text>
          <View style={styles.quantityContainer}>
            <TextInput
                placeholder={"--"}
                placeholderTextColor={themeColors.primary1}
                defaultValue={field1 === '0'?'':field1}
                style={styles.input}
                onChangeText={val => {setField1(val); if(val ==""){setField2("")}}}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={styles.unit}>{type === 0?'REPS':(type === 1?'MINUTES':'KG')}</Text>
            </View>

            {type === 2?
            <>
            <View style={styles.inputCloseIconContainer}>
              <Fontisto name="close-a" {...closeIconStyling} />
            </View>

            <View style={styles.quantityContainer}>
              <TextInput
                editable={field1?true:false}
                placeholder={"--"}
                defaultValue={field2 === '0'?'':field2}
                placeholderTextColor={themeColors.primary1}
                style={styles.input}
                onChangeText={val => setField2(val)}
                keyboardType="numeric"
              />
              <Text style={styles.unit}>REPS</Text>
            </View></>
            :null }
          </View> 

          <View style={styles.buttonContainer}> 
              <ButtonType1
                arrow={false}
                text={"SAVE SET"}
                styling={styles.button}
                textStyling={styles.buttonText}
                onClick={() => {handleSaveButtonClick()}}
              />
            </View> 
      </View> 
      )
}

// input , unit, 
const styles = StyleSheet.create({
  
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  
    inputHeading: {
      fontSize: sc*15,
      opacity: 0.6,
      fontFamily: globalFonts.primaryMedium,
      color: themeColors.tertiary1,
    },
  
    quantityContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  
    input: {
      paddingVertical: 3 * sc,
      paddingHorizontal: 10 * sc,
      borderRadius: 10 * sc,
      borderColor: themeColors.primary1,
      borderWidth: 2 * sc,
      fontFamily: globalFonts.primaryMedium,
      fontSize: 25 * sc,
      color: themeColors.primary1,
      marginTop: 8 * sc,
      marginHorizontal: 10 * sc,
      width: 85 * sc,
      textAlign: "center",
    },
  
    inputCloseIconContainer: {
      marginTop: -10 * sc,
    },
  
    unit: {
      fontFamily: globalFonts.primaryLight,
      fontSize: 12 * sc,
      color: themeColors.tertiary1,
      marginVertical: 1 * sc,
    },

    
  buttonContainer: {
    alignItems: "center",
  },

  button: {
    paddingHorizontal: 50 * sc,
    marginVertical: 5 * sc,
  },

  buttonText: {
    fontSize: 20 * sc,
  },

  });
  
  const closeIconStyling = {
    color: themeColors.tertiary1,
    size: 25 * sc,
  };