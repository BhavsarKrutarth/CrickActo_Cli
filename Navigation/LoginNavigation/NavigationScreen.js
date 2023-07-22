import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

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

function TopTabNavigation_Tournament({ route }) {
    return (
      <Tab.Navigator
        initialRouteName={
          route.params === undefined
            ? "MyMatch"
            : route.params.PageName != ""
            ? route.params.PageName
            : "MyMatch"
        }
        screenOptions={{
          tabBarActiveTintColor: Color.WhiteBGColor,
          tabBarInactiveTintColor: Color.WhiteBGColor,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: Color.PrimaryColor,
          },
          tabBarIndicatorStyle: {
            borderBottomColor: Color.WhiteBGColor,
            borderBottomWidth: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen
          name="MyMatch"
          component={MyMatch}
          options={{
            LoadRef: "True",
          }}
        />
        <Tab.Screen
          name="Tournament"
          component={Tournament}
          options={{
            title: "Tournament",
          }}
        />
        <Tab.Screen
          name="SubTopTabNavigation_Tournament"
          component={SubTopTabNavigation_Tournament}
          options={{
            title: "My Teams",
          }}
        />
      </Tab.Navigator>
    );
  }

function DrawerNavigator() {
    // storeData();
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomeDrawer {...props} />}
        screenOptions={
          {
            // headerStyle: { backgroundColor: '#351401' },
            // headerTintColor: 'white',
            // sceneContainerStyle: { backgroundColor: '#3f2f25' },
            // drawerContentStyle: { backgroundColor: '#351401' },
            // drawerInactiveTintColor: 'white',
            // drawerActiveTintColor: '#351401',
            // drawerActiveBackgroundColor: '#e4baa1',
          }
        }
      >
        {/* <Drawer.Screen
          name="HomeScreenStack"
          component={HomeScreenStack}
          options={{
            // drawerItemStyle: { height: 0 }
            title: "",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
            headerTitle: () => (
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri:
                      "" +
                      global.domainName +
                      "/CricbuddyAdmin/Content/assets/UserProfile/UserProfile.png",
                  }}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    paddingTop: 5,
                    borderColor: "#DC6933",
                    borderWidth: 2,
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    color: "#DC6933",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 10,
                  }}
                >
                  Beta App
                </Text>
              </View>
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          name="TopTabNavigation_Tournament"
          component={TopTabNavigation_Tournament}
          initialParams={{ PageName: "Tournament" }}
          options={{
            title: "Tournamanet",
            drawerIcon: () => (
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/tournament/tournament.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          name="MainMatch"
          initialParams={{ PageName: "MyMatch" }}
          component={TopTabNavigation_Tournament}
          options={{
            title: "My Match",
            drawerIcon: () => (
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/tournament/Match_icon.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        /> */}
        <Drawer.Screen
          name="MainTeam"
          component={TopTabNavigation_Tournament}
          initialParams={{ PageName: "SubTopTabNavigation_Tournament" }}
          options={{
            title: "My Team",
            drawerIcon: () => (
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/tournament/team_icon.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
  
        <Drawer.Screen
          name="AddGroundList"
          component={AddGroundList}
          initialParams={{ PageName: "AddGroundList" }}
          options={{
            title: "Add Ground List",
            drawerIcon: () => (
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/Ground.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

const NavigationScreen = (props) => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
            <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationScreen;
