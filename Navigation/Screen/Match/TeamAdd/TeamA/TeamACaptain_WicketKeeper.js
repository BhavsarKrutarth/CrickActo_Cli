import { StyleSheet, Text, View, Alert, Pressable, SafeAreaView,FlatList,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../../Color/Color";


const TeamACaptain_WicketKeeper = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [listItems, setListItems] = useState([]);
  const [MyTeam, setMyTeam] = useState(null);
  const [MyTeamId, setMyTeamId] = useState(null);
  const [Matchid, setMatchid] = useState(null);
  const [VisibleTab_Captain, setVisibleTab_Captain] = useState(true);
  const [VisibleTab_Keeper, setVisibleTab_Keeper] = useState(false);
  const [selectedItem_Captain, setselectedItem_Captain] = useState(null);
  const [selectedItem_Keeper, setselectedItem_Keeper] = useState(null);
  const [TeamAPlayerCount,setTeamAPlayerCount] = useState(0)
  const [RedirectPage,setRedirectPage] = useState(null);

  React.useEffect(() => {

    console.log("Navigation/Screen/Match/TeamAdd/TeamA/TeamACaptain_WicketKeeper.js");

    if (route.params?.RedirectPage) {
      setRedirectPage(route.params?.RedirectPage);
    }

    if (route.params?.TeamAPlayerCount) {
      setTeamAPlayerCount(route.params?.TeamAPlayerCount);
    }

    
    if (route.params?.TeamAName) {
      setMyTeam(route.params?.TeamAName);
    }
    
    
    if (route.params?.TeamAid) {
      setMyTeamId(route.params?.TeamAid);
    }
    if (route.params?.MyTeamId) {
      setMyTeamId(route.params?.MyTeamId);
    }
    if (route.params?.MyTeam) setMyTeam(route.params?.MyTeam);

    if (route.params?.Matchid) 
    {
        setMatchid(route.params?.Matchid);
        Player_GET(route.params?.Matchid);
    }  
    

    // function onBeforeRemove(event) {
    //   event.preventDefault(); //prevented nav from going back
    //   Alert.alert("Confirmation", "Not scoring the match?", [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         if (Matchid != 0) {
    //           BtnBack_Navigation(Matchid);
    //         } else if (Matchid == 0) {
    //           navigation.navigate("MyMatch", {
    //             LoadRef: "True",
    //           });
    //         }
    //       },
    //     },
    //   ]);
    // }
    // navigation.addListener("beforeRemove", onBeforeRemove); // listener added
    // return function cleanup() {
    //   navigation.removeListener("beforeRemove", onBeforeRemove); // clean up
    // };
  }, [(route.params, Matchid)]);

  const Player_GET = async (Matchid) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/TeamASelectPlayer/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            Matchid: Matchid,
            Where_nq_Stickerid:""
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
                      id: List.MATCHTEAMAPLAYERID,
                      Matchid:List.MATCHID,
                      Playerid:List.PLAYERID,
                      PlayerMobileNo:List.PLAYERMOBILENO,
                      Name:List.NAME,
                      userMasterid:List.USERMASTERID,
                      MobileNo: global.MobileNo,
                      MyTeamid:List.MYTEAMID,
                      MyTeam:List.MYTEAM,
                      CityId: List.CITYID,
                      CityName: List.CITYNAME, 
                      CountryCode: List.COUNTRYCODE,
                      CountryName: List.COUNTRYNAME,
                      ImageName: List.IMAGENAME,
                      Color:"gray"
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                      id: List.MATCHTEAMAPLAYERID,
                      Matchid:List.MATCHID,
                      Playerid:List.PLAYERID,
                      PlayerMobileNo:List.PLAYERMOBILENO,
                      Name:List.NAME,
                      userMasterid:List.USERMASTERID,
                      MobileNo: global.MobileNo,
                      MyTeamid:List.MYTEAMID,
                      MyTeam:List.MYTEAM,
                      CityId: List.CITYID,
                      CityName: List.CITYNAME, 
                      CountryCode: List.COUNTRYCODE,
                      CountryName: List.COUNTRYNAME,
                      ImageName: List.IMAGENAME,
                      Color:"gray"
                });
              }
              setListItems(setarray);
            } else {
              //setDisplayList("false")
            }
          } else {
            alert("Error: UNAUTHORIZATION PERSON");
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

  const BtnBack_Navigation = async (Matchid) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/IndividualMatch/${Matchid}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          navigation.navigate("MyMatch", {
            LoadRef: "True",
          });
        });
    } catch (error) {
      alert(error);
      return;
    }
  };
const BtnNext = async () => {
  // console.log(selectedItem_Keeper)
  // console.log(selectedItem_Captain)
  if(selectedItem_Captain != null)
      {
      try{
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/TeamACaptain_WicketKeeper`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            },
            body: JSON.stringify({
              Oper: "Edit",
              Matchid:Matchid,
              MobileNo:global.MobileNo,
              TeamACapTainId:selectedItem_Captain,
              LastPageName:"TeamSelect",
              TeamAKeeperTainId:selectedItem_Keeper == null ? "": selectedItem_Keeper,
            }),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            var BindData = JSON.parse(json);
            var List;
            if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
              // navigation.navigate('TeamSelect',{
              //   Matchid:Matchid,
              //   MyTeamAId:MyTeamId,
              //   MyTeamA:MyTeam,
              //   TeamAPlayerCount:TeamAPlayerCount
              // });
              
              
              navigation.navigate(RedirectPage,{
                Matchid:Matchid,
                MyTeamAId:MyTeamId,
                MyTeamA:MyTeam,
                TeamAPlayerCount:TeamAPlayerCount
              });
              //RedirectPage
            }
            else 
            {
              alert("Internal Server Error.")
            }
            // alert("Update Recored")
            // navigation.navigate('TeamSelect',{
            //   Matchid:Matchid,
            //   MyTeamId:MyTeamId,
            //   MyTeam:MyTeam
            // });
          });
       } catch (error) {
         alert(error);
         return;
       }
      }
      else 
      {
        Alert.alert(
          "Warning",
          "Please select Captain.",
          [
            {text: "OK"}
          ]
        );
      }
}
const renderItem_Keeper = ({ item }) => {
  //const backgroundColor = item.Color === "gray" ? 'gray' : "red"; 
  return (
  <View
    style={[styles.item, { borderColor: selectedItem_Keeper === item.Playerid ? "green" : 'gray', borderWidth: 3 }]}
  >
    <Pressable onPress={() => setselectedItem_Keeper(item.Playerid)}>
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
                    <Text style={{color:Color.FontColor}}>
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


const renderItem_Captain = ({ item }) => {
  //const backgroundColor = item.Color === "gray" ? 'gray' : "red"; 
  return (
  <View
    style={[styles.item, { borderColor: selectedItem_Captain === item.Playerid ? "green" : 'gray', borderWidth: 3 }]}
  >
    <Pressable onPress={() => setselectedItem_Captain(item.Playerid)}>
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
                  <View style={{ flexDirection: "column", flexWrap: "wrap", }}>
                    <Text style={{color:Color.FontColor}}>
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
  return (
    <View style={styles.Continer}>
      <View style={[styles.body100, { height: 70, flexDirection: "row" }]}>
        <View style={{ width: "50%", alignItems: "flex-end", marginRight: 10 }}>
          <Pressable
            onPress={() => {
              setVisibleTab_Captain(true);
              setVisibleTab_Keeper(false);
            }}
          >
            <View
              style={{
                borderColor: "#14b383",
                borderWidth: 3,
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 25,
                backgroundColor: "#14b393",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Captain</Text>
            </View>
          </Pressable>
        </View>

        <View
          style={{ width: "50%", alignItems: "flex-start", marginRight: 10 }}
        >
          <Pressable
            onPress={() => {
              setVisibleTab_Captain(false);
              setVisibleTab_Keeper(true);
            }}
          >
            <View
              style={{
                borderColor: "#14b383",
                borderWidth: 3,
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 25,
                backgroundColor: "#14b393",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Keeper</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.body100}>
        {VisibleTab_Captain ? (
          <View style={styles.body100}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#14b393" }}
              >
              Select Captain
              </Text>
            </View>

            <SafeAreaView>
              <FlatList
                data={listItems}
                renderItem={renderItem_Captain}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          </View>
        ) : null}

        {VisibleTab_Keeper ? (
          <View style={styles.body100}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 18, fontWeight: "600", color: "#14b393" }}
            >
            Select Kepper
            </Text>
          </View>

          <SafeAreaView>
            <FlatList
              data={listItems}
              renderItem={renderItem_Keeper}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
        ) : null}
      </View>

      <View style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }]}>
        <Pressable
          style={[styles.button, styles.width100]}
          onPress={() => BtnNext()}
        >
          <Text style={styles.footerText}>NEXT</Text>
        </Pressable>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  
  Continer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    position: "relative",
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
  item: {
    backgroundColor: Color.WhiteBGColor,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
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
  body100: {
    width: "100%",
    padding: 0,
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
});

export default TeamACaptain_WicketKeeper;