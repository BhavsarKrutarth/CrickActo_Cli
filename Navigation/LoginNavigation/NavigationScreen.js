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
import UserProfile from "../Screen/UserProfile/UserProfile";
import UserProfileEdit from "../Screen/UserProfile/UserProfileEdit";
import UserProfileCity from "../Screen/UserProfile/UserProfileDropDown/UserProfileCity";
import PayingRole from "../Screen/UserProfile/UserProfileDropDown/PayingRole";
import StartAMatch from "../Screen/Match/StartAMatch";
// import Info from "../Screen/Match/Report/Info";
// import Summary from "../Screen/Match/Report/Summary";
// import Commentary from "../Screen/Match/Report/Commentary";
// import Scorecard from "../Screen/Match/Report/Scorecard";

import AddANewTournamentAndSeries from "../Screen/Tournament/AddANewTournamentAndSeries";
import CreateMyTeam from "../Screen/MyTeams/CreateMyTeam";
import SocketioClient from "../Screen/Z_Testing_Page/SocketioClient";
import Tournament_EditNewTeams from "../Screen/Tournament/TournamentRightSide_Navigation/Tournament_EditNewTeams";
import TeamSelect from "../Screen/Match/TeamSelect";
import TeamA from "../Screen/Match/TeamAdd/TeamA/TeamA";
import TeamASelectPlayer from "../Screen/Match/TeamAdd/TeamA/TeamASelectPlayer";
import PlayerAddViaPhoneNo from "../Screen/MyTeams/Player/PlayerAdd/PlayerAddViaPhoneNo";
import TeamACaptain_WicketKeeper from "../Screen/Match/TeamAdd/TeamA/TeamACaptain_WicketKeeper";
import TeamB from "../Screen/Match/TeamAdd/TeamB/TeamB";
import TeamBSelectPlayer from "../Screen/Match/TeamAdd/TeamB/TeamBSelectPlayer";
import TeamBCaptain_WicketKeeper from "../Screen/Match/TeamAdd/TeamB/TeamBCaptain_WicketKeeper";
import MatchRegister from "../Screen/Match/MatchRegister/MatchRegister";
import TournamentGroundNewList from "../Screen/Tournament/TournamentGroundNewList";
import MatchToss from "../Screen/Match/MatchRegister/MatchToss";
import MatchInnings from "../Screen/Match/MatchRegister/MatchInnings";
import MatchSelectStriker from "../Screen/Match/MatchRegister/MatchSelectStriker";
import MatchSelectNon_Striker from "../Screen/Match/MatchRegister/MatchSelectNon_Striker";
import MatchSelectBowler from "../Screen/Match/MatchRegister/MatchSelectBowler";
import MatchScoring from "../Screen/Match/MatchRegister/MatchScoring";

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
      <BottomTab.Screen
        name="Teging Page"
        component={SocketioClient}
        options={{
          title: "Testing",
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
      {/* <Tab.Screen
        name="MyTeamFollowing"
        component={MyTeamFollowing}
        options={{
          title: "Following",
        }}
      /> */}
    </Tab.Navigator>
  );
}
const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}>
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
          drawerLabel: '',
          title: '',
          drawerIcon: () => (
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/home.png",
              }}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
        component={HomeScreenStack}
      />
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

// function Report_IndividualMatch({ route }) {
//   var MatchId_ = "";
//   MatchId_ = route.params.Matchid;

//   return (
//     <Tab.Navigator
//       initialRouteName={
//         route.params === undefined ? "Info" : route.params.PageName
//       }
//       screenOptions={{
//         tabBarActiveTintColor: Color.WhiteBGColor,
//         tabBarInactiveTintColor: Color.WhiteBGColor,
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           backgroundColor: Color.PrimaryColor,
//         },
//         tabBarIndicatorStyle: {
//           borderBottomColor: Color.WhiteBGColor,
//           borderBottomWidth: 5,
//         },
//         tabBarLabelStyle: {
//           fontSize: 10,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Info"
//         component={Info}
//         initialParams={{ MatchId: MatchId_ }}
//       />
//       <Tab.Screen
//         name="Summary"
//         component={Summary}
//         options={{
//           title: "Summary",
//         }}
//         initialParams={{ MatchId: MatchId_ }}
//       />
//       <Tab.Screen
//         name="Commentary"
//         component={Commentary}
//         options={{
//           title: "Commentary",
//         }}
//         initialParams={{ MatchId: MatchId_ }}
//       />
//       <Tab.Screen
//         name="Scorecard"
//         component={Scorecard}
//         options={{
//           title: "Scorecard",
//         }}
//         initialParams={{ MatchId: MatchId_ }}
//       />
//     </Tab.Navigator>
//   );
// }

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
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{

            }}
          />
          <Stack.Screen
            name="UserProfileEdit"
            component={UserProfileEdit}
            options={{
              title: "User Profile",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="UserProfileCity"
            component={UserProfileCity}
            options={{
              title: "Select City",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="PayingRole"
            component={PayingRole}
            options={{
              title: "Select Paying Role",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="StartAMatch"
            component={StartAMatch}
            options={({ route }) => ({
              title: "Start A Match",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          {/* <Stack.Screen
            name="Report_IndividualMatch"
            component={Report_IndividualMatch}
            options={{
              title: "Report",
              drawerItemStyle: { display: "none" },
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

          <Stack.Screen
            name="AddANewTournamentAndSeries"
            component={AddANewTournamentAndSeries}
            options={{
              title: "Add A New Tournament / Series",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />

          <Stack.Screen
            name="CreateMyTeam"
            component={CreateMyTeam}
            options={({ route }) => ({
              title: "Create My New Team",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_EditNewTeams"
            component={Tournament_EditNewTeams}
            options={{
              title: "Edit Team",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />

          <Stack.Screen
            name="TeamSelect"
            component={TeamSelect}
            options={({ route }) => ({
              title: "Start A Match",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TeamA"
            component={TeamA}
            options={({ route }) => ({
              title: "Select Team A",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TeamASelectPlayer"
            component={TeamASelectPlayer}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Team A"
                  : route.params.PageName != ""
                    ? route.params.PageName + " - Squad"
                    : "Team A",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />


          <Stack.Screen
            name="PlayerAddViaPhoneNo"
            component={PlayerAddViaPhoneNo}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Add Player"
                  : route.params.MyTeam != ""
                    ? "Add Player to " + route.params.MyTeam
                    : "Add Player",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TeamACaptain_WicketKeeper"
            component={TeamACaptain_WicketKeeper}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Team A"
                  : route.params.PageName != ""
                    ? "Team A " + route.params.PageName
                    : "Team A",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TeamB"
            component={TeamB}
            options={({ route }) => ({
              title: "Select Team B",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TeamBSelectPlayer"
            component={TeamBSelectPlayer}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Team B"
                  : route.params.PageName != ""
                    ? route.params.PageName + " - Squad"
                    : "Team B",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TeamBCaptain_WicketKeeper"
            component={TeamBCaptain_WicketKeeper}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Team B"
                  : route.params.PageName != ""
                    ? "Team B " + route.params.PageName
                    : "Team B",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchRegister"
            component={MatchRegister}
            options={({ route }) => ({
              title: "Start A Match",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TournamentGroundNewList"
            component={TournamentGroundNewList}
            options={({ route }) => ({
              title: "Ground List",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchToss"
            component={MatchToss}
            options={({ route }) => ({
              title: "Toss",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchInnings"
            component={MatchInnings}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Start Inning"
                  : route.params.PageName != "Start Inning"
                    ? route.params.PageName
                    : "Start Inning",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchSelectStriker"
            component={MatchSelectStriker}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Select Striker"
                  : route.params.PageName != "Select Striker"
                    ? route.params.PageName
                    : "Select Striker",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />


          <Stack.Screen
            name="MatchSelectNon_Striker"
            component={MatchSelectNon_Striker}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Select Non-Striker"
                  : route.params.PageName != "Select Non-Striker"
                    ? route.params.PageName
                    : "Select Non-Striker",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchSelectBowler"
            component={MatchSelectBowler}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Select Bowler"
                  : route.params.PageName != "Select Bowler"
                    ? route.params.PageName
                    : "Select Bowler",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchScoring"
            component={MatchScoring}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Match Scoring"
                  : route.params.PageName != "Match Scoring"
                    ? route.params.PageName
                    : "Match Scoring",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationScreen;
