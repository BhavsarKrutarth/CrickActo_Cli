import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  Modal,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Color from "../../../../Color/Color";
import { Pressable } from "react-native";
import { color } from "react-native-reanimated";

const Tournament_Groups = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [GroupWiseList, setGroupWiseList] = useState([]);
  const [RedirectPage,setRedirectPage] = useState([]);

  const UpCommingonRefresh = React.useCallback(() => {
    GetGroupWiseList();
  }, []);
  const [UpComming_refreshing, setUpComming_refreshing] = React.useState(false);

  const GetGroupWiseList = async () => {
    try {
      var data = {
        MOBILENO: global.MobileNo,
        TOURNAMENTID: global.Tournamentid,
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
            SpName: "TOURNAMENT_GROUP_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;

          
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                if (List) {
                  
                  List.forEach((List) => {
                    if(List.GROUPDETAILSLIST_TOTAL > 1)
                    {
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
                  else if(List.GROUPDETAILSLIST_TOTAL == 1)
                  {
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
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                if(List.GROUPDETAILSLIST_TOTAL > 1)
                {
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
                else if(List.GROUPDETAILSLIST_TOTAL == 1)
                {
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

  const btnDelete = async (id) => {
    try {
      var data = {
        oper: "Delete",
        Tournament_Group_id: id,
        SPNAME: "TOURNAMENT_GROUP_CRUD",
      };

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "TOURNAMENT_GROUP_CRUD",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            alert("Recored Delete Successfully");
            GetGroupWiseList();
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

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentRightSide_Navigation/Tournament_Groups.js"
    );
    if (route.params?.LoadRef == "True") {
      //console.log(route.params?.LoadRef)
      GetGroupWiseList();
    }

    GetGroupWiseList();
  }, [route.params]);

  return (
    <View style={[styles.Container, styles.body100]}>
      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {GroupWiseList.length == 0 ? (
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
                      "/CricbuddyAdmin/Content/assets/GroupAdd.jpg",
                  }}
                  style={styles.Image}
                />
              </RefreshControl>
            </View>
          ) : (
            <View
              style={[
                styles.body100,
                {
                  flex: 1,
                  marginBottom: 10,
                  borderWidth: 3,
                  borderColor: Color.backgroundColor,
                },
              ]}
            >
              
                {GroupWiseList.map((item, index) => (
                  <View key={index} style={{ width: "100%" }}>
                    <View
                      style={[
                        styles.body100,
                        styles.BorderBottom,
                        { flexDirection: "row", padding: 5 },
                      ]}
                    >
                      <View
                        style={[
                          styles.body100,
                          {
                            backgroundColor: "white",
                            borderWidth: 3,
                            borderColor: Color.backgroundColor,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.body100,
                            {
                              flexDirection: "row",
                              paddingTop: 10,
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <View>
                            <Text
                              style={{
                                paddingLeft: 10,
                                color: Color.TextTitle1,
                              }}
                            >
                              Round Name
                            </Text>
                            <Text style={{ paddingLeft: 10,color:Color.FontColor }}>
                              {item.RoundName}
                            </Text>
                          </View>
                          <View
                            style={{ flexDirection: "row", paddingRight: 10 }}
                          >
                            <Pressable
                              onPress={() => {
                                Alert.alert(
                                  "Confirmation",
                                  "Are you sure you want to delete ?",
                                  [
                                    {
                                      text: "Cancel",
                                      onPress: () =>
                                        console.log("Cancel Pressed"),
                                      style: "cancel",
                                    },
                                    {
                                      text: "OK",
                                      onPress: () => btnDelete(item.id),
                                    },
                                  ]
                                );
                              }}
                            >
                              <Image
                                source={{
                                  uri:
                                    "" +
                                    global.domainName +
                                    "/CricbuddyAdmin/Content/assets/Remove.jpg",
                                }}
                                style={{ height: 25, width: 25 }}
                              />
                            </Pressable>
                          </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <View style={[styles.body100, { paddingLeft: 10 }]}>
                            <Text style={{ color: Color.TextTitle1 }}>
                              Group Name(e.g. Group A or Group Stage)
                            </Text>
                          </View>
                          <View style={[styles.body100, { paddingLeft: 10 }]}>
                            <Text style={{color:Color.FontColor}}>{item.GroupName}</Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                          <View style={[styles.body100, { paddingLeft: 10 }]}>
                            <Text style={{ color: Color.TextTitle1 }}>
                              Teams
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
                                  <View
                                    key={index1}
                                    style={[[styles.TeamsBorder]]}
                                  >
                                    {item1.ImageName ? 
                                    (
                                      <Image
                                      source={{
                                        uri:
                                          "" +
                                          global.domainName +
                                          `/cricbuddyAPI/UploadFiles/UserProfile/${item1.ImageName}`,
                                      }}
                                      style={{ height: 100, width: "100%" }}
                                    />
                                    ):
                                    (
                                      <Image
                                      source={{
                                        uri:
                                          "" +
                                          global.domainName +
                                          `/CricbuddyAdmin/Content/assets/UserProfile/UserProfile.png`,
                                      }}
                                      style={{ height: 100, width: "100%" }}
                                    />
                                    )}
                                    
                                    <Text style={{ textAlign: "center",color:Color.FontColor }}>
                                      {item1.Title}
                                    </Text>
                                  </View>
                                ))}
                              </ScrollView>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
        <View
          style={[
            styles.body100,
            { flexDirection: "row", bottom: 0, position: "absolute" },
          ]}
        >
          <View style={[styles.body100, styles.btn_Background]}>
            <Pressable
              onPress={() => {
                navigation.navigate("Tournament_AddGroups",{RedirectPage:"Tournament_Groups"});
              }}
            >
              <Text style={{ color: "white" }}>Add Groups</Text>
            </Pressable>
          </View>
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
  Image: {
    marginTop: 10,
    height: 400,
    width: "auto",
  },
  btn_Background: {
    alignItems: "center",
    backgroundColor: Color.PrimaryColor,
    padding: 10,
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
  TeamsBorder: {
    marginRight: 10,
    width: 100,
    padding: 2,
    backgroundColor: Color.backgroundColor,
    borderColor: Color.backgroundColor,
    borderWidth: 2,
  },
});

export default Tournament_Groups;
