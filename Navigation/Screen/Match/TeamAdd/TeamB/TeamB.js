import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  InteractionManager,
  RefreshControl,
  Alert,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";

import LineButton from "../../../../../Component/LineButton/LineButton";
import Custombutton from "../../../../../Component/PressableButton/Custombutton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import Color from "../../../../../Color/Color";
// import { ScrollView } from "react-native-gesture-handler";
/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
/* -----------------------refreshing ------------------------------*/
const TeamB = (props) => {
  const route = useRoute();
  /* -----------------------refreshing ------------------------------*/ 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    MyTeam();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
/* -----------------------refreshing ------------------------------*/
  const navigation = useNavigation();
  const [listItems, setListItems] = useState([]);
  const [Matchid,setMatchid] = useState(0);
  const [TeamAddFlag,setTeamAddFlag] = useState(0);
  const [Oper,setOper] = useState("add")

  const [selectedItem, setSelectedItem] = useState(null);
  const [TeamBName, setTeamBName] = useState(null);
  const [TeamAid,setTeamAid] = useState(null);
  const [RedirectPage,setRedirectPage] = useState(null);

  React.useEffect(() => {
    console.log("Navigation/Screen/Match/TeamAdd/TeamB/TeamB.js");
    
    if(route.params?.LoadRef == "True")
      MyTeam();

    if(route.params?.TeamAid)
      setTeamAid(route.params?.TeamAid)

    if(route.params?.Matchid)
      setMatchid(route.params?.Matchid)

    if(route.params?.Oper)
      setOper(route.params?.Oper)

    if(route.params?.TeamAddFlag == 0)
      setTeamAddFlag(route.params?.TeamAddFlag)

    if(route.params?.RedirectPage)
      setRedirectPage(route.params?.RedirectPage);

    MyTeam();
    // function onBeforeRemove(event) {
    //   if(TeamAddFlag == 1)
    //   {
    //     event.preventDefault(); //prevented nav from going back
    //     Alert.alert("Confirmation", "Not scoring the match?", [
    //       {
    //         text: "Cancel",
    //         style: "cancel",
    //       },
    //       {
    //         text: "OK",
    //         onPress: () => {
    //           if (Matchid != 0) {
    //             BtnBack_Navigation(Matchid);
    //           }
    //           else if (Matchid == 0) 
    //           {
    //             navigation.navigate('MyMatch',{
    //               LoadRef:"True"
    //             });
    //           }
    //         },
    //       },
    //     ]);
    //   }
    // }
    // navigation.addListener('beforeRemove', onBeforeRemove); // listener added
    // return function cleanup() {
    //   navigation.removeListener('beforeRemove', onBeforeRemove) // clean up 
    // };
  }, [route.params,Matchid]);

  const BtnBack_Navigation = async (Matchid) => {
   try{
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
        navigation.navigate('MyMatch',{
          LoadRef:"True"
        });
      });
   } catch (error) {
     alert(error);
     return;
   }
  }

  const MyTeam = async () => {
    // console.log(TeamAid)
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/MyTeam/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: global.MobileNo,
            Where_nq_MyTeamid:TeamAid
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
                      id: List.MYTEAMID,
                      MobileNo: List.MOBILENO,
                      MyTeam_Guid: List.MYTEAM_GUID,
                      ImageName: List.IMAGENAME,
                      imgtitle: List.IMGTITLE,
                      title: List.TITLE,
                      CityId: List.CITYID,
                      CityName: List.CITYNAME,
                      Color: "gray",
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.MYTEAMID,
                  MobileNo: List.MOBILENO,
                  MyTeam_Guid: List.MYTEAM_GUID,
                  ImageName: List.IMAGENAME,
                  imgtitle: List.IMGTITLE,
                  title: List.TITLE,
                  CityId: List.CITYID,
                  CityName: List.CITYNAME,
                  Color: "gray",
                });
              }
              // console.log(setarray)
              setListItems(setarray);
              setRefreshing(false);
              //setDisplayList("true");
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

  const Selectteam = (id,title) => {
    setSelectedItem(id)
    setTeamBName(title)
  } 

  const renderItem = ({ item }) => (
    <View 
    //style={[styles.item, { borderColor: item.Color, borderWidth: 3 }]}
    style={[styles.listItem, selectedItem === item.id ? styles.selectedItem : null]}
    >

      <Pressable onPress={() => Selectteam(item.id,item.title)}>
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
            {/* <View style={[styles.img]}>
              <Text style={styles.imgtitle}>{item.imgtitle}</Text>
            </View> */}
            {item.ImageName != null ? (
              <Image
                source={{
                  uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                }}
                style={styles.img}
              />
            ) : (
              <View style={[styles.img]}>
                <Text style={styles.imgtitle}>{item.imgtitle}</Text>
              </View>
            )}
          </View>
          <View style={[styles.body60]}>
            <View style={{ marginLeft: 5 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "900",color:Color.FontColor }}>
                  {item.title}
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
        </View>
      </Pressable>
    </View>
  );

  const BtnNext = async () => {
    // console.log(selectedItem)
    // console.log(TeamBName)
    if (selectedItem != null) {
      try {
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/IndividualMatch`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            },
            body: JSON.stringify({
              Oper: 'Edit_TeamB',
              MobileNo: global.MobileNo,
              TeamAid:"",
              TeamAName:"",
              TeamBid:selectedItem,
              TeamBName:TeamBName,
              Matchid:Matchid,
              LastPageName:"TeamBSelectPlayer",
            }),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            /*-------------------- Page Call -----------------------*/
            setTeamAddFlag(1)
            var BindData = JSON.parse(json);
            if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
              //console.log(selectedItem+","+TeamBName);
              
              navigation.navigate("TeamBSelectPlayer", {
                Matchid: Matchid,
                TeamBid:selectedItem,
                TeamBName:TeamBName,
                PageName: TeamBName,
                RedirectPage:RedirectPage
              });
              // if(BindData.SERVICERESPONSE.MATCHID)
              // {
              //   setMatchid(BindData.SERVICERESPONSE.MATCHID)
                
              //   if(BindData.SERVICERESPONSE.MATCHID)
              //   {
              //     var PageName = BindData.SERVICERESPONSE.TEAMBNAME != '' ? BindData.SERVICERESPONSE.TEAMBNAME : '';
                  
              //     navigation.navigate("TeamASelectPlayer", {
              //       Matchid: BindData.SERVICERESPONSE.MATCHID,
              //       TeamBid:selectedItem,
              //       TeamBName:PageName,
              //       PageName: PageName,
              //     });
              //   }
              // }
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
      Alert.alert("Warning", "Please at list one team select.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.BannerBox}>
        <Pressable
          onPress={() =>
            navigation.navigate("CreateMyTeam",{Team_RedirectPage:"TeamB"})
          }
        >
          <View style={styles.BannerSpaceBetween}>
            <Text style={styles.BannerTitle}>
              Want to create a new team ?
            </Text>
            <Text style={styles.BannerTitle}>CREATE</Text>
          </View>
        </Pressable>
      </View>

      {listItems.length == "0" ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
            <View
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
                onPress={() => alert("coming soon")}
              />
            </View>
            <View style={[styles.body40, { paddingLeft: 20 }]}>
              <Custombutton
                title={"Create Team"}
                onPress={() =>
                  navigation.navigate("CreateMyTeam",{Team_RedirectPage:"TeamB"})
                }
              />
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
      <View>
        <View
          style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }]}
        >
          <Pressable
            style={[styles.button, styles.body100]}
            onPress={() => BtnNext()}
          >
            <Text style={styles.footerText}>NEXT</Text>
          </Pressable>
        </View>
      </View>
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
    elevation:3
  },
  img: {
    height: 60,
    width: 60,
    borderColor: Color.Texttitle,
    borderWidth: 2,
    backgroundColor: "#DC7633",
    
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "900",
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
  listItem: {
    padding: 10,
    borderWidth: 3,
    borderColor: 'gray',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  selectedItem: {
    borderColor: 'green',
    borderWidth: 3,
  },
});

export default TeamB
