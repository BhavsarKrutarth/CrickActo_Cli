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
/*------------------------ Login -----------------------*/
import WelcomPage from "../Screen/WelcomPage";
import Login from "../Screen/Login/Login";
import OTP_Verify from "../Screen/Login/OTP_Verify";
import PinSet from "../Screen/Login/PinSet";
/*------------------------ Login -----------------------*/
// import MyProfile from "../Screen/MyProfile/Stats/MyProfile_stats_Batting";
import MainPage from "../Screen/MainPage";
import MyMatch from "../Screen/Match/MyMatch";
import MyTeam from "../Screen/MyTeams/MyTeam";
import MyTeamFollowing from "../Screen/MyTeams/MyTeamFollowing";

/*------------------------Profile -----------------------*/
import UserProfile from "../Screen/UserProfile/UserProfile";
import UserProfileEdit from "../Screen/UserProfile/UserProfileEdit";
import UserProfileCity from "../Screen/UserProfile/UserProfileDropDown/UserProfileCity";
import PayingRole from "../Screen/UserProfile/UserProfileDropDown/PayingRole";
/*------------------------Profile -----------------------*/

/*------------------------Individal Match-----------------------*/
import StartAMatch from "../Screen/Match/StartAMatch";
import Info from "../Screen/Match/Report/Info";
import Summary from "../Screen/Match/Report/Summary";
import Commentary from "../Screen/Match/Report/Commentary";
import Scorecard from "../Screen/Match/Report/Scorecard";
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
import WagonWeel from "../Screen/Match/MatchRegister/WagonWeel";
import MatchOut from "../Screen/Match/MatchRegister/MatchOut";
import MatchNextBatterTeamA from "../Screen/Match/MatchRegister/MatchNextBatterTeamA";
import MatchOut_Caught from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_Caught";
import MatchOut_FielderList from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_FielderList";
import MatchOut_SelectNextBatter from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_SelectNextBatter";
import MatchOutBehind_Caught from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOutBehind_Caught";
import MatchNextOver from "../Screen/Match/MatchRegister/MatchNextOver";
import MatchOut_RunOut from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_RunOut";
import NextInning from "../Screen/Match/MatchRegister/NextInning";
import MatchOut_Hit_Wicket from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_Hit_Wicket";
import MatchOut_Retired_Hurt from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_Retired_Hurt";
import MatchOut_Retired_Out from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_Retired_Out";
import MatchOut_Absent_Hurt from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_Absent_Hurt";
import MatchOut_Hit_TheBallTwisce from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_Hit_TheBallTwisce";
import MatchOut_ObstructingTheField from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_ObstructingTheField";
import MatchOut_Retired from "../Screen/Match/MatchRegister/MatchOut_Category/MatchOut_Retired";
import NextInning_MatchSelectStriker from "../Screen/Match/MatchRegister/NextInning_MatchSelectStriker";
import NextInning_MatchSelectNon_Striker from "../Screen/Match/MatchRegister/NextInning_MatchSelectNon_Striker";
import NextInning_MatchSelectBowler from "../Screen/Match/MatchRegister/NextInning_MatchSelectBowler";
import NextInning_MatchScoring from "../Screen/Match/MatchRegister/NextInning_MatchScoring";
import NextInning_MatchNextOver from "../Screen/Match/MatchRegister/NextInning_MatchNextOver";
import NextInning_MatchOut from "../Screen/Match/MatchRegister/NextInning_MatchOut";
import NextInning_MatchNextBatterTeamB from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchNextBatterTeamB";
import NextInning_MatchOut_Caught from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Caught";
import NextInning_MatchOut_FielderList from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_FielderList";
import NextInning_MatchOutBehind_Caught from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOutBehind_Caught";
import NextInning_MatchOut_RunOut from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_RunOut";
import NextInning_MatchOut_Hit_Wicket from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Hit_Wicket";
import NextInning_MatchOut_Retired_Hurt from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Retired_Hurt";
import NextInning_MatchOut_Retired_Out from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Retired_Out";
import NextInning_MatchOut_Absent_Hurt from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Absent_Hurt";
import NextInning_MatchOut_Hit_TheBallTwisce from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Hit_TheBallTwisce";
import NextInning_MatchOut_ObstructingTheField from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_ObstructingTheField";
import NextInning_MatchOut_Retired from "../Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Retired";

/*------------------------Individal Match-----------------------*/

/*------------------------ Tournamenr Match  -----------------------------*/
import CustomeDrawer from "./CustomeDrawer";
import Tournament from "../Screen/Tournament/Tournament";
import TournamentMatch from "../Screen/Tournament/TournamentMain_Navigation/TournamentMatch";
import CustomSidebarMenu from "./CustomSidebarMenu";
import TournamentSponsors from "../Screen/Tournament/TournamentMain_Navigation/TournamentSponsors";
import TournamentTeams from "../Screen/Tournament/TournamentMain_Navigation/TournamentTeams";
import TournamentPointsTable from "../Screen/Tournament/TournamentMain_Navigation/TournamentPointsTable";
import TournamentLeaderBoard from "../Screen/Tournament/TournamentMain_Navigation/TournamentLeaderBoard";
import TournamentAbout from "../Screen/Tournament/TournamentMain_Navigation/TournamentAbout";
import ConfrimationTournament from "../Screen/Tournament/ConfrimationTournament";
import TournamentRegistration from "../Screen/Tournament/TournamentRegistration";

/*----------------pending --------------------------*/
import TournamentRegistrationSucces from "../Screen/Tournament/TournamentRegistrationSucces";
import Tournament_AddTeams from "../Screen/Tournament/TournamentRightSide_Navigation/Tournament_AddTeams";
import Tournament_AddTeamsList from "../Screen/Tournament/TournamentRightSide_Navigation/Tournament_AddTeamsList";
import Tournament_AddNewTeams from "../Screen/Tournament/TournamentRightSide_Navigation/Tournament_AddNewTeams";
import Tournament_SchedualeMatch from "../Screen/Tournament/TournamentMain_Navigation/Tournament_SchedualeMatch";
//import Tournament_AddRound from "../Screen/Tournament/TournamentMain_Navigation/Tournament_AddRound";
import Tournament_AddGroups from "../Screen/Tournament/TournamentRightSide_Navigation/AddGroups/Tournament_AddGroups";
import Tournament_MatchManual_StartMatch from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchManual_StartMatch";
import Tournament_MatchManual_Tournament_TeamsA from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual_TeamAAdd/Tournament_MatchManual_Tournament_TeamsA";
import Tournament_Match_TeamAPlayer from "../Screen/Tournament/Tournament_Match/Tournament_Match_TeamA/Tournament_Match_TeamAPlayer";
import Tournament_Match_TeamACaptain_WicketKeeper from "../Screen/Tournament/Tournament_Match/Tournament_Match_TeamA/Tournament_Match_TeamACaptain_WicketKeeper";
import Tournament_MatchManual_Tournament_MyTeam_TeamA from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual_TeamAAdd/Tournament_MatchManual_Tournament_MyTeam_TeamA";
import Tournament_MatchManual_Tournament_AddTeamA from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual_TeamAAdd/Tournament_MatchManual_Tournament_AddTeamA";
import Tournament_MatchManual_Tournament_TeamsB from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual_TeamBAdd/Tournament_MatchManual_Tournament_TeamsB";
import Tournament_Match_TeamBPlayer from "../Screen/Tournament/Tournament_Match/Tournament_Match_TeamB/Tournament_Match_TeamBPlayer";
import Tournament_Match_TeamBCaptain_WicketKeeper from "../Screen/Tournament/Tournament_Match/Tournament_Match_TeamB/Tournament_Match_TeamBCaptain_WicketKeeper";
import Tournament_MatchManual_Tournament_MatchRegister from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchManual_Tournament_MatchRegister";
import Tournament_MatchToss from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchToss";
import Tournament_MatchInnings from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchInnings";
import Tournament_MatchSelectStriker from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchSelectStriker";
import Tournament_MatchSelectNon_Striker from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchSelectNon_Striker";
import Tournament_MatchSelectBowler from "../Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchSelectBowler";
import TournamentMatch_ScheduleAutoMach from "../Screen/Tournament/TournamentMain_Navigation/TournamentMatch/TournamentMatch_ScheduleAutoMach";
import Tournament_AddRound from "../Screen/Tournament/TournamentMain_Navigation/Tournament_AddRound";
import TournamentMatch_AutoMatch_Registration from "../Screen/Tournament/TournamentMain_Navigation/TournamentMatch/TournamentMatch_AutoMatch_Registration";
import MultiTournamentGroundNewList from "../Screen/Tournament/DropDownAdd/MultiTournamentGroundNewList";
import TournamentMatch_AutoMatch_List from "../Screen/Tournament/TournamentMain_Navigation/TournamentMatch/TournamentMatch_AutoMatch_List";
import Tournament_Rounds from "../Screen/Tournament/TournamentRightSide_Navigation/Tournament_Rounds";
import Tournament_Groups from "../Screen/Tournament/TournamentRightSide_Navigation/Tournament_Groups";
import PlayerPageMain from "../Screen/MyTeams/Player/PlayerPageMain";
import PlayerAdd from "../Screen/MyTeams/Player/PlayerAdd";
import Setting from "../Screen/UserProfile/Setting";
import Matches from "../Screen/MyProfile/Matches";
import Stats from "../Screen/MyProfile/Stats";
/*------------------------ Tournamenr Match  -----------------------------*/



const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const RightDrawer = createDrawerNavigator();

function MyProfile({ route }) {
  return (
    <Tab.Navigator
      initialRouteName={
        route.params === undefined ? "MyProfile" : route.params.PageName
      }
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Color.NavigationColor,
          height: 5,
        },
        tabBarActiveTintColor: Color.WhiteBGColor,
        tabBarInactiveTintColor: Color.WhiteBGColor,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Color.NavigationColor,
          borderTopColor: Color.WhiteBGColor,
          borderTopWidth: 3,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: Color.NavigationBorderColor,
          borderBottomWidth: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name="Matches"
        component={Matches}
        options={{
          title: "Matches",
        }}
      />
       <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          title: "Stats",
        }}
      />
     <Tab.Screen
        name="MyTeam"
        component={MyTeam}
        options={{
          title: "Teams",
        }}
      />
      
    </Tab.Navigator>
  );
}


function Tournament_MatchManual_TeamB({ route }) {
  var Roundid_ = "";
  var TeamAid_ = "";
  var TeamAName_ = "";
  var RedirectPage_ = "";
  var Tournament_Matchid_ = "";
  Roundid_ = route.params.Roundid;
  TeamAid_ = route.params.TeamAid;
  TeamAName_ = route.params.TeamAName;
  Tournament_Matchid_ = route.params.Tournament_Matchid;
  RedirectPage_ = route.params.RedirectPage;

  return (
    <Tab.Navigator
      initialRouteName={
        route.params === undefined
          ? "Tournament_MatchManual_Tournament_TeamsB"
          : route.params.PageName
      }
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Color.NavigationColor,
          height: 5,
        },
        tabBarActiveTintColor: Color.WhiteBGColor,
        tabBarInactiveTintColor: Color.WhiteBGColor,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Color.NavigationColor,
          borderTopColor: Color.WhiteBGColor,
          borderTopWidth: 3,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: Color.NavigationBorderColor,
          borderBottomWidth: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name="Tournament_MatchManual_Tournament_TeamsB"
        component={Tournament_MatchManual_Tournament_TeamsB}
        options={{
          title: "Tournament Teams",
        }}
        initialParams={{
          Roundid: Roundid_,
          RedirectPage: RedirectPage_,
          TeamAid: TeamAid_,
          TeamAName: TeamAName_,
          Tournament_Matchid: Tournament_Matchid_,
        }}
      />
      {/* <Tab.Screen
        name="Tournament_MatchManual_Tournament_MyTeam_TeamB"
        component={Tournament_MatchManual_Tournament_MyTeam_TeamB}
        options={{
          title: "My Teams",
        }}
        initialParams={{
          Roundid: Roundid_,
          RedirectPage: RedirectPage_,
          TeamAid: TeamAid_,
          TeamAName: TeamAName_,
          Tournament_Matchid: Tournament_Matchid_,
        }}
        style={{ overflow: "visible", whiteSpace: "nowrap" }}
      />
      <Tab.Screen
        name="Tournament_MatchManual_Tournament_AddTeamB"
        component={Tournament_MatchManual_Tournament_AddTeamB}
        options={{
          title: "Add",
        }}
        initialParams={{
          Roundid: Roundid_,
          RedirectPage: RedirectPage_,
          TeamAid: TeamAid_,
          TeamAName: TeamAName_,
          Tournament_Matchid: Tournament_Matchid_,
        }}
      /> */}
    </Tab.Navigator>
  );
}


function Tournament_MatchManual_TeamA({ route }) {
  var Roundid_ = "";
  var RedirectPage_ = "";
  Roundid_ = route.params.Roundid;
  RedirectPage_ = route.params.RedirectPage;

  return (
    <Tab.Navigator
      initialRouteName={
        route.params === undefined
          ? "Tournament_MatchManual_Tournament_TeamsA"
          : route.params.PageName
      }
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Color.NavigationColor,
          height: 5,
        },
        tabBarActiveTintColor: Color.WhiteBGColor,
        tabBarInactiveTintColor: Color.WhiteBGColor,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Color.NavigationColor,
          borderTopColor: Color.WhiteBGColor,
          borderTopWidth: 3,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: Color.NavigationBorderColor,
          borderBottomWidth: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name="Tournament_MatchManual_Tournament_TeamsA"
        component={Tournament_MatchManual_Tournament_TeamsA}
        options={{
          title: "Tournament Teams",
        }}
        initialParams={{ Roundid: Roundid_, RedirectPage: RedirectPage_ }}
        style={{ overflow: "visible", whiteSpace: "nowrap" }}
      />
      <Tab.Screen
        name="Tournament_MatchManual_Tournament_MyTeam_TeamA"
        component={Tournament_MatchManual_Tournament_MyTeam_TeamA}
        options={{
          title: "My Teams",
        }}
        initialParams={{ Roundid: Roundid_, RedirectPage: RedirectPage_ }}
      />
      <Tab.Screen
        name="Tournament_MatchManual_Tournament_AddTeamA"
        component={Tournament_MatchManual_Tournament_AddTeamA}
        options={{
          title: "Add",
        }}
        initialParams={{ Roundid: Roundid_, RedirectPage: RedirectPage_ }}
      />
    </Tab.Navigator>
  );
}

function TopTournamenentMain_Tournament({ route }) {
  return (
    <Tab.Navigator
      initialRouteName={
        route.params === undefined ? "TournamentMatch" : route.params.PageName
      }
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Color.NavigationColor,
          height: 5,
        },
        tabBarActiveTintColor: Color.WhiteBGColor,
        tabBarInactiveTintColor: Color.WhiteBGColor,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Color.NavigationColor,
          borderTopColor: Color.WhiteBGColor,
          borderTopWidth: 3,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: Color.NavigationBorderColor,
          borderBottomWidth: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name="TournamentMatch"
        component={TournamentMatch}
        options={{
          title: "Match",
        }}
      />
      <Tab.Screen
        name="TournamentSponsors"
        component={TournamentSponsors}
        options={{
          title: "Sponsors",
        }}
      />
      <Tab.Screen
        name="TournamentTeams"
        component={TournamentTeams}
        options={{
          title: "Teams",
        }}
      />
      <Tab.Screen
        name="TournamentPointsTable"
        component={TournamentPointsTable}
        options={{
          title: "Points Table",
        }}
      />
      <Tab.Screen
        name="TournamentLeaderBoard"
        component={TournamentLeaderBoard}
        options={{
          title: "LeaderBoard",
        }}
      />
      <Tab.Screen
        name="TournamentAbout"
        component={TournamentAbout}
        options={{
          title: "About",
        }}
      />
    </Tab.Navigator>
  );
}

const RightDrawerNavigator_TournamenentMain = ({ route }) => {
  return (
    <RightDrawer.Navigator
      //defaultStatus="closed"
      defaultStatus={
        route.params === undefined
          ? "closed"
          : route.params.PageName === "RightDrawerNavigator_TournamenentMain"
            ? "open"
            : "closed"
      }
      screenOptions={{ drawerPosition: "right", headerShown: false }}
      // drawerContentOptions={{
      //   activeTintColor: '#e91e63',
      //   itemStyle: { marginVertical: 5 },
      // }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <RightDrawer.Screen
        name="TopTournamenentMain_Tournament"
        component={TopTournamenentMain_Tournament}
        initialParams={{
          PageName:
            route.params === undefined
              ? "TournamentMatch"
              : route.params.PageName ===
                "RightDrawerNavigator_TournamenentMain"
                ? "TournamentTeams"
                : "TournamentMatch",
        }}
        options={{
          title: "Tournament",
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}
      />
      {/* <RightDrawer.Screen
        name="Tournament_Rounds"
        component={Tournament_Rounds}
        options={{
          title: "Rounds",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Groups"
        component={Tournament_Groups}
        options={{
          title: "Groups",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Start_a_Match"
        component={Tournament_Start_a_Match}
        options={{
          title: "Start A Match",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Schedule_Match"
        component={Tournament_Schedule_Match}
        options={{
          title: "Schedule Match",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Delete_Schedule"
        component={Tournament_Delete_Schedule}
        options={{
          title: "Delete Schedule",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Add_Remove"
        component={Tournament_Add_Remove}
        options={{
          title: "Add / Remove Scores",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Officials"
        component={Tournament_Officials}
        options={{
          title: "Officials",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Setting"
        component={Tournament_Setting}
        options={{
          title: "Setting",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Premium_Features"
        component={Tournament_Premium_Features}
        options={{
          title: "Premium/Features",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Find_Umpires"
        component={Tournament_Find_Umpires}
        options={{
          title: "Find/Umpires",
        }}
      />
      <RightDrawer.Screen
        name="Tournament_Edit_Delete"
        component={Tournament_Edit_Delete}
        options={{
          title: "Edit/Delete",
        }}
      /> */}
    </RightDrawer.Navigator>
  );
};


function Report_IndividualMatch({ route }) {
  var MatchId_ = "";
  MatchId_ = route.params.Matchid;

  return (
    <Tab.Navigator
      initialRouteName={
        route.params === undefined ? "Info" : route.params.PageName
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
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        initialParams={{ MatchId: MatchId_ }}
      />
      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{
          title: "Summary",
        }}
        initialParams={{ MatchId: MatchId_ }}
      />
      <Tab.Screen
        name="Commentary"
        component={Commentary}
        options={{
          title: "Commentary",
        }}
        initialParams={{ MatchId: MatchId_ }}
      />
      <Tab.Screen
        name="Scorecard"
        component={Scorecard}
        options={{
          title: "Scorecard",
        }}
        initialParams={{ MatchId: MatchId_ }}
      />
    </Tab.Navigator>
  );
}

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
      {/* <BottomTab.Screen
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

      {/* <Drawer.Screen
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
      /> */}
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
          <Stack.Screen name="WelcomPage" component={WelcomPage} options={{ headerShown: false, }} />
          <Stack.Screen name="Login" component={Login} options={{
            title: "Login",
          }} />
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

          <Stack.Screen
            name="WagonWeel"
            component={WagonWeel}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Wagon Weel"
                  : route.params.PageName != "Wagon Weel"
                    ? route.params.PageName
                    : "Wagon Weel",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut"
            component={MatchOut}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Out How?"
                  : route.params.PageName != "Out How?"
                    ? route.params.PageName
                    : "Out How?",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchNextBatterTeamA"
            component={MatchNextBatterTeamA}
            options={({ route }) => ({
              title: "Select Next Batter",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_Caught"
            component={MatchOut_Caught}
            options={({ route }) => ({
              title: "Caught",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_FielderList"
            component={MatchOut_FielderList}
            options={({ route }) => ({
              title: "Fielder List",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_SelectNextBatter"
            component={MatchOut_SelectNextBatter}
            options={({ route }) => ({
              title: "Select Next Batter",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOutBehind_Caught"
            component={MatchOutBehind_Caught}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Catch Behind"
                  : route.params.PageName != "Catch Behind"
                    ? route.params.PageName
                    : "Catch Behind",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchNextOver"
            component={MatchNextOver}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Next Over"
                  : route.params.PageName != "Next Over"
                    ? route.params.PageName
                    : "Next Over",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_RunOut"
            component={MatchOut_RunOut}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Run Out"
                  : route.params.PageName != "Run Out"
                    ? route.params.PageName
                    : "Run Out",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning"
            component={NextInning}
            options={({ route }) => ({
              title: "Next Inning",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_Hit_Wicket"
            component={MatchOut_Hit_Wicket}
            options={({ route }) => ({
              title: "Hit Wicket",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_Retired_Hurt"
            component={MatchOut_Retired_Hurt}
            options={({ route }) => ({
              title: "Retired Hurt",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_Retired_Out"
            component={MatchOut_Retired_Out}
            options={({ route }) => ({
              title: "Retired Out",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />
          <Stack.Screen
            name="MatchOut_Absent_Hurt"
            component={MatchOut_Absent_Hurt}
            options={({ route }) => ({
              title: "Absent Hurt",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_Hit_TheBallTwisce"
            component={MatchOut_Hit_TheBallTwisce}
            options={({ route }) => ({
              title: "Hit TheBallTwisce",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MatchOut_ObstructingTheField"
            component={MatchOut_ObstructingTheField}
            options={({ route }) => ({
              title: "Obstructing the field",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />
          <Stack.Screen
            name="MatchOut_Retired"
            component={MatchOut_Retired}
            options={({ route }) => ({
              title: "Retired",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchSelectStriker"
            component={NextInning_MatchSelectStriker}
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
            name="NextInning_MatchSelectNon_Striker"
            component={NextInning_MatchSelectNon_Striker}
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
            name="NextInning_MatchSelectBowler"
            component={NextInning_MatchSelectBowler}
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
            name="NextInning_MatchScoring"
            component={NextInning_MatchScoring}
            options={({ route }) => ({
              title: "Scoring Board",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchNextOver"
            component={NextInning_MatchNextOver}
            options={({ route }) => ({
              title: "Next Over",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut"
            component={NextInning_MatchOut}
            options={({ route }) => ({
              title: "Match Out",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchNextBatterTeamB"
            component={NextInning_MatchNextBatterTeamB}
            options={({ route }) => ({
              title: "Select Next Batter Team B",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_Caught"
            component={NextInning_MatchOut_Caught}
            options={({ route }) => ({
              title: "Caught",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_FielderList"
            component={NextInning_MatchOut_FielderList}
            options={({ route }) => ({
              title: "Fielder List",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOutBehind_Caught"
            component={NextInning_MatchOutBehind_Caught}
            options={({ route }) => ({
              title: "Catch Behind",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_RunOut"
            component={NextInning_MatchOut_RunOut}
            options={({ route }) => ({
              title: "Run Out",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_Hit_Wicket"
            component={NextInning_MatchOut_Hit_Wicket}
            options={({ route }) => ({
              title: "Hit Wicket",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_Retired_Hurt"
            component={NextInning_MatchOut_Retired_Hurt}
            options={({ route }) => ({
              title: "Retired Hurt",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_Retired_Out"
            component={NextInning_MatchOut_Retired_Out}
            options={({ route }) => ({
              title: "Retired Out",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_Absent_Hurt"
            component={NextInning_MatchOut_Absent_Hurt}
            options={({ route }) => ({
              title: "Absent Hurt",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_Hit_TheBallTwisce"
            component={NextInning_MatchOut_Hit_TheBallTwisce}
            options={({ route }) => ({
              title: "Hit TheBallTwisce",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_ObstructingTheField"
            component={NextInning_MatchOut_ObstructingTheField}
            options={({ route }) => ({
              title: "ObstructingTheField",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="NextInning_MatchOut_Retired"
            component={NextInning_MatchOut_Retired}
            options={({ route }) => ({
              title: "Retired",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
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
          />

          <Stack.Screen
            name="TournamenentMain"
            component={RightDrawerNavigator_TournamenentMain}
            options={({ route }) => ({
              headerShown: true,
              title:
                route.params === undefined
                  ? "Tournament"
                  : route.params.TournamentName != ""
                    ? route.params.TournamentName
                    : "Tournament",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />


          <Stack.Screen
            name="ConfrimationTournament"
            component={ConfrimationTournament}
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
            name="TournamentRegistration"
            component={TournamentRegistration}
            options={{
              title: "Add A Tournament / Series",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />

          <Stack.Screen
            name="TournamentRegistrationSucces"
            component={TournamentRegistrationSucces}
            options={{
              title: "",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
              headerBackVisible: false,
            }}
          />

          <Stack.Screen
            name="Tournament_AddTeams"
            component={Tournament_AddTeams}
            options={{
              title: "Add Teams",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />

          <Stack.Screen
            name="Tournament_AddTeamsList"
            component={Tournament_AddTeamsList}
            options={{
              title: "My Teams",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />

          <Stack.Screen
            name="Tournament_AddNewTeams"
            component={Tournament_AddNewTeams}
            options={{
              title: "Add one or more teams",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />

          <Stack.Screen
            name="Tournament_SchedualeMatch"
            component={Tournament_SchedualeMatch}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Schedule Match"
                  : route.params.PageName != "Schedule Match"
                    ? route.params.PageName
                    : "Schedule Match",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_AddGroups"
            component={Tournament_AddGroups}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Add Groups"
                  : route.params.PageName != "Add Groups"
                    ? route.params.PageName
                    : "Add Groups",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_MatchManual_StartMatch"
            component={Tournament_MatchManual_StartMatch}
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
            name="Tournament_MatchManual_TeamA"
            component={Tournament_MatchManual_TeamA}
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
            name="Tournament_Match_TeamAPlayer"
            component={Tournament_Match_TeamAPlayer}
            options={({ route }) => ({
              title: "Select Team A Player",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_Match_TeamACaptain_WicketKeeper"
            component={Tournament_Match_TeamACaptain_WicketKeeper}
            options={({ route }) => ({
              title: "Select Team A Player",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />





          <Stack.Screen
            name="Tournament_MatchManual_TeamB"
            component={Tournament_MatchManual_TeamB}
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
            name="Tournament_Match_TeamBPlayer"
            component={Tournament_Match_TeamBPlayer}
            options={({ route }) => ({
              title: "Select Player",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_Match_TeamBCaptain_WicketKeeper"
            component={Tournament_Match_TeamBCaptain_WicketKeeper}
            options={({ route }) => ({
              title: "Select WicketKeeper and Captain",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_MatchManual_Tournament_MatchRegister"
            component={Tournament_MatchManual_Tournament_MatchRegister}
            options={({ route }) => ({
              title: "Select Player",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_MatchToss"
            component={Tournament_MatchToss}
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
            name="Tournament_MatchInnings"
            component={Tournament_MatchInnings}
            options={({ route }) => ({
              title: "Match Innings",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="Tournament_MatchSelectStriker"
            component={Tournament_MatchSelectStriker}
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
            name="Tournament_MatchSelectNon_Striker"
            component={Tournament_MatchSelectNon_Striker}
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
            name="Tournament_MatchSelectBowler"
            component={Tournament_MatchSelectBowler}
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
            name="TournamentMatch_ScheduleAutoMach"
            component={TournamentMatch_ScheduleAutoMach}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Schedule Match - Auto"
                  : route.params.PageName != "Schedule Match - Auto"
                    ? route.params.PageName
                    : "Schedule Match - Auto",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />


          <Stack.Screen
            name="Tournament_AddRound"
            component={Tournament_AddRound}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Round Set"
                  : route.params.PageName != "Round Set"
                    ? route.params.PageName
                    : "Round Set",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="TournamentMatch_AutoMatch_Registration"
            component={TournamentMatch_AutoMatch_Registration}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Auto Schedule"
                  : route.params.PageName != "Auto Schedule"
                    ? route.params.PageName
                    : "Auto Schedule",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />

          <Stack.Screen
            name="MultiTournamentGroundNewList"
            component={MultiTournamentGroundNewList}
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
            name="TournamentMatch_AutoMatch_List"
            component={TournamentMatch_AutoMatch_List}
            options={({ route }) => ({
              title: "Ground",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />
          <Stack.Screen
            name="Tournament_Rounds"
            component={Tournament_Rounds}
            options={{
              title: "Round",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="Tournament_Groups"
            component={Tournament_Groups}
            options={{
              title: "Groups",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            }}
          />

          <Stack.Screen
            name="PlayerPageMain"
            component={PlayerPageMain}
            options={({ route }) => ({
              title:
                route.params === undefined
                  ? "Player Add"
                  : route.params.MyTeam != ""
                    ? route.params.MyTeam
                    : "Player Add",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
          />
          <Stack.Screen
            name="PlayerAdd"
            component={PlayerAdd}
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
            name="Setting"
            component={Setting}
            options={({ route }) => ({
              title: "Setting",
              headerTitleAlign: "left",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: Color.PrimaryColor,
                color: "white",
              },
            })}
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
