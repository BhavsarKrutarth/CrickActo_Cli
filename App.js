import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationScreen_login from './Navigation/LoginNavigation/NavigationScreen_login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationScreen from "./Navigation/LoginNavigation/NavigationScreen";


import Login from "./Navigation/Screen/Login/Login";
import OTP_Verify from "./Navigation/Screen/Login/OTP_Verify";
import PinSet from "./Navigation/Screen/Login/PinSet";

const Stack = createNativeStackNavigator();

export default function App() {
  global.login = ""
  global.MobileNo = "";
  global.domainName = "http://27.116.48.79";
  // global.domainName = "http://192.168.29.129"
  global.Tournamentid = "";
  global.TournamentAdmin = 0;
  global.TournamentName = "";
  global.CityId = "";
  global.CityName = "";
  global.MyMatchTitle;
  const [isLoggedIn, setisLoggedIn] = useState("false");

  const storeData = async () => {
    try {

      // await AsyncStorage.getItem('@MobileNo' + "    console MobileNo");
      //AsyncStorage.clear();
      
      setisLoggedIn(await AsyncStorage.getItem('@login') || 'false');
      // GlobalVariable.Glogin = await AsyncStorage.getItem('@login');
      global.login = await AsyncStorage.getItem('@login');
      global.MobileNo = await AsyncStorage.getItem('@MobileNo');
      CityName_GET(await AsyncStorage.getItem('@MobileNo'))
      /*-------------------- First Time information Tool Tip ----------------------*/
      if(await AsyncStorage.getItem('@MyMatchTitle'))
      {
        global.MyMatchTitle = false;
      }
      else 
      {
       await AsyncStorage.setItem("@MyMatchTitle", "true");
       global.MyMatchTitle = true;
      }

      /*-------------------- First Time information Tool Tip ----------------------*/
      
    } catch (e) {
      // saving errorr
    }
  }
  const CityName_GET = async (
    MobileNo
  ) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/UserMaster/` + MobileNo,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              if (List) {
                if (List.CITYID != null) {
                  global.CityId = List.CITYID
                }
                if (List.CITYNAME != null) {
                  global.CityName = List.CITYNAME
                }
              }
            }
          }
         
          return json;
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      alert(error);
      return;
    } finally {
    }
  };
  function BindNavigation(props) {
    storeData();
    var CheckisLoggedIn = isLoggedIn
    if (CheckisLoggedIn == "true") {
      return (
        // <NavigationScreen></NavigationScreen>
        <NavigationScreen></NavigationScreen>
      );
    } else {
      return (
        <NavigationScreen_login></NavigationScreen_login>
      );
    }
  }
  return (
    BindNavigation()
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen
  //       name="Login"
  //       component={Login}
  //       options={{title: 'Login'}}
  //     />
  //     <Stack.Screen name="OTP_Verify" component={OTP_Verify} />
  //     <Stack.Screen name="PinSet" component={PinSet} />

  //   </Stack.Navigator>
  // </NavigationContainer>
  );
}
