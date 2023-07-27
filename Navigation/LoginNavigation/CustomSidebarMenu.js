// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";

import TournamentTeams from "../Screen/Tournament/TournamentMain_Navigation/TournamentTeams";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import Color from "../../Color/Color";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";
  const navigation = useNavigation();

  // console.log(global.TournamentAdmin)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Add Teams"
          onPress={() =>
            navigation.navigate("Tournament_AddTeams", {
              Team_RedirectPage: "TournamentTeams",
            })
          }
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Rounds(League Matches,Final,etc.)"
          onPress={() => navigation.navigate("Tournament_Rounds")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Groups"
          onPress={() => navigation.navigate("Tournament_Groups")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
         <DrawerItem
          label="Start A Match"
          onPress={() => navigation.navigate("Tournament_SchedualeMatch")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />

        {/*<DrawerItem
          label="Schedule Match"
          onPress={() => navigation.navigate("Tournament_Schedule_Match")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Delete Schedule"
          onPress={() => navigation.navigate("Tournament_Delete_Schedule")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Add / Remove Scores"
          onPress={() => navigation.navigate("Tournament_Add_Remove")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Officials"
          onPress={() => navigation.navigate("Tournament_Officials")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Setting"
          onPress={() => navigation.navigate("Tournament_Setting")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Premium/Features"
          onPress={() => navigation.navigate("Tournament_Premium_Features")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        />
        <DrawerItem
          label="Find/Umpires"
          onPress={() => navigation.navigate("Tournament_Find_Umpires")}
          style={{
            borderBottomColor: Color.backgroundColor,
            borderBottomWidth: 2,
          }}
        /> */}

        {/* {global.TournamentAdmin == 1 ? (
          <DrawerItem
            label="Edit/Delete"
            onPress={() => navigation.navigate("Tournament_Edit_Delete")}
            style={{
              borderBottomColor: Color.backgroundColor,
              borderBottomWidth: 2,
            }}
          />
        ) : null} */}

        {/* <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
          <Image
            source={{ uri: BASE_PATH + 'star_filled.png' }}
            style={styles.iconStyle}
          />
        </View> */}
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "grey",
          marginBottom: 10,
        }}
      >
        <Text
          onPress={() => {
            Linking.openURL("https://Actoscript.com/");
          }}
        >
          Actoscript.Com
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
