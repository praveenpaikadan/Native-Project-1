import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalFonts, themeColors, sc } from '../styles/global-styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { EditProfileGraphics, RulerIcon, WeightIcon, UserIcon, CalendarIcon, PhoneIcon, MailIcon } from '../assets/svgs/svg-graphics';
import { formPageStyles } from '../styles/form-pages-styles';

export default EditProfileScreen = () => {
    return(
        <View style={styles.container}> 
            <View style={formPageStyles.headerGraphicsContainer}>
                <EditProfileGraphics style={formPageStyles.graphics} />
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
                        <Text style={styles.infoDetails}>Olivia Charlotte</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.pencilIconContainer}>
                        <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.iconContainer}>
                        <RulerIcon />
                    </View>
                    <View style={styles.deatilsContainer}>
                        <Text style={styles.infoHeading}>Height</Text>
                        <Text style={styles.infoDetails}>168 cm</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.pencilIconContainer}>
                        <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <WeightIcon />
                    </View>
                    <View style={styles.deatilsContainer}>
                        <Text style={styles.infoHeading}>Weight</Text>
                        <Text style={styles.infoDetails}>55 kg</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.pencilIconContainer}>
                        <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <CalendarIcon />
                    </View>
                    <View style={styles.deatilsContainer}>
                        <Text style={styles.infoHeading}>Date Of Birth</Text>
                        <Text style={styles.infoDetails}>01-12-1998</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.pencilIconContainer}>
                        <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <PhoneIcon />
                    </View>
                    <View style={styles.deatilsContainer}>
                        <Text style={styles.infoHeading}>Phone Number</Text>
                        <Text style={styles.infoDetails}>9847012359</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.pencilIconContainer}>
                        <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <MailIcon />
                    </View>
                    <View style={styles.deatilsContainer}>
                        <Text style={styles.infoHeading}>Email Address</Text>
                        <Text style={styles.infoDetails}>someone@gmail.com</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.pencilIconContainer}>
                        <FontAwesome5 name="pencil-alt" {...pencilIconStyling} />
                    </View>
                </View>
            </View>
            
        </View>
    )
}


const pencilIconStyling = {
    size:25*sc, 
    color:themeColors.tertiary1
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:themeColors.tertiary2
    },

    headingContainer:{
        position:'absolute',
        top:80*sc,
        left:80*sc,
    },

    mainHeading:{
        fontFamily:globalFonts.primaryMedium,
        color:themeColors.secondary2,
        fontSize:25*sc,
        letterSpacing:1.2*sc

    },

    userInfoContainer:{
        marginTop:220*sc

    },

    contentContainer:{
        flexDirection:'row',
        paddingHorizontal:20*sc,
        width:'100%',
        marginVertical:12.5*sc
    },

    iconContainer:{
        alignItems:'center',
        width:30*sc
    },

    deatilsContainer:{
        marginLeft:20*sc
    },

    infoHeading:{
        fontFamily:globalFonts.primaryRegular,
        color:themeColors.secondary1,
        marginTop:-5*sc,
        marginBottom:5*sc
    },

    infoDetails:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.tertiary1,
        fontSize:16*sc,
        letterSpacing:1.2*sc
    },

    pencilIconContainer:{
        alignItems:'flex-end',
        marginLeft:-20*sc
        
    },

    line:{
        width:250*sc,
        height:2*sc,
        backgroundColor:themeColors.tertiary1
    },


})