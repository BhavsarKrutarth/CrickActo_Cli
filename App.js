import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import Login from "./Navigation/Screen/Login/Login";
import OTP_Verify from "./Navigation/Screen/Login/OTP_Verify";
import PinSet from "./Navigation/Screen/Login/PinSet";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login'}}
      />
      <Stack.Screen name="OTP_Verify" component={OTP_Verify} />
      <Stack.Screen name="PinSet" component={PinSet} />

    </Stack.Navigator>
  </NavigationContainer>
  );
}
