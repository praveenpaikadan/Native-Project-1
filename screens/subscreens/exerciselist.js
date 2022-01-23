import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalFonts, sc, themeColors } from "../../styles/global-styles";
import { ElevatedCardTypeOne } from "../../components/cards";
import { MaterialIcons } from "@expo/vector-icons";
import { getFullMediaUrlIfRelative, makeMediaUrl } from "../../utilities/helpers";

export const ExerciseCard = (props) => {

  const [coverImage, setCoverImage] = React.useState(0) // do we have a succesful image load now?

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={cardStyles.cardConatiner}
      activeOpacity={props.activeOpacity}
    >
      <ElevatedCardTypeOne styling={cardStyles.card}>
        <View style={cardStyles.exerciseContainer}>
          <View style={cardStyles.idContainer}>
            <Text style={cardStyles.idContent}>{props.id}</Text>
          </View>
          <View style={cardStyles.detailsContainer}>
            <Text
              style={{
                fontFamily: globalFonts.primaryBold,
                fontSize: 16 * sc,
                color: themeColors.tertiary1,
                marginHorizontal: 10 * sc,
                width: 115 * sc,
                ...props.exerciseNameStyling,
              }}
            >
              {props.exerciseName}
            </Text>
            <Text style={cardStyles.targetSets}>{props.targetSets}</Text>
          </View> 

          {/* <Image 
            source={props.image1} 
            style={{...cardStyles.image, display:image1?'flex':'none'}}
            onLoad={() => {setImage1(true)}}
          /> */}
          {/*placeholder*/}
          {/* <Image 
            style={{...cardStyles.image, display:image1?'none':'flex'}}
            source={require("../../assets/images/exercise-place-holder1.png")}
          /> */}

          <View style={cardStyles.imageContainer}>
            <Image 
              source={props.coverImage} 
              style={{...cardStyles.image, display:coverImage?'flex':'none'}}
              onLoad={() => {setCoverImage(1)}}
            />

            {/*placeholder*/}
            <Image 
              style={{...cardStyles.image, display:coverImage?'none':'flex'}}
              source={require("../../assets/images/exercise-place-holder2.png")}
            />
          </View>

        </View>
        {props.children}
      </ElevatedCardTypeOne>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  cardConatiner: {
    flexDirection: "row",
    zIndex: 1,
    alignSelf:'center'
  },
  card: {
    width: 340 * sc,
    paddingVertical: 5*sc,
    marginVertical: 5 * sc,
    backgroundColor: themeColors.primary2,
    justifyContent: "center",
  },

  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'pink'
  },

  idContainer: {
    width: 30 * sc,
    height: 30 * sc,
    backgroundColor: themeColors.primary1,
    borderRadius: 15 * sc,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10 * sc,
  },

  idContent: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 25 * sc,
    color: themeColors.secondary2,
  },

  targetSets: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 12 * sc,
    color: themeColors.tertiary1,
    marginHorizontal: 10 * sc,
    marginTop: 3 * sc,
  },

  image: {
    width: '100%',
    height: 55 * sc,
    marginRight: 10 * sc,
    borderRadius: 10 * sc,
  },

  chevronContainer: {
    position: "absolute",
    justifyContent: "center",
  },

  detailsContainer : {
    flex:1
  },

  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 100*sc,
  }
});

export const ExerciseList = ({ data, activeOpacity, onPress }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => item._id}
      renderItem={({item, index}) => {
        // getting image urls if exists
        // var image1 = null
        // var image2 = null
   
        // image1 ={uri: makeMediaUrl('?by=ExId&id='+item.exerciseID+'&index=0', true)}
        // image2 = {uri: makeMediaUrl('?by=ExId&id='+item.exerciseID+'&index=1', true)}
        
        var coverImage = null
        coverImage = {uri: getFullMediaUrlIfRelative(makeMediaUrl('?by=ExId&id='+item.exerciseID+'&index=1', true))}
        // ========

        return(
        <View style={{alignSelf: 'center'}} key={index}>
          <ExerciseCard
            targetSets={item.target.length > 0?"Target sets: " + String(item.target.length):null}
            activeOpacity={activeOpacity}
            onPress={() =>
              navigation.navigate("Exercise", { exerciseIndex: index })
            }
            // onPress={() => onPress(index)}
            id={index+1}
            exerciseName={item.exerciseName}
            coverImage={coverImage}
            // image2={image2}
          >
          {item.restInSec?
            <View style={styles.timerContainer}>
              <MaterialIcons name="timer" {...timerIconStyling} />
              <Text style={styles.timerHeadingText}>REST AFTER THIS EXERCISE: </Text>
              <View style={styles.timeContainer}>
                <Text style={styles.timerText}>{item.restAfterInMins+ ' MINUTES'}</Text>
              </View>
            </View>:null}
            {/* <View>
            <Text style={styles.restAfter}>{item.restAfterInMins} minutes rest before moving on</Text> 
            </View> */}
            </ExerciseCard>
        </View>
      )}}

    />
  );
};

const timerIconStyling = {
  color: themeColors.primary1,
  size: 15 * sc,
};

const styles = StyleSheet.create({
  timerContainer: {
    paddingVertical: 2*sc,
    width:'100%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.tertiary1,
    paddingHorizontal: 4 * sc,
    marginTop: 10 * sc,
  },

  timerHeadingText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 10 * sc,
    marginHorizontal:5*sc,
    color: themeColors.secondary2,
  },
  timerText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 10 * sc,
    color: themeColors.tertiary1,
  },

  timeContainer: {
    backgroundColor: themeColors.tertiary2,
    paddingHorizontal: 3 * sc,
    paddingVertical: 1 * sc,
  },

  restAfter: {
    fontFamily: globalFonts.primaryLight,
    textAlign: 'center',
    color: 'black',
    fontSize: 12*sc,
    marginTop: 6*sc,
    // borderWidth: 1*sc,
    // borderBottomRightRadius: 10*sc,
    // borderBottomLeftRadius: 10*sc,
    // borderColor: themeColors.tertiary3,

  }
});
