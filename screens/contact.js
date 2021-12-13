import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from 'expo-linking';
import { getTrainerContact } from "../utilities/data-center";
import { getImageUrl } from "../utilities/helpers";
import { MessageBox1 } from "../components/message-box";
import AsyncStorage from "@react-native-async-storage/async-storage";

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


  const [loading, setLoading] = React.useState(0)
  const [data, setData] = React.useState({})
  const [reloadSwich, setReloadSwitch] = React.useState(true)

  React.useEffect(() => {

    const setContact = async () => {
      var localContact = await AsyncStorage.getItem('trainerContact')
      if(localContact){
        localContact = JSON.parse(localContact)
        setData(localContact)
        setLoading(1)
        return localContact
      }else{
        return null
      }
    } 

    setContact()
    .then((localContact) => {
      getTrainerContact()
      .then((response) => {
        switch (response.status) {
          case 200:
            if(JSON.stringify(response.data) !== JSON.stringify(localContact)){
              setData(response.data)
              AsyncStorage.setItem('trainerContact', JSON.stringify(response.data))
              setLoading(1)
            }
            break;
          default:
            if(!localContact){
              setLoading(-1)
            }
            break; 
          }
      })
    })
    
  }, [reloadSwich])

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header title={'Contact Trainer'} backButton={true} onPress={() => {navigation.goBack()}} onPressMenu={() => navigation.openDrawer()} />
      {loading === 1?
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <View style={styles.avatar}>
            <Image 
            style={styles.image}
            source = {{uri: getImageUrl(data.photo?data.photo.filename: 'placeholder.jpg', 'open')}}/>
          </View>
          <View style={styles.topRight}>
            <Text style={styles.text1}>{data.name}</Text>
            <Text style={{...styles.text2, fontSize: 10*sc}}>Professional Personal Trainer</Text>
            <Text style={styles.text2}>{data.website}</Text>
          </View>  
        </View>

        <View style={styles.bottomContainer}>
          <Item icon='envelope' text={data.email} link={"mailto:"+data.email}></Item>
          <Item icon='map-marker-alt' text={data.address} link={data.lat && data.long? `https://www.google.com/maps/search/?api=1&query=${data.lat},${data.long}`: null}></Item>
          <Item icon='whatsapp' text={data.whatsapp} link={'https://wa.me/'+data.whatsapp}></Item>
          <Item icon='phone' text={data.phone} link={"tel:"+data.phone}></Item>
          <Item icon='at' text={data.website} link={'http://'+data.website}></Item>
        </View>  
        <View style={styles.footerContainer}>
          <Text style={{fontFamily: globalFonts.primaryLight, fontSize: 15*sc}}>{data.info}</Text> 
        </View>   
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
    alignSelf:'center',
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
