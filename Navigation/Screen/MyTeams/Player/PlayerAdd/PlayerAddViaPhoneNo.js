import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ToastAndroid,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  Alert,
  ScrollView
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../../Color/Color";

const PlayerAddViaPhoneNo = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [MyTeam, setMyTeam] = useState(null);
  const [MyTeamId, setMyTeamId] = useState(null);
  const [AddMobileNo, setAddMobileNo] = useState(0);
  const [playerItemList, setplayerItemList] = useState([]);

  const [ErrortxtFullName, setErrortxtFullName] = useState(Color.Texttitle);
  const txtPlayerFullNameRef = useRef(null);
  const txtMobileNoRef = useRef(null);
  const [txtPlayerFullName, settxtPlayerFullName] = useState(null);
  const [txtMobileNo, settxtMobileNo] = useState(null);
  const [ModalVisibale, setModalVisibale] = useState(false);
  const [addBtnVisisble, setaddBtnVisisble] = useState(false);
  const [PLayer_RedirectPage, setPLayer_RedirectPage] = useState(null);

  function showToast(Text) {
    ToastAndroid.show(
      Text,
      ToastAndroid.SHORT, //can be SHORT, LONG
      ToastAndroid.TOP,
      25, //xOffset
      250 //yOffset
    );
  }
  const btnAdd = async (props) => {
    try {
      if (AddMobileNo.length == 10) {
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/UserMaster/` + AddMobileNo,
          {
            method: "GET",
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
            var setarray = [];
            if (BindData.SERVICERESPONSE.TOTALRECORDS == "1") {
              if (BindData.SERVICERESPONSE.DETAILSLIST) {
                List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
                if (List) {
                  var checkDataExists = "false";
                  playerItemList.forEach((element) => {
                    if (element.MobileNo == AddMobileNo) {
                      checkDataExists = "true";
                    } else {
                      checkDataExists = "false";
                    }
                  });

                  if (checkDataExists == "false") {
                    setplayerItemList((playerItemList) => [
                      ...playerItemList,
                      {
                        id: List.USERMASTERID,
                        MobileNo: List.MOBILENO,
                        Name: List.NAME,
                        ImageName: List.IMAGENAME,
                        CountryName: List.COUNTRYNAME,
                        CountryCode: List.COUNTRYCODE,
                        CityId: List.CITYID,
                        Cityname: List.CITYNAME,
                        MyTeamId: MyTeamId,
                        MyTeam: MyTeam
                      },
                    ]);
                  } else {
                    showToast("This Mobile is Exists");
                  }
                  setAddMobileNo("");
                  txtMobileNoRef.current.focus();
                  setaddBtnVisisble(true);
                }
              }
            } else if (BindData.SERVICERESPONSE.TOTALRECORDS == "0") {
              setModalVisibale(true);
              settxtMobileNo(AddMobileNo);
              setAddMobileNo("");
              txtPlayerFullNameRef.current.focus();
            }
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        showToast("Please enter 10 digit phone number.");
      }
    } catch (error) {
      alert(error);
      return;
    } finally {
    }
  };

  const btnAddCall = async (Number) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/UserMaster/` + Number,
        {
          method: "GET",
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
          var setarray = [];
          if (BindData.SERVICERESPONSE.TOTALRECORDS == "1") {
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;

              if (List) {
                var checkDataExists = "false";
                playerItemList.forEach((element) => {
                  if (element.MobileNo == AddMobileNo) {
                    checkDataExists = "true";
                  } else {
                    checkDataExists = "false";
                  }
                });

                if (checkDataExists == "false") {
                  setplayerItemList((playerItemList) => [
                    ...playerItemList,
                    {
                      id: List.USERMASTERID,
                      MobileNo: List.MOBILENO,
                      Name: List.NAME,
                      ImageName: List.IMAGENAME,
                      CountryName: List.COUNTRYNAME,
                      CountryCode: List.COUNTRYCODE,
                      CityId: List.CITYID,
                      Cityname: List.CITYNAME,
                      MyTeamId: MyTeamId,
                      MyTeam: MyTeam,
                    },
                  ]);
                } else {
                  showToast("This Mobile is Exists");
                }
                setAddMobileNo("");
                txtMobileNoRef.current.focus();
                setaddBtnVisisble(true);
              }
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

  const CheckPlayeName = async () => {
    try {

      var data = {
        MOBILENO: global.MobileNo,
        AUTHORIZATION:"FF7B5E5C-A468-4CE0-B812-98008627C8KT",
        NAME:txtPlayerFullName,
        SPNAME: "USERNAMECHECK_GET",
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "USERNAMECHECK_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          if(BindData.SERVICERESPONSE.RESPONSECODE == -1)
          {
            Alert.alert("Warning",BindData.SERVICERESPONSE.RESPONSEMESSAGE)
            return
          }
          else if(BindData.SERVICERESPONSE.RESPONSECODE == 0)
          {
            AddNewPlayer()
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
  const AddNewPlayer = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/UserMaster`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            MobileNo: txtMobileNo,
            CountryName: "IN",
            CountryCode: "91",
            CityName: global.CityName,
            CityId: global.CityId,
            Name: txtPlayerFullName,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          
          setModalVisibale(false);
          btnAddCall(txtMobileNo);
          settxtPlayerFullName("")
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
    console.log("Navigation/Screen/MyTeams/Player/PlayerAdd/PlayerAddViaPhoneNo.js");
    if (route.params?.MyTeamId) setMyTeamId(route.params?.MyTeamId);
    if (route.params?.MyTeam) setMyTeam(route.params?.MyTeam);
    if (route.params?.PLayer_RedirectPage) setPLayer_RedirectPage(route.params?.PLayer_RedirectPage);

    // TournamentMyTeam();
  }, [route.params]);

  const renderItem = ({ item }) => (
    <View style={[styles.item, { marginVertical: 5 }]}>
      <View
        style={[
          styles.body100,
          {
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <View style={[styles.width20]}>
          {item.ImageName == "UserProfile.png" ? (
            <Image
              source={{
                uri: `${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile/${item.ImageName}`,
              }}
              style={styles.img}
            />
          ) : (
            <Image
              source={{
                uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
              }}
              style={styles.img}
            />
          )}
        </View>
        <View style={[styles.width60]}>
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
                {item.Cityname}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.width20, { alignItems: "center" }]}>
          <Pressable onPress={() => RemoveItem(item.MobileNo)}>
            <Text
              style={{
                borderBottomColor: Color.ErrorColor,
                color: Color.ErrorColor,
                borderBottomWidth: 1,
                fontWeight: "900"
              }}
            >
              Remove
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
  const RemoveItem = (Mobileno) => {
    setplayerItemList((playerItemList) => {
      return playerItemList.filter((List) => List.MobileNo !== Mobileno)
    })
    if (playerItemList.length == 1) {
      setaddBtnVisisble(false);
    }
    else {
      setaddBtnVisisble(true);
    }
    settxtPlayerFullName("");
  }

  const AddAsAPlayer = (props) => {
    if (txtPlayerFullName == null || txtPlayerFullName == "") {
      showToast("Please enter full name.");
      txtPlayerFullNameRef.current.focus();
      setErrortxtFullName(Color.ErrorColor);
      return;
    }
    CheckPlayeName();
    
  };
  const btnSave = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Player`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            Oper: 'add',
            playerItemList: playerItemList
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {

          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          Alert.alert("Save", "Save Successful", [
            {
              text: "OK", onPress: () => {
                // navigation.navigate("PlayerPageMain",{
                //   MyTeamId
                // })
                navigation.navigate(PLayer_RedirectPage, {
                  PageName: MyTeam,
                  MyTeamId: MyTeamId,
                  MyTeam: MyTeam
                })
              }
            },
          ]);

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
  }
  const extraData = () => (
    // {addBtnVisisble ? (
    <View style={{}}>
      <Pressable style={[styles.button, styles.buttonSave]}>
        <Text style={{ color: "white" }}>Add Team</Text>
      </Pressable>
      <Text
        style={{
          fontSize: 12,
          color: Color.Texttitle,
        }}
      >
        To Keep adding more players,just type phone number and add
        team.
      </Text>
    </View>
    // ) : null}
  );
  return (
    <View style={styles.Container}>
      <View style={styles.width100}>
        <View style={styles.width75}>
          <TextInput
            style={[styles.input]}
            placeholder="Add Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={(text) => setAddMobileNo(text)}
            value={AddMobileNo}
            ref={txtMobileNoRef}
          />
        </View>
        <View style={styles.width25}>
          <Pressable onPress={() => btnAdd()} style={[styles.button]}>
            <Text style={styles.title}>Add</Text>
          </Pressable>
        </View>
      </View>
      {ModalVisibale ? (
        <View
          style={[
            styles.width100,
            { borderColor: Color.Texttitle, borderWidth: 2, padding: 15 },
          ]}
        >

          <View style={styles.width20}>
            <Image
              source={{
                uri: `${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile/UserProfile.png`,
              }}
              style={styles.img}
            />
          </View>
          <View style={[styles.width80, {}]}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={styles.width85}>
                <TextInput
                  ref={txtPlayerFullNameRef}
                  value={txtPlayerFullName}
                  onChangeText={(text) => {
                    setErrortxtFullName(Color.Texttitle);
                    settxtPlayerFullName(text);
                  }}
                  placeholder="Player Full Name * "
                  style={{
                    borderBottomColor: ErrortxtFullName,
                    borderBottomWidth: 2,
                  }}
                />
              </View>
              <View style={styles.width05}></View>
              <View style={styles.width10}>
                <Pressable onPress={() => {
                  if (playerItemList == []) {
                    setaddBtnVisisble(false);
                    console.log("if")
                  }
                  else {
                    setaddBtnVisisble(true);
                    console.log("else")
                  }
                  settxtPlayerFullName("");
                  setModalVisibale(false);



                }}>

                  <Image
                    source={{
                      uri: `${global.domainName}/CricbuddyAdmin/Content/assets/CloseImage.png`,
                    }}
                    style={{ height: 25, width: 25 }}
                  />
                </Pressable>
              </View>
            </View>
            <View style={{ width: "100%", flexDirection: "row", marginTop: 5 }}>
              <Text style={{ color: Color.Texttitle }}>Mobile No : </Text>
            </View>
            <View style={{ width: "100%", flexDirection: "row", marginTop: 5 }}>
              <View
                style={[
                  styles.width10,
                  { alignItems: "center", justifyContent: "center" },
                ]}
              >
                <Text>+91</Text>
              </View>
              <View style={styles.width05}></View>
              <View style={styles.width70}>
                <TextInput
                  placeholder="Mobile No"
                  keyboardType="numeric"
                  maxLength={10}
                  value={txtMobileNo}
                  editable={false}
                  style={{
                    borderBottomColor: Color.Texttitle,
                    borderBottomWidth: 2,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => AddAsAPlayer()}>
                <Text
                  style={{
                    color: Color.PrimaryColor,
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  Add as a Player
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.width100}>
        <ScrollView style={styles.Container}>
        {/* <SafeAreaView style={styles.Container}> */}
          <View
            style={{
              justifyContent: "center",
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              marginTop: 5,
            }}
          >
            {playerItemList.map((item, index) => (
            // <FlatList
            //   data={playerItemList}
            //   renderItem={renderItem}
            //   keyExtractor={(item) => item.id}
            //ListFooterComponent={extraData}
            ///>
            <View key={index} style={[styles.item, { marginVertical: 5 }]}>
              <View
                style={[
                  styles.body100,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                <View style={[styles.width20]}>
                  {item.ImageName == "UserProfile.png" ? (
                    <Image
                      source={{
                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile/${item.ImageName}`,
                      }}
                      style={styles.img}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                      }}
                      style={styles.img}
                    />
                  )}
                </View>
                <View style={[styles.width60]}>
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
                        {item.Cityname}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.width20, { alignItems: "center" }]}>
                  <Pressable onPress={() => RemoveItem(item.MobileNo)}>
                    <Text
                      style={{
                        borderBottomColor: Color.ErrorColor,
                        color: Color.ErrorColor,
                        borderBottomWidth: 1,
                        fontWeight: "900"
                      }}
                    >
                      Remove
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            ))}
          </View>
          {addBtnVisisble ? (
          <View style={[{ position: "relative", bottom: 20, left: 0, right: 0 }]}>
            <Pressable onPress={btnSave} style={[styles.button, styles.buttonSave]}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: "700" }}>Add Team</Text>
            </Pressable>
            <Text
              style={{
                fontSize: 12,
                color: Color.Texttitle,
              }}
            >
              To Keep adding more players,just type phone number and add team.
            </Text>
          </View>
          ) : null}
        {/* </SafeAreaView> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: "#fff",
    borderWidth: 10,
    position: "relative",
  },

  buttonSave: {
    backgroundColor: "#569651",

  },
  width100: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
    padding: 5
  },
  width25: {
    width: "25%",
  },
  width75: {
    width: "75%",
  },
  width60: {
    width: "60%",
  },
  width40: {
    width: "40%"
  },
  width20: {
    width: "20%",
  },
  width30: {
    width: "30%",
  },
  width70: {
    width: "70%",
  },
  width80: {
    width: "80%"
  },
  width90: {
    width: "90%",
  },
  width10: {
    width: "10%",
  },
  width85: {
    width: "85%"
  },
  width05: {
    width: "05%"
  },
  input: {
    borderBottomColor: Color.Texttitle,
    borderBottomWidth: 2,
    elevation: 2,
    borderColor: Color.Texttitle,
    borderWidth: 2,
    paddingLeft: 20,
    paddingVertical: 7,
  },
  button: {
    borderRadius: 0,
    elevation: 2,
    padding: 11,
    alignItems: "center",
    backgroundColor: Color.PrimaryColor,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
  img: {
    height: 60,
    width: 60,
    // borderColor: Color.Texttitle,
    // borderWidth: 2,
    // backgroundColor: "#DC7633",
    // color: Color.WhiteBGColor,
    // borderRadius: 100,
    // alignItems: "center",
    // justifyContent: "center",
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "900",
  },
  item: {
    backgroundColor: Color.WhiteBGColor,
    padding: 10,
    borderColor: Color.Texttitle,
    borderWidth: 3,
    elevation: 2,
  },
});

export default PlayerAddViaPhoneNo;
