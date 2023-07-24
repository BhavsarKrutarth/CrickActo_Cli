import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Color from "../../Color/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

let MobileNo = "";
const storeData = async () => {
  try {
    //MobileNo = (await AsyncStorage.getItem('@MobileNo'));
    MobileNo = global.MobileNo;
  } catch (e) {
    // saving error
  }
};
const CustomeDrawer = (props) => {
  const navigation = useNavigation();
  storeData();
  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ backgroundColor: Color.PrimaryColor }}
        >
          <View
            style={{ padding: 20, backgroundColor: Color.PrimaryColor }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserProfile", {
                  MobileNo,
                })
              }
            >
              <Image
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  marginBottom: 5,
                }}
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Cricket_logo_3.png`,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>{MobileNo}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Setting", {
                    MobileNo,
                  })
                }
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/setting.png`,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Version 0.0.1</Text>
      </View>
    </>
  );
};

export default CustomeDrawer;
