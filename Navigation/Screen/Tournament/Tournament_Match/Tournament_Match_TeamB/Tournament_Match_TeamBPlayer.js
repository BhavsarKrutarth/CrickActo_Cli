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
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import Custombutton from "../../../../../Component/PressableButton/Custombutton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import Color from "../../../../../Color/Color";
/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
/* -----------------------refreshing ------------------------------*/
const Tournament_Match_TeamBPlayer = (props) => {
  const navigation = useNavigation();
  const route = useRoute();


  const [listItems, setListItems] = useState([]);
  const [MyTeam, setMyTeam] = useState(null);
  const [MyTeamId, setMyTeamId] = useState(null);
  const [Matchid, setMatchid] = useState(null);
  const [selectedSquad, setselectedSquad] = useState(0);
  const [btnDisplay, setbtnDisplay] = useState(false);
  const [RedirectPage, setRedirectPage] = useState(null);

  const [Roundid,setRoundid] = useState(null);
  const [MyTeam_GuId,setMyTeam_GuId] = useState(null)
  const [TeamBid,setTeamBid] = useState(null);
  const [TeamBName,setTeamBName] = useState(null);
  const [Tournament_Matchid,setTournament_Matchid] = useState(null);
  const [Tournamentid,setTournamentid] = useState(null);


  React.useEffect(() => {
    console.log("Navigation/Screen/Tournament/Tournament_Match/Tournament_Match_TeamB/Tournament_Match_TeamBPlayer.js");
    
    if(route.params?.TeamBid) setTeamBid(route.params?.TeamBid)
    if(route.params?.TeamBName) setTeamBName(route.params?.TeamBName)
    if(route.params?.Tournamentid) setTournamentid(route.params?.Tournamentid)

    if(route.params?.Tournament_Matchid)
      setTournament_Matchid(route.params?.Tournament_Matchid)

    if(route.params?.Roundid)
      setRoundid(route.params?.Roundid)

    if(route.params?.MyTeam_GuId)
      setMyTeam_GuId(route.params?.MyTeam_GuId)

    if (route.params?.RedirectPage)
      setRedirectPage(route.params?.RedirectPage)

    if (route.params?.Matchid)
      setMatchid(route.params?.Matchid)
    // console.log(route.params?.MyTeamId)
    if (route.params?.MyTeamId) {
      setMyTeamId(route.params?.MyTeamId);
      
    }
    if (route.params?.MyTeam)
      setMyTeam(route.params?.MyTeam);

    if (route.params?.TeamBid) 
      Player_GET(route.params?.MyTeam_GuId,route.params?.TeamBid,route.params?.TeamBName,route.params?.Tournament_Matchid);

    if (route.params?.TeamAid) {
      setMyTeamId(route.params?.TeamAid);

      
      

      setbtnDisplay(true)
      // console.log(listItems)
      //setselectedSquad(listItems.filter(List => List.Color === 'green').length)
    }
    if (route.params?.TeamAName)
      setMyTeam(route.params?.TeamAName);

      MyTeamId_Player_GET(route.params?.MyTeam_GuId,route.params?.Tournament_Matchid)
      
      
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        navigation.navigate('TournamentMatch');
      });
  
      return unsubscribe;
  }, [(route.params, Matchid)]);


  /* -----------------------refreshing ------------------------------*/
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    if (MyTeam_GuId) {
      Player_GET(MyTeam_GuId,MyTeamId,MyTeam);
      setRefreshing(true);
      setselectedSquad(0);
      setbtnDisplay(false);

    }

    wait(2000).then(() => setRefreshing(false));
  }, [MyTeam_GuId,MyTeamId,MyTeam]);
  /* -----------------------refreshing ------------------------------*/
  
  const MyTeamId_Player_GET = async (MyTeam_GuId,Tournament_Matchid) => {
    try {
      var data = {
        MyTeam_GuId : MyTeam_GuId,
        MobileNo : global.MobileNo,
        Tournament_Matchid:Tournament_Matchid
      }
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName:"MYTEAMID_PLAYER_GET"
          },
          body: JSON.stringify(data)
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
              var setarray = [];

              setMyTeamId(BindData.SERVICERESPONSE.MyTeamid)
              setMyTeam(BindData.SERVICERESPONSE.MyTeam)

              Player_GET(MyTeam_GuId,BindData.SERVICERESPONSE.MyTeamid,BindData.SERVICERESPONSE.MyTeam,Tournament_Matchid)
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
  
  const Player_GET = async (MyTeam_GuId,TeamBid,TeamBName,Tournament_Matchid) => {
     console.log(TeamBid)
    try {

      var data = {
        MyTeam_GuId : MyTeam_GuId,
        MobileNo : global.MobileNo,
        Tournament_Matchid:Tournament_Matchid
      }
      if(TeamBid)
      {
        data.MyTeamid = TeamBid
        data.MyTeam = TeamBName
      }
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName:"TOURNAMENT_TEAMB_PLAYER_GET"
          },
          body: JSON.stringify(data)
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

              setMyTeamId(BindData.SERVICERESPONSE.MyTeamid)
              setMyTeam(BindData.SERVICERESPONSE.MyTeam)

              if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                if (List) {
                  List.forEach((List) => {
                    setarray.push({
                      id: List.Playerid,
                      Playerid: List.Playerid,
                      userMasterid: List.userMasterid,
                      MyTeamid: List.MyTeamid,
                      MyTeam: List.MyTeam,
                      MobileNo: global.MobileNo,
                      PlayerMobileNo: List.MobileNo,
                      CityId: List.CityId,
                      CityName: List.Cityname,
                      CountryCode: List.CountryCode,
                      CountryName: List.CountryName,
                      ImageName: List.ImageName,
                      Name: List.Name,
                      Color: List.Color
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                    id: List.Playerid,
                    Playerid: List.Playerid,
                    userMasterid: List.userMasterid,
                    MyTeamid: List.MyTeamid,
                    MyTeam: List.MyTeam,
                    MobileNo: global.MobileNo,
                    PlayerMobileNo: List.MobileNo,
                    CityId: List.CityId,
                    CityName: List.Cityname,
                    CountryCode: List.CountryCode,
                    CountryName: List.CountryName,
                    ImageName: List.ImageName,
                    Name: List.Name,
                    Color: List.Color
                });
              }
              setListItems(setarray);
              setselectedSquad(setarray.filter(List => List.Color === 'green').length)
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

  const Multi_Player = (id1) => {
    var index = listItems.findIndex(List => List.id === id1);
    if (listItems[index].Color == 'gray') {
      listItems[index].Color = 'green'
    }
    else if (listItems[index].Color == 'green') {
      listItems[index].Color = 'gray'
    }
    var newArray = [...listItems]
    setListItems(newArray)

    var leng = listItems.filter(List => List.Color === 'green').length
    setselectedSquad(leng)
    if (leng > 0) {
      setbtnDisplay(true);
    }
    else {
      setbtnDisplay(false);
    }
  }


  const renderItem = ({ item }) => {
    //const backgroundColor = item.Color === "gray" ? 'gray' : "red"; 
    return (
      <View
        style={[styles.item, { borderColor: item.Color, borderWidth: 4 }]}
      >
        <Pressable onPress={() => Multi_Player(item.id)}>
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
                  <Text style={{ fontSize: 18, fontWeight: "900" }}>
                    {item.Name}
                  </Text>
                </View>
                <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                  <Text>
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

            <View style={[styles.body20, { alignItems: "center" }]}>
            </View>
          </View>
        </Pressable>
      </View>
    )
  };

  const BtnNext = async () => {
    // console.log(Tournament_Matchid)
    // console.log(listItems.filter(List => List.Color === 'green'))
    // return
    if (listItems.filter(List => List.Color === 'green').length >= 2) {
      if (listItems.filter(List => List.Color === 'green').length <= 11) {
        try {
          const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/Tournament_TeamBSelectPlayer`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              },
              body: JSON.stringify({
                Oper: "add",
                Tournament_Matchid: Tournament_Matchid,
                Tournamentid:global.Tournamentid,
                LastPageName: "Tournament_Match_TeamBCaptain_WicketKeeper",
                listItems: listItems.filter(List => List.Color === 'green'),
                RedirectPage: RedirectPage
              }),
            }
          )
            .then((response) => response.json())
            .then((json) => {
              var BindData = JSON.parse(json);
              var List;
              // console.log(BindData)
              if(BindData.SERVICERESPONSE.RESPONSECODE == "0")
              {
                navigation.navigate('Tournament_Match_TeamBCaptain_WicketKeeper', {
                  MyTeam,
                  MyTeamId,
                  Tournament_Matchid:Tournament_Matchid,
                  PageName: "Captain,Keeper",
                  TeamAPlayerCount: listItems.filter(List => List.Color === 'green').length,
                  RedirectPage: RedirectPage
                });  
                
              }
              
            });
        } catch (error) {
          alert(error);
          return;
        }
      }
      else {
        Alert.alert(
          "Warning",
          "Max 11 Player Select in Squad.",
          [
            { text: "OK" }
          ]
        );
      }
    }
    else {
      Alert.alert(
        "Warning",
        "At List Two Player Select in Squad.",
        [
          { text: "OK" }
        ]
      );
    }
  }


  return (
    <View style={styles.Container}>
      <View style={styles.BannerBox}>
        <View style={styles.BannerSpaceBetween}>
          <Pressable
            onPress={() => {
              // console.log(listItems);
            }}
          >
            <Text style={styles.BannerTitle}>
              Select Playing Squad ( {selectedSquad} )
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("PlayerAddViaPhoneNo", {
                PLayer_RedirectPage: "Tournament_Match_TeamBPlayer",
                MyTeam: MyTeam,
                MyTeamId: MyTeamId,
              })
            }
          >
            <Text style={styles.BannerTitle}>+ Add New PLayer</Text>
          </Pressable>
        </View>
      </View>

      {listItems.length == "0" ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <View style={styles.body100}>
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/tournament/tournament_Background.png",
                }}
                style={styles.Image}
              />
            </View>
            <View style={styles.body}>
              {/* <View
                style={[
                  styles.body60,
                  {
                    borderColor: Color.PrimaryColor,
                    borderWidth: 2,
                    borderRadius: 30,
                    alignItems: "center",
                  },
                ]}
              >
                <LineButton
                  title={"LOOKING FOR"}
                  onPress={() => alert("click")}
                />
              </View> */}
              <View style={{ width: "25%" }}></View>
              <View style={[styles.body50]}>
                <Custombutton
                  title={"ADD PLAYER"}
                  onPress={() =>
                    navigation.navigate("PlayerAddViaPhoneNo", {
                      PLayer_RedirectPage: "Tournament_Match_TeamBPlayer",
                      MyTeam: MyTeam,
                      MyTeamId: MyTeamId,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
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
      )}
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
              <Text style={styles.footerText}>NEXT</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
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
  body40: {
    width: "40%",
  },
  body60: {
    width: "60%",
  },
  body80: {
    width: "80%",
  },
  body20: {
    width: "20%",
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

  modal_centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    // padding: 5,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Modla_Cancelbtn: {
    backgroundColor: "#e7e8ea",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  Modal_okbtn: {
    backgroundColor: Color.PrimaryColor,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  Modal_okbtn_text: {
    color: "white",
    fontWeight: "500",
  },
  Modal_Cancelbtn_text: {
    fontWeight: "500",
  },
  Modal_header: {
    width: "100%",
    height: 65,

    backgroundColor: "#e7e8ea",
    flexDirection: "row",
  },
  modal_body: {
    width: "100%",
  },
  Modal_Footer: {
    flexDirection: "row",
    width: "100%",
  },
  Modal_img: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  Modal_HeaderTitle: {
    justifyContent: "center",
    width: "80%",
  },
  Modal_Hedertxt: {
    fontWeight: "900",
    fontSize: 16,
  },
  Modal_HederTitle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Modal_bodyBox: {
    width: "100%",
    //marginHorizontal:"5%",
    flexDirection: "row",
  },
  Modal_Box: {
    width: "30%",
    height: 80,
    // borderColor:"#3f3f3f",
    borderWidth: 3,
    margin: 5
  },
  Modal_BoxImg: {
    width: "70%",
    height: "100%",
    resizeMode: "stretch",
  },
  modal_BoximgDiv: {
    height: "70%", width: "100%", alignItems: "center", paddingTop: "5%"
  }
});

export default Tournament_Match_TeamBPlayer;
