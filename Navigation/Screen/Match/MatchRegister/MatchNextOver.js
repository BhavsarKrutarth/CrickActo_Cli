import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
  Modal,
} from "react-native";
  import React, { useState, useEffect } from "react";
  import Custombutton from "../../../../Component/PressableButton/Custombutton"
  import { useNavigation } from "@react-navigation/native";
  import { useRoute } from '@react-navigation/native';
  import Color from "../../../../Color/Color";
  import { color } from "react-native-reanimated";
  import scoketservices from "../../../../scoket/scoketservices";
   /* -----------------------refreshing ------------------------------*/
   const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  
  /* -----------------------refreshing ------------------------------*/
  const MatchNextOver = (props) => {
    
    const navigation = useNavigation();
    const route = useRoute();  

    const [listItems, setListItems] = useState([]);
    const [btnDisplay, setbtnDisplay] = useState(false);
    const [Matchid,setMatchid] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [id,setid] = useState(null);
    const [Name,setName] = useState(null);
    const [Img,setImg] = useState(null);
    const [Playerid,setPlayerid] = useState(null)
    const [modalVisible,setmodalVisible] = useState(false);
    const [BowlingStyle,setBowlingStyle] = useState(null)
    const [Non_Stickerid,setNon_Stickerid] = useState(null);
    const [Where_nq_Bowlerid,setWhere_nq_Bowlerid] = useState(null);
    const [BowlerWiseBallCount,setBowlerWiseBallCount] = useState(null);
    const [Maidon_Count,setMaidon_Count] = useState(null);
    const [BowlerWiseRun,setBowlerWiseRun] = useState(null);
    const [MatchInningid,setMatchInningid] = useState(null)
    const [BowlerOut,setBowlerOut] = useState(null);

    React.useEffect(() => {
    console.log("Navigation/Screen/Match/MatchRegister/MatchNextOver.js");
    if(route.params?.MatchInningid)
    {
      setMatchInningid(route.params?.MatchInningid)
    }  

    if(route.params?.Where_nq_Bowlerid)
    {
      setWhere_nq_Bowlerid(route.params?.Where_nq_Bowlerid)
    }
    if(route.params?.Matchid)
    {
      setMatchid(route.params?.Matchid)

      Bowler_GET(route.params?.Matchid,route.params?.Where_nq_Bowlerid)
    }

    
   
    }, [(route.params,Matchid)]);

    
     /* -----------------------refreshing ------------------------------*/ 
     const [refreshing, setRefreshing] = React.useState(false);
  
     const onRefresh = React.useCallback(() => {
        if(Matchid)
        {
          Bowler_GET(Matchid,Where_nq_Bowlerid);
        }
        
       wait(2000).then(() => setRefreshing(false));
     }, [Matchid,Where_nq_Bowlerid]);
   /* -----------------------refreshing ------------------------------*/
    const Bowler_GET = async (Matchid,Where_nq_Bowlerid) => {
      try {
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/TeamBSelectPlayer`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              Matchid:Matchid,
              Where_nq_Bowlerid:Where_nq_Bowlerid != null ? Where_nq_Bowlerid : ""
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
                if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                  if (List) {
                    List.forEach((List) => {
                      setarray.push({
                        id: List.MATCHTEAMBPLAYERID,
                        Matchid:Matchid,
                        userMasterid:List.USERMASTERID,
                        MyTeamid:List.MYTEAMID,
                        MyTeam:List.MYTEAM,
                        MobileNo: global.MobileNo,
                        PlayerMobileNo: List.MOBILENO,
                        CityId: List.CITYID,
                        CityName: List.CITYNAME,
                        CountryCode: List.COUNTRYCODE,
                        CountryName: List.COUNTRYNAME,
                        ImageName: List.IMAGENAME,
                        Playerid:List.PLAYERID,
                        Name:List.NAME,
                        Color:"gray",
                        BowlingStyle:List.BOWLINGSTYLE,
                        BowlerWiseBallCount:List.BOWLERWISEBALLCOUNT,
                        Maidon_Count:List.MAIDON_COUNT,
                        BowlerWiseRun:List.BOWLERWISERUN,
                        BowlerOut:List.BOWLEROUT,
                      });
                    });
                  }
                } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                  setarray.push({
                    id: List.MATCHTEAMBPLAYERID,
                        Matchid:Matchid,
                        userMasterid:List.USERMASTERID,
                        MyTeamid:List.MYTEAMID,
                        MyTeam:List.MYTEAM,
                        MobileNo: global.MobileNo,
                        PlayerMobileNo: List.MOBILENO,
                        CityId: List.CITYID,
                        CityName: List.CITYNAME,
                        CountryCode: List.COUNTRYCODE,
                        CountryName: List.COUNTRYNAME,
                        ImageName: List.IMAGENAME,
                        Playerid:List.PLAYERID,
                        Name:List.NAME,
                        Color:"gray",
                        BowlingStyle:List.BOWLINGSTYLE,
                        BowlerWiseBallCount:List.BOWLERWISEBALLCOUNT,
                        Maidon_Count:List.MAIDON_COUNT,
                        BowlerWiseRun:List.BOWLERWISERUN,
                        BowlerOut:List.BOWLEROUT,
                  });
                }
                setListItems(setarray);
                // setselectedSquad(setarray.filter(List => List.Color === 'green').length)
              } else {
                //setDisplayList("false")
              }
            } else {
              //alert("Error: UNAUTHORIZATION PERSON");
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
  
  
    
    const renderItem = ({ item }) => {
      //const backgroundColor = item.Color === "gray" ? 'gray' : "red"; 
      return (
        <View
          style={[
            styles.item,
            selectedItem === item.id ? styles.selectedItem : null,
          ]}
        >
          <Pressable
            onPress={() => {
              setSelectedItem(item.id)
              SelectedItem(
                item.id,
                item.Name,
                `/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                item.Playerid,
                item.BowlerWiseBallCount,
                item.Maidon_Count,
                item.BowlerWiseRun,
                item.BowlerOut
              );
              setbtnDisplay(true)
              if(item.BowlingStyle == null)
              {
                setmodalVisible(true)
              }
              
              
              
            }}
          >
            <View
              style={[
                styles.body100,
                {
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <View style={[styles.body20]}>
                <Image
                  source={{
                    uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                  }}
                  style={styles.img}
                />
              </View>
              <View style={[styles.body80]}>
                <View style={{ marginLeft: 5 }}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "900",color:Color.FontColor }}>
                      {item.Name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                    <Text style={{color:Color.FontColor }}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/icon_Location.png`,
                        }}
                        style={{ width: 15, height: 15 }}
                      />{" "}
                      {item.CityName}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.body20, { alignItems: "center" }]}></View>
            </View>
          </Pressable>
        </View>
      );
    };
    
    const SelectedItem = (id,Name,Img,Playerid,BowlerWiseBallCount,Maidon_Count,BowlerWiseRun,BowlerOut) => {
      setid(id);
      setName(Name);
      setImg(Img);
      setPlayerid(Playerid);
      setBowlerWiseBallCount(BowlerWiseBallCount);
      setMaidon_Count(Maidon_Count);
      setBowlerWiseRun(BowlerWiseRun)
      setBowlerOut(BowlerOut)
    }
    const BtnNext = async () =>
    {
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
            Oper: "Bowler_Update",
            Matchid: Matchid,
            MobileNo:global.MobileNo,
            Type:"MatchTeamA_ScoreBoard",
            Streakerid: "",
            StreakeName: "",
            StickerPlayerid: "",
            Runnerid: "",
            RunnerName: "",
            RunnerPlayerid: "",
            Bowlerid: id,
            BowlerName: Name,
            BowlerPlayerid: Playerid,
            TeamBatterid: "",
            TeamBatterName: "",
            TeamBowlerid: "",
            TeamBowlerName: "",
            MatchInningid:MatchInningid,
            LastPageName:"",
            
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
            if(Matchid)
            {
              scoketservices.emit("SendMessage",Matchid)
            }

            navigation.navigate('MatchScoring',{
                PageName:"Select Inning",
                Bowlerid:id
                ,BowlerName:Name
                ,BowlerImg:Img
                ,BowlerPlayerid:Playerid
                ,BowlerWiseBallCount:BowlerWiseBallCount
                ,Maidon_Count:Maidon_Count
                ,BowlerWiseRun:BowlerWiseRun
                ,WicketModal:"true"
                ,BowlerOut:BowlerOut
                ,Maidon_Count:BindData.SERVICERESPONSE.MAIDAN
                ,RunDisplay:""
                ,MatchTeamAid_undo:BindData.SERVICERESPONSE.MATCHTEAMAID_UNDO
              });
          }
          return json;
        });
    }
    const modalSave = async () => {
      if (BowlingStyle != null) {
        try {
          const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/Match_Bowlingstyle`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              },
              body: JSON.stringify({
                Oper: 'Edit',
                MatchTeamBPlayerid: id,
                Playerid:Playerid,
                BowlingStyle:BowlingStyle,
                Matchid:Matchid
              }),
            }
          )
            .then((response) => response.json())
            .then((json) => {
              /*-------------------- Page Call -----------------------*/
              var BindData = JSON.parse(json);
              
              if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
                setmodalVisible(false);
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
      } else {
        Alert.alert("Warning", "Please at list one Style select.", [
          { text: "OK" },
        ]);
      }
    }
    return (
      <View style={styles.Container}>
        <SafeAreaView style={styles.Container}>
          <FlatList
            data={listItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </SafeAreaView>
        {btnDisplay ? (
          <View>
            <View
              style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }]}
            >
              <Pressable
                style={{
                  borderRadius: 20,
                  elevation: 2,
                  padding: 12,
                  alignItems: "center",
                  color: "green",
                  backgroundColor: Color.PrimaryColor,
                }}
                onPress={() => BtnNext()}
              >
                <Text style={styles.footerText}>Select Player</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        <View style={[styles.modalcenteredView, { position: "absolute" }]}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
              <View style={styles.modalcenteredView}>
                <View style={styles.modalView}>
                  <View style={styles.body100}>
                    <View style={[styles.body100]}>
                      <Text style={styles.modaltitle}>Bowling Style</Text>
                    </View>
                    <View style={[styles.body100, styles.modal_imgcenter]}>
                      <Text style={styles.modalsubtitle}>
                        What's the style of{" "}
                        <Text style={{ fontWeight: "800" }}>{Name}</Text> ?
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.modal_box]}>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "Right_Arm_Fast"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("Right_Arm_Fast")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                            Right-arm fast
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                    <View style={styles.body02}></View>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "Right_arm_medium"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("Right_arm_medium")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                            Right-arm medium
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                  <View style={[styles.modal_box]}>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "Left_Arm_Fast"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("Left_Arm_Fast")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                            Left-arm fast
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                    <View style={styles.body02}></View>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "Left_arm_medium"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("Left_arm_medium")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                            Left-arm medium
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                  <View style={[styles.modal_box]}>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "slow_left_arm_orthodox"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("slow_left_arm_orthodox")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                          Slow left-arm orthodox
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                    <View style={styles.body02}></View>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "slow_left_arm_chinaman"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("slow_left_arm_chinaman")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                            Slow left-arm chinaman
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>

                  <View style={[styles.modal_box]}>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "Right_arm_Off_Break"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("Right_arm_Off_Break")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                          Right-arm Off Break
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                    <View style={styles.body02}></View>
                    <View
                      style={[
                        styles.body50,
                        BowlingStyle === "Right_arm_leg_Break"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable
                        onPress={() => setBowlingStyle("Right_arm_leg_Break")}
                      >
                        <View
                          style={[styles.body100, styles.modal_imgcenter]}
                        >
                          <Text style={styles.modalsubtitle}>
                          Right-arm Leg Break
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>

                  <View
                    style={[
                      {
                        flexDirection: "row",
                        marginTop: 20,
                      },
                    ]}
                  >
                    <View style={{ width: "3%" }}></View>
                    <View style={{ width: "45%" }}>
                      <Pressable
                        style={[styles.modalbutton, styles.modalbuttonClose]}
                        onPress={() => {
                          setBowlingStyle(null);
                          setmodalVisible(false);
                        }}
                      >
                        <Text
                          style={[styles.modaltextStyle, { color: "black" }]}
                        >
                          CANCEL
                        </Text>
                      </Pressable>
                    </View>
                    <View style={{ width: "7%" }}></View>
                    <View style={{ width: "45%" }}>
                      <Pressable
                        style={[styles.modalbutton, styles.modalbuttonOpen]}
                        onPress={() => modalSave()}
                      >
                        <Text style={styles.modaltextStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: "#fff",
      borderColor: "#fff",
      borderWidth: 1,
      position: "relative",
    },
    footerText: {
      color: "white",
      fontSize: 18,
      fontWeight: "700",
    },
    Image: {
      marginTop: 10,
      height: 400,
      width: "auto",
    },
    body: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 25,
      alignItems: "center",
    },
    body100: {
      width: "100%",
    },
    body50: {
      width: "50%",
    },

    body45: {
      width: "45%",
      borderColor: Color.borderColor,
      borderWidth: 2,
    },
    body10: {
      width: "10%",
    },
    body80: {
      width: "80%",
    },
    body20: {
      width: "20%",
    },
    body02: {
      width: "2%",
    },
    title: {
      color: Color.Texttitle,
      fontWeight: "bold",
      fontSize: 18,
      margin: 5,
    },
    button: {
      borderRadius: 20,
      elevation: 2,
      padding: 12,
      alignItems: "center",
      color: "green",
    },
    buttonSave: {
      backgroundColor: Color.PrimaryColor,
    },
    BannerBox: {
      marginLeft: 10,
      marginTop: 10,
      padding: 10,
      borderColor: "black",
      borderWidth: 2,
      width: "95%",
      backgroundColor: Color.NavigationColor,
    },
    BannerSpaceBetween: {
      justifyContent: "space-between",
      flexDirection: "row",
    },
    BannerTitle: {
      color: "white",
      fontSize: 15,
    },
    item: {
      backgroundColor: Color.WhiteBGColor,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: "gray",
      borderWidth: 3,
    },
    selectedItem: {
      borderColor: "green",
      borderWidth: 3,
    },
    img: {
      height: 60,
      width: 60,
    },
    imgtitle: {
      color: Color.WhiteBGColor,
      fontSize: 18,
      fontWeight: "900",
    },

    modalcenteredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      //alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalbutton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    modalbuttonOpen: {
      backgroundColor: "#2196F3",
    },
    modalbuttonClose: {
      backgroundColor: "#f2f2f2",
    },
    modaltextStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modal_imgcenter: {
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      fontSize: 10,
    },
    modaltitle: {
      fontSize: 20,
      color: Color.PrimaryColor,
      fontWeight: "600",
    },
    modalsubtitle: {
      fontSize: 16,
      color:Color.FontColor
    },
    modal_box: {
      flexDirection: "row",
      marginTop: 10,
      width: "100%",
    },
  });
  
  export default MatchNextOver;
  



