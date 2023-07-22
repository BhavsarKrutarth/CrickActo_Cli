import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
  Modal,
  RadioButton,
  RefreshControl
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../Color/Color";
import { useState } from "react";

const TournamentPointsTable = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [PointTableData, setPointTableData] = useState([]);
  const [FistTimeLoad, setFistTimeLoad] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalPointTableData, setModalPointTableData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    PointTable_GetData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
/* -----------------------refreshing ------------------------------*/
  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentPointsTable.js"
    );
    if (FistTimeLoad) PointTable_GetData();
  });

  const PointTable_GetData = async () => {
    try {
      var data = {
        TOURNAMENTID: global.Tournamentid,
        SPNAME: "POINTTABLE_GET",
      };

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "POINTTABLE_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            var List = [];
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;

              if (List.length > 1) setPointTableData(List);
              else setPointTableData([List]);

              setFistTimeLoad(false);
            }
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
  const PointTable_Team_GetData = async (teamid, Tournamentid) => {
    try {
      var data = {
        TOURNAMENTID: Tournamentid,
        TEAMID: teamid,
        SPNAME: "POINTTABLE_TEAMLIST_GET",
      };

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "POINTTABLE_TEAMLIST_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            var List = [];
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              console.log(List);
              if (List.length > 1) setModalPointTableData(List);
              else setModalPointTableData([List]);

              setFistTimeLoad(false);
            }
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

  const Bindmatch = (id, Tournamentid) => {
    console.log(id);
    console.log(Tournamentid);
    PointTable_Team_GetData(id, Tournamentid);
    console.log(ModalPointTableData);
    if (ModalPointTableData.length >= 1) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };
  const redirectMatchReport = (id) => {
    navigation.navigate("Report_IndividualMatch", {
      Matchid: id,
      PageName: "Summary",
    });
  };

  const renderItemModal = ({ item }) => (
    <Pressable
      onPress={() => {
        redirectMatchReport(item.Matchid);
      }}
      style={[styles.body100, styles.Team]}
    >
      <Text>
        {item.SrNo} ) {item.TeamName}
      </Text>
      <Text>{item.MatchDate}</Text>
      <Text>{item.MatchDescription}</Text>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <View style={styles.body100}>
      <View style={[styles.body100, styles.GroupBackGround]}>
        <Text style={styles.whitetxt}>
          {item.GroupName} ( {item.RoundType} )
        </Text>
      </View>
      <View
        style={[
          styles.body100,
          styles.TeamBackGround,
          { flexDirection: "row" },
        ]}
      >
        <View style={styles.body40}>
          <Text style={styles.whitetxt}>Team</Text>
        </View>
        <View style={styles.body10}>
          <Text style={styles.whitetxt}>M</Text>
        </View>
        <View style={styles.body10}>
          <Text style={styles.whitetxt}>W</Text>
        </View>
        <View style={styles.body10}>
          <Text style={styles.whitetxt}>L</Text>
        </View>
        <View style={styles.body10}>
          <Text style={styles.whitetxt}>PT</Text>
        </View>

        <View style={[styles.body30, {}]}>
          <Text style={styles.whitetxt}>NRR</Text>
        </View>
      </View>
      {item.GroupDetailslist.GroupDetails.length > 1 ? (
        <>
          {item.GroupDetailslist.GroupDetails.map((item1, index) => (
            <View key={index} style={styles.body100}>
              <View style={[styles.body100]}>
                <Pressable
                  style={[
                    styles.padding10,
                    { flexDirection: "row", backgroundColor: item1.Colorcode },
                  ]}
                  onPress={() => {
                    Bindmatch(item1.MyTeamid, item.Tournamentid);
                  }}
                >
                  <View
                    style={[
                      styles.body100,
                      {
                        flexDirection: "row",
                        backgroundColor: item1.Colorcode,
                      },
                    ]}
                  >
                    <View style={styles.body40}>
                      <Text>{item1.TeamName}</Text>
                    </View>
                    <View style={styles.body10}>
                      <Text>{item1.MatchCount}</Text>
                    </View>
                    <View style={styles.body10}>
                      <Text>{item1.WinCount}</Text>
                    </View>
                    <View style={styles.body10}>
                      <Text>{item1.LossCount}</Text>
                    </View>
                    <View style={styles.body10}>
                      <Text>{item1.Point}</Text>
                    </View>
                    <View style={[styles.body30, { flexDirection: "row" }]}>
                      <Text>{item1.NRR}</Text>

                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/up.png`,
                        }}
                        style={{ height: 20, width: 20, marginLeft: 10 }}
                      />
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          ))}
        </>
      ) : (
        <View
          style={[
            styles.body100,
            styles.padding10,
            { flexDirection: "row", backgroundColor: "#e7e8ea" },
          ]}
        >
          <View style={styles.body30}>
            <Text>{item.GroupDetailslist.GroupDetails.TeamName}</Text>
          </View>
          <View style={styles.body10}>
            <Text>M</Text>
          </View>
          <View style={styles.body10}>
            <Text>W</Text>
          </View>
          <View style={styles.body10}>
            <Text>L</Text>
          </View>
          <View style={styles.body10}>
            <Text>T</Text>
          </View>
          <View style={styles.body10}>
            <Text>PT</Text>
          </View>
          <View style={[styles.body30, { flexDirection: "row" }]}>
            <Text>NRR</Text>
          </View>
        </View>
      )}
      {/* */}
    </View>
  );
  return (
    <View style={styles.Container}>
      {PointTableData.length == 0 ? (
        <View>
          <View style={styles.body100}>
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
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
        </View>
      ) : (
        <SafeAreaView style={[styles.Container]}>
          <View style={[{ height: "100%" }]}>
            {/* -------------------------------- List ----------------------------------------- */}
            <FlatList
              data={PointTableData}
              renderItem={renderItem}
              keyExtractor={(item) => item.Tournament_Group_id}
              // ListHeaderComponent={renderHeader}
            />
          </View>
        </SafeAreaView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modal_centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.Modal_header]}>
                <View style={styles.Modal_HeaderTitle}>
                  <Text style={styles.Modal_Hedertxt}>Team list</Text>
                </View>
              </View>
              <SafeAreaView
                style={[
                  styles.modal_body,
                  { paddingLeft: 20, paddingBottom: 10 },
                ]}
              >
                {/* --------------------------------Modal List ----------------------------------------- */}
                <FlatList
                  data={ModalPointTableData}
                  renderItem={renderItemModal}
                  keyExtractor={(item) => item.Matchid}
                  // ListHeaderComponent={renderHeader}
                />
                {/* --------------------------------Modal List ----------------------------------------- */}
              </SafeAreaView>

              <View style={[styles.Modal_Footer]}>
                <Pressable
                  style={styles.Modla_Cancelbtn}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.Modal_Cancelbtn_text}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Team: {
    padding: 5,
  },
  body100: {
    width: "100%",
  },
  GroupBackGround: {
    backgroundColor: Color.litePirmaryKey,
    padding: 5,
  },
  TeamBackGround: {
    backgroundColor: "#de6e3b",
    padding: 10,
  },
  body20: {
    width: "20%",
  },
  body10: {
    width: "10%",
  },
  body30: {
    width: "30%",
  },
  body40: {
    width: "40%",
  },
  whitetxt: {
    color: "#fff",
  },
  padding10: {
    padding: 10,
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
    backgroundColor: Color.PrimaryColor,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    color: "white",
  },
  Modal_header: {
    width: "100%",
    height: 65,
    backgroundColor: "white",
    flexDirection: "row",
  },
  modal_body: {
    width: "100%",
  },
  Modal_Footer: {
    flexDirection: "row",
    width: "100%",
  },

  Modal_HeaderTitle: {
    justifyContent: "center",
    width: "80%",
    paddingLeft: 20,
  },
  Modal_Hedertxt: {
    fontSize: 16,
    color: Color.PrimaryColor,
    fontWeight: "600",
    fontSize: 18,
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
    paddingLeft: 20,
  },
  Modal_Box: {
    width: "30%",
    height: 80,
    // borderColor:"#3f3f3f",
    borderWidth: 3,
    margin: 5,
  },
  Modal_BoxImg: {
    width: "70%",
    height: "100%",
    resizeMode: "stretch",
  },
  modal_BoximgDiv: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    paddingTop: "5%",
  },
  Image: {
    marginTop: 10,
    height: 400,
    width: "auto",
  },
});
export default TournamentPointsTable;
