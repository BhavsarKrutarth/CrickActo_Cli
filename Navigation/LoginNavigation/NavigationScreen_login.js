import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Color from "../../Color/Color";
import Login from "../Screen/Login/Login";
import OTP_Verify from "../Screen/Login/OTP_Verify";
import PinSet from "../Screen/Login/PinSet";

const Stack = createNativeStackNavigator();

const MyTheme = {
  // ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: Color.PrimaryColor,
  // },
  dark: false,
  colors: {
    primary: Color.PrimaryColor,
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const NavigationScreen_login = (props) => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{}} />
          <Stack.Screen
            name="OTP_Verify"
            component={OTP_Verify}
            options={{
              title: "OTP Verify",
            }}
          />
          <Stack.Screen
            name="PinSet"
            component={PinSet}
            options={{
              title: "PassWord Set",
            }}
          />
          


        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationScreen_login;
