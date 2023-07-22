import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Color from "../../../Color/Color";

const TeamSelect = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Matchid, setMatchid] = useState(null);
  const [MyTeamAId, setMyTeamAId] = useState(null);
  const [MyTeamA, setMyTeamA] = useState(null);
  const [MyTeamASubName, setMyTeamASubName] = useState(null);
  const [TeamAPlayerCount, setTeamAPlayerCount] = useState(0);

  React.useEffect(() => {
    console.log("Navigation/Screen/Match/TeamSelect.js");
    
    if (route.params?.TeamAPlayerCount)
      setTeamAPlayerCount(route.params?.TeamAPlayerCount);

    if (route.params?.TeamAName) {
      var ConvertUpper = "";
      ConvertUpper = route.params?.TeamAName.toUpperCase();
      setMyTeamASubName(ConvertUpper.substring(0, 2));
      setMyTeamA(route.params?.TeamAName);
    }

    if (route.params?.TeamAid) {
      setMyTeamAId(route.params?.TeamAid);
    }

    if (route.params?.MyTeamA) {
      var ConvertUpper = "";
      ConvertUpper = route.params?.MyTeamA.toUpperCase();
      setMyTeamASubName(ConvertUpper.substring(0, 2));
      setMyTeamA(route.params?.MyTeamA);
    }
    if (route.params?.MyTeamAId) {
      setMyTeamAId(route.params?.MyTeamAId);
    }
    if (route.params?.Matchid) {
      setMatchid(route.params?.Matchid);
      //Player_GET(route.params?.Matchid);
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", height: "100%" }}>
        <View style={{ height: "10%", width: "100%" }}></View>
        {MyTeamAId ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={[styles.img, { backgroundColor: Color.PrimaryColor }]}>
              <Text style={styles.imgtitle}>{MyTeamASubName}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Pressable
                onPress={() => {
                  navigation.navigate("TeamASelectPlayer", {
                    Matchid,
                    TeamAid: MyTeamAId,
                    TeamAName: MyTeamA,
                    PageName: "",
                    RedirectPage:"TeamSelect"
                  });
                }}
                style={styles.btn}
              >
                <Text style={styles.btntxt}>{TeamAPlayerCount} Squad</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => navigation.navigate("TeamA",{RedirectPage:"TeamSelect"})}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/Match/add.png",
                }}
                style={{ height: 60, width: 60 }}
              />
              <Text style={{ marginTop: 10, fontSize: 12, fontWeight: "500" }}>
                SELECT TEAM A
              </Text>
            </View>
          </Pressable>
        )}
        <View style={{ height: "5%", width: "100%" }}></View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri:
                "" +
                global.domainName +
                "/CricbuddyAdmin/Content/assets/Match/VS.png",
            }}
            style={{ height: 60, width: 60 }}
          />
        </View>
        <View style={{ height: "5%", width: "100%" }}></View>
        <Pressable
          onPress={() => {
            // console.log(Matchid)
            //   console.log(MyTeamAId)
            if (MyTeamAId) 
            {
              navigation.navigate("TeamB", {
                Matchid: Matchid,
                TeamAid: MyTeamAId,
                RedirectPage:"MatchRegister"
              });
            }
            else {
              // navigation.navigate("TeamB", {
              //   Matchid: 248,
              //   TeamAid: 188,
              // });
              Alert.alert(
                "Info",
                "Please first select TEAM A",
                [
                  { text: "OK"}
                ]
              );
            }
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/Match/add.png",
              }}
              style={{ height: 60, width: 60 }}
            />
            <Text style={{ marginTop: 10, fontSize: 12, fontWeight: "500" }}>
              SELECT TEAM B
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default TeamSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  img: {
    height: 60,
    width: 60,
    borderColor: Color.Texttitle,
    borderWidth: 2,
    // backgroundColor: "#DC7633",
    color: Color.WhiteBGColor,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "500",
  },
  btn: {
    borderColor: Color.LightGreenBorder,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.LightGreen,
    borderRadius: 10,
  },
  btntxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
