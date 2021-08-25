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

export const ExerciseCard = (props) => {
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
          <View>
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

          <Image source={props.image1} style={cardStyles.image} />
          <Image source={props.image2} style={cardStyles.image} />
        </View>
      </ElevatedCardTypeOne>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  cardConatiner: {
    flexDirection: "row",
    zIndex: 1,
  },
  card: {
    width: 340 * sc,
    height: 100 * sc,
    marginVertical: 5 * sc,
    backgroundColor: themeColors.primary2,
    justifyContent: "center",
  },

  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 10 * sc,
    color: themeColors.tertiary1,
    marginHorizontal: 10 * sc,
    marginTop: 3 * sc,
  },

  image: {
    width: 75 * sc,
    height: 55 * sc,
    marginRight: 5 * sc,
    borderRadius: 10 * sc,
  },

  chevronContainer: {
    position: "absolute",
    justifyContent: "center",
  },
});

export const ExerciseList = ({ data, key, activeOpacity, timer, onPress }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={(item) => (
        <View key={key}>
          <ExerciseCard
            activeOpacity={activeOpacity}
            // onPress={() =>
            //   navigation.navigate("Exercise", { index: item.index })
            // }
            onPress={() => onPress(item.index)}
            id={item.index + 1}
            exerciseName={item.item.exerciseName}
            image1={require("../../assets/images/Dumbbell-Step-Ups-1.jpg")}
            image2={require("../../assets/images/Dumbbell-Step-Ups-2.jpg")}
          />

          {timer ? (
            <View style={styles.timerContainer}>
              <MaterialIcons name="timer" {...timerIconStyling} />
              <Text style={styles.timerHeadingText}>REST BETWEEN SETS: </Text>
              <View style={styles.timeContainer}>
                <Text style={styles.timerText}>{item.item.rest}</Text>
              </View>
            </View>
          ) : null}
        </View>
      )}
      keyExtractor={(item) => item.exerciseId}
    />
  );
};

const timerIconStyling = {
  color: themeColors.primary1,
  size: 20 * sc,
};

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.tertiary1,
    paddingHorizontal: 4 * sc,
    paddingVertical: 2 * sc,
    marginVertical: 10 * sc,
    marginHorizontal: 80 * sc,
  },

  timerHeadingText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 12 * sc,
    color: themeColors.secondary2,
  },
  timerText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 12 * sc,
    color: themeColors.tertiary1,
  },

  timeContainer: {
    backgroundColor: themeColors.tertiary2,
    paddingHorizontal: 3 * sc,
    paddingVertical: 1 * sc,
  },
});
