import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from "react-native";
import { globalFonts, themeColors, sc } from "../styles/global-styles";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  EditProfileGraphics,
  RulerIcon,
  WeightIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  MailIcon,

} from "../assets/svgs/svg-graphics";
import { formPageStyles } from "../styles/form-pages-styles";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../components/auth-context";
import { KeyboardHideOnTouchOutside} from '../components/keyboard-responsive'
import { ButtonType1 } from "../components/buttons";
import { postEditProfile } from "../utilities/data-center";
import flashMessage from "../utilities/flash-message";
import DateTimePicker from '@react-native-community/datetimepicker';


export default EditProfileScreen = ({ navigation }) => {

  const [visible, setVisible] = React.useState(false) // edit box visible or not
  const [tag, setTag] = React.useState({id: null, icon: null, text: null})
  const [newVal, setNewVal] = React.useState('')
  const {credentials, resetCredentials } = React.useContext(AuthContext)
  const [show, setShow] = React.useState(false)  // date picker show
  const [tempDate, setTempDate] = React.useState(null)
  const [saving, setSaving] = React.useState(false)

  
  const handleEdit = (tag, newVal) => {
    if(!newVal || String(credentials[tag.id]) === String(newVal)){
      return
    }
    setSaving(true)
    // validation goes here

    postEditProfile({field: tag.id, value: newVal})
      .then(response => {
        switch (response.status) {
          case 200:
            console.log(response.data)
            resetCredentials(response.data)
            flashMessage(`Changed ${tag.text} successfully`, 'success')
            setVisible(false)
            break
          default:
            flashMessage(`Unable to change ${tag.text}. Please try later.`, 'danger')
           
            break; 
          }
        setSaving(false)

      })
      .catch((e) => {
        flashMessage(`Failed to change ${tag.text}. Try again later`)
      })
  }

  const Pencil = (props) => {
  
    return(
      
      <TouchableOpacity 
          onPress={() => {
            setTag({icon: props.icon, text:props.tag, id: props.id})
            setNewVal(credentials[props.id])
            setVisible(true) 
          }}
          style={styles.pencilIconContainer}>
        <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
      </TouchableOpacity>
    ) 
  }

  
  return (
    <KeyboardHideOnTouchOutside>
    <View style={styles.container}>
    
    
    {show&&<DateTimePicker           // date picker for changing dob.
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
              setTempDate(modDS)
              setNewVal(modDS)  
            }
          }}
        />}

    {
    //edit box starts here------------------------------------------------------
    visible?<View style={{...styles.editBox}}>
        <TouchableOpacity 
          style={{position: 'absolute', right: 15*sc, top: 10*sc}}
          onPress = {() => {setVisible(false); setNewVal(''); setTempDate(null)}}>
          <Feather name="x-circle" color={themeColors.tertiary1} size={22*sc}/>
        </TouchableOpacity>
        
          <View style={styles.contentContainer}>
            <View>
              {tag.icon}
            </View>

            <View style={styles.deatilsContainer}>
                <Text style={{...styles.infoHeading, marginTop: 5*sc}}>Edit {tag.text}</Text>
                
                <View style={{flexDirection: 'row'}}>
                  
                  <View style={{flexDirection: 'column', width:200*sc}}>
                    {
                    tag.id !== "dob"?
                    <TextInput 
                      keyboardType={['height', 'weight', 'phone'].includes(tag.id)?"numeric":(tag.id === 'email'? 'email-address':'default')}
                      style={{...styles.infoDetails, flex: 1}}
                      onChangeText={(e) => {setNewVal(e)}}
                      >
                        {credentials[tag.id]}
                    </TextInput>
                    :
                    <TouchableOpacity style={{height: 30*sc}}
                      onPress = { () => {
                       setShow(true)
                      }}
                    >
                      <Text 
                        style={{...styles.infoDetails, flex: 1, marginTop: 6*sc}}>
                          {tempDate?tempDate:credentials[tag.id]}
                      </Text>
                    </TouchableOpacity>
                    }
                    <View style={{...styles.line, width: 200*sc}}></View>
                  </View>
                  
                  <ButtonType1
                    activityIndicatorSize={20*sc}
                    isLoading = {saving}
                    arrow={false}
                    text='SAVE'
                    styling={{marginLeft: 10*sc,marginTop: 8*sc, width: 70*sc, height: 30*sc, borderWidth: saving? 0:2*sc, borderColor: themeColors.primary1}}
                    textStyling={{fontSize: 12*sc}}
                    small={10*sc}
                    invertColor={true}
                    disabled={ saving || String(credentials[tag.id]) === String(newVal) || !newVal? true: false}
                    onClick={() => {handleEdit(tag, newVal)}}
                  />
                </View>
              
            </View>
          </View>
        </View>:null
        // edit box end here ----------------------------------------
        }

        

      <StatusBar translucent={true} style="light" />
      <View style={formPageStyles.headerGraphicsContainer}>
        <EditProfileGraphics style={formPageStyles.graphics} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}
        >
          <Feather name="chevron-left" {...backIconStyling} />
        </TouchableOpacity>

        <View style={styles.headingContainer}>
          <Text style={styles.mainHeading}>EDIT PROFILE</Text>
        </View>
      </View>


      <View style={styles.userInfoContainer}>

        
        <View style={styles.contentContainer}>
          <View>
            <UserIcon />
          </View>
          <View style={styles.deatilsContainer}>
            <Text style={styles.infoHeading}>Name</Text>
            <Text style={styles.infoDetails}>{credentials.name}</Text>
            <View style={styles.line}></View>
          </View>
          <Pencil id='name' tag='Name' icon={<UserIcon />}/>
        </View>


        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <RulerIcon />
          </View>
          <View style={styles.deatilsContainer}>
            <Text style={styles.infoHeading}>Height</Text>
            <Text style={styles.infoDetails}>{credentials.height} cm</Text>
            <View style={styles.line}></View>
          </View >
          <Pencil id='height' tag='Height' icon={<RulerIcon />} />
        </View>


        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <WeightIcon />
          </View>
          <View style={styles.deatilsContainer}>
            <Text style={styles.infoHeading}>Weight</Text>
            <Text style={styles.infoDetails}>{credentials.weight} kg</Text>
            <View style={styles.line}></View>
          </View>
          <Pencil id='weight' tag='Weight' icon={<WeightIcon />}/>
        </View>


        <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>          
            <CalendarIcon />
          </View>
          <View style={styles.deatilsContainer}>
            <Text style={styles.infoHeading}>Date Of Birth</Text>
            <Text style={styles.infoDetails}>{credentials.dob}</Text>
            <View style={styles.line}></View>
          </View>
          <Pencil id={'dob'} tag='Date of Birth' icon={<CalendarIcon />}/>
        </View>


        <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>          
            <PhoneIcon />
          </View>
          <View style={styles.deatilsContainer}>
            <Text style={styles.infoHeading}>Phone Number</Text>
            <Text style={styles.infoDetails}>{credentials.phone?credentials.phone:'Add phone'}</Text>
            <View style={styles.line}></View>
          </View>
          <Pencil id={'phone'} tag='Phone Number' icon={<PhoneIcon />}/>
        </View>


        <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>          
            <MailIcon />
          </View>
          <View style={styles.deatilsContainer}>
            <Text style={styles.infoHeading}>Email Address</Text>
            <Text style={styles.infoDetails}>{credentials.email}</Text>
            <View style={styles.line}></View>
          </View>
          <Pencil id='email' tag='Email Address' icon={<MailIcon />} />
        </View>
      </View>
       
       
    </View>


    </KeyboardHideOnTouchOutside>
  );
};

const backIconStyling = {
  size: 30 * sc,
  color: themeColors.secondary2,
};

const pencilIconStyling = {
  size: 20 * sc,
  color: themeColors.tertiary1,
};

const styles = StyleSheet.create({

  editBox:{
    zIndex: 100,
    elevation: 1000,
    width: '100%', 
    height: 100, 
    backgroundColor: 'white',
    borderTopRightRadius: 20*sc,
    borderTopLeftRadius: 20*sc, 
    position: 'absolute', 
    bottom: 0
  },

  container: {
    flex: 1,
    width: "100%",
    backgroundColor: themeColors.tertiary2,
  },

  backButton: {
    position: "absolute",
    marginTop: 25 * sc,
    marginLeft: 5 * sc,
    padding: 5 * sc,
  },

  headingContainer: {
    position: "absolute",
    top: 80 * sc,
    left: 80 * sc,
  },

  mainHeading: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.secondary2,
    fontSize: 25 * sc,
    letterSpacing: 1.2 * sc,
  },

  userInfoContainer: {
    marginTop: 220 * sc,
  },

  contentContainer: {
    flexDirection: "row",
    paddingHorizontal: 20 * sc,
    width: "100%",
    marginVertical: 12.5 * sc,
  },

  iconContainer: {
    alignItems: "center",
    width: 30 * sc,
  },

  deatilsContainer: {
    marginLeft: 20 * sc,
  },

  infoHeading: {
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.secondary1,
    marginTop: -15* sc,
    marginBottom: 5 * sc,
  },

  infoDetails: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.tertiary1,
    fontSize: 16 * sc,
    letterSpacing: 1.2 * sc,
    width: '90%',
    overflow: 'hidden'
  },

  pencilIconContainer: {
    alignItems: "flex-end",
    marginLeft: -20 * sc,
  },

  line: {
    width: 250 * sc,
    height: 2 * sc,
    backgroundColor: themeColors.tertiary1,
  },
});
