import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import Color from "../../../../../Color/Color";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Unorderedlist from "react-native-unordered-list";

const Tournament_AddGroups = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ListItems, setListItems] = useState([]);
  const [Team_ListItems, setTeam_ListItems] = useState([]);
  const [GroupName, setGroupName] = useState(null);
  const [RedirectPage,setRedirectPage] = useState(null)

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
                    label: List.RoundName,
                    value: List.Roundid,
                    Tournamentid: List.Tournamentid,
                    RoundType: List.RoundType,
                    RoundName: List.RoundName,
                  });
                });
              }
            } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
              setarray.push({
                id: List.Roundid,
                label: List.RoundName,
                value: List.Roundid,
                Tournamentid: List.Tournamentid,
                RoundType: List.RoundType,
                RoundName: List.RoundName,
              });
            }
            setListItems(setarray);
          } else if (BindData.SERVICERESPONSE.TOTALRECORDS == "0") {
            Alert.alert(
              "Add Rounds First",
              "Before adding agroup,you need to add rounds.",
              [
                {
                  text: "OK",
                  onPress: () =>
                    navigation.navigate("Tournament_AddRound", {
                      RedirectPage: "Tournament_AddGroups",
                      PageName: "Add Round",
                    }),
                },
              ]
            );
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
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Color.PrimaryColor }]}>
          Select Round
        </Text>
      );
    }
    return null;
  };

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentRightSide_Navigation/AddGroups/Tournament_AddGroups.js"
    );


    if(route.params?.RedirectPage)
      setRedirectPage(route.params?.RedirectPage)

    Tournament_RoundList_GET();
    TournamentMyTeam();
  }, [route.params]);

  const TournamentMyTeam = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/TournamentMyTeam/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            Tournamentid: global.Tournamentid,
            MobileNo: global.MobileNo,
          },
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
                    id: List.TOURNAMENT_MYTEAMID,
                    TOURNAMENT_MYTEAMID: List.TOURNAMENT_MYTEAMID,
                    TOURNAMENTID: List.TOURNAMENTID,
                    TOURNAMENTNAME: List.TOURNAMENTNAME,
                    MOBILENO: List.MOBILENO,
                    MYTEAM_GUID: List.MYTEAM_GUID,
                    IMAGENAME: List.IMAGENAME,
                    IMGTITLE: List.IMGTITLE,
                    TITLE: List.TITLE,
                    CITYID: List.CITYID,
                    CITYNAME: List.CITYNAME,
                    MYTEAMID: List.MYTEAMID,
                    Color: "gray",
                  });
                });
              }
            } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
              setarray.push({
                id: List.TOURNAMENT_MYTEAMID,
                TOURNAMENT_MYTEAMID: List.TOURNAMENT_MYTEAMID,
                TOURNAMENTID: List.TOURNAMENTID,
                TOURNAMENTNAME: List.TOURNAMENTNAME,
                MOBILENO: List.MOBILENO,
                MYTEAM_GUID: List.MYTEAM_GUID,
                IMAGENAME: List.IMAGENAME,
                IMGTITLE: List.IMGTITLE,
                TITLE: List.TITLE,
                CITYID: List.CITYID,
                CITYNAME: List.CITYNAME,
                MYTEAMID: List.MYTEAMID,
                Color: "gray",
              });
            }
            setTeam_ListItems(setarray);

            // setMyTeamData(true)
          } else {
            setTeam_ListItems([]);
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
    if (value == null) {
      alert("First Select Round.");
      return;
    }
    if (GroupName == null) {
      alert("Enter the Group Name(e.g. Group A or Group Stage).");
      return;
    }
    var leng = Team_ListItems.filter((List) => List.Color === "green").length;
    if (leng == 0) {
      alert("At List One Team Select in Group.");
      return;
    }
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Tournament_Group`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            oper: "add",
            Tournamentid: global.Tournamentid,
            TournamentName: global.TournamentName,
            MobileNo: global.MobileNo,
            GroupName: GroupName,
            LastPageName: "TOURNAMENT_GROUP_CRUD",
            Team_ListItems: Team_ListItems.filter(
              (List) => List.Color === "green"
            ),
            ListItems: ListItems.filter((List) => List.value === value),
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          console.log(BindData);
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            //"Tournament_Groups"
            navigation.navigate(RedirectPage, {
              LoadRef: "true",
            });
          } else if (BindData.SERVICERESPONSE.RESPONSECODE == "-1") {
            alert(BindData.SERVICERESPONSE.RESPONSEMESSAGE);
          }

          // navigation.navigate('TeamACaptain_WicketKeeper', {
          //   MyTeam,
          //   MyTeamId,
          //   Matchid,
          //   PageName: "Captain,Keeper",
          //   TeamAPlayerCount: listItems.filter(List => List.Color === 'green').length,
          //   RedirectPage: RedirectPage
          // });
        });
    } catch (error) {
      alert(error);
      return;
    }
  };
  const TeamSelectByid = (id) => {
    var index = Team_ListItems.findIndex((List) => List.id === id);
    if (Team_ListItems[index].Color == "gray") {
      Team_ListItems[index].Color = "green";
    } else if (Team_ListItems[index].Color == "green") {
      Team_ListItems[index].Color = "gray";
    }
    var newArray = [...Team_ListItems];
    setTeam_ListItems(newArray);
  };
  return (
    <View style={[styles.container, { position: "relative" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.body100]}>
          {renderLabel()}
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: Color.PrimaryColor, borderWidth: 2 },
              { marginTop: 10 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={ListItems}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select Round" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? Color.PrimaryColor : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>
        <View style={[styles.body100, { marginTop: 17 }]}>
          <TextInput
            placeholder="Group Name(e.g. Group A or Group Stage)"
            style={{
              borderBottomColor: Color.borderColor,
              borderBottomWidth: 2,
            }}
            onChangeText={setGroupName}
            value={GroupName}
          />
        </View>
        <View style={[styles.body100, { marginTop: 17 }]}>
          <Text>Select Teams</Text>
        </View>
        <View style={[styles.body100, { marginTop: 17 }]}>
          {Team_ListItems.length == "0" ? (
            <Pressable
              style={styles.AddNewbtn}
              onPress={() => {
                navigation.navigate("Tournament_AddTeamsList", {
                  Team_RedirectPage: "Tournament_AddGroups",
                });
              }}
            >
              <Image
                style={styles.mainImg}
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/icon_plus.png`,
                }}
              />
              <Text style={{ marginLeft: 17, fontWeight: "600" }}>
                Add New Teams
              </Text>
            </Pressable>
          ) : (
            <>
              {Team_ListItems.map((item, index) => (
                <View key={index}>
                  <Pressable
                    style={[
                      styles.body100,
                      styles.BorderBottom,
                      {
                        flexDirection: "row",
                        padding: 12,
                        borderColor: item.Color,
                      },
                    ]}
                    onPress={() => TeamSelectByid(item.id)}
                  >
                    <View>
                      {item.IMAGENAME ? (
                        <Image
                          style={styles.mainImg}
                          source={{
                            uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.IMAGENAME}`,
                          }}
                        />
                      ) : (
                        <>
                          <Image
                            style={styles.mainImg}
                            source={{
                              uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/UserProfile.png`,
                            }}
                          />
                        </>
                      )}
                    </View>
                    <View style={styles.Bordertext}>
                      <Text style={{ fontSize: 15 }}>{item.TITLE}</Text>
                    </View>
                  </Pressable>
                </View>
              ))}
            </>
          )}

          <View
            style={[
              styles.body100,
              {
                marginTop: 17,
                borderBottomColor: Color.borderColor,
                borderBottomWidth: 2,
              },
            ]}
          ></View>
        </View>
        <View style={[styles.body100, { marginTop: 17 }]}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>
            Important Notes
          </Text>
          <Unorderedlist color="orange">
            <Text>Same group teams play aginst each other.</Text>
          </Unorderedlist>
          <Unorderedlist color="orange">
            <Text>
              if this is like an IPL format.put all teams under One Group.
            </Text>
          </Unorderedlist>
        </View>
        {Team_ListItems.length != "0" ? (
          <View style={[styles.body100, { position: "absolute", bottom: 0 }]}>
            <Pressable style={styles.btnsave} onPress={() => btnSave()}>
              <Text style={{ color: "white" }}>Add Groups</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 0,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  body100: {
    width: "100%",
  },
  mainImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  AddNewbtn: {
    borderColor: Color.borderColor,
    borderWidth: 2,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  BorderBottom: {
    // borderColor: Color.borderColor,
    borderWidth: 5,
    marginBottom: 20,
  },
  Bordertext: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 17,
  },
  btnsave: {
    backgroundColor: Color.PrimaryColor,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
});

export default Tournament_AddGroups;
