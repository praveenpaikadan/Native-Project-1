import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image
} from "react-native";
import {
  globalFonts,
  sc,
  themeColors,
  globalShadows,
} from "../../styles/global-styles";
import { ElevatedCardTypeOne } from "../../components/cards";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { getAPIAvailablePrograms } from '../../utilities/data-center';
import { MessageBox1 } from "../../components/message-box";
import { EmptyPaper } from "../../assets/svgs/svg-graphics";
import { BASE_URL } from "../../utilities/api"

const ProgramCard = ({ heading, shortInfo, level, period, bgImage }) => {
  var source = bgImage?{uri: bgImage, headers: {'X-Access-Token' : "authToken"}}:require('../../assets/images/dead-lift.jpg')
  return (
    <ElevatedCardTypeOne styling={cardStyles.card}>
      <ImageBackground style={cardStyles.cardImage} source={source}>
        
        <View style={cardStyles.cardOverlay}>
          <Text style={cardStyles.mainText}>{heading}</Text>
          <View style={cardStyles.detailsContainer}>
            <View style={cardStyles.detailsItemContainer}>
              <FontAwesome5 name="fire" {...cardIconStyling} />
              <Text style={cardStyles.subText}>{shortInfo}</Text>
            </View>
            <View style={cardStyles.detailsItemContainer}>
              <FontAwesome5 name="layer-group" {...cardIconStyling} />
              <Text style={cardStyles.subText}>{level}</Text>
            </View>
            <View style={cardStyles.detailsItemContainer}>
              <FontAwesome5 name="calendar" {...cardIconStyling} />
              <Text style={cardStyles.subText}>{period}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ElevatedCardTypeOne>
  );
};


const List = ({data, setReload, navigation}) => {
  
  if(data.length === 0){
    return(
      <MessageBox1 
        setReload={setReload} 
        reloadbutton={true}
        message = 'You have no valid Programs at the time. Please contact trainer to get new programs assigned to you...'
      >
        <EmptyPaper />

      </MessageBox1>)
  }
  return(
    
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.pickText}>PICK YOUR PROGRAM</Text>
        <View style={styles.triangle}></View>
      </View>

      <View style={styles.bottomBox}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl onRefresh={() => setReload()} />}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {item.bgImage = item.images[0]?`${BASE_URL}/media/${item.images[0].filename}`:null; navigation.navigate('ProgramDetails', {data: item})}}>
              <ProgramCard
                styles={styles.cardsContainer}
                bgImage={item.images[0]?`${BASE_URL}/media/${item.images[0].filename}`:null}
                heading={item.programName}
                shortInfo={item.programName}
                level={item.level}
                period={`${item.daysPerWeek} days X ${item.durationWeeks} weeks`}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>

  )
} 




export default ProgramList = ({ navigation }) => {

  const [loading, setLoading] = React.useState(true)
  const [display, setDisplay] = React.useState(<></>) 
  const [fetchSwitch, setFetchSwitch] = React.useState(true)
  const [data, setData] = React.useState([])

  const setReload = () => {
    setLoading(true)
    setFetchSwitch(!fetchSwitch)
  }

  React.useEffect(() => {
    getAPIAvailablePrograms()
    .then(response => {
      switch (response.status) {
        
        case 200:
          setLoading(false)
          setData(data)
          setDisplay(
            <List 
              data={response.data}
              setReload={setReload}
              navigation={navigation}
            />)
          break;

        case 502:
        setLoading(false)
        setDisplay(
          <MessageBox1 
            setReload={setReload} 
            message = 'Something Happened on our side. Please try again or contact your trainer to resolve the issue. ERR_CODE: DBFETCHERR'
          />)
          
        case 101:
          setLoading(false)
          setDisplay(
            <MessageBox1 
              setReload={setReload} 
              message = 'Something Happened. Plese check your network and tap to try Again..'
            />)
          break;
        
        default:
          if(response.data.message){
            setLoading(false)
            setDisplay(
              <MessageBox1 
                setReload={setReload} 
                message = 'Something Happened. Please tap to try Again..'
              />)
            }
            break; 
        }
    })

  }, [fetchSwitch, authToken])



  if(loading) {
    return <View style={styles.bottomBox}><ActivityIndicator size={sc*76} color={themeColors.secondary2} /></View>
  }else{
    return display
  }
}


const cardIconStyling = {
  size: 15 * sc,
  color: themeColors.primary1,
  style: { paddingRight: 3 * sc },
};

const cardStyles = StyleSheet.create({
  card: {
    width: 340 * sc,
    height: 100 * sc,
    marginVertical: 5 * sc,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardOverlay: {
    // backgroundColor: "rgba(0,0,0, 0.3)",
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 15 * sc,
  },

  mainText: {
    fontFamily: globalFonts.primaryMedium,
    fontSize: 30 * sc,
    color: themeColors.secondary2,
    marginBottom: 10 * sc,
    ...globalShadows.orangeTextShadow1,
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    flexWrap: "wrap",
  },

  detailsItemContainer: {
    flexDirection: "row",
    marginHorizontal: 5 * sc,
    alignItems: "center",
    marginVertical: 3 * sc,
  },

  subText: {
    fontSize: 12*sc,
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.secondary2,
    ...globalShadows.orangeTextShadow1,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  messageBox: {
    fontFamily: globalFonts.primaryMedium,
    opacity: 0.7,
    fontSize: 12 * sc,
    color: themeColors.secondary2,
    paddingVertical: 3 * sc,
    paddingHorizontal: 10 * sc,
    borderRadius: 10 * sc,
  },

  topBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6 * sc,
    paddingHorizontal: 8 * sc,
  },

  pickText: {
    fontFamily: globalFonts.primaryMedium,
    opacity: 0.7,
    fontSize: 14 * sc,
    color: themeColors.secondary2,
    backgroundColor: themeColors.tertiary1,
    paddingVertical: 3 * sc,
    paddingHorizontal: 10 * sc,
    borderRadius: 10 * sc,
  },

  triangle: {
    opacity: 0.7,
    width: 0,
    height: 0,
    borderLeftWidth: 15 * sc,
    borderRightWidth: 15 * sc,
    borderTopWidth: 5 * sc,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: themeColors.tertiary1,
    marginBottom: 5 * sc,
  },

  bottomBox: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  topBoxTagText: {
    fontSize: 12 * sc,
    alignSelf: "center",
    fontFamily: globalFonts.primaryLight,
    padding: 4 * sc,
    borderRadius: 5 * sc,
    backgroundColor: themeColors.tertiary3,
  },

  topBoxMainText: {
    alignSelf: "center",
    fontFamily: globalFonts.primaryBold,
    fontSize: 18 * sc,
    paddingHorizontal: 8 * sc,
    opacity: 0.8,
    textAlign: "center",
  },

  cardsContainer: {
    width: "100%",
    height: "100%",
  },
});
