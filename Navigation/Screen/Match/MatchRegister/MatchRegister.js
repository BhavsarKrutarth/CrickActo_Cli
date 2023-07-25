import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Switch,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../Color/Color";
import LineTextInput from "../../../../Component/LineTextInput/LineTextInput";
import { color } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";

const MatchRegister = () => {
  function showToast(Text) {
    ToastAndroid.show(Text, ToastAndroid.SHORT);
  }
  const navigation = useNavigation();
  const route = useRoute();

  const [MatchTypeBorderColor, setMatchTypeBorderColor] = useState(Color.FontColor);

  const [Matchid, setMatchid] = useState(null);
  const [TeamAid, setTeamAid] = useState(null);
  const [TeamAName, setTeamAName] = useState(null);
  const [TeamASubName, setTeamASubName] = useState(null);
  const [TeamAPlayerCount, setTeamAPlayerCount] = useState(null);
  const [TeamBid, setTeamBid] = useState(null);
  const [TeamBName, setTeamBName] = useState(null);
  const [TeamBSubName, setTeamBSubName] = useState(null);
  const [TeamBPlayerCount, setTeamBPlayerCount] = useState(null);
  const [MatchType, setMatchType] = useState(null);
  const [MatchTypeColor, setMatchTypeColor] = useState(Color.LightGreen);
  const [PowerPlayVisible, setPowerPlayVisible] = useState(false);
  const [PowerPlayVisible_TheHundred, setPowerPlayVisible_TheHundred] =
    useState(false);
  
    const [BallTypeError, setBallTypeError] = useState(false);
    const [BallTypeColorError,setBallTypeColorError] = useState(null)
    const [BallType, setBallType] = useState(null);
  const [BallTypeColor, setBallTypeColor] = useState({
    borderColor: "green",
    borderWidth: 2,
  });
  const [modalVisible, setmodalVisible] = useState(false);
  const [CityId, setCityId] = useState(null);
  const [CityName, setCityName] = useState(null);
  const [CityIdError, setCityIdError] = useState(false);

  const [Groundtitle, setGroundtitle] = useState(null);
  const [Groundid, setGroundid] = useState(null);
  const [GroundidError, setGroundidError] = useState(false);

  // ------------------Date Select
  const [DateText, setDateText] = useState("Select Date & Time");
  const [sendDateText, setsendDateText] = useState(null);

  const [Dateshow, setDateshow] = useState(false);
  const [date, setdate] = useState(new Date());
  const [MinStartDate, setMinStartDate] = useState(new Date());
  const [MaxStartDate, setMaxStartDate] = useState(null);
  const [DateError, setDateError] = useState(false);

  // ------------------Date Select

  // ------------------Time Select
  const [TimeModal, setTimeModal] = useState(false);
  const [sendTime, setsendTime] = useState(null);
  // ------------------Time Select
  const [NoofOver, setNoofOver] = useState(null);
  const [NoofOverError, setNoofOverError] = useState(false);
  const [OverPerBowler, setOverPerBowler] = useState(null);

  const [PowerPlay1To, setPowerPlay1To] = useState(null);
  const [PowerPlay1From, setPowerPlay1From] = useState(null);

  const [PowerPlay2To, setPowerPlay2To] = useState(null);
  const [PowerPlay2From, setPowerPlay2From] = useState(null);

  const [PowerPlay3To, setPowerPlay3To] = useState(null);
  const [PowerPlay3From, setPowerPlay3From] = useState(null);

  const [PitchType, setPitchType] = useState(null);
  const [PitchTypeColor, setPitchTypeColor] = useState(Color.LightGreen);
  const [PitchTypeError, setPitchTypeError] = useState(false);

  const [switchValue, setswitchValue] = useState(true);

  const [MatchBall, setMatchBall] = useState(null);

  const onChangeStart = (event, selectedDate) => {
    setDateshow(false);
    const currentDate = selectedDate || date;
    let tempDate = new Date(currentDate);
    let startday = tempDate.getDate().toString();
    let startMonth = (tempDate.getMonth() + 1).toString();
    let startdaylength = startday.length;
    let startMonthlength = startMonth.length;
    if (startdaylength == 1) {
      startday = "0" + startday;
    }
    if (startMonthlength == 1) {
      startMonth = "0" + startMonth;
    }

    let fdate = startday + "/" + startMonth + "/" + tempDate.getFullYear();
    let sdate = tempDate.getFullYear() + "" + startMonth + "" + startday;

    setDateText(fdate);
    setsendDateText(sdate);
    setTimeModal(true);
    //Texttitle

    setDateError(false);
  };

  const onChangeTime = (event, SelectTime) => {
    setTimeModal(false);
    const currentDate = SelectTime || date;
    let tempDate = new Date(currentDate);
    var tempdate = DateText;
    setDateText(
      tempdate +
        " , " +
        tempDate.getHours() +
        " : " +
        tempDate.getMinutes() +
        " " +
        (tempDate.getHours() >= 13 ? "PM" : "AM")
    );
    setsendTime(
      tempDate.getHours() +
        " : " +
        tempDate.getMinutes() +
        " " +
        (tempDate.getHours() >= 13 ? "PM" : "AM")
    );
  };
  React.useEffect(() => {
    console.log("Navigation/Screen/Match/MatchRegister/MatchRegister.js");
    if (route.params?.Matchid) {
      //console.log(route.params?.Matchid)
      setMatchid(route.params?.Matchid);
      MyMatch(route.params?.Matchid);
    }

    if (route.params?.Groundid) {
      setGroundidError(false);
      setGroundid(route.params?.Groundid)
    };

    if (route.params?.Groundtitle) setGroundtitle(route.params?.Groundtitle);

    if (route.params?.CityId) {
      setCityIdError(false);
      setCityId(route.params?.CityId);
    }

    if (route.params?.CityName) setCityName(route.params?.CityName);
  }, [route.params]);

  const MyMatch = async (Matchid) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Match/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: global.MobileNo,
            Matchid: Matchid,
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
              if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                if (List.TeamAid) setTeamAid(List.TeamAid);

                if (List.TeamAName) setTeamAName(List.TeamAName);

                if (List.TeamASubName) setTeamASubName(List.TeamASubName);

                if (List.TeamAPlayerCount)
                  setTeamAPlayerCount(List.TeamAPlayerCount);

                if (List.TeamBid) setTeamBid(List.TeamBid);

                if (List.TeamBName) setTeamBName(List.TeamBName);

                if (List.TeamBSubName) setTeamBSubName(List.TeamBSubName);

                if (List.TeamBPlayerCount)
                  setTeamBPlayerCount(List.TeamBPlayerCount);
              }
            }
          } else {
            alert("Error: internal server error");
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

  const changeNoofOver = (Over) => {
    setNoofOverError(false);
    var tempover = Math.ceil(Over / 5);
    setOverPerBowler(String(tempover));
    setNoofOver(Over);
  };
  const powerplay = (props) => {
    if (NoofOver != null) {
      setmodalVisible(true);
    } else {
      setNoofOverError(true);
    }
  };

  const modalSave = () => {
    setmodalVisible(false);
  };

  const BtnNext = async () => {
    //console.log(MatchType)
    if (MatchType == null) {
      setMatchTypeBorderColor("red");
      showToast("Please Select Match Type.");
      return;
    } else {
      setMatchTypeBorderColor(Color.Title);
    }

    if (MatchType == "LimitedOvers") {
      if (NoofOver == null) {
        setNoofOverError(true);
        showToast("Please Enter No of Overs");
        return;
      }

      if (OverPerBowler == null) {
        showToast("Please Enter Overs per Bowler");
        return;
      }
    }
    if (MatchType == "BoxCricket") {
      if (NoofOver == null) {
        setNoofOverError(true);
        showToast("Please Enter No of Overs");
        return;
      }
      if (OverPerBowler == null) {
        showToast("Please Enter Overs per Bowler");
        return;
      }
    }
    if (CityId == null) {
      setCityIdError(true);
      showToast("Please Select City / Name.");
      return;
    }
    if (Groundid == null) {
      setGroundidError(true)
      showToast("Please Select Ground.");
      return;
    }
    if (DateText == "Select Date & Time") {
      setDateError(true);
      showToast("Please Select Date & Time.");
      return;
    }
    if (BallType == null) {
      setBallTypeError(true)
      showToast("Please Select Ball Type.");
      return;
    }
    if (PitchType == null) {
      setPitchTypeError(true)
      showToast("Please Select Pitch Type.");
      return;
    }

    const resposneJSON = await fetch(
      `${global.domainName}/cricbuddyAPI/api/MatchRegistration`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
        },
        body: JSON.stringify({
          Oper: "Edit",
          Matchid: Matchid,
          MobileNo: global.MobileNo,
          MatchType: MatchType,
          NoOfOver: MatchType == "TheHundred" ? MatchBall : NoofOver,
          OverperBowler: OverPerBowler,
          Cityid: CityId,
          CityName: CityName,
          Groundid: Groundid,
          GroundName: Groundtitle,
          MatchDate: sendDateText,
          MatchTime: sendTime,
          BallType: BallType,
          PitchType: PitchType,
          ShortType: switchValue,
          PowerPlay1To: PowerPlay1To,
          PowerPlay1From: PowerPlay1From,
          PowerPlay2To: PowerPlay2To,
          PowerPlay2From: PowerPlay2From,
          PowerPlay3To: PowerPlay3To,
          PowerPlay3From: PowerPlay3From,
          LastPageName: "MatchToss",
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        /*-------------------- Page Call -----------------------*/

        var BindData = JSON.parse(json);

        if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
          navigation.navigate("MatchToss", { Matchid: Matchid });
        }

        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={[styles.width100, { flexDirection: "row" }]}>
          <View
            style={[
              styles.width40,
              {
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10,
              },
            ]}
          >
            <View style={[styles.img, { backgroundColor: "#96516B" }]}>
              <Text style={styles.imgtitle}>{TeamASubName}</Text>
            </View>
            <View style={{ paddingTop: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "700",color:Color.FontColor }}>
                {TeamAName}
              </Text>
            </View>
            <View style={{ paddingTop: 5 }}>
              <Pressable
                onPress={() => {
                  navigation.navigate("TeamASelectPlayer", {
                    Matchid,
                    TeamAid: TeamAid,
                    TeamAName: TeamAName,
                    PageName: TeamAName,
                    RedirectPage: "MatchRegister",
                  });
                }}
                style={styles.btn}
              >
                <Text style={styles.btntxt}>Squad ( {TeamAPlayerCount} )</Text>
              </Pressable>
            </View>
          </View>
          <View
            style={[
              styles.width20,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/Match/VS.png",
              }}
              style={{ height: 60, width: 60 }}
            />
          </View>
          <View
            style={[
              styles.width40,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <View style={[styles.img, { backgroundColor: "#54bcd9" }]}>
              <Text style={styles.imgtitle}>{TeamBSubName}</Text>
            </View>
            <View style={{ paddingTop: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "700",color:Color.FontColor }}>
                {TeamBName}
              </Text>
            </View>
            <View style={{ paddingTop: 5 }}>
              <Pressable
                onPress={() => {
                  navigation.navigate("TeamBSelectPlayer", {
                    Matchid: Matchid,
                    TeamBid: TeamBid,
                    TeamBName: TeamBName,
                    PageName: TeamBName,
                    RedirectPage: "MatchRegister",
                  });
                }}
                style={styles.btn}
              >
                <Text style={styles.btntxt}>Squad ( {TeamBPlayerCount} )</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.width100, { marginTop: 20 }]}>
          <Text style={[styles.Title, { color: MatchTypeBorderColor }]}>
            Match Type
          </Text>
        </View>
        <View
          style={[styles.width100, { marginTop: 10, flexDirection: "row" }]}
        >
          <View style={styles.width01}></View>
          <View style={styles.width30}>
            <Pressable
              onPress={() => {
                setMatchType("LimitedOvers");
                setPowerPlayVisible(true);
                setPowerPlayVisible_TheHundred(false);
              }}
            >
              <View
                style={[
                  styles.MatchTypeBox,
                  {
                    backgroundColor:
                      MatchType == "LimitedOvers"
                        ? Color.PrimaryColor
                        : MatchTypeColor,
                  },
                ]}
              >
                <Text style={styles.MatchTypetxt}>LIMITED OVERS</Text>
              </View>
            </Pressable>
          </View>
          {/* <View style={styles.width01}></View>
          <View style={styles.width30}>
            <Pressable
              onPress={() => {
                setMatchType("TestMatch");
                setPowerPlayVisible(false);
                setPowerPlayVisible_TheHundred(false);
              }}
            >
              <View
                style={[
                  styles.MatchTypeBox,
                  {
                    backgroundColor:
                      MatchType == "TestMatch"
                        ? Color.PrimaryColor
                        : MatchTypeColor,
                  },
                ]}
              >
                <Text style={styles.MatchTypetxt}>TEST MATCH</Text>
              </View>
            </Pressable>
          </View> */}
          <View style={styles.width01}></View>
          <View style={styles.width30}>
            <Pressable
              onPress={() => {
                setMatchType("TheHundred");
                setPowerPlayVisible(false);
                setPowerPlayVisible_TheHundred(true);
              }}
            >
              <View
                style={[
                  styles.MatchTypeBox,
                  {
                    backgroundColor:
                      MatchType == "TheHundred"
                        ? Color.PrimaryColor
                        : MatchTypeColor,
                  },
                ]}
              >
                <Text style={styles.MatchTypetxt}>THE HUNDRED</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.width01}></View>
          <View style={styles.width30}>
            <Pressable
              onPress={() => {
                setMatchType("BoxCricket");
                setPowerPlayVisible(true);
                setPowerPlayVisible_TheHundred(false);
              }}
            >
              <View
                style={[
                  styles.MatchTypeBox,
                  {
                    backgroundColor:
                      MatchType == "BoxCricket"
                        ? Color.PrimaryColor
                        : MatchTypeColor,
                  },
                ]}
              >
                <Text style={styles.MatchTypetxt}>BOX CRICKET</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={[styles.width100, { marginTop: 10, flexDirection: "row" }]}
        >
          {/* <View style={styles.width01}></View>
          <View style={styles.width30}>
            <Pressable
              onPress={() => {
                setMatchType("BoxCricket");
                setPowerPlayVisible(true);
                setPowerPlayVisible_TheHundred(false);
              }}
            >
              <View
                style={[
                  styles.MatchTypeBox,
                  {
                    backgroundColor:
                      MatchType == "BoxCricket"
                        ? Color.PrimaryColor
                        : MatchTypeColor,
                  },
                ]}
              >
                <Text style={styles.MatchTypetxt}>BOX CRICKET</Text>
              </View>
            </Pressable>
          </View> */}
        </View>
        {PowerPlayVisible ? (
          <View
            style={[styles.width100, { marginTop: 10, flexDirection: "row" }]}
          >
            <View style={styles.width01}></View>
            <View style={styles.width30}>
              <TextInput
                keyboardType="numeric"
                onChangeText={(Over) => changeNoofOver(Over)}
                style={{
                  borderBottomColor:
                    NoofOverError == false ? Color.Texttitle : Color.ErrorColor,
                  borderBottomWidth: 2,
                  color:Color.FontColor,
                }}
                placeholderTextColor={Color.FontColor} 
                value={NoofOver}
                placeholder="No.of Overs *"
              />
              {NoofOverError && (
                <Text style={{ color: "red", fontSize: 12, fontWeight: "700",color:Color.FontColor }}>
                  Please enter Overs
                </Text>
              )}
            </View>
            <View style={styles.width01}></View>
            <View style={styles.width40}>
              <LineTextInput
                keyboardType="numeric"
                value={OverPerBowler}
                placeholder="Overs per Bowler *"
              />
            </View>
            <View style={styles.width01}></View>
            <View style={styles.width30}>
              <Pressable onPress={() => powerplay()}>
                <Text
                  style={{
                    color: Color.LightGreen,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  POWER PLAY {">"}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}
        {PowerPlayVisible_TheHundred ? (
          <View
            style={[
              styles.width100,
              { marginTop: 10, flexDirection: "column" },
            ]}
          >
            <View style={styles.width30}>
              <Text style={{color:Color.FontColor}}>Match Balls</Text>
            </View>
            <View style={styles.width01}></View>
            <View style={styles.width100}>
              <TextInput
                style={styles.input}
                value={MatchBall}
                keyboardType="numeric"
                onChangeText={(text) => setMatchBall(text)}
                placeholder="Enter the Match Ball"
              />
            </View>
          </View>
        ) : null}
        <View style={[styles.width100, { marginTop: 10 }]}>
          <Text
            style={[
              styles.Title,
              { color: CityIdError == false ? Color.Title : Color.ErrorColor,color:Color.FontColor },
            ]}
          >
            City / Town
          </Text>
          <View styles={styles.width100}>
            {/* <LineTextInput placeholder="select City / Town" /> */}
            <TextInput
              KeyboardAvoidingView={true}
              placeholder="select City / Town"
              placeholderTextColor={Color.FontColor} 
              onFocus={() =>
                navigation.navigate("UserProfileCity", {
                  MobileNo,
                  PageRedirect: "MatchRegister",
                })
              }
              style={{borderBottomWidth: 2,borderBottomColor :CityIdError == false ? Color.Texttitle : Color.ErrorColor,color:Color.FontColor}}
              value={CityName}
            />
          </View>
          {CityIdError == true ? (
            <>
              <View >
                <Text style={{ color: Color.ErrorColor }}>Please Select City / Town Name</Text>
              </View>
            </>
          ) : null}
        </View>
        <View style={[styles.width100, { marginTop: 10 }]}>
          <Text style={[styles.Title,{ color: GroundidError == false ? Color.Title : Color.ErrorColor,color:Color.FontColor },]}>Ground</Text>
          <View styles={styles.width100}>
            {/* <LineTextInput placeholder="select Ground" /> */}
            <TextInput
              KeyboardAvoidingView={true}
              placeholder="Search Ground"
              placeholderTextColor={Color.FontColor} 
              onFocus={() =>
                // navigation.navigate("TouranamentGround", {
                //   PageRedirect: "MatchRegister",
                // })
                navigation.navigate("TournamentGroundNewList", {
                    PageRedirect: "MatchRegister",
                  })
              }
              style={{
                borderBottomColor: GroundidError == true ? Color.ErrorColor : Color.Texttitle,
                borderBottomWidth: 2,
              }}
              value={Groundtitle}
            />
          </View>
          {GroundidError == true ? (
            <>
              <View >
                <Text style={{ color: Color.ErrorColor }}>Please Select Ground</Text>
              </View>
            </>
          ) : null}
        </View>
        <View style={[styles.width100, { marginTop: 10 }]}>
          <Text style={[styles.Title,{color:DateError == true ? Color.ErrorColor : Color.FontColor}]}>Date & Time</Text>
          <View style={{ paddingTop: 10 }}>
            <Pressable onPress={() => setDateshow(true)}>
              <View
                style={[
                  styles.section,
                  {
                    borderBottomColor: DateError == true ? Color.ErrorColor : Color.Texttitle,
                    borderBottomWidth: 2,
                  },
                ]}
              >
                <Text style={{ color: Color.Texttitle, padding: 2,color:Color.FontColor }}>
                  {DateText}
                </Text>
              </View>
            </Pressable>
          </View>
          {DateError == true ? (
            <>
              <View >
                <Text style={{ color: Color.ErrorColor }}>Please Select Date & Time</Text>
              </View>
            </>
          ) : null}
        </View>
        {Dateshow && (
          <DateTimePicker
            testID="dateTimePickerTime"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChangeStart}
            minimumDate={MinStartDate}
            // maximumDate={new Date(2022,12,10)}
            maximumDate={MaxStartDate}
          />
        )}

        {TimeModal && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <View style={[styles.width100, { marginTop: 10 }]}>
          <Text style={[styles.Title,{color:BallTypeError == false ? Color.FontColor:Color.ErrorColor}]}>Ball Type</Text>
          <View style={[styles.width100]}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ width: "2%" }}></View>
              <View
                style={{
                  width: "15%",
                }}
              >
                <Pressable
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    setBallTypeError(false)
                    setBallType("Tennise")}}
                >
                  <View style={BallType == "Tennise" ? BallTypeColor : null}>
                    <Image
                      source={{
                        uri:
                          "" +
                          global.domainName +
                          "/CricbuddyAdmin/Content/assets/Tennise.png",
                      }}
                      style={{ height: 65, width: 65 }}
                    />
                  </View>
                  <Text>Tennise</Text>
                </Pressable>
              </View>
              <View style={{ width: "5%" }}></View>
              <View
                style={{
                  width: "15%",
                }}
              >
                <Pressable
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    setBallTypeError(false)
                    setBallType("Leather")}}
                >
                  <View style={BallType == "Leather" ? BallTypeColor : null}>
                    <Image
                      source={{
                        uri:
                          "" +
                          global.domainName +
                          "/CricbuddyAdmin/Content/assets/Cricket_Ball_Red.png",
                      }}
                      style={{ height: 65, width: 65 }}
                    />
                  </View>
                  <Text>Leather</Text>
                </Pressable>
              </View>
              <View style={{ width: "5%" }}></View>
              <View
                style={{
                  width: "15%",
                }}
              >
                <Pressable
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    setPitchTypeError(false)
                    setBallType("Other")}}
                >
                  <View style={BallType == "Other" ? BallTypeColor : null}>
                    <Image
                      source={{
                        uri:
                          "" +
                          global.domainName +
                          "/CricbuddyAdmin/Content/assets/Cricket_Ball_Other.png",
                      }}
                      style={{ height: 65, width: 65 }}
                    />
                  </View>
                  <Text>Other</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.width100, { marginTop: 10 }]}>
          <Text style={[styles.Title,{color : PitchTypeError == true ? Color.ErrorColor : Color.FontColor}]}>Pitch Type</Text>
          <View
            style={[styles.width100, { marginTop: 10, flexDirection: "row" }]}
          >
            <View style={styles.width01}></View>
            <View style={styles.width30}>
              <Pressable
                onPress={() => {
                  setPitchTypeError(false);
                  setPitchType("ROUGH");
                  // setPowerPlayVisible(true);
                  // setPowerPlayVisible_TheHundred(false);
                }}
              >
                <View
                  style={[
                    styles.MatchTypeBox,
                    {
                      backgroundColor:
                        PitchType == "ROUGH"
                          ? Color.PrimaryColor
                          : PitchTypeColor,
                    },
                  ]}
                >
                  <Text style={styles.MatchTypetxt}>ROUGH</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.width01}></View>
            <View style={styles.width30}>
              <Pressable
                onPress={() => {
                  setPitchTypeError(false);
                  setPitchType("TURF");
                  // setPowerPlayVisible(true);
                  // setPowerPlayVisible_TheHundred(false);
                }}
              >
                <View
                  style={[
                    styles.MatchTypeBox,
                    {
                      backgroundColor:
                        PitchType == "TURF"
                          ? Color.PrimaryColor
                          : PitchTypeColor,
                    },
                  ]}
                >
                  <Text style={styles.MatchTypetxt}>TURF</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.width01}></View>
            <View style={styles.width30}>
              <Pressable
                onPress={() => {
                  setPitchTypeError(false);
                  setPitchType("CEMENT");
                  // setPowerPlayVisible(true);
                  // setPowerPlayVisible_TheHundred(false);
                }}
              >
                <View
                  style={[
                    styles.MatchTypeBox,
                    {
                      backgroundColor:
                        PitchType == "CEMENT"
                          ? Color.PrimaryColor
                          : PitchTypeColor,
                    },
                  ]}
                >
                  <Text style={styles.MatchTypetxt}>CEMENT</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={[styles.width100, { marginTop: 10, flexDirection: "row" }]}
        >
          <View style={styles.width01}></View>
          <View style={styles.width30}>
            <Pressable
              onPress={() => {
                setPitchTypeError(false);
                setPitchType("ASTROTURF");
                // setPowerPlayVisible(true);
                // setPowerPlayVisible_TheHundred(false);
              }}
            >
              <View
                style={[
                  styles.MatchTypeBox,
                  {
                    backgroundColor:
                      PitchType == "ASTROTURF"
                        ? Color.PrimaryColor
                        : PitchTypeColor,
                  },
                ]}
              >
                <Text style={styles.MatchTypetxt}>ASTROTURF</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.width01}></View>
          <View style={styles.width30}>
            <Pressable
              onPress={() => {
                setPitchTypeError(false);
                setPitchType("MATTING");
                // setPowerPlayVisible(true);
                // setPowerPlayVisible_TheHundred(false);
              }}
            >
              <View
                style={[
                  styles.MatchTypeBox,
                  {
                    backgroundColor:
                      PitchType == "MATTING"
                        ? Color.PrimaryColor
                        : PitchTypeColor,
                  },
                ]}
              >
                <Text style={styles.MatchTypetxt}>MATTING</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={[
            styles.width100,
            { marginTop: 10, flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={[styles.Title,{color:Color.FontColor}]}>Short Type</Text>
          <Switch
            value={switchValue}
            onValueChange={(switchValue) => {
              if (switchValue) {
                setswitchValue(true);
              } else {
                setswitchValue(false);
              }
            }}
          />
        </View>
        <View
          style={[styles.width100, { marginTop: 10, flexDirection: "row" }]}
        >
          <Pressable
            style={[
              styles.button,
              { backgroundColor: "#f2f2f2", width: "50%" },
            ]}
            onPress={() => BtnNext()}
          >
            <Text style={{ fontSize: 12,color:Color.FontColor,fontWeight:"700" }}>
              SCHEDULE MATCH
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: Color.PrimaryColor, width: "50%" },
            ]}
            onPress={() => BtnNext()}
          >
            <Text style={{ fontSize: 12, fontWeight: "700", color: "white" }}>
              NEXT ( TOST )
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setModalVisible(!modalVisible);
        }}
      >
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modalcenteredView}>
            <View
              style={[
                styles.modalView,
                { borderWidth: 2, borderColor: Color.Texttitle },
              ]}
            >
              <View style={[styles.width100]}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.modaltitleText}>POWER PLAY</Text>
                </View>
              </View>

              <View style={styles.width100}>
                <Text style={[styles.modalText,{color:Color.FontColor}]}>Power Play 1</Text>
              </View>

              <View style={[styles.width100, styles.flexDirectionrow]}>
                <View style={[styles.width10, styles.modaltxtStyle]}>
                  <Text style={[styles.modaltxt,{color:Color.FontColor}]}>To</Text>
                </View>
                <View style={styles.width20}>
                  <LineTextInput
                    value={PowerPlay1To}
                    onChangeText={(text) => setPowerPlay1To(text)}
                    keyboardType="numeric"
                    placeholder="To Over"
                  />
                </View>
                <View style={[styles.width20, styles.modaltxtStyle]}>
                  <Text style={[styles.modaltxt,{color:Color.FontColor}]}>From</Text>
                </View>
                <View style={styles.width30}>
                  <LineTextInput
                    value={PowerPlay1From}
                    onChangeText={(text) => setPowerPlay1From(text)}
                    keyboardType="numeric"
                    placeholder="From Over"
                  />
                </View>
              </View>

              <View style={[styles.width100, { marginTop: 10 }]}>
                <Text style={[styles.modalText,{color:Color.FontColor}]}>Power Play 2</Text>
              </View>

              <View style={[styles.width100, styles.flexDirectionrow]}>
                <View style={[styles.width10, styles.modaltxtStyle]}>
                  <Text style={[styles.modaltxt,{color:Color.FontColor}]}>To</Text>
                </View>
                <View style={styles.width20}>
                  <LineTextInput
                    value={PowerPlay2To}
                    onChangeText={(text) => setPowerPlay2To(text)}
                    keyboardType="numeric"
                    placeholder="To Over"
                  />
                </View>
                <View style={[styles.width20, styles.modaltxtStyle]}>
                  <Text style={[styles.modaltxt,{color:Color.FontColor}]}>From</Text>
                </View>
                <View style={styles.width30}>
                  <LineTextInput
                    value={PowerPlay2From}
                    onChangeText={(text) => setPowerPlay2From(text)}
                    keyboardType="numeric"
                    placeholder="From Over"
                  />
                </View>
              </View>

              <View
                style={[
                  styles.width100,
                  { marginTop: 10, borderColor: "black" },
                ]}
              >
                <Text style={[styles.modalText,{color:Color.FontColor}]}>Power Play 3</Text>
              </View>

              <View style={[styles.width100, styles.flexDirectionrow]}>
                <View style={[styles.width10, styles.modaltxtStyle]}>
                  <Text style={[styles.modaltxt,{color:Color.FontColor}]}>To</Text>
                </View>
                <View style={styles.width20}>
                  <LineTextInput
                    value={PowerPlay3To}
                    onChangeText={(text) => setPowerPlay3To(text)}
                    keyboardType="numeric"
                    placeholder="To Over"
                  />
                </View>
                <View style={[styles.width20, styles.modaltxtStyle]}>
                  <Text style={[styles.modaltxt,{color:Color.FontColor}]}>From</Text>
                </View>
                <View style={styles.width30}>
                  <LineTextInput
                    value={PowerPlay3From}
                    onChangeText={(text) => setPowerPlay3From(text)}
                    keyboardType="numeric"
                    placeholder="From Over"
                    

                  />
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <Pressable
                  style={[styles.modalbutton, styles.modalbuttonClose]}
                  onPress={() => modalSave()}
                >
                  <Text style={styles.modaltextStyle}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MatchRegister;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    padding: 10,
    // position: "relative",
  },
  width100: {
    width: "100%",
  },
  width30: {
    width: "30%",
  },
  width01: {
    width: "1%",
  },
  width40: {
    width: "40%",
  },
  width20: {
    width: "20%",
  },
  width10: {
    width: "10%",
  },
  width30: {
    width: "30%",
  },
  width50: {
    width: "50%",
  },
  img: {
    height: 60,
    width: 60,
    borderColor: "#077b8a",
    borderWidth: 2,
    // backgroundColor: "#DC7633",
    color: Color.WhiteBGColor,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "700",
  },
  btn: {
    borderColor: Color.LightGreenBorder,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.LightGreen,
    borderRadius: 10,
  },
  btntxt: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  MatchTypeBox: {
    borderColor: Color.LightGreenBorder,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  MatchTypetxt: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
  Title: {
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
  },
  modalcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  modalbutton: {
    padding: 10,
  },
  modalbuttonOpen: {
    backgroundColor: "#F194FF",
  },
  modalbuttonClose: {
    backgroundColor: Color.LightGreen,
  },
  modaltextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modaltxtStyle: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "900",
  },
  modaltitleText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 24,
    fontWeight: "900",
    color: Color.PrimaryColor,
  },
  modaltxt: {
    fontSize: 16,
    fontWeight: "700",
  },
  flexDirectionrow: {
    flexDirection: "row",
  },
  input: {
    //height: 40,
    //paddingLeft: 12,
    borderBottomWidth: 2,
    borderBottomColor: Color.Texttitle,
  },
  image: {
    width: 20,
    height: 20,
  },
});
