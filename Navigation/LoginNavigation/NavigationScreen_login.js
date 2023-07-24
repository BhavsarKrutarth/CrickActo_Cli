import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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


import MyProfile from "../Screen/MyProfile/Stats/MyProfile_stats_Batting";
import MainPage from "../Screen/MainPage";
import MyMatch from "../Screen/Match/MyMatch";
import Tournament from "../Screen/Tournament/Tournament";
import MyTeam from "../Screen/MyTeams/MyTeam";
import MyTeamFollowing from "../Screen/MyTeams/MyTeamFollowing";
import CustomeDrawer from "./CustomeDrawer";



const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator(); 
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          title: "POST",
          headerShown: false,
          headerTransparent: false,
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="megaphone-outline" color={color} size={size} />

            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/annulment.png",
              }}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TopTabNavigation_Tournament"
        component={TopTabNavigation_Tournament}
        options={{
          title: "MY CRICKET",
          headerShown: false,
          headerTransparent: false,
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="list" color={color} size={size} />
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  `/CricbuddyAdmin/Content/assets/tournament/tournament.png`,
              }}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      {/* ChatTest */}
      {/* <BottomTab.Screen
        name="TournamentGroundNewList"
        component={TournamentGroundNewList}
        options={{
          title: "Test Page",
          headerShown: false,
          headerTransparent: false,
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="list" color={color} size={size} />
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  `/CricbuddyAdmin/Content/assets/tournament/tournament.png`,
              }}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
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
function SubTopTabNavigation_Tournament() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MyTeam"
        component={MyTeam}
        options={{
          title: "Team",
        }}
      />
      <Tab.Screen
        name="MyTeamFollowing"
        component={MyTeamFollowing}
        options={{
          title: "Following",
        }}
      />
    </Tab.Navigator>
  );
}
const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
    </Stack.Navigator>
  );
};
function DrawerNavigator() {
  // storeData();
  const [MainBannerTitle, setMainBannerTitle] = useState(true);
  const [MainBannerImage, setMainBannerImage] = useState(false);

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
      
      <Drawer.Screen
          name="HomeScreenStack"
          options={{
            drawerLabel: 'Home Screen Option',
            title: '',
          }}
          component={HomeScreenStack}
        />
        <Drawer.Screen name="MainPage" component={MainPage} />
    </Drawer.Navigator>
  );
}

const MyTheme = {
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
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              
            }}
          /> */}
          {/* <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{
              
            }}
          /> */}


        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationScreen_login;
