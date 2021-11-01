import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { themeColors, sc, globalFonts } from "../styles/global-styles";
import { Header } from "../components/header";
import { HistoryList } from "./subscreens/history-list";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default WorkoutHistory = () => {
  const [total, setTotal] = React.useState(0)
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header
        backButton={true}
        onPress={navigation.goBack}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={styles.headingContainer}>
        <View style={styles.heading}>
          <FontAwesome5 name="dumbbell" {...menuIconStyling} />
          <Text style={styles.headingText}>WORKOUT HISTORY</Text>
        </View>
        <View>
          <Text style={styles.totalWorkouts}>TOTAL WORKOUTS TRACKED: {total}  </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <HistoryList setTotal={setTotal}/>
        <Feather name="chevrons-down" {...chevronIconStyling} />
      </View>
    </View>
  );
};

const menuIconStyling = {
  color: themeColors.secondary2,
  size: 25 * sc,
};

const chevronIconStyling = {
  color: themeColors.primary1,
  size: 30 * sc,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  headingContainer: {
    backgroundColor: themeColors.tertiary1,
    width: "100%",
    paddingVertical: 10 * sc,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    flexDirection: "row",
  },

  headingText: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    fontSize: 22 * sc,
    marginLeft: 10 * sc,
    letterSpacing: 1.2 * sc,
  },

  totalWorkouts: {
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.secondary2,
    fontSize: 12 * sc,
    marginTop: 5 * sc,
    letterSpacing: 0.5 * sc,
  },

  listContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10 * sc,
  },
});
