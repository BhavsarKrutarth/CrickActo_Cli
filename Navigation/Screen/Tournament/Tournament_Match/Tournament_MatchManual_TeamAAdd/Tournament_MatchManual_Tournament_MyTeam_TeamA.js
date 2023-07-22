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
} from "react-native";
import React, { useState, useEffect } from "react";

import LineButton from "../../../../../Component/LineButton/LineButton";
import Custombutton from "../../../../../Component/PressableButton/Custombutton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import Color from "../../../../../Color/Color";
import { ScrollView } from "react-native-gesture-handler";
/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
/* -----------------------refreshing ------------------------------*/
const Tournament_MatchManual_Tournament_MyTeam_TeamA = (props) => {
  const route = useRoute();
  const [Roundid, setRoundid] = useState(null);
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
  const [Matchid, setMatchid] = useState(0);
  const [TeamAddFlag, setTeamAddFlag] = useState(0);
  const [Oper, setOper] = useState("add");

  const [selectedItem, setSelectedItem] = useState(null);
  const [TeamAName, setTeamAName] = useState(null);
  const [RedirectPage, setRedirectPage] = useState(null);

  React.useEffect(() => {
    console.log("Navigation/Screen/Tournament/Tournament_Match/Tournament_MatchManual_TeamAAdd/Tournament_MatchManual_Tournament_MyTeam_TeamA.js");

    MyTeam();

    if (route.params?.Roundid) setRoundid(route.params?.Roundid);
    if (route.params?.RedirectPage) setRedirectPage(route.params?.RedirectPage);

  }, [route.params, Matchid]);

  const BtnNext = async () => {
    if (selectedItem != null) {
      var url = `${global.domainName}/cricbuddyAPI/api/Commonsp`;

      var data = {
        OPER: "Add",
        TOURNAMENTID: global.Tournamentid,
        ROUNDID: Roundid,
        MYTEAM_GUID: selectedItem,
        MOBILENO: global.MobileNo,
        LASTPAGENAME: "Tournament_Match_TeamAPlayer",
        SPNAME: "TOURNAMENT_MATCH_CRUD",
        REDIRECTPAGE:RedirectPage
      };
      const resposneJSON = await fetch(`${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          SpName: "TOURNAMENT_MATCH_CRUD",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
            navigation.navigate("Tournament_Match_TeamAPlayer", {
              Roundid: Roundid,
              MyTeam_GuId: selectedItem,
              Tournament_Matchid:BindData.SERVICERESPONSE.Tournament_Matchid,
              RedirectPage:RedirectPage
            });
          }
          return json;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      Alert.alert("Warning", "Please Select At List One Team.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const MyTeam = async () => {
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
            Where_nq_MyTeamid: "",
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

  const Selectteam = (id, title) => {
    setSelectedItem(id);
    setTeamAName(title);
  };

  const renderItem = ({ item }) => (
    <View
      //style={[styles.item, { borderColor: item.Color, borderWidth: 3 }]}
      style={[
        styles.listItem,
        selectedItem === item.MyTeam_Guid ? styles.selectedItem : null,
      ]}
    >
      <Pressable onPress={() => Selectteam(item.MyTeam_Guid, item.title)}>
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
                <Text style={{ fontSize: 18, fontWeight: "900" }}>
                  {item.title}
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
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.Container}>
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
                onPress={() => alert("click")}
              />
            </View>
            <View style={[styles.body40, { paddingLeft: 20 }]}>
              <Custombutton
                title={"Create Team"}
                onPress={() =>
                  //navigation.navigate("CreateMyTeam",{Team_RedirectPage:"TeamA"})
                  navigation.navigate("CreateMyTeam", {
                    Team_RedirectPage: "TeamA",
                  })
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
      {listItems.length > 0 ? (
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
    elevation: 3,
  },
  img: {
    height: 60,
    width: 60,
    borderColor: Color.Texttitle,
    borderWidth: 2,
    backgroundColor: "#DC7633",
    color: Color.WhiteBGColor,
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
    borderColor: "gray",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  selectedItem: {
    borderColor: "green",
    borderWidth: 3,
  },
});

export default Tournament_MatchManual_Tournament_MyTeam_TeamA;
