import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Color from "../../../../../Color/Color";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const TournamentMatch_ScheduleAutoMach = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [btnDisplay, setbtnDisplay] = useState(false);
  const [LoadRef, setLoadRef] = useState(null);
  const [ListItems, setListItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [Round, setRound] = useState(null);
  const [RoundType,setRoundType] = useState(null);

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentMatch/TournamentMatch_ScheduleAutoMach.js"
    );
    if (route.params?.LoadRef) {
      Tournament_RoundList_GET();
    }

    Tournament_RoundList_GET();
  }, [route.params]);

  const TOURNAMENT_GROUP_GET_GET = async (Roundid) => {
    try {
      var data = {
        TOURNAMENTID: global.Tournamentid,
        MobileNo: global.MobileNo,
        ROUNDID:Roundid,
        SPNAME: "TOURNAMENT_GROUP_GET",
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: global.MobileNo,
            Tournamentid: global.Tournamentid,
            SpName: "TOURNAMENT_GROUP_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.TOTALRECORDS == "0") {
            Alert.alert(
              "Add Groups",
              "if you need points table, you will have to add Groups.Do you want to add Groups now?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                   alert("No recored found for tournament round group terms,First Create Group.")
                  },
                  style: "cancel",
                },
                {
                  text: "Yes I'M SURE",
                  onPress: () =>
                    // alert("Click Btn")
                    navigation.navigate("Tournament_AddGroups", {
                      RedirectPage: "TournamentMatch_AutoMatch_Registration",
                    }),
                },
              ]
            );
          } else if (BindData.SERVICERESPONSE.TOTALRECORDS > 0) {
            navigation.navigate("TournamentMatch_AutoMatch_Registration", {
              PageName:"Auto Schedule - " + Round,
              Roundid: selectedItem,
              RoundName:Round,
              RoundType:RoundType
            });
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

  const Tournament_RoundList_GET = async () => {
    try {
      var data = {
        Tournamentid: global.Tournamentid,
        MobileNo: global.MobileNo,
        SPNAME: "TOURNAMENT_ROUND_GET",
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/` + global.MobileNo,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: global.MobileNo,
            Tournamentid: global.Tournamentid,
            SpName: "TOURNAMENT_ROUND_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);

          var List;
          if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
            List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
            var setarray = [];
            if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
              if (List) {
                List.forEach((List) => {
                  setarray.push({
                    id: List.Roundid,
                    Tournamentid: List.Tournamentid,
                    RoundType: List.RoundType,
                    RoundName: List.RoundName,
                    Color: "gray",
                  });
                });
              }
            } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
              setarray.push({
                id: List.Roundid,
                Tournamentid: List.Tournamentid,
                RoundType: List.RoundType,
                RoundName: List.RoundName,
                Color: "gray",
              });
            }
            setListItems(setarray);
            setbtnDisplay(true);
            // setMyTeamData(true)
          } else {
            // setDisplayList("false")
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

  const SelectRound = (id, Round,RoundType) => {
    setSelectedItem(id);
    setRound(Round);
    setRoundType(RoundType)
  };

  const btnSave = () => {
    if (selectedItem == null) {
      Alert.alert("Warning", "Please Select Round First", [
        {
          text: "OK",
          onPress: () => {
            return;
          },
        },
      ]);
    } else if (selectedItem) {
      // navigation.navigate("Tournament_MatchManual_StartMatch",{
      //   Roundid:selectedItem
      // })

      // console.log(selectedItem)
      // console.log(Round)
      TOURNAMENT_GROUP_GET_GET(selectedItem);
    }
  };

  return (
    <View style={[styles.Container, { position: "relative" }]}>
      <View style={[styles.body100]}>
        <View
          style={[styles.body100, { flexDirection: "row", flexWrap: "wrap" }]}
        >
          {ListItems.map((item, index) => (
            <Pressable
              onPress={() => SelectRound(item.id, item.RoundName,item.RoundType)}
              key={index}
              style={[styles.body33]}
            >
              <View
                style={[
                  styles.body20,
                  styles.btnAddnew,
                  selectedItem === item.id ? styles.selectedItem : null,
                ]}
              >
                <Text style={{ fontWeight: "700", fontSize: 16,color:Color.FontColor }}>
                  {item.RoundName}
                </Text>
              </View>
            </Pressable>
          ))}
          <View style={styles.body33}>
            <Pressable
              style={[
                styles.body20,
                styles.btnAddnew,
                { backgroundColor: "#2a373f" },
              ]}
              onPress={() =>
                navigation.navigate("Tournament_AddRound", {
                  RedirectPage: "TournamentMatch_ScheduleAutoMach",
                  PageName: "Schedule Match Auto",
                })
              }
            >
              <Text style={{ fontWeight: "700", fontSize: 16, color: "white" }}>
                + Add New Round
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {btnDisplay ? (
        <View
          style={[
            styles.body100,
            { flexDirection: "row", bottom: 0, position: "absolute" },
          ]}
        >
          <Pressable
            onPress={() => {
              btnSave();
            }}
            style={[styles.body100, styles.btn_Background]}
          >
            <Text style={{ color: "white", padding: 5 }}>Next</Text>
          </Pressable>
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
  },
  btnAddnew: {
    height: 100,
    width: "100%",
    borderRadius: 10,
    backgroundColor: Color.backgroundColor,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.backgroundColor,
    borderWidth: 2,
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
  body95: {
    width: "95%",
  },
  body70: {
    width: "70%",
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
    width: "33.3333%",
    alignItems: "center",
    padding: 10,
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
  selectedItem: {
    borderColor: "green",
    borderWidth: 3,
  },
});

export default TournamentMatch_ScheduleAutoMach;
