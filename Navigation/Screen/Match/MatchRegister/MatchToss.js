import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../Color/Color";

const MatchToss = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Matchid, setMatchid] = useState(null);

  const [TeamAid, setTeamAid] = useState(null);
  const [TeamAName, setTeamAName] = useState(null);
  const [TeamASubName, setTeamASubName] = useState(null);
  const [TeamBid, setTeamBid] = useState(null);
  const [TeamBName, setTeamBName] = useState(null);
  const [TeamBSubName, setTeamBSubName] = useState(null);

  const [Toss, setToss] = useState(null);
  const [TossElect, setTossElect] = useState(null);

  React.useEffect(() => {
    console.log("Navigation/Screen/Match/MatchRegister/MatchToss.js");
    if (route.params?.Matchid) {
      setMatchid(route.params?.Matchid);
      MyMatch(route.params?.Matchid);
    }
  }, [route.params]);

  function showToast(Text) {
    ToastAndroid.show(
      Text,
      ToastAndroid.SHORT
    );
  }

  const MyMatch = async (Matchid) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Match/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: global.MobileNo,
            Matchid: Matchid,
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                if (List.TeamAid) setTeamAid(List.TeamAid);

                if (List.TeamAName) setTeamAName(List.TeamAName);

                if (List.TeamASubName) setTeamASubName(List.TeamASubName);

                if (List.TeamBid) setTeamBid(List.TeamBid);

                if (List.TeamBName) setTeamBName(List.TeamBName);

                if (List.TeamBSubName) setTeamBSubName(List.TeamBSubName);
              }
            }
          } else {
            alert("Error: internal server error");
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
  const BtnNext = async () => {
    if(Toss != null && TossElect != null)
    {
      var TeamABatter = null,TeamBBowler = null
      ,TeamABatterName = null,TeamBBowlerName = null
      if(Toss == TeamAName)
      {
        if(TossElect == "BAT")
        {
          TeamABatter = TeamAid
          TeamBBowler = TeamBid
          TeamABatterName = TeamAName
          TeamBBowlerName = TeamBName
        }
        else 
        {
          TeamABatter = TeamBid
          TeamBBowler = TeamAid
          TeamABatterName = TeamBName
          TeamBBowlerName = TeamAName
        }
      }
      if(Toss == TeamBName)
      {
        if(TossElect == "BAT")
        {
          TeamABatter = TeamBid
          TeamBBowler = TeamAid
          TeamABatterName = TeamBName
          TeamBBowlerName = TeamAName
        }
        else 
        {
          TeamABatter = TeamAid
          TeamBBowler = TeamBid
          TeamABatterName = TeamAName
          TeamBBowlerName = TeamBName
        }
      }
      // console.log(TeamABatter)
      // console.log(TeamBBowler)
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/MatchToss`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            Oper: "Edit_Toss",
            Matchid: Matchid,
            TeamABatter:TeamABatter,
            TeamBBowler:TeamBBowler,
            TeamABatterName:TeamABatterName,
            TeamBBowlerName:TeamBBowlerName,
            LastPageName:"MatchInnings",
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
             navigation.navigate("MatchInnings", {
               Matchid: Matchid,
               PageName: "Start Inning",
               TeamABatterid:TeamABatter,
               TeamBBowlerid:TeamBBowler,
               TeamABatterName:TeamABatterName,
               TeamBBowlerName:TeamBBowlerName
             });
          }
    
          return json;
        })
    }
    else
    {
      showToast("First select toss.")
    }
  }
  return (
    <View style={styles.Container}>
      <ScrollView>
        <View>
          <View style={styles.width100}>
            <Text style={[styles.title,{color:Color.FontColor}]}>Who won the toss?</Text>
          </View>
          <View style={[styles.width100, styles.WonMainDiv]}>
            <View style={[styles.width50, styles.alignItemsCenter]}>
              <View
                style={[
                  styles.width90,
                  Toss == TeamAName
                    ? styles.BorderDiv_select
                    : styles.BorderDiv,
                ]}
              >
                <Pressable
                  onPress={() => {
                    setToss(TeamAName);
                  }}
                >
                  <View style={[styles.width100, styles.Subdivtitle]}>
                    <View
                      style={[
                        styles.img,
                        {
                          borderColor:
                            Toss == TeamAName ? "green" : Color.darkBorderColor,
                          backgroundColor: "#54bcd9",
                        },
                      ]}
                    >
                      <Text style={styles.imgtitle}>{TeamASubName}</Text>
                    </View>
                  </View>
                  <View style={styles.width100}>
                    <View style={[styles.width100, styles.SubMaintitle]}>
                      <Text style={styles.subtitle}>{TeamAName}</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={[styles.width50, { alignItems: "center" }]}>
              <View
                style={[
                  styles.width90,
                  Toss == TeamBName
                    ? styles.BorderDiv_select
                    : styles.BorderDiv,
                ]}
              >
                <Pressable
                  onPress={() => {
                    setToss(TeamBName);
                  }}
                >
                  <View style={[styles.width100, styles.Subdivtitle]}>
                    <View
                      style={[
                        styles.img,
                        {
                          borderColor:
                            Toss == TeamBName ? "green" : Color.darkBorderColor,
                          backgroundColor: "#96516B",
                        },
                      ]}
                    >
                      <Text style={styles.imgtitle}>{TeamBSubName}</Text>
                    </View>
                  </View>
                  <View style={styles.width100}>
                    <View style={[styles.width100, styles.SubMaintitle]}>
                      <Text style={styles.subtitle}>{TeamBName}</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text style={styles.title}>Winner of the toss elected to?</Text>
          </View>

          <View style={[styles.width100, styles.WonMainDiv]}>
            <View style={[styles.width50, styles.alignItemsCenter]}>
              <View
                style={[
                  styles.width90,
                  TossElect == "BAT"
                    ? styles.BorderDiv_select
                    : styles.BorderDiv,
                ]}
              >
                <Pressable
                  onPress={() => {
                    setTossElect("BAT");
                  }}
                >
                  <View style={[styles.width100, styles.Subdivtitle]}>
                    <View
                      style={[
                        styles.img,
                        {
                          borderColor:
                            TossElect == "BAT"
                              ? "green"
                              : Color.darkBorderColor,
                          backgroundColor: Color.borderColor,
                        },
                      ]}
                    >
                      <Image
                        source={{
                          uri:
                            "" +
                            global.domainName +
                            "/CricbuddyAdmin/Content/assets/Batter.png",
                        }}
                        style={{ height: 60, width: 60, resizeMode: "center" }}
                      />
                    </View>
                  </View>
                  <View style={styles.width100}>
                    <View style={[styles.width100, styles.SubMaintitle]}>
                      <Text style={styles.subtitle}>BAT</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={[styles.width50, { alignItems: "center" }]}>
              <View
                style={[
                  styles.width90,
                  TossElect == "BOWL"
                    ? styles.BorderDiv_select
                    : styles.BorderDiv,
                ]}
              >
                <Pressable
                  onPress={() => {
                    setTossElect("BOWL");
                  }}
                >
                  <View style={[styles.width100, styles.Subdivtitle]}>
                    <View
                      style={[
                        styles.img,
                        {
                          borderColor:
                            TossElect == "BOWL"
                              ? "green"
                              : Color.darkBorderColor,
                          backgroundColor: Color.borderColor,
                        },
                      ]}
                    >
                      <Image
                        source={{
                          uri:
                            "" +
                            global.domainName +
                            "/CricbuddyAdmin/Content/assets/Bowler.png",
                        }}
                        style={{ height: 60, width: 60, resizeMode: "center" }}
                      />
                    </View>
                  </View>
                  <View style={styles.width100}>
                    <View style={[styles.width100, styles.SubMaintitle]}>
                      <Text style={styles.subtitle}>BOWL</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }]}>
        <Pressable
          style={[styles.button, styles.width100]}
          onPress={() => BtnNext()}
        >
          <Text style={styles.footerText}>LET'S PLAY</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderColor: "#fff",
    borderWidth: 5,
    padding: 10,
    position: "relative",
  },
  width100: {
    width: "100%",
  },
  width90: {
    width: "90%",
  },
  width50: {
    width: "50%",
  },
  width30: {
    width: "30%",
  },
  width01: {
    width: "1%",
  },
  width40: {
    width: "40%",
  },
  width20: {
    width: "20%",
  },
  width10: {
    width: "10%",
  },
  width30: {
    width: "30%",
  },
  width50: {
    width: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color:Color.FontColor
  },
  img: {
    height: 90,
    width: 90,
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
    fontWeight: "700",
  },
  WonMainDiv: {
    flexDirection: "row",
    paddingTop: 15,
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  BorderDiv_select: {
    borderColor: "green",
    backgroundColor: "white",
    borderWidth: 2,
  },
  BorderDiv: {
    borderColor: "#eaeaea",
    backgroundColor: "white",
    borderWidth: 2,
  },
  Subdivtitle: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  SubMaintitle: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color:Color.FontColor
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
    backgroundColor: Color.PrimaryColor,
  },
  footerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default MatchToss;
