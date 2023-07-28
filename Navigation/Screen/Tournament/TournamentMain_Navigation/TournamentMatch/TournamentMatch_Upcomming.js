import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
  Modal,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Color from "../../../../../Color/Color";
import { Pressable } from "react-native";

const TournamentMatch_Upcomming = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalGuidLineVisible, setmodalGuidLineVisible] = useState(false);

  const UpCommingonRefresh = React.useCallback(() => {
    Bind_TournamentMatch_Upcomming();
    // setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  const [UpComming_refreshing, setUpComming_refreshing] = React.useState(false);
  const [ListItems, setListItems] = useState([]);

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentMatch/TournamentMatch_Upcomming.js"
    );
    Bind_TournamentMatch_Upcomming();
    if (route.params?.LoadRef == "True") {
      Bind_TournamentMatch_Upcomming();
    }
    if (route.params?.ReloadPage == 1) {
      Bind_TournamentMatch_Upcomming();
    }
  }, [route.params]);

  const Bind_TournamentMatch_Upcomming = async () => {
    try {
      var data = {
        TOURNAMENTID: global.Tournamentid,
        SPNAME: "TOURNAMENT_MATCH_UPCOMMING_GET",
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "TOURNAMENT_MATCH_UPCOMMING_GET",
          },
          body: JSON.stringify(data),
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
                      id: List.Tournament_Matchid,
                      Tournamentid: Tournamentid,
                      Status: List.Status,
                      Roundid: List.Roundid,
                      RoundType: List.RoundType,
                      RoundName: List.RoundName,
                      MobileNo: List.MobileNo,
                      LastPageName: List.LastPageName,
                      Description: List.Description,
                      Inningcomplete: List.Inningcomplete,
                      WinTeam: List.WinTeam,
                      TeamAid: List.TeamAid,
                      TeamAName: List.TeamAName,
                      TeamASubName: List.TeamASubName,
                      TeamBid: List.TeamBid,
                      TeamBName: List.TeamBName,
                      TeamBSubName: List.TeamBSubName,
                      TeamACapTainId: List.TeamACapTainId,
                      TeamAKeeperTainId: List.TeamAKeeperTainId,
                      TeamBCapTainId: List.TeamBCapTainId,
                      TeamBKeeperTainId: List.TeamBKeeperTainId,
                      TeamAWicketKeeperid: List.TeamAWicketKeeperid,
                      TeamBWicketKeeperid: List.TeamBWicketKeeperid,
                      MatchType: List.MatchType,
                      NoOfOver: List.NoOfOver,
                      OverperBowler: List.OverperBowler,
                      Cityid: List.Cityid,
                      CityName: List.CityName,
                      Groundid: List.Groundid,
                      GroundName: List.GroundName,
                      MatchDate: List.MatchDate,
                      MatchTime: List.MatchTime,
                      BallType: List.BallType,
                      PitchType: List.PitchType,
                      ShortType: List.ShortType,
                      PowerPlay1To: List.PowerPlay1To,
                      PowerPlay1From: List.PowerPlay1From,
                      PowerPlay2To: List.PowerPlay2To,
                      PowerPlay2From: List.PowerPlay2From,
                      PowerPlay3To: List.PowerPlay3To,
                      PowerPlay3From: List.PowerPlay3From,
                      TeamABatter: List.TeamABatter,
                      TeamBBowler: List.TeamBBowler,
                      StickerPlayerid: List.StickerPlayerid,
                      Streakerid: List.Streakerid,
                      StreakeName: List.StreakeName,
                      RunnerPlayerid: List.RunnerPlayerid,
                      Runnerid: List.Runnerid,
                      RunnerName: List.RunnerName,
                      BowlerPlayerid: List.BowlerPlayerid,
                      Bowlerid: List.Bowlerid,
                      BowlerName: List.BowlerName,
                      Streaker: List.Streaker,
                      Runner: List.Runner,
                      FlagBatter: List.FlagBatter,
                      MyTeam_GuId: List.MyTeam_GuId,
                      RedirectPage: List.RedirectPage,
                      TeamAPlayerCount: List.TeamAPlayerCount,
                      MyTeamB_GuId: List.MyTeamB_GuId,
                      TeamBPlayerCount: List.TeamBPlayerCount,
                      GroundNameDisplay: List.GroundNameDisplay,
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.Tournament_Matchid,
                  Tournamentid: Tournamentid,
                  Status: List.Status,
                  Roundid: List.Roundid,
                  RoundType: List.RoundType,
                  RoundName: List.RoundName,
                  MobileNo: List.MobileNo,
                  LastPageName: List.LastPageName,
                  Description: List.Description,
                  Inningcomplete: List.Inningcomplete,
                  WinTeam: List.WinTeam,
                  TeamAid: List.TeamAid,
                  TeamAName: List.TeamAName,
                  TeamASubName: List.TeamASubName,
                  TeamBid: List.TeamBid,
                  TeamBName: List.TeamBName,
                  TeamBSubName: List.TeamBSubName,
                  TeamACapTainId: List.TeamACapTainId,
                  TeamAKeeperTainId: List.TeamAKeeperTainId,
                  TeamBCapTainId: List.TeamBCapTainId,
                  TeamBKeeperTainId: List.TeamBKeeperTainId,
                  TeamAWicketKeeperid: List.TeamAWicketKeeperid,
                  TeamBWicketKeeperid: List.TeamBWicketKeeperid,
                  MatchType: List.MatchType,
                  NoOfOver: List.NoOfOver,
                  OverperBowler: List.OverperBowler,
                  Cityid: List.Cityid,
                  CityName: List.CityName,
                  Groundid: List.Groundid,
                  GroundName: List.GroundName,
                  MatchDate: List.MatchDate,
                  MatchTime: List.MatchTime,
                  BallType: List.BallType,
                  PitchType: List.PitchType,
                  ShortType: List.ShortType,
                  PowerPlay1To: List.PowerPlay1To,
                  PowerPlay1From: List.PowerPlay1From,
                  PowerPlay2To: List.PowerPlay2To,
                  PowerPlay2From: List.PowerPlay2From,
                  PowerPlay3To: List.PowerPlay3To,
                  PowerPlay3From: List.PowerPlay3From,
                  TeamABatter: List.TeamABatter,
                  TeamBBowler: List.TeamBBowler,
                  StickerPlayerid: List.StickerPlayerid,
                  Streakerid: List.Streakerid,
                  StreakeName: List.StreakeName,
                  RunnerPlayerid: List.RunnerPlayerid,
                  Runnerid: List.Runnerid,
                  RunnerName: List.RunnerName,
                  BowlerPlayerid: List.BowlerPlayerid,
                  Bowlerid: List.Bowlerid,
                  BowlerName: List.BowlerName,
                  Streaker: List.Streaker,
                  Runner: List.Runner,
                  FlagBatter: List.FlagBatter,
                  MyTeam_GuId: List.MyTeam_GuId,
                  RedirectPage: List.RedirectPage,
                  TeamAPlayerCount: List.TeamAPlayerCount,
                  MyTeamB_GuId: List.MyTeamB_GuId,
                  TeamBPlayerCount: List.TeamBPlayerCount,
                  GroundNameDisplay: List.GroundNameDisplay,
                });
              }
              setListItems(setarray);

              // setselectedSquad(setarray.filter(List => List.Color === 'green').length)
            } else {
              //setDisplayList("false")
              setListItems([]);
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

  const renderItem = ({ item }) => (
    <View
      style={[styles.item, { borderColor: Color.borderColor, borderWidth: 1 }]}
    >
      <Pressable
        onPress={() => {
          // console.log(item.id);
          // console.log(item.Tournamentid)
          // console.log(item.Roundid)
          // console.log(item.MyTeam_GuId)
          // console.log(item.TeamAid)
          // console.log(item.TeamAName)
          // console.log(item.LastPageName)

          var data = {
            Tournament_Matchid: item.id,
            Tournamentid: item.Tournamentid,
            Roundid: item.Roundid,
            RedirectPage: item.RedirectPage,
          };
          if (
            item.LastPageName == "Tournament_Match_TeamAPlayer" ||
            item.LastPageName == "Tournament_Match_TeamACaptain_WicketKeeper"
          ) {
            (data.MyTeam_GuId = item.MyTeam_GuId),
              (data.MyTeamId = item.TeamAid),
              (data.MyTeam = item.TeamAName),
              (data.TeamAPlayerCount = item.TeamAPlayerCount);
          } else if (item.LastPageName == "Tournament_MatchManual_StartMatch") {
            (data.MyTeamAId = item.TeamAid),
              (data.MyTeamA = item.TeamAName),
              (data.TeamAPlayerCount = item.TeamAPlayerCount),
              (data.MyTeam_GuId = item.MyTeam_GuId);
          } else if (item.LastPageName == "Tournament_Match_TeamBPlayer") {
            (data.MyTeam_GuId = item.MyTeamB_GuId),
              (data.TeamBid = item.TeamBid);
            data.TeamBName = item.TeamBName;
            data.MyTeam = item.TeamBName;
            data.MyTeamId = item.TeamBid;
          } else if (
            item.LastPageName == "Tournament_Match_TeamBCaptain_WicketKeeper"
          ) {
            data.MyTeam_GuId = item.MyTeamB_GuId;
            data.TeamBid = item.TeamBid;
            data.TeamBName = item.TeamBName;
            data.MyTeam = item.TeamBName;
            data.MyTeamId = item.TeamBid;
            data.TeamAPlayerCount = item.TeamBPlayerCount;
          } else if (item.LastPageName == "Tournament_MatchInnings") {
            data.TeamABatterid = item.TeamAid;
            data.TeamBBowlerid = item.TeamBid;
            data.TeamABatterName = item.TeamAName;
            data.TeamBBowlerName = item.TeamBName;
          }
          navigation.navigate(item.LastPageName, data);
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
          <View style={[styles.body75]}>
            <Text style={[styles.italic]}>Tournament Match</Text>
          </View>
          <View
            style={[
              styles.body25,
              {
                alignItems: "center",
                backgroundColor: Color.PrimaryColor,
                padding: 5,
                borderRadius: 20,
              },
            ]}
          >
            <Text style={[styles.italic, { color: "white" }]}>
              {item.Status}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.body100,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <Text style={[styles.italic,{color:Color.FontColor}]}>{item.GroundNameDisplay}</Text>
        </View>

        <View style={[styles.body100, styles.BorderBottom]}>
          {item.DisplayGroundName != null ? (
            <Text style={{color:Color.FontColor}}>{item.GroundName}</Text>
          ) : null}
        </View>
        <View style={[styles.body100, styles.BannerSpaceBetween]}>
          <Text style={{color:Color.FontColor}}>{item.TeamAName}</Text>
          {/* <Text style={{ fontWeight: "700" }}>Yet to bat</Text> */}
        </View>
        <View
          style={[
            styles.body100,
            styles.BannerSpaceBetween,
            styles.BorderBottom,
          ]}
        >
          <Text style={{color:Color.FontColor}}>{item.TeamBName}</Text>
          {/* <Text style={{ fontWeight: "700" }}>Yet to bat</Text> */}
        </View>
        <View style={[styles.body100, styles.BannerSpaceBetween]}>
          {item.MatchDate ? (
            <Text style={{color:Color.FontColor}}>
              Match Scheduled to begin {item.MatchDate} {item.MatchTime}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
  return (
    <View style={{ flex: 1, position: "relative" }}>
      {ListItems.length == 0 ? (
        <View style={[styles.body100]}>
          <RefreshControl
            refreshing={UpComming_refreshing}
            onRefresh={UpCommingonRefresh}
          >
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/tournament/tournament_Background.png",
              }}
              style={styles.Image}
            />
          </RefreshControl>
        </View>
      ) : (
        <SafeAreaView style={[styles.Container]}>
          <View style={{height: "100%"}}>
          <FlatList
            data={ListItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={UpComming_refreshing}
                onRefresh={UpCommingonRefresh}
              />
            }
          />
          </View>
        </SafeAreaView>
      )}
      {global.TournamentAdmin == 1 ? (
        <View
          style={[
            styles.body100,
            { flexDirection: "row" },
          ]}
        >
          <View style={[styles.body48, styles.btn_Background]}>
            <Pressable
              onPress={() => {
                setmodalVisible(false);
                setmodalVisible(true);
              }}
            >
              <Text style={{ color: "white" }}>SEHEDULE MATCHES</Text>
            </Pressable>
          </View>
          <View style={styles.body02}></View>
          <View style={[styles.body48, styles.btn_Border]}>
            <Pressable
              onPress={
                () =>
                  navigation.navigate("Tournament_SchedualeMatch", {
                    PageName: "Schedule Match",
                  })
                // navigation.navigate("Tournament_MatchManual_Tournament_MatchRegister", {
                //   Tournamentid: 2128,
                //   Tournament_Matchid:76
                //   })
              }
            >
              <Text style={{color:Color.FontColor}}> START A MATCH</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({ modalVisible: !modalVisible });
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.body100]}>
            <View style={styles.body100}>
              <Text
                style={[
                  styles.modalText,
                  {
                    fontSize: 18,
                    color: Color.PrimaryColor,
                    fontWeight: "900",
                  },
                ]}
              >
                How do you want to schedule?
              </Text>
            </View>
            <View style={[styles.body100, { flexDirection: "row" }]}>
              <Pressable
                style={[styles.body48, styles.modalbtn]}
                onPress={() => {
                  setmodalVisible(false);
                  navigation.navigate("Tournament_SchedualeMatch", {
                    PageName: "Schedule Match Manual",
                  });
                }}
              >
                <Image
                  source={{
                    uri:
                      "" +
                      global.domainName +
                      "/CricbuddyAdmin/Content/assets/Manual2.png",
                  }}
                  style={styles.modalImage}
                />
                <Text style={{color:Color.FontColor}}>Manual</Text>
              </Pressable>
              <View style={styles.body02}></View>
              <Pressable
                style={[styles.body48, styles.modalbtn]}
                onPress={() => {
                  setmodalVisible(false);
                  setmodalGuidLineVisible(false);
                  setmodalGuidLineVisible(true);
                }}
              >
                <Image
                  source={{
                    uri:
                      "" +
                      global.domainName +
                      "/CricbuddyAdmin/Content/assets/automation.png",
                  }}
                  style={styles.modalImage}
                />
                <Text style={{color:Color.FontColor}}>Automation</Text>
              </Pressable>
            </View>
            <View style={[styles.body100, { marginTop: 10 }]}>
              <Pressable
                style={styles.modalclose}
                onPress={() => {
                  setmodalVisible(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 14 }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalGuidLineVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({ modalVisible: !modalGuidLineVisible });
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.body100]}>
            <View style={styles.body100}>
              <Text style={[styles.modalText, styles.ModalTitle]}>
                Auto Schedule Guidlines
              </Text>
            </View>
            <View style={styles.body100}>
              <Text style={{fontSize:18,color:Color.TextTitle2}}>
                1) Make Sure all the teams are addes in the tournament first.At least the names of the teams.
              </Text>
            </View>
            <View style={[styles.body100,{marginTop:10}]}>
              <Text style={{fontSize:18,color:Color.TextTitle2}}>
                2)  Please add all required ROUNDS and GROUPS beforehand.
              </Text>
            </View>
            <View style={[styles.body100, { marginTop: 10 }]}>
              <Pressable
                style={styles.modalclose}
                onPress={() => {
                  setmodalGuidLineVisible(false);
                  navigation.navigate("TournamentMatch_ScheduleAutoMach")
                }}
              >
                <Text style={{ color: "white", fontSize: 14 }}>Next</Text>
              </Pressable>
            </View>
          </View>
          
        </View>
      </Modal>
    </View>
  );
};

export default TournamentMatch_Upcomming;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
  },
  Border: {
    borderColor: Color.borderColor,
    borderWidth: 2,
    padding: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  body100: {
    width: "100%",
  },
  body80: {
    width: "80%",
  },
  body95: {
    width: "95%",
  },
  body70: {
    width: "70%",
  },
  body75: {
    width: "75%",
  },
  body40: {
    width: "40%",
  },
  body10: {
    width: "10%",
  },
  body20: {
    width: "20%",
  },
  body60: {
    width: "60%",
  },
  body33: {
    width: "30%",
  },
  body01: {
    width: "05%",
  },
  body50: {
    width: "50%",
  },
  body48: {
    width: "48%",
  },
  body02: {
    width: "02%",
  },
  body25: {
    width: "25%",
  },
  Image: {
    marginTop: 10,
    height: 400,
    width: "auto",
  },
  btn_Background: {
    alignItems: "center",
    backgroundColor: Color.PrimaryColor,
    padding: 7,
    borderRadius: 25,
  },
  btn_Border: {
    borderColor: Color.PrimaryColor,
    borderWidth: 2,
    borderRadius: 25,
    alignItems: "center",
    padding: 7,
  },
  centeredView: {
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalbtn: {
    backgroundColor: Color.backgroundColor,
    padding: 25,
    alignItems: "center",
    borderRadius: 15,
  },
  modalImage: {
    width: 60,
    height: 60,
  },
  modalclose: {
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    borderColor: Color.backgroundColor,
    borderWidth: 2,
    backgroundColor: Color.PrimaryColor,
  },
  item: {
    backgroundColor: Color.WhiteBGColor,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  italic: {
    fontStyle: "italic",
    color: Color.GunmetalGray,
  },
  BannerSpaceBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  BorderBottom: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  ModalTitle: {
    fontSize: 24,
    color: Color.PrimaryColor,
    fontWeight: "900",
  },
});
