import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from 'expo-linking';

const Item = ({icon, text, link}) => {
  const styles= {
    main:{
      flexDirection: 'row',
      marginVertical: 5*sc,
      minHeight: 120*sc,
      alignItems: 'center',
    },
    icon: {
      width: 45*sc,
      opacity: 0.7,
      padding: 5*sc
    },
    details:{
      padding: 10*sc,
      width:(icon?280:340)*sc,
    },
    text:{
      fontFamily: globalFonts.primaryLight,
      fontSize: 15*sc
    }
  }

    return(
      <TouchableOpacity onPress={() => {if(link){Linking.openURL(link);}}}>
        <View style={styles.main}>
          {icon?<FontAwesome5 name={icon} color= {themeColors.primary1} size={30*sc} style={styles.icon}/>:null}
          <View style={styles.details} >
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>

    )}

export default Contact = ({ navigation }) => {

  var data = {
    imageURI: 'https://picsum.photos/200',
    name: 'Aboo Thahir',
    phone: '+918289919059',
    email: 'aboothahir@aboothahir.com',
    whatsapp: '+918289919059',
    address: 'Pranavam House, Poonthottam, Pathiriyal PO, Manjeri, Malappuram 676123',
    website: 'www.google.com',
    lat: 11.19638135873786, 
    long: 76.16681887992492,
    info: "It has survived not only five.It has survived not only five.It has survived not only five.It has survived not only five.It has survived not only five.",
    infolink: 'www.google.com'
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header title={'Contact Trainer'} backButton={true} onPress={() => {navigation.goBack()}} onPressMenu={() => navigation.openDrawer()} />

      <View style={styles.contentContainer}>

        <View style={styles.topContainer}>
          <View style={styles.avatar}>
            <Image 
            style={styles.image}
            source = {{uri: data.imageURI}}/>
          </View>
          <View style={styles.topRight}>
            <Text style={styles.text1}>{data.name}</Text>
            <Text style={{...styles.text2, fontSize: 10*sc}}>Professional Personal Trainer</Text>
            <Text style={styles.text2}>{data.website}</Text>
          </View>  
        </View>

        <View style={styles.bottomContainer}>
          <Item icon='envelope' text={data.email} link={"mailto:"+data.email}></Item>
          <Item icon='home' text={data.address} link={data.lat && data.long? `https://www.google.com/maps/search/?api=1&query=${data.lat},${data.long}`: null}></Item>
          <Item icon='whatsapp' text={data.whatsapp} link={'https://wa.me/'+data.whatsapp}></Item>
          <Item icon='phone' text={data.phone} link={"tel:"+data.phone}></Item>
          <Item icon='at' text={data.website} link={'http://'+data.website}></Item>
        </View>  
        <View style={styles.footerContainer}>
          <Text style={{fontFamily: globalFonts.primaryLight, fontSize: 15*sc}}>{data.info}</Text> 
        </View> 
             
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: themeColors.tertiary2,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: themeColors.tertiary2,
  },

  avatar:{
    width: 100 * sc,
    height: 100 * sc,
    borderRadius: 75 * sc,
    borderWidth: 3 * sc,
    borderColor: themeColors.primary2,
    overflow: 'hidden',
    marginRight: 10*sc
  },

  image: {
    width: 100*sc,
    height: 100*sc
  },

  topContainer: {
    width: '100%',
    height: 120*sc,
    marginBottom: 10*sc,
    flexDirection: 'row',
    alignItems:'center',
    padding: 10*sc
  },

  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent:'space-evenly',
    padding: 20*sc
  },

  footerContainer: {
    width: '100%',
    padding: 20*sc
  },

  topRight:{
    justifyContent: 'center',
    flex:1,
    height: '100%'
  },  

  text1: {
    fontFamily: globalFonts.primaryMedium,
    fontSize: 25*sc,
    letterSpacing: 2*sc,
  },

  text2:{
    fontFamily: globalFonts.primaryLight,
     color: themeColors.primary1,
  }

});
