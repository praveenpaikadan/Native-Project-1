import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Switch} from "react-native";
import { Spinner1 } from '../../components/loading-spinner';
import { themeColors, sc, globalFonts } from '../../styles/global-styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';


export default GeneralInfoModel = ({visible, data, setVisible}) => {

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
          paddingVertical: 30*sc,
        },
      
        headingContainer: {
          justifyContent: "center",
          alignItems: "center",
          height: 30 * sc,
          marginBottom: 10*sc,
          width: 250*sc,
          alignSelf: 'center'
        },
      
        heading: {
          fontFamily: globalFonts.primaryBold,
          color: themeColors.tertiary1,
          marginTop: 10 * sc,
          textAlign: 'center',
          marginBottom: 5*sc,
          // letterSpacing: 0.5 * sc,
          fontSize: 14 * sc,
          lineHeight: 23 * sc,
          paddingHorizontal: 5*sc,
        },
      
        line: {
          width: "100%",
          height: 5 * sc,
          backgroundColor: themeColors.primary2,
          marginBottom: 10 * sc,
          marginTop: 5*sc
        },

        content:{
            fontFamily: globalFonts.primaryRegular,
            opacity: 0.7,
            paddingVertical: 5*sc
        },

        time:{
            fontFamily: globalFonts.primaryLight,
            opacity: 0.5,
            fontSize: 10*sc
        },

        contentText: {
            fontFamily: globalFonts.primaryLight,
            fontSize: 14*sc
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

        scrollView:{
            height:'100%',
        }
      });

    const [loading, setLoading] = useState(false)
    const componentRef = useRef(null)

    return(
        <Modal ref={componentRef} transparent={true} visible={visible} animationType="fade">
            <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <View style={{position: 'absolute', right: 10*sc, top: 10*sc}}>
                    <TouchableOpacity style={{width: 30*sc, height: 30*sc, alignItems:'center', justifyContent: 'center'}} onPress={() => setVisible(false)}>
                        <FontAwesome5
                            name="window-close"
                            size={17*sc}
                            color={themeColors.primary1}
                        />    
                    </TouchableOpacity>
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{data.heading}</Text>
                    <Text style={styles.time}>{data.subHeading}</Text>
                </View>

                <View style={styles.line}></View>
                
            
                {loading?<Spinner1 />:
                    
                <ScrollView style={styles.scrollView}>
                    <View>
                        <Text style={styles.contentText}>{data.content}</Text>
                    </View>
                </ScrollView>}
            </View>
        </View>
    </Modal>
    )
}
