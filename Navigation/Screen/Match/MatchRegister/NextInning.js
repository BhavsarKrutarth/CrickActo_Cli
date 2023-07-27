import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
    ToastAndroid,
    Alert
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { useRoute } from "@react-navigation/native";
  import Color from "../../../../Color/Color";
  import scoketservices from "../../../../scoket/scoketservices";
  
  const NextInning = () => {
    const navigation = useNavigation();
    const route = useRoute();
  
    const [Matchid, setMatchid] = useState(null);
    const [TeamABatterid, setTeamABatterid] = useState(null);
    const [TeamBBowlerid, setTeamBBowlerid] = useState(null);
    const [TeamABatterName, setTeamABatterName] = useState(null);
    const [TeamBBowlerName, setTeamBBowlerName] = useState(null);
    const [Stickerid,setStickerid] = useState(null);
    const [StickerName,setStickerName] = useState("Striker");
    const [StickerImg,setStickerImg] = useState("/CricbuddyAdmin/Content/assets/Batter.png")
    const [StickerPlayerid,setStickerPlayerid] = useState(null);
  
    const [Non_Stickerid,setNon_Stickerid] = useState(null);
    const [Non_StickerName,setNon_StickerName] = useState("Non-Striker");
    const [Non_StickerImg,setNon_StickerImg] = useState("/CricbuddyAdmin/Content/assets/Non_Striker.png")
    const [Non_StickerPlayerid,setNon_StickerPlayerid] = useState(null)
  
    const [Bowlerid,setBowlerid] = useState(null);
    const [BowlerName,setBowlerName] = useState("Bowler");
    const [BowlerImg,setBowlerImg] = useState("/CricbuddyAdmin/Content/assets/Bowler.png")
    const [BowlerPlayerid,setBowlerPlayerid] = useState(null);

    const [MatchInningid,setMatchInningid] = useState(null);
  
    React.useEffect(() => {
      console.log("Navigation/Screen/Match/MatchRegister/NextInning.js");
      if (route.params?.MatchInningid) {
        setMatchInningid(route.params?.MatchInningid);
      }

      if (route.params?.Matchid) {
        setMatchid(route.params?.Matchid);
      }
  
      if(route.params?.Bowlerid)
      setBowlerid(route.params?.Bowlerid)
  
      if(route.params?.BowlerName)
        setBowlerName(route.params?.BowlerName)
  
      if(route.params?.BowlerImg)
        setBowlerImg(route.params?.BowlerImg)
  
      if(route.params?.BowlerPlayerid)
        setBowlerPlayerid(route.params?.BowlerPlayerid)
  
      if(route.params?.Non_Stickerid)
        setNon_Stickerid(route.params?.Non_Stickerid)
  
      if(route.params?.Non_StickerName)
        setNon_StickerName(route.params?.Non_StickerName)
  
      if(route.params?.Non_StickerImg)
        setNon_StickerImg(route.params?.Non_StickerImg)
  
      if(route.params?.Stickerid)
        setStickerid(route.params?.Stickerid)
  
      if(route.params?.StickerName)
        setStickerName(route.params?.StickerName)
        
      if(route.params?.StickerImg)
        setStickerImg(route.params?.StickerImg)
  
      if(route.params.StickerPlayerid)
        setStickerPlayerid(route.params?.StickerPlayerid);
      
      
  
      if (route.params?.TeamABatterid) {
        setTeamABatterid(route.params?.TeamABatterid);
      }
  
      if (route.params?.TeamBBowlerid) {
        setTeamBBowlerid(route.params?.TeamBBowlerid);
      }
  
      if (route.params?.TeamABatterName) {
        setTeamABatterName(route.params?.TeamABatterName);
      }
  
      if(route.params?.Non_StickerPlayerid)
      {
        setNon_StickerPlayerid(route.params?.Non_StickerPlayerid)
      }
  
      if (route.params?.TeamBBowlerName) {
        setTeamBBowlerName(route.params?.TeamBBowlerName);
      }
    }, [route.params]);
  
    function showToast(Text) {
      ToastAndroid.show(
        Text,
        ToastAndroid.SHORT
      );
    }
    const MatchInningSave = async () => {
     
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/MatchInning`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            Oper: "Update",
            Matchid: Matchid,
            MobileNo:global.MobileNo,
            Type:"MatchTeamB_ScoreBoard",
            Streakerid: Stickerid,
            StreakeName: StickerName,
            StickerPlayerid: StickerPlayerid,
            Runnerid: Non_Stickerid,
            RunnerName: Non_StickerName,
            RunnerPlayerid: Non_StickerPlayerid,
            Bowlerid: Bowlerid,
            BowlerName: BowlerName,
            BowlerPlayerid: BowlerPlayerid,
            TeamBatterid: TeamBBowlerid,
            TeamBatterName: TeamBBowlerName,
            TeamBowlerid: TeamABatterid,
            TeamBowlerName: TeamABatterName,
            MatchInningid:MatchInningid,
            LastPageName:"NextInning_MatchScoring",
            
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
            
           if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
             navigation.navigate("NextInning_MatchScoring",{
                     PageName:"Scoring Board"
                     ,Matchid:Matchid
                     ,Stickerid:Stickerid
                     ,StickerName:StickerName
                     ,StickerPlayerid:StickerPlayerid
                     ,Non_Stickerid:Non_Stickerid
                     ,Non_StickerName:Non_StickerName
                     ,Non_StickerPlayerid:Non_StickerPlayerid
                     ,Bowlerid:Bowlerid
                     ,BowlerName:BowlerName
                     ,BowlerPlayerid:BowlerPlayerid
                     ,TeamBBatterid:TeamBBowlerid
                     ,TeamBBatterName:TeamBBowlerName
                     ,TeamABowlerid:TeamABatterid
                     ,TeamABowlerName:TeamABatterName
                     ,MatchInningid:MatchInningid
                     ,TeamDescription:TeamBBowlerName + " is batting."
                   })
           }
          return json;
        });
    };
    const BtnNext = async () => {
        //  console.log(Matchid + "|| Matchid")
        //  console.log(Stickerid + " || Stickerid")
        //  console.log(StickerName + " || StickerName")
        //  console.log(StickerPlayerid + " || StickerPlayerid")
        //  console.log(Non_Stickerid + " || Non_Stickerid")
        //  console.log(Non_StickerName + " || Non_StickerName")
        //  console.log(Non_StickerPlayerid + " || Non_StickerPlayerid")
        //  console.log(Bowlerid + " || Bowlerid")
        //  console.log(BowlerName + " || BowlerName")
        //  console.log(BowlerPlayerid + " || BowlerPlayerid")
        //  console.log(TeamABatterid + " || TeamABatterid")
        //  console.log(TeamABatterName + " || TeamABatterName")
        //  console.log(TeamBBowlerid + " || TeamBBowlerid")
        //  console.log(TeamBBowlerName + "  || TeamBBowlerName")
        // console.log(MatchInningid + " || MatchInningid")
         
      if(Stickerid == null)
      {
        Alert.alert("Warning","Please select Sticker First.");
        return
      }
      if(Non_Stickerid == null)
      {
        Alert.alert("Warning","Please select Non-Stickerid First.");
        return
      }
      if(Bowlerid == null)
      {
        Alert.alert("Warning","Please select Bowler First.");
        return
      }
      MatchInningSave();
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

                  if(Matchid)
                  {
                    scoketservices.emit("SendMessage",Matchid)
                  }
                  if (List.TeamAid) setTeamAid(List.TeamAid);
  
                  
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
    return (  
      <View style={styles.Container}>
        <ScrollView>
          <View>
            
  
            <View style={[styles.width100, { marginTop: 10 }]}>
              <Text style={styles.title}>Batting - {TeamBBowlerName}</Text>
            </View>
  
            <View style={[styles.width100, styles.WonMainDiv]}>
              <View style={[styles.width50, styles.alignItemsCenter]}>
                <View
                  style={[
                    styles.width90,
                    styles.BorderDiv,
                  ]}
                >
                  <Pressable
                    onPress={() => {
                      navigation.navigate('NextInning_MatchSelectStriker',
                      {
                        
                        PageName:"Select Striker for " + TeamBBowlerName
                        ,Matchid:Matchid
                        ,TeamBBowlerid:TeamBBowlerid
                        ,TeamBBowlerName:TeamBBowlerName
                        ,Non_Stickerid:Non_Stickerid
                      })
                    }}
                  >
                    <View style={[styles.width100, styles.Subdivtitle]}>
                      <View
                        style={[
                          styles.img,
                          {
                            borderColor:styles.BorderDiv,
                            backgroundColor: Color.borderColor,
                          },
                        ]}
                      >
                        <Image
                          source={{
                            uri:
                              "" +
                              global.domainName +
                              StickerImg,
                          }}
                          style={{ height: 60, width: 60, resizeMode: "center" }}
                        />
                      </View>
                    </View>
                    <View style={styles.width100}>
                      <View style={[styles.width100, styles.SubMaintitle]}>
                        <Text style={styles.subtitle}>{StickerName}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.width50, { alignItems: "center" }]}>
                <View
                  style={[
                    styles.width90,
                    styles.BorderDiv
                  ]}
                >
                  <Pressable
                     onPress={() => {
                      navigation.navigate('NextInning_MatchSelectNon_Striker',
                      {
                        Matchid:Matchid
                        ,PageName:"Select Non - Striker for " + TeamBBowlerName
                        ,TeamBBowlerid:TeamBBowlerid
                        ,TeamBBowlerName:TeamBBowlerName
                        ,Stickerid:Stickerid
                      })
                     }}
                  >
                    <View style={[styles.width100, styles.Subdivtitle]}>
                      <View
                        style={[
                          styles.img,
                          {
                            borderColor:Color.darkBorderColor,
                            backgroundColor: Color.borderColor,
                          },
                        ]}
                      >
                        <Image
                          source={{
                            uri:
                              "" +
                              global.domainName +
                              Non_StickerImg,
                          }}
                          style={{ height: 60, width: 60, resizeMode: "center" }}
                        />
                      </View>
                    </View>
                    <View style={styles.width100}>
                      <View style={[styles.width100, styles.SubMaintitle]}>
                        <Text style={styles.subtitle}>{Non_StickerName}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
  
            <View style={[styles.width100, { marginTop: 10 }]}>
              <Text style={styles.title}>Bowling - {TeamABatterName}</Text>
            </View>
  
            <View style={[styles.width100, styles.WonMainDiv]}>
              <View style={[styles.width50, styles.alignItemsCenter]}>
                <View
                  style={[
                    styles.width90,
                    styles.BorderDiv,
                  ]}
                >
                  <Pressable
                     onPress={() => {
                      navigation.navigate('NextInning_MatchSelectBowler',
                      {
                        PageName:"Select Bowler for " + TeamABatterName
                        ,Matchid:Matchid
                        ,TeamABatter:TeamABatterid
                        ,TeamABatterName:TeamABatterName
                      })
                    }}
                  >
                    <View style={[styles.width100, styles.Subdivtitle]}>
                      <View
                        style={[
                          styles.img,
                          {
                            borderColor:styles.BorderDiv,
                            backgroundColor: Color.borderColor,
                          },
                        ]}
                      >
                        <Image
                          source={{
                            uri:
                              "" +
                              global.domainName +
                              BowlerImg,
                          }}
                          style={{ height: 60, width: 60, resizeMode: "center" }}
                        />
                      </View>
                    </View>
                    <View style={styles.width100}>
                      <View style={[styles.width100, styles.SubMaintitle]}>
                        <Text style={styles.subtitle}>{BowlerName}</Text>
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
            <Text style={styles.footerText}>Start Scoring</Text>
          </Pressable>
        </View>
      </View>
    )
  }
  
  export default NextInning
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: "#fafafa",
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