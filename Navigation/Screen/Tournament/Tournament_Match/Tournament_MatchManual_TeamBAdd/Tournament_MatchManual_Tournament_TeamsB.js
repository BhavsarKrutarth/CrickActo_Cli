import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Color from "../../../../../Color/Color";
import { Pressable } from "react-native";

const Tournament_MatchManual_Tournament_TeamsB = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = React.useState(false);
  const [GroupWiseList, setGroupWiseList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Roundid, setRoundid] = useState(null);
  const [TeamAid, setTeamAid] = useState(null);
  const [TeamAName, setTeamAName] = useState(null);
  const [RedirectPage, setRedirectPage] = useState(null);
  const [Tournament_Matchid, setTournament_Matchid] = useState(null);

  const onRefresh = React.useCallback(() => {
    GetGroupWiseList();
    setRefreshing(true);
  }, []);

  React.useEffect(() => {
    if (route.params?.Roundid) setRoundid(route.params?.Roundid);

    if (route.params?.RedirectPage) setRedirectPage(route.params?.RedirectPage);
    if (route.params?.TeamAid) setTeamAid(route.params?.TeamAid);
    if (route.params?.TeamAName) setTeamAName(route.params?.TeamAName);
    if (route.params?.Tournament_Matchid)
      setTournament_Matchid(route.params?.Tournament_Matchid);

    console.log(
      "Navigation/Screen/Tournament/Tournament_Match/Tournament_MatchManual_TeamBAdd/Tournament_MatchManual_Tournament_TeamsB.js"
    );
    /* Note : Group Wise Team Display in this page */
    GetGroupWiseList(route.params?.TeamAid);

   
    
  }, [route.params]);

  const GetGroupWiseList = async (TeamAid) => {
    try {
      var data = {
        MOBILENO: global.MobileNo,
        TOURNAMENTID: global.Tournamentid,
        SPNAME: "TOURNAMENT_TEAMWISE_GET",
        TEAMAID: TeamAid,
      };

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "TOURNAMENT_TEAMWISE_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          setRefreshing(false);
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != 0) {
              if (BindData.SERVICERESPONSE.DETAILSLIST) {
                List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
                var setarray = [];
                if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                  if (List) {
                    List.forEach((List) => {
                      if (List.GROUPDETAILSLIST_TOTALCOUNT > 1) {
                        setarray.push({
                          id: List.Tournament_Group_id,
                          Tournamentid: List.Tournamentid,
                          TournamentName: List.TournamentName,
                          MobileNo: List.MobileNo,
                          Roundid: List.Roundid,
                          RoundType: List.RoundType,
                          RoundName: List.RoundName,
                          GroupName: List.GroupName,
                          Groupdetailslist: List.GROUPDETAILSLIST.GROUPDETAILS,
                        });
                      } else if (List.GROUPDETAILSLIST_TOTALCOUNT == 1) {
                        setarray.push({
                          id: List.Tournament_Group_id,
                          Tournamentid: List.Tournamentid,
                          TournamentName: List.TournamentName,
                          MobileNo: List.MobileNo,
                          Roundid: List.Roundid,
                          RoundType: List.RoundType,
                          RoundName: List.RoundName,
                          GroupName: List.GroupName,
                          Groupdetailslist: [
                            List.GROUPDETAILSLIST.GROUPDETAILS,
                          ],
                        });
                      }
                    });
                  }
                } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                  if (List.GROUPDETAILSLIST_TOTALCOUNT > 1) {
                    setarray.push({
                      id: List.Tournament_Group_id,
                      Tournamentid: List.Tournamentid,
                      TournamentName: List.TournamentName,
                      MobileNo: List.MobileNo,
                      Roundid: List.Roundid,
                      RoundType: List.RoundType,
                      RoundName: List.RoundName,
                      GroupName: List.GroupName,
                      Groupdetailslist: List.GROUPDETAILSLIST.GROUPDETAILS,
                    });
                  }
                  else if (List.GROUPDETAILSLIST_TOTALCOUNT == 1) {
                    setarray.push({
                      id: List.Tournament_Group_id,
                      Tournamentid: List.Tournamentid,
                      TournamentName: List.TournamentName,
                      MobileNo: List.MobileNo,
                      Roundid: List.Roundid,
                      RoundType: List.RoundType,
                      RoundName: List.RoundName,
                      GroupName: List.GroupName,
                      Groupdetailslist: [List.GROUPDETAILSLIST.GROUPDETAILS],
                    });
                  }
                }
                setGroupWiseList(setarray);
              }
            }
          } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 0) {
            setGroupWiseList([]);
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

  const btnSave = async () => {
    // console.log(selectedItem)
    // console.log(Roundid)
    // console.log(Tournament_Matchid)
    if (selectedItem != null) {
      var url = `${global.domainName}/cricbuddyAPI/api/Commonsp`;

      var data = {
        OPER: "UPDATE",
        TOURNAMENT_MATCHID: Tournament_Matchid,
        TOURNAMENTID: global.Tournamentid,
        ROUNDID: Roundid,
        MYTEAM_GUID: selectedItem,
        MOBILENO: global.MobileNo,
        LASTPAGENAME: "Tournament_Match_TeamBPlayer",
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
            navigation.navigate("Tournament_Match_TeamBPlayer", {
              Roundid: Roundid,
              MyTeam_GuId: selectedItem,
              TeamBid: BindData.SERVICERESPONSE.TeamBid,
              TeamBName: BindData.SERVICERESPONSE.TeamBName,
              Tournament_Matchid: Tournament_Matchid,
              RedirectPage: RedirectPage,
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

  const TeamSelectByid = (id, index, MyTeam_GuId) => {
    /* --------------- Multiple team Select ----------------------*/
    // var index = GroupWiseList.findIndex((List) => List.id === id);
    // if (GroupWiseList[index].Groupdetailslist[MyTeam_GuId].Color == "gray") {
    //   GroupWiseList[index].Groupdetailslist[MyTeam_GuId].Color = "green";
    // } else if (GroupWiseList[index].Groupdetailslist[MyTeam_GuId].Color == "green") {
    //   GroupWiseList[index].Groupdetailslist[MyTeam_GuId].Color = "gray";
    // }
    // var newArray = [...GroupWiseList];
    // setGroupWiseList(newArray);
    /* --------------- Multiple team Select ----------------------*/

    setSelectedItem(MyTeam_GuId);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.body100,
        { borderColor: Color.borderColor, borderWidth: 3, marginTop: 10 },
      ]}
    >
      <View style={[styles.body100, { padding: 10 }]}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {item.GroupName}
        </Text>
      </View>
      <View
        style={[
          styles.body100,
          {
            paddingLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          },
        ]}
      >
        {item.Groupdetailslist && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ flexDirection: "row" }}
          >
            {item.Groupdetailslist.map((item1, index1) => (
              <Pressable
                onPress={() =>
                  TeamSelectByid(item.id, index1, item1.MyTeam_GuId)
                }
                key={index1}
                style={[
                  [styles.TeamsBorder],
                  selectedItem === item1.MyTeam_GuId
                    ? styles.selectedItem
                    : "gray",
                ]}
              >
                <Image
                  source={{
                    uri:
                      "" +
                      global.domainName +
                      `/cricbuddyAPI/UploadFiles/UserProfile/${item1.ImageName}`,
                  }}
                  style={{ height: 100, width: "100%" }}
                />
                <Text style={{ textAlign: "center", paddingTop: 10 }}>
                  {item1.Title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {GroupWiseList.length == 0 ? (
        <>
          <View style={[styles.body100]}>
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/tournament/tournament_Background.png",
              }}
              style={{ with: 400, height: 400 }}
            />
          </View>
        </>
      ) : null}

      {GroupWiseList != 0 ? (
        <>
          <FlatList
            data={GroupWiseList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          {GroupWiseList.length != 0 ? (
            <View style={[styles.body100, { marginTop: 10 }]}>
              <Pressable onPress={() => btnSave()} style={styles.btnsave}>
                <Text style={{ color: "white" }}>Select Team</Text>
              </Pressable>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default Tournament_MatchManual_Tournament_TeamsB;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "white",
    width: "100%",
  },
  body100: {
    width: "100%",
  },
  TeamsBorder: {
    marginRight: 10,
    width: 100,
    backgroundColor: "white",

    borderWidth: 2,
    padding: 10,
  },
  selectedItem: {
    borderColor: "green",
    borderWidth: 3,
  },
  btnsave: {
    backgroundColor: Color.PrimaryColor,
    borderRadius: 21,
    alignItems: "center",
    padding: 10,
  },
});
