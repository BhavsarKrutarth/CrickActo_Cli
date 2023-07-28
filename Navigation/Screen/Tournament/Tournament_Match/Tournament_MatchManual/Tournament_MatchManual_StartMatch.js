import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Color from "../../../../../Color/Color";

const Tournament_MatchManual_StartMatch = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Matchid, setMatchid] = useState(null);
  const [Tournament_Matchid,setTournament_Matchid] = useState(null);
  const [MyTeamAId, setMyTeamAId] = useState(null);
  const [MyTeamA, setMyTeamA] = useState(null);
  const [MyTeamASubName, setMyTeamASubName] = useState(null);
  const [TeamAPlayerCount, setTeamAPlayerCount] = useState(0);
  const [Roundid,setRoundid] = useState(null);

  React.useEffect(() => {
    console.log("Navigation/Screen/Tournament/Tournament_Match/Tournament_MatchManual/Tournament_MatchManual_StartMatch.js");
    
    if(route.params?.Roundid)
        setRoundid(route.params?.Roundid)

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

    if(route.params?.Tournament_Matchid)
    {
      setTournament_Matchid(route.params?.Tournament_Matchid)
    }

    // function Tournament_MatchManual_StartMatch_onBeforeRemove(event) {
    //   event.preventDefault(); //prevented nav from going back
    //   Alert.alert("Confirmation", "Not scoring the match?", [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         navigation.navigate("TournamentMatch", {
    //           LoadRef: "True",
    //         });
    //       },
    //     },
    //   ]);
    // }
    // navigation.addListener("beforeRemove", Tournament_MatchManual_StartMatch_onBeforeRemove); // listener added
    // return function cleanup() {
    //   navigation.removeListener("beforeRemove", Tournament_MatchManual_StartMatch_onBeforeRemove); // clean up
    // };

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      navigation.navigate('TournamentMatch');
    });

    return unsubscribe;
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
                  // console.log(Roundid)
                  // console.log(MyTeamAId)
                  // console.log(MyTeamA)

                  navigation.navigate("Tournament_Match_TeamAPlayer", {
                    Tournament_Matchid:Tournament_Matchid,
                    Roundid:Roundid,
                    TeamAid: MyTeamAId,
                    TeamAName: MyTeamA,
                    PageName: "",
                    RedirectPage:"Tournament_MatchManual_StartMatch"
                  });
                }}
                style={styles.btn}
              >
                <Text style={styles.btntxt}>{TeamAPlayerCount} Squad</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => navigation.navigate("Tournament_MatchManual_TeamA",{RedirectPage:"Tournament_MatchManual_StartMatch",Roundid:Roundid})}>
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
              <Text style={{ marginTop: 10, fontSize: 12, fontWeight: "500",color:Color.FontColor }}>
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
              navigation.navigate("Tournament_MatchManual_TeamB", {
                Tournament_Matchid: Tournament_Matchid,
                Roundid:Roundid,
                TeamAid: MyTeamAId,
                TeamAName: MyTeamA,
                RedirectPage:"Tournament_MatchManual_Tournament_MatchRegister",
                PageName:""
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
            <Text style={{ marginTop: 10, fontSize: 12, fontWeight: "500",color:Color.FontColor }}>
              SELECT TEAM B
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Tournament_MatchManual_StartMatch;

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
