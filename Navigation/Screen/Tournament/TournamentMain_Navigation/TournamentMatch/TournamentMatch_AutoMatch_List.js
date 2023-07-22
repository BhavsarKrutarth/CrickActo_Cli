import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  Input,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../../Color/Color";
import DateTimePicker from "@react-native-community/datetimepicker";

const TournamentMatch_AutoMatch_List = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [BindData, setBindData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);

  const [Team, setTeam] = useState(null);
  const [Teamid, setTeamid] = useState(null);
  const [Dateshow, setDateshow] = useState(false);

  const [MinStartDate, setMinStartDate] = useState(new Date());
  const [MaxStartDate, setMaxStartDate] = useState(new Date());
  const [DateText, setDateText] = useState("Select Date");
  const [SendDateText, setSendDateText] = useState(null);

  const [DateError, setDateError] = useState(false);
  const [date, setdate] = useState(new Date());

  const [Dateshow_Time, setDateshow_Time] = useState(false);
  const [DateText_Time, setDateText_Time] = useState("Select Time");
  const [sendTime, setsendTime] = useState(null);
  const [DateError_Time, setDateError_Time] = useState(false);
  const [dateTime, setdateTime] = useState(new Date());

  const [RoundName, setRoundName] = useState(null);
  const [RoundType, setRoundType] = useState(null);
  const [Roundid, setRoundid] = useState(null);
  const [Tournamentid, setTournamentid] = useState(null);
  const [MobileNo, setMobileNo] = useState(null);
  const [MatchType, setMatchType] = useState(null);
  const [NoOfOver, setNoOfOver] = useState(null);
  const [OverperBowler, setOverperBowler] = useState(null);
  const [Cityid, setCityid] = useState(null);
  const [CityName, setCityName] = useState(null);
  const [BallType,setBallType] = useState(null);
  const [PitchType,setPitchType] = useState(null);
  const [ShortType,setShortType] = useState(null);

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentMatch/TournamentMatch_AutoMatch_List.js"
    );
    // setBindData([
    //   {
    //     DISPLAYDATE: "Required",
    //     DISPLAYTIME: "Required",
    //     GROUNDNAME: "Melbourne Cricket Ground",
    //     GROUPID: "2268",
    //     GroupName: "GROUP A",
    //     SETDATE: null,
    //     SETTIME: null,
    //     SRNO: "1",
    //     TeamAName: "Kolkata knight riders",
    //     TeamASubName: "Ro",
    //     TeamAid: "1174",
    //     TeamBName: "Lucknow super gaints",
    //     TeamBSubName: "Lu",
    //     TeamBid: "1175",
    //     Tournament_Group_id: "1080",
    //   },
    //   {
    //     DISPLAYDATE: "Required",
    //     DISPLAYTIME: "Required",
    //     GROUNDNAME: "Adelaide Oval",
    //     GROUPID: "2271",
    //     GroupName: "GROUP A",
    //     SETDATE: null,
    //     SETTIME: null,
    //     SRNO: "2",
    //     TeamAName: "Kolkata knight riders",
    //     TeamASubName: "Ro",
    //     TeamAid: "1174",
    //     TeamBName: "Royal challengers",
    //     TeamBSubName: "Ko",
    //     TeamBid: "1176",
    //     Tournament_Group_id: "1080",
    //   },
      
    // ]);
    if (route.params?.BindData) {
      setBindData(route.params?.BindData);
    }

    if (route.params?.startyear) {
        setMinStartDate(new Date(route.params?.Startyear,route.params?.StartMonth,route.params?.Startday))
    }
    if (route.params?.Endyear) {
      
     setMaxStartDate(new Date(route.params?.Endyear,route.params?.EndMonth,route.params?.Endday))
    }

    // if (route.params?.MinStartDate) {
    //     setMinStartDate(new Date(route.params?.MinStartDate))
    // }
    // if (route.params?.MaxStartDate) {
    //  setMaxStartDate(new Date(route.params?.MaxStartDate))
    // }
    if (route.params?.RoundName) {
      setRoundName(route.params?.RoundName);
    }
    if (route.params?.Roundid) {
      setRoundid(route.params?.Roundid);
    }
    if (route.params?.Tournamentid) {
      setTournamentid(route.params?.Tournamentid);
    }
    if (route.params?.MobileNo) {
      setMobileNo(route.params?.MobileNo);
    }
    if (route.params?.MatchType) {
      setMatchType(route.params?.MatchType);
    }
    if (route.params?.NoOfOver) {
      setNoOfOver(route.params?.NoOfOver);
    }
    if (route.params?.OverperBowler) {
      setOverperBowler(route.params?.OverperBowler);
    }
    if (route.params?.Cityid) {
      setCityid(route.params?.Cityid);
    }
    if (route.params?.CityName) {
      setCityName(route.params?.CityName);
    }
    if (route.params?.BallType) {
      setBallType(route.params?.BallType);
    }
    if (route.params?.PitchType) {
      setPitchType(route.params?.PitchType);
    }
    if (route.params?.RoundType) {
      setRoundType(route.params?.RoundType);
    }
    if (route.params?.ShortType) {
      setShortType(route.params?.ShortType);
    }
    



  }, [route.params]);

  const btnUpdate_Modal = () => {
    // console.log(sendTime);
    // console.log(SendDateText);
    // console.log(DateText);
    // console.log(DateText_Time)
    // console.log(Teamid);
    if(sendTime != null && SendDateText != null)
    {

    
    BindData[Teamid].DISPLAYDATE = DateText;
    BindData[Teamid].DISPLAYTIME = DateText_Time;
    BindData[Teamid].SETDATE = SendDateText;
    BindData[Teamid].SETTIME = sendTime;

    var newArray = [...BindData]
    setBindData(newArray)

    setDateText("Select Date");
    setDateText_Time("Select Time")
    setSendDateText(null);
    setsendTime(null);
    setmodalVisible(false);
    }
    else 
    {
        alert("First Date & Time Match")
        return      
    }
  };
 const btnRemove = (id) => {
  Alert.alert('confirmation', 'Are you sure you want to delete?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {
      var tempSrNo = "";
      BindData.forEach((key, obj) => {
        if (key.SRNO == id) {
          tempSrNo = obj;
        }
      });
      const RemoveArraya = [...BindData];
          RemoveArraya.splice(tempSrNo, 1);
          setBindData(RemoveArraya);
    }},
  ]);

 
 }
  const btnEdit = (id) => {
    var tempSrNo = "";
    BindData.forEach((key, obj) => {
      if (key.SRNO == id) {
        tempSrNo = obj;
      }
    });
    setTeam(
      BindData[tempSrNo].TeamAName + " VS " + BindData[tempSrNo].TeamBName
    );
    setTeamid(tempSrNo);
    setmodalVisible(true);

    // BindData[tempSrNo].DATETIME = "test"

    
  };
  const BtnUpdate = () => {

    var lengthcheck = 0
    console.log(BindData.length)
    if(BindData.length == 0)
    {
      alert("Minimum you have to one team.")
      return
    }

    var Validation = "False";
    BindData.forEach((List) => {
      if (List.DISPLAYDATE == "Required") {
        Validation = "True";
      }
    });
   
    if (Validation == "True") {
      alert("First Date Select");
      return;
    } else {
      console.log("Nice All Date is set");
      AutoMatchingTournamentMatchCRUD();
    }
  };

  const AutoMatchingTournamentMatchCRUD = async () => {
    try {
      
      var data = {
        Oper: "Edit",
        RoundName: RoundName,
        Roundid: Roundid,
        Tournamentid:Tournamentid,
        MobileNo:MobileNo,
        MatchType:MatchType,
        NoOfOver:NoOfOver,
        OverperBowler:OverperBowler,
        Cityid:Cityid,
        CityName:CityName,
        BallType:BallType,
        PitchType:PitchType,
        RoundType:RoundType,
        ShortType:ShortType,
        MultiSelect_Groupname:BindData,
        SPNAME: "AUTOMATCHING_TOURNAMENT_MATCH_CRUD",
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/AutoMatchingTournamentMatchCRUD`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify(data)
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
           console.log(BindData)
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            navigation.navigate("TournamenentMain",{
              TournamentName:global.TournamentName,
              ReloadPage:1
          })
          }
          // if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
          //   navigation.navigate("NextInning", {
          //     Matchid: Matchid,
          //     MatchInningid: MatchInningid,
          //     TeamABatterName: TeamABatterName,
          //     TeamABatterid: TeamABatterid,
          //     TeamBBowlerName: TeamBBowlerName,
          //     TeamBBowlerid: TeamBBowlerid
          //   })
          // }
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

  const onChangeTime = (event, SelectTime) => {
    debugger;
    setDateshow_Time(false);
    const currentDate = SelectTime || date;
    let tempDate = new Date(currentDate);
    var tempdate = DateText;
    setDateText_Time(
      // tempdate +
      //   " , " +
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

  const onChangeStart = (event, selectedDate) => {
    setDateshow(false);
    const currentDate = selectedDate || date;
    setdate(currentDate);

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

    setSendDateText(sdate);
    setDateText(fdate);
  };
  const renderItem = ({ item }) => (
    <View
      style={[styles.item, { borderColor: Color.borderColor, borderWidth: 1 }]}
    >
      <View
        style={[
          styles.body100,
          {
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
          },
        ]}
      >
        <View style={[styles.body20, styles.Center]}>
          {item.DISPLAYDATE == "Required" ? (
            <Text style={[{ color: "red" }]}>{item.DISPLAYDATE}</Text>
          ) : (
            <Text>{item.DISPLAYDATE}  {item.SETTIME}</Text>
          )}
        </View>
        <View style={[styles.body30, styles.Center, { paddingVertical: 5 }]}>
          <Text>
            {item.TeamAName} VS {item.TeamBName}
          </Text>
        </View>
        <View style={[styles.body15, styles.Center]}>
          <Text>{item.GroupName}</Text>
        </View>
        <View style={[styles.body15, styles.Center]}>
          <Text>{item.GROUNDNAME}</Text>
        </View>
        <View
          style={[
            styles.body20,
            { flexDirection: "row", justifyContent: "center" },
          ]}
        >
          <Pressable
            onPress={() => {
              btnEdit(item.SRNO);
            }}
          >
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/edit1.png",
              }}
              style={{ width: 25, height: 25, marginRight: 5 }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              btnRemove(item.SRNO);
            }}
          >
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/tournament/remove.png",
              }}
              style={{ width: 25, height: 25 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
  return (
    <View style={[styles.Container]}>
      {Dateshow && (
        <DateTimePicker
          testID="dateTimePickerTime"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeStart}
          minimumDate={MinStartDate}
          //minimumDate={new Date(2022,12,10)}
          //maximumDate={new Date()}
          maximumDate={MaxStartDate}
        />
      )}

      {Dateshow_Time && (
        <DateTimePicker
          testID="dateTimePickerTime"
          value={dateTime}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
          minimumDate={MinStartDate}
          //minimumDate={new Date(2022,12,10)}
          //maximumDate={new Date()}
          maximumDate={MaxStartDate}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({ modalVisible: !modalVisible });
        }}
      >
        <View style={styles.ModalcenteredView}>
          <View style={styles.ModalView}>
            <View style={[styles.body100, { marginBottom: 20 }]}>
              <Text style={styles.ModalText1}>Edit Match Deatils</Text>
            </View>
            <View style={styles.body100}>
              <Text style={styles.ModalText2}>{Team}</Text>
            </View>
            <View
              style={[
                styles.body100,
                { flexDirection: "row", paddingVertical: 20 },
              ]}
            >
              <View style={styles.body45}>
                <Pressable onPress={() => setDateshow(true)}>
                  <View
                    style={[
                      styles.section,
                      {
                        borderBottomColor:
                          DateError == true
                            ? Color.ErrorColor
                            : Color.Texttitle,
                        borderBottomWidth: 2,
                      },
                    ]}
                  >
                    <Text style={{ color: Color.Texttitle, padding: 2 }}>
                      {DateText}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.body05}></View>
              <View style={[styles.body45]}>
                <Pressable onPress={() => setDateshow_Time(true)}>
                  <View
                    style={[
                      styles.section,
                      {
                        borderBottomColor:
                          DateError_Time == true
                            ? Color.ErrorColor
                            : Color.Texttitle,
                        borderBottomWidth: 2,
                      },
                    ]}
                  >
                    <Text style={{ color: Color.Texttitle, padding: 2 }}>
                      {DateText_Time}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={[styles.body100, { flexDirection: "row" }]}>
              <View style={styles.body50}>
                <Pressable
                  style={[styles.Modalbutton, styles.ModalbuttonClose]}
                  onPress={() => setmodalVisible(false)}
                >
                  <Text style={styles.ModaltextStyle}>Close</Text>
                </Pressable>
              </View>
              <View style={styles.body50}>
                <Pressable
                  style={[styles.Modalbutton, styles.ModalbuttonOpen]}
                  onPress={() => btnUpdate_Modal()}
                >
                  <Text style={styles.ModaltextStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={[styles.Container]}>
        <View style={[{ height: "100%" }]}>
          {/* -------------------------------- Heder ----------------------------------------- */}
          <View style={styles.header}>
            <View style={[styles.item]}>
              <View
                style={[
                  styles.body100,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                  },
                ]}
              >
                <View style={[styles.body20]}>
                  <Text style={styles.WhiteColor}>Date&Time</Text>
                </View>
                <View style={[styles.body30, styles.Center]}>
                  <Text style={styles.WhiteColor}>Teams</Text>
                </View>
                <View style={[styles.body15, styles.Center]}>
                  <Text style={styles.WhiteColor}>Groups</Text>
                </View>
                <View style={[styles.body15, styles.Center]}>
                  <Text style={styles.WhiteColor}>Ground</Text>
                </View>
                <View style={[styles.body20, styles.Center]}>
                  <Text style={styles.WhiteColor}>Action</Text>
                </View>
              </View>
            </View>
          </View>
          {/* -------------------------------- Heder ----------------------------------------- */}
          {/* -------------------------------- List ----------------------------------------- */}
          <FlatList
            data={BindData}
            renderItem={renderItem}
            keyExtractor={(item) => item.SRNO}
            // ListHeaderComponent={renderHeader}
          />
        </View>
        {/* -------------------------------- List ----------------------------------------- */}
      </SafeAreaView>
      {/* <View onLayout={FooterLayout} style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }]}> */}
      <View>
        <Pressable
          style={[styles.button, styles.width100]}
          onPress={() => {
            BtnUpdate();
          }}
        >
          <Text style={styles.footerText}>Update</Text>
        </Pressable>
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
  body100: {
    width: "100%",
  },
  body15: {
    width: "15%",
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
  body10: {
    width: "10%",
  },
  body30: {
    width: "30%",
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
  body45: {
    width: "45%",
  },
  body05: {
    width: "05%",
  },
  body02: {
    width: "02%",
  },
  Center: {
    alignItems: "center",
  },
  ModalcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  ModalView: {
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
  Modalbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  ModalbuttonOpen: {
    backgroundColor: Color.PrimaryColor,
  },
  ModalbuttonClose: {
    backgroundColor: "#2196F3",
  },
  ModaltextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  ModalText: {
    marginBottom: 24,
    textAlign: "center",
  },
  header: {
    height: 50,
    backgroundColor: Color.PrimaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  WhiteColor: {
    color: "#fff",
  },
  ModalText1: {
    fontSize: 24,
    color: Color.PrimaryColor,
    fontWeight: "bold",
  },
  ModalText2: {
    fontSize: 14,
    textAlign: "center",
  },
  ModalText3: {
    fontSize: 14,
  },
});

export default TournamentMatch_AutoMatch_List;
