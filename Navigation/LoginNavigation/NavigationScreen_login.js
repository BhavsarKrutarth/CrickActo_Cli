import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
      {/* <Tab.Screen
        name="MyTeamOpponents"
        component={MyTeamOpponents}
        options={{
          title: "Opponents",
        }}
      />*/}
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
const BottomtabStack = () => {
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
    </BottomTab.Navigator>
  );
};

const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BottomTabStack" component={BottomtabStack} />
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
        component={HomeScreenStack}
        options={{
          // drawerItemStyle: { height: 0 }
          title: "",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: "row" }}>
              
              <Tooltip
                  isVisible={MainBannerImage}
                  content={
                    <View>
                      <Text> This is secound Display..! </Text>
                    </View>
                  }
                  onClose={() => {
                    setMainBannerImage(false)}
                  }
                  placement="bottom"
                  // below is for the status bar of react navigation bar
                  // topAdjustment={
                  //   Platform.OS === "android" ? -StatusBar.currentHeight : 0
                  // }
                >
                 <Image
                      source={{
                        uri:
                          "" +
                          global.domainName +
                          "/CricbuddyAdmin/Content/assets/UserProfile/UserProfile.png",
                      }}
                      style={{ width: 30, height: 30 }}
                    />
                </Tooltip>


                <Tooltip
                  isVisible={MainBannerTitle}
                  content={
                    <View>
                      <Text> This Is Version Display..! </Text>
                    </View>
                  }
                  onClose={() => {
                    setMainBannerTitle(false);
                    setMainBannerImage(true);
                  }
                  }
                  placement="bottom"
                  // below is for the status bar of react navigation bar
                  // topAdjustment={
                  //   Platform.OS === "android" ? -StatusBar.currentHeight : 0
                  // }
                >
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
                </Tooltip>
              
            </View>
          ),
        }}
      />
      {/* <Drawer.Screen
        name="MainPage"
        component={MainPage}
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="TopTabNavigation_Tournament"
        component={TopTabNavigation_Tournament}
        initialParams={{ PageName: "Tournament" }}
        options={{
          title: "Tournamanet",
          // headerTitle: () => (
          //   <Image
          //     source={{
          //       uri: ""+global.domainName+"/CricbuddyAdmin/Content/assets/tournament/Cricheroes_logo.png",
          //     }}
          //     style={{ width: 170, height: 30}}
          //   />
          // ),
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
      />
      <Drawer.Screen
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
      />
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
                  "/CricbuddyAdmin/Content/assets/tournament/team_icon.png",
              }}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
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
          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              
            }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationScreen_login;
