import React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { themeColors } from "../styles/global-styles";
import { FontAwesome } from "@expo/vector-icons";
import { sc } from "../styles/global-styles";

// pass extra styling as styling={{style1:value,....}}
// pass arrow={false} to remove arrow

global.authToken = null

export const ButtonType1 = ({
  text,
  styling,
  textStyling,
  arrow = true,
  isLoading=false,
  activityIndicatorSize='large',
  play = false,
  onClick,
  disabled,
  small,
  invertColor,
  subContainerStyling
}) => (
  <TouchableOpacity onPress={onClick} disabled={disabled}>
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: !invertColor?themeColors.primary1: themeColors.secondary2,
        opacity: disabled?0.5:1,
        borderRadius: 10 * sc,
        minWidth: !small?150 * sc:small,
        ...styling,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 10 * sc,
          // paddingBottom: 12 * sc,
          paddingTop: 12 * sc,
          ...subContainerStyling
        }}
      >
        {play ? (
          <FontAwesome
            name="play-circle"
            size={play}
            color={invertColor?themeColors.primary1:themeColors.secondary2}
          />
        ) : (
          <Text></Text>
        )}
        <Text
          style={{
            fontSize: 30 * sc,
            fontFamily: "ubuntu-bold",
            color: invertColor?themeColors.primary1:themeColors.secondary2,
            paddingHorizontal: 5 * sc,
            ...textStyling,
          }}
        >
          {isLoading ? <ActivityIndicator size={activityIndicatorSize} color={invertColor?themeColors.primary1:themeColors.secondary2} /> : text}
      
        </Text>

        {arrow && !isLoading? (
          arrow != true ? (
            <FontAwesome
              name="chevron-right"
              size={arrow}
              style={{ paddingTop: 1 * sc }}
              color={invertColor?themeColors.primary1:themeColors.secondary2}
            />
          ) : (
            <FontAwesome
              name="chevron-right"
              size={28 * sc}
              style={{ paddingTop: 1 * sc }}
              color={invertColor?themeColors.primary1:themeColors.secondary2}
            />
          )
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);
