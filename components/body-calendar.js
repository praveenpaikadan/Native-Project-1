import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { globalFonts, themeColors } from "../styles/global-styles";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { sc } from "../styles/global-styles";
import { BodyCalendarCurrent } from "../screens/modal/body-calender-current";
import { BodyCalendarFuture } from "../screens/modal/body-calendar-future";
import { BodyCalendarRest } from "../screens/modal/body-calendar-rest";
import { Calendar, LocaleConfig } from "react-native-calendars";

const currentDate = () => {
  const today = new Date();
  const month = parseInt(today.getMonth() + 1);
  const day = parseInt(today.getDay() + 1);
  switch (month) {
    case 1:
      let mmm = "Jan";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 2:
      mmm = "Feb";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 3:
      mmm = "Mar";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 4:
      mmm = "Apr";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 5:
      mmm = "May";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 6:
      mmm = "Jun";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 7:
      mmm = "Jul";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 8:
      mmm = "Aug";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 9:
      mmm = "Sep";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 10:
      mmm = "Oct";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 11:
      mmm = "Nov";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
    case 12:
      mmm = "Dec";
      date = today.getDate() + "-" + mmm + "-" + today.getFullYear();
      break;
  }

  switch (day) {
    case 1:
      dddd = "Sunday";
      return (dayDate = dddd + " " + date);
      break;
    case 2:
      dddd = "Monday";
      return (dayDate = dddd + " " + date);
      break;
    case 3:
      dddd = "Tuesday";
      return (dayDate = dddd + " " + date);
      break;
    case 4:
      dddd = "Wednesday";
      return (dayDate = dddd + " " + date);
      break;
    case 5:
      dddd = "Thursday";
      return (dayDate = dddd + " " + date);
      break;
    case 6:
      dddd = "Friday";
      return (dayDate = dddd + " " + date);
      break;
    case 7:
      dddd = "Saturday";
      return (dayDate = dddd + " " + date);
      break;
  }
};
currentDate();

export default BodyCalendar = ({
  visible,
  closeMenu,
  calendar,
  calendarHandler,
  trackNowButton,
  closeCalendar,
}) => {
  const [showItem, setShowItem] = useState({
    future: false,
    rest: false,
  });

  const [date, setDate] = useState(dayDate);

  LocaleConfig.locales["en"] = {
    monthNames: [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
    monthNamesShort: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    dayNames: [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ],
    dayNamesShort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  };
  LocaleConfig.defaultLocale = "en";

  const dateHandler = (day) => {
    const pressedDate = new Date(day.timestamp);
    const pressedMonth = parseInt(pressedDate.getMonth() + 1);
    const pressedDay = parseInt(pressedDate.getDay() + 1);

    switch (pressedMonth) {
      case 1:
        let mm = "Jan";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 2:
        mm = "Feb";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 3:
        mm = "Mar";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 4:
        mm = "Apr";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 5:
        mm = "May";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 6:
        mm = "Jun";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 7:
        mm = "Jul";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 8:
        mm = "Aug";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 9:
        mm = "Sep";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 10:
        mm = "Oct";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 11:
        mm = "Nov";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
      case 12:
        mm = "Dec";
        selectedDate =
          pressedDate.getDate() + "-" + mm + "-" + pressedDate.getFullYear();
        break;
    }

    switch (pressedDay) {
      case 1:
        let dd = "Sunday";
        pressedDayDate = dd + " " + selectedDate;
        break;
      case 2:
        dd = "Monday";
        pressedDayDate = dd + " " + selectedDate;
        break;
      case 3:
        dd = "Tuesday";
        pressedDayDate = dd + " " + selectedDate;
        break;
      case 4:
        dd = "Wednesday";
        pressedDayDate = dd + " " + selectedDate;
        break;
      case 5:
        dd = "Thursday";
        pressedDayDate = dd + " " + selectedDate;
        break;
      case 6:
        dd = "Friday";
        pressedDayDate = dd + " " + selectedDate;
        break;
      case 7:
        dd = "Saturday";
        pressedDayDate = dd + " " + selectedDate;
        break;
    }

    if (pressedDayDate == dayDate) {
      setShowItem({ future: false, rest: false });
      closeCalendar();
    } else {
      setDate(pressedDayDate);
      setShowItem({ ...showItem, future: true });
      closeCalendar();
    }
  };
  const dateSetter = () => {
    setDate(dayDate);
    setShowItem({ future: false, rest: false });
  };
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={{ ...styles.overlay }}>
        <View style={styles.container}>
          <View style={styles.line}></View>
          <View style={styles.headingContainer}>
            <View style={styles.headingContent}>
              <FontAwesome5 name="calendar-alt" {...calendarIconStyling} />
              <Text style={styles.heading}>BODY CALENDAR</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                closeMenu();
                dateSetter();
              }}
            >
              <AntDesign name="closecircle" {...closeIconStylingSmall} />
            </TouchableOpacity>
          </View>
          {calendar ? (
            <View style={styles.calendarContainer}>
              <Calendar
                style={{
                  borderRadius: 5 * sc,
                  borderColor: themeColors.secondary2,
                  margin: 10 * sc,
                }}
                theme={{
                  calendarBackground: themeColors.tertiary2,
                  textSectionTitleColor: themeColors.secondary1,
                  todayTextColor: themeColors.primary1,
                  textDisabledColor: themeColors.tertiary3,
                  arrowColor: themeColors.primary1,
                  monthTextColor: themeColors.secondary1,
                  textDayFontFamily: globalFonts.primaryMedium,
                  textMonthFontFamily: globalFonts.primaryBold,
                  textDayHeaderFontFamily: globalFonts.primaryMedium,
                }}
                onDayPress={dateHandler}
              />
            </View>
          ) : (
            <>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{date}</Text>
                <TouchableOpacity onPress={calendarHandler}>
                  <View style={styles.viewButtonContainer}>
                    <View style={styles.verticalLine}></View>
                    <FontAwesome5
                      name="calendar-alt"
                      {...calendarIconStylingSmall}
                    />
                    <Text style={styles.buttonText}>VIEW</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.childrenContainer}>
                {showItem.future ? (
                  <BodyCalendarFuture />
                ) : <BodyCalendarCurrent trackNow={trackNowButton} /> &&
                  showItem.rest ? (
                  <BodyCalendarRest />
                ) : (
                  <BodyCalendarCurrent trackNow={trackNowButton} />
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const calendarIconStyling = {
  color: themeColors.secondary2,
  size: 20 * sc,
};

const calendarIconStylingSmall = {
  color: themeColors.tertiary1,
  size: 15 * sc,
};
const closeIconStylingSmall = {
  color: themeColors.primary2,
  size: 20 * sc,
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    justifyContent: "flex-end",
    height: "100%",
  },

  line: {
    width: "100%",
    height: 5 * sc,
    backgroundColor: themeColors.primary1,
  },

  headingContainer: {
    flexDirection: "row",
    padding: 10 * sc,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: themeColors.tertiary1,
  },

  headingContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  heading: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    paddingLeft: 10 * sc,
    fontSize: 18 * sc,
  },

  calendarContainer: {
    backgroundColor: themeColors.secondary2,
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5 * sc,
    backgroundColor: themeColors.primary1,
  },

  date: {
    color: themeColors.secondary2,
    fontFamily: globalFonts.primaryMedium,
  },

  viewButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  verticalLine: {
    width: 2 * sc,
    height: 20 * sc,
    backgroundColor: themeColors.tertiary1,
    marginRight: 5 * sc,
  },

  buttonText: {
    marginLeft: 5 * sc,
    color: themeColors.secondary2,
    fontFamily: globalFonts.primaryMedium,
  },

  childrenContainer: {
    backgroundColor: themeColors.secondary2,
  },
});
