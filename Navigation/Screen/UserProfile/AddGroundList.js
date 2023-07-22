import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
  ToastAndroid,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../Color/Color";
import LineTextInput from "../../../Component/LineTextInput/LineTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton, Switch } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const AddGroundList = () => {
  const [MatchTypeBorderColor, setMatchTypeBorderColor] = useState(Color.Title);
  const [CityId, setCityId] = useState(null);
  const [CityName, setCityName] = useState(null);
  const [CityIdError, setCityIdError] = useState(false);
  const [GroundName, setGroundName] = useState(null);
  const [GroundNameError, setGroundNameError] = useState(false);

  const [date, setdate] = useState(new Date());
  const [TimeModal, setTimeModal] = useState(false);
  const [FromTimeModal, setFromTimeModal] = useState(false);
  const [DateError, setDateError] = useState(false);
  const [FromDateError, setFromDateError] = useState(false);
  const [DateText, setDateText] = useState("To Time");
  const [FromDateText, setFromDateText] = useState("From Time");
  const [ToHoursTime, setToHoursTime] = useState(null);
  const [ToMiniteTime, setToMiniteTime] = useState(null);
  const [FromHoursTime, setFromHoursTime] = useState(null);
  const [FromMiniteTime, setFromMiniteTime] = useState(null);
  const [cricketkit, setcricketkit] = useState(0);
  const [cricketkitError, setcricketkitError] = useState(false);
  const [Ball, setBall] = useState(0);
  const [BallError, setBallError] = useState(false);

  const [Bat, setBat] = useState(0);
  const [BatError, setBatError] = useState(false);

  const [stump, setstump] = useState(0);
  const [stupmError, setstupmError] = useState(false);

  const [GroundType, setGroundType] = React.useState("Ground");

  const [HourlyCharges, setHourlyCharges] = React.useState(null);
  const [HourlyChargesError, setHourlyChargesError] = React.useState(false);

  const [Active, setActive] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const [GroupList, setGroupList] = useState(true);
  const [GroupListError, setGroupListError] = useState(false);

  const [TotalPage, setTotalPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [GroupList_data, setGroupList_data] = useState([]);
  const [page, setPage] = useState(1);

  const [AddRegister, setAddRegister] = useState(true);
  const [AddModal, setAddModal] = useState(false);
  const [Listmodal, setListmodal] = useState(true);

  const [MainBanner, setMainBanner] = useState(true);
  const [MainBannerUI, setMainBannerUI] = useState(false);
  const [image, setImage] = useState(null);
  const [SendBannerImage, setSendBannerImage] = useState(null);

  const [PageLoad, setPageLoad] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Groundid,setGroundid] = useState(null)

  const [Oper,setOper] = useState('add');

  React.useEffect(() => {
    console.log("Navigation/Screen/UserProfile/AddGroundList.js");

    if (route.params?.CityId) {
      setCityIdError(false);
      setCityId(route.params?.CityId);
    }

    if (route.params?.CityName) setCityName(route.params?.CityName);

    if (PageLoad == 0) GetDate_GroundList();
  });
const DeleteList = async (id) => {
  var url = `${global.domainName}/cricbuddyAPI/api/Commonsp`;

  var data = {
    // OPER: "add",
    OPER: "delete",
    GROUNDID:id,
    SPNAME: "GROUNDMASTER_CRUD",
  };

  const resposneJSON = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
      SpName: "GROUNDMASTER_CRUD",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      /*-------------------- Page Call -----------------------*/
      var BindData = JSON.parse(json);
      
      if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
        alert("Save Successfully.");
        BannerFileTransfer();
        setAddModal(false);
        setListmodal(true);
        setAddRegister(true);
        setMainBannerUI(false);
        setMainBanner(true);
        setSendBannerImage(null);
        onRefresh()
      }
      return json;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
const btnDelete = (id) => {
  
  Alert.alert('Confirmation', 'Are you sure Delete this recored?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {
      DeleteList(id)
    }},
  ]);

}

  const GetDate_GroundList = async () => {
    setPageLoad(1);
    setIsLoading(true);
    try {
      var data = {
        PAGEINDEX: page,
        PAGECOUNT: 30,
        MOBILENO: global.MobileNo,
        SPNAME: "TOURNAMENT_GROUP_GET",
      };

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            // PageIndex: page,
            // PageCount: 30,
            SpName: "GROUNDMASTER_GET",
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
              setTotalPage(BindData.SERVICERESPONSE.TOTALPAGES);
              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                if (List) {
                  List.forEach((List) => {
                    setarray.push({
                      id: List.Groundid,
                      CityId: List.CityId,
                      CityName: List.CityName,
                      StateId: List.StateId,
                      GroundName: List.GroundName,
                      AvailableToTimeText: List.AvailableToTimeText,
                      AvailableFromTimeText: List.AvailableFromTimeText,
                      ToHoursTime: List.ToHoursTime,
                      ToMiniteTime: List.ToMiniteTime,
                      FromHoursTime: List.FromHoursTime,
                      FromMiniteTime: List.FromMiniteTime,
                      CricketKit:List.CricketKit,
                      Ball: List.Ball,
                      Bat: List.Bat,
                      Stump: List.Stump,
                      GroundType: List.GroundType,
                      HourlyCharge: List.HourlyCharge,
                      ActiveGround: List.ActiveGround,
                      MobileNo: List.MobileNo,
                      ImageBanner:List.ImageBanner
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.Groundid,
                  CityId: List.CityId,
                  CityName: List.CityName,
                  StateId: List.StateId,
                  GroundName: List.GroundName,
                  AvailableToTimeText: List.AvailableToTimeText,
                  AvailableFromTimeText: List.AvailableFromTimeText,
                  ToHoursTime: List.ToHoursTime,
                  ToMiniteTime: List.ToMiniteTime,
                  FromHoursTime: List.FromHoursTime,
                  FromMiniteTime: List.FromMiniteTime,
                  CricketKit:List.CricketKit,
                  Ball: List.Ball,
                  Bat: List.Bat,
                  Stump: List.Stump,
                  GroundType: List.GroundType,
                  HourlyCharge: List.HourlyCharge,
                  ActiveGround: List.ActiveGround,
                  MobileNo: List.MobileNo,
                  ImageBanner:List.ImageBanner
                });
              }
              setPage((prevPage) => prevPage + 1);
              setGroupList_data((prevData) => [...prevData, ...setarray]);

              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } catch (error) {
      alert(error);
      setIsLoading(false);
      return;
    } finally {
    }
  };
  const MainBannerUIpickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // mediaTypes: 'photo',
      allowsEditing: true,
      fileName: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
      canceled: false,
      cancelled: false,
    });
    if (!result.canceled) {
      BannerImageUpload(result.assets[0].base64, result.assets[0].uri);
      setImage(result.assets[0].uri);
      setMainBanner(false);
      setMainBannerUI(true);
    }
  };
  const BannerImageUpload = async (Base64, IMAGEUPLOAD) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/ImageUpload/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            BASE64: Base64,
            IMAGEUPLOAD: IMAGEUPLOAD,
            FOLDERNAME: "temp",
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          var List;

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            if (BindData.SERVICERESPONSE.FILENAME) {
              setSendBannerImage(BindData.SERVICERESPONSE.FILENAME);
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
  const BannerFileTransfer = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/ImageFileTransfer/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            IMAGENAME: SendBannerImage,
            OLDFLODER: "temp",
            NEWFLODER: "Ground",
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          var List;

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            if (BindData.SERVICERESPONSE.FILENAME) {
              setSendBannerImage(BindData.SERVICERESPONSE.FILENAME);
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

  const onGroupList = (value) => {
    setGroupList(!GroupList);
  };
  const BtnAddNewGround = async () => {
    //  console.log(SendBannerImage);
    // // console.log(FromMiniteTime);
    //  return;
    var Validation = null;
    if (CityId == null) {
      Validation = "True";
      setCityIdError(true);
    } else {
      setCityIdError(false);
    }

    if (GroundName == null) {
      Validation = "True";
      setGroundNameError(true);
    } else {
      setGroundNameError(false);
    }

    if (DateText == "To Time") {
      Validation = "True";
      setDateError(true);
    } else {
      setDateError(false);
    }

    if (FromDateText == "From Time") {
      Validation = "True";
      setFromDateError(true);
    } else {
      setFromDateError(false);
    }

    if (cricketkit == 0) {
      Validation = "True";
      setcricketkitError(true);
    } else {
      setcricketkitError(false);
    }

    // if (Ball == 0) {
    //   Validation = "True";
    //   setBallError(true);
    // } else {
    //   setBallError(false);
    // }
    // console.log(Bat);
    // if (Bat == 0) {
    //   Validation = "True";
    //   setBatError(true);
    // } else {
    //   setBatError(false);
    // }

    if (Validation == "True") {
      alert("Please fill required fill.");
      return;
    }

    var url = `${global.domainName}/cricbuddyAPI/api/Commonsp`;

    var data = {
      // OPER: "add",
      OPER: Oper,
      GROUNDID:Groundid,
      CITYID: CityId,
      CITYNAME: CityName,
      MOBILENO: global.MobileNo,
      GROUNDNAME: GroundName,
      AVAILABLETOTIMETEXT: DateText,
      AVAILABLEFROMTIMETEXT: FromDateText,
      TOHOURSTIME: ToHoursTime,
      TOMINITETIME: ToMiniteTime,
      FROMHOURSTIME: FromHoursTime,
      FROMMINITETIME: FromMiniteTime,
      CRICKETKIT: cricketkit,
      BALL: Ball ? true : false,
      BAT: Bat ? true : false,
      STUMP: stump ? true : false,
      GROUNDTYPE: GroundType,
      HOURLYCHARGE: HourlyCharges,
      ACTIVEGROUND: GroupList,
      IMAGEBANNER: SendBannerImage,
      SPNAME: "GROUNDMASTER_CRUD",
      PAYMENTTYPE:"Paid"
    };

    const resposneJSON = await fetch(`${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
        SpName: "GROUNDMASTER_CRUD",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        /*-------------------- Page Call -----------------------*/
        var BindData = JSON.parse(json);
        
        if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
          alert("Save Successfully.");
          BannerFileTransfer();
          setAddModal(false);
          setListmodal(true);
          setAddRegister(true);
          setMainBannerUI(false);
          setMainBanner(true);
          setSendBannerImage(null);
          onRefresh()
        }
        return json;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onChangeTime = (event, SelectTime) => {
    setTimeModal(false);
    setFromTimeModal(false);
    const currentDate = SelectTime || date;
    let tempDate = new Date(currentDate);
    setDateText(
      tempDate.getHours() +
        " : " +
        tempDate.getMinutes() +
        " " +
        (tempDate.getHours() >= 13 ? "PM" : "AM")
    );

    setToHoursTime(tempDate.getHours());
    setToMiniteTime(tempDate.getMinutes());
  };

  const onChangeFromTime = (event, SelectTime) => {
    setTimeModal(false);
    setFromTimeModal(false);
    const currentDate = SelectTime || date;
    let tempDate = new Date(currentDate);

    if (+ToHoursTime == tempDate.getHours()) {
      if (+ToMiniteTime <= tempDate.getMinutes()) {
        setFromDateText(
          tempDate.getHours() +
            " : " +
            tempDate.getMinutes() +
            " " +
            (tempDate.getHours() >= 13 ? "PM" : "AM")
        );
        setFromHoursTime(tempDate.getHours());
        setFromMiniteTime(tempDate.getMinutes());
      } else {
        alert("Please select grater then time to time.");
        setFromDateText("From Time");
        setFromHoursTime(null);
        setFromMiniteTime(null);
      }
    } else if (+ToHoursTime < tempDate.getHours()) {
      setFromDateText(
        tempDate.getHours() +
          " : " +
          tempDate.getMinutes() +
          " " +
          (tempDate.getHours() >= 13 ? "PM" : "AM")
      );
      setFromHoursTime(tempDate.getHours());
      setFromMiniteTime(tempDate.getMinutes());
    } else {
      alert("Please select grater then time to time.");
      setFromDateText("From Time");
      setFromHoursTime(null);
      setFromMiniteTime(null);
    }
  };
  const EditDataBind = (id,CityId,CityName,StateId,GroundName,AvailableToTimeText,AvailableFromTimeText,ToHoursTime,ToMiniteTime,FromHoursTime,FromMiniteTime,CricketKit,Ball,Bat,Stump,GroundType,HourlyCharge,ActiveGround,MobileNo,ImageBanner) => {
    setGroundid(id)
    setOper('Edit')
    setAddModal(true);
    setListmodal(false);
    setAddRegister(false);
    if(ImageBanner)
    {
      setMainBannerUI(true);
      setMainBanner(false);
    }else 
    {
      setMainBannerUI(false);
      setMainBanner(true);
    }
    setSendBannerImage(ImageBanner);
    setImage(`${global.domainName}/cricbuddyAPI/UploadFiles/Ground/${ImageBanner}`);
    setCityId(CityId);
    setCityName(CityName);
    setGroundName(GroundName);
    setDateText(AvailableToTimeText);
    setFromDateText(AvailableFromTimeText);
    setToHoursTime(ToHoursTime);
    setToMiniteTime(ToMiniteTime);
    setFromHoursTime(FromHoursTime);
    setFromMiniteTime(FromMiniteTime);
    setcricketkit(CricketKit);
    setBall(Ball);
    setBat(Bat);
    setstump(Stump);
    setGroundType(GroundType);
    setHourlyCharges(HourlyCharge);
    setActive(ActiveGround)


  };

  const clearcontroll = () => {
    setPageLoad(0);
    setGroupList_data([]);
    GetDate_GroundList();
    setGroundid(null)
    setOper('add')
    setAddModal(false);
    setListmodal(true);
    setAddRegister(true);
    setMainBannerUI(false);
    setMainBanner(true);
    setSendBannerImage(null);
    setImage(null);
    setCityId(null);
    setCityName(null);
    setGroundName(null);
    setDateText("To Time");
    setFromDateText("From Time");
    setToHoursTime(null);
    setToMiniteTime(null);
    setFromHoursTime(null);
    setFromMiniteTime(null);
    setcricketkit(null);
    setBall(null);
    setBat(null);
    setstump(null);
    setGroundType("Ground");
    setHourlyCharges(null);
    setActive(true)

  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: "100%"}}>
        {/* <Text style={styles.item} onPress={() => getItem(item)}>
        {item.OrganiserName}
      </Text> */}
        <Pressable
          style={[styles.item, {position: "relative",backgroundColor:'white',overflow:"hidden"} ]}
          onPress={() => EditDataBind(item.id
            ,item.CityId
            ,item.CityName
            ,item.StateId
            ,item.GroundName
            ,item.AvailableToTimeText
            ,item.AvailableFromTimeText
            ,item.ToHoursTime
            ,item.ToMiniteTime
            ,item.FromHoursTime
            ,item.FromMiniteTime
            ,item.CricketKit
            ,item.Ball
            ,item.Bat
            ,item.Stump
            ,item.GroundType
            ,item.HourlyCharge
            ,item.ActiveGround
            ,item.MobileNo
            ,item.ImageBanner
            )}
        >
          
          <View >
            <Image
              style={{ maxHeight:'100%' , maxWidth: '100%', height:'100%' }}
              source={{
                uri: `${global.domainName}/cricbuddyAPI/UploadFiles/Ground/${item.ImageBanner}`,
              }}
            />
            <Pressable
              style={{
                position: "absolute",
                right: 0,
                paddingTop: 10,
                paddingRight: 10,
              }}
              onPress={() => btnDelete(item.id)}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/remove.png`,
                }}
              />
            </Pressable>
          </View>
          <View style={{ padding: 10,position:"absolute",bottom:0, backgroundColor:'white',left: 0,right:0}}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{ fontSize: 16 }}>{item.GroundName} - {item.CityName}</Text>
              <Text style={{ fontSize: 16 }}>{item.GroundType}</Text>
            </View>
            <Text style={{ fontSize: 16 }}>
              RS - {item.HourlyCharge} / {item.MobileNo}
            </Text>
            <Text style={{color:Color.PrimaryColor,fontWeight:"bold"}}>NOTE: YOU WANT TO EDIT GROUND CLICK IMAGE. </Text>
          </View>
          
        </Pressable>
        
      </View>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      if (TotalPage >= page) {
        // setPage((prevPage) => prevPage + 1);
        GetDate_GroundList();
      }
    }
  };

  const onRefresh = React.useCallback(() => {
    setPageLoad(0);
    setGroupList_data([]);
    GetDate_GroundList();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  /* -----------------------refreshing ------------------------------*/
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  /* -----------------------refreshing ------------------------------*/

  const btnBack = () => {
    clearcontroll();
    setAddModal(false);
    setListmodal(true);
    setAddRegister(true);
    setMainBannerUI(false);
    setMainBanner(true);
    setSendBannerImage(null);
    
  };
  return (
    <View style={styles.Container}>
      {AddRegister == true ? (
        <View style={styles.BannerBox}>
          <Pressable
            onPress={() => {
              clearcontroll();
              setAddModal(true);
              setListmodal(false);
              setAddRegister(false);
            }}
          >
            <View style={styles.BannerSpaceBetween}>
              <Text style={styles.BannerTitle}>Want to add new ground?</Text>
              <Text style={styles.BannerTitle}>REGISTER</Text>
            </View>
          </Pressable>
        </View>
      ) : null}
      {AddModal == true ? (
        <ScrollView>
          {MainBannerUI ? (
            <View style={[styles.Banner]}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 200 }}
                />
              )}
            </View>
          ) : null}
          {MainBanner ? (
            <Pressable onPress={MainBannerUIpickImage}>
              <View style={[styles.Banner]}>
                <Image
                  style={styles.imageBanner}
                  source={{
                    uri:
                      "" +
                      global.domainName +
                      "/CricbuddyAdmin/Content/assets/tournament/icon_add_Banner.png",
                  }}
                />
              </View>
            </Pressable>
          ) : null}

          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                {
                  color: CityIdError == false ? Color.Title : Color.ErrorColor,
                },
              ]}
            >
              City
            </Text>
            <View styles={styles.width100}>
              <TextInput
                KeyboardAvoidingView={true}
                placeholder="select City / Town"
                onFocus={() =>
                  navigation.navigate("UserProfileCity", {
                    MobileNo,
                    PageRedirect: "AddGroundList",
                  })
                }
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor:
                    CityIdError == false ? Color.Texttitle : Color.ErrorColor,
                }}
                value={CityName}
              />
            </View>
            {CityIdError == true ? (
              <>
                <View>
                  <Text style={{ color: Color.ErrorColor }}>
                    Please Select City
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                {
                  color:
                    GroundNameError == false ? Color.Title : Color.ErrorColor,
                },
              ]}
            >
              Ground Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomWidth: 2,
                  borderBottomColor:
                    GroundNameError == false
                      ? Color.Texttitle
                      : Color.ErrorColor,
                },
              ]}
              value={GroundName}
              onChangeText={(text) => {
                setGroundName(text);
                setGroundNameError(false);
              }}
              placeholder="Enter Ground Name"
            />
            {GroundNameError == true ? (
              <>
                <View>
                  <Text style={{ color: Color.ErrorColor }}>
                    Enter Ground Name
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text style={[styles.Title, { color: Color.Title }]}>
              Available Time
            </Text>
            <View style={[styles.width100, { flexDirection: "row" }]}>
              <View style={[{ paddingTop: 10 }, styles.width40]}>
                <Pressable onPress={() => setTimeModal(true)}>
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
                  {DateError == true ? (
                    <>
                      <View>
                        <Text style={{ color: Color.ErrorColor }}>
                          Select To Time
                        </Text>
                      </View>
                    </>
                  ) : null}
                </Pressable>
              </View>
              <View style={{ width: "10%" }}></View>
              <View style={[{ paddingTop: 10 }, styles.width40]}>
                <Pressable
                  onPress={() => {
                    if (ToHoursTime) setFromTimeModal(true);
                    else alert("First Select To Time.");
                  }}
                >
                  <View
                    style={[
                      styles.section,
                      {
                        borderBottomColor:
                          FromDateError == true
                            ? Color.ErrorColor
                            : Color.Texttitle,
                        borderBottomWidth: 2,
                      },
                    ]}
                  >
                    <Text style={{ color: Color.Texttitle, padding: 2 }}>
                      {FromDateText}
                    </Text>
                  </View>
                  {FromDateError == true ? (
                    <>
                      <View>
                        <Text style={{ color: Color.ErrorColor }}>
                          Select From Time
                        </Text>
                      </View>
                    </>
                  ) : null}
                </Pressable>
              </View>
            </View>
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
            {FromTimeModal && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={onChangeFromTime}
              />
            )}
          </View>
          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                {
                  color:
                    cricketkitError == false ? Color.Title : Color.ErrorColor,
                },
              ]}
            >
              cricket kit
            </Text>
            <TextInput
              style={{
                borderBottomColor:
                  cricketkitError == true ? Color.ErrorColor : Color.Texttitle,
                borderBottomWidth: 2,
              }}
              value={cricketkit}
              keyboardType="numeric"
              onChangeText={(text) => setcricketkit(text)}
              placeholder="Enter cricket kit"
            />
            {cricketkitError == true ? (
              <>
                <View>
                  <Text style={{ color: Color.ErrorColor }}>
                    Enter cricket kit
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                { color: BallError == false ? Color.Title : Color.ErrorColor },
              ]}
            >
              Ball
            </Text>
            <TextInput
              style={{
                borderBottomColor:
                  BallError == true ? Color.ErrorColor : Color.Texttitle,
                borderBottomWidth: 2,
              }}
              value={Ball}
              keyboardType="numeric"
              onChangeText={(text) => setBall(text)}
              placeholder="Enter Ball"
            />
            {BallError == true ? (
              <>
                <View>
                  <Text style={{ color: Color.ErrorColor }}>
                    Enter ball kit
                  </Text>
                </View>
              </>
            ) : null}
          </View>

          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                { color: BatError == false ? Color.Title : Color.ErrorColor },
              ]}
            >
              Bat
            </Text>
            <TextInput
              style={{
                borderBottomColor:
                  BatError == true ? Color.ErrorColor : Color.Texttitle,
                borderBottomWidth: 2,
              }}
              value={Bat}
              keyboardType="numeric"
              onChangeText={(text) => setBat(text)}
              placeholder="Enter Bat"
            />
            {BatError == true ? (
              <>
                <View>
                  <Text style={{ color: Color.ErrorColor }}>Enter Bat kit</Text>
                </View>
              </>
            ) : null}
          </View>

          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                { color: stupmError == false ? Color.Title : Color.ErrorColor },
              ]}
            >
              Stump
            </Text>
            <TextInput
              style={{
                borderBottomColor:
                  stupmError == true ? Color.ErrorColor : Color.Texttitle,
                borderBottomWidth: 2,
              }}
              value={stump}
              keyboardType="numeric"
              onChangeText={(text) => setstump(text)}
              placeholder="Enter stump"
            />
            {stupmError == true ? (
              <>
                <View>
                  <Text style={{ color: Color.ErrorColor }}>
                    Enter Stump kit
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                { color: stupmError == false ? Color.Title : Color.ErrorColor },
              ]}
            >
              Ground Type
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setGroundType(newValue)}
              value={GroundType}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Ground" />
                  <Text>Ground</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="Stadium" />
                  <Text>Stadium</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View style={[styles.width100, { marginTop: 10 }]}>
            <Text
              style={[
                styles.Title,
                {
                  color:
                    HourlyChargesError == false
                      ? Color.Title
                      : Color.ErrorColor,
                },
              ]}
            >
              Per Hourly Charges
            </Text>
            <TextInput
              style={{
                borderBottomColor:
                  HourlyChargesError == true
                    ? Color.ErrorColor
                    : Color.Texttitle,
                borderBottomWidth: 2,
              }}
              value={HourlyCharges}
              keyboardType="numeric"
              onChangeText={(text) => setHourlyCharges(text)}
              placeholder="Enter Per Hourly Charge."
            />
            {HourlyChargesError == true ? (
              <>
                <View>
                  <Text style={{ color: Color.ErrorColor }}>
                    Enter Stump kit
                  </Text>
                </View>
              </>
            ) : null}
          </View>

          <View style={[styles.width100, { flexDirection: "row" }]}>
            <View style={[styles.width40, { justifyContent: "center" }]}>
              <Text style={styles.Title}>Active</Text>
            </View>
            <View style={[styles.width60]}>
              <Switch value={GroupList} onValueChange={onGroupList} />
            </View>
          </View>
          <View
            style={[styles.width100, { marginTop: 10, flexDirection: "row" }]}
          >
            <Pressable
              style={[
                styles.button,
                {
                  borderColor: Color.PrimaryColor,
                  borderWidth: 2,
                  width: "50%",
                  borderRadius: 20,
                  backgroundColor: "white",
                },
              ]}
              onPress={() => btnBack()}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "900",
                  color: Color.PrimaryColor,
                }}
              >
                Back
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: Color.PrimaryColor,
                  width: "50%",
                  borderRadius: 20,
                },
              ]}
              onPress={() => BtnAddNewGround()}
            >
              <Text style={{ fontSize: 16, fontWeight: "900", color: "white" }}>
                Add New Ground
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : null}

      {Listmodal == true ? (
        <FlatList
          data={GroupList_data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
  width60: {
    width: "60%",
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
  item: {
    marginVertical: 10,
    height: 250,
    width: "100%",
    fontSize: 18,
    borderColor: Color.Texttitle,
    borderWidth: 1,
    backgroundColor: "white",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    
  },
  BannerBox: {
    // marginLeft: 10,
    // marginTop: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    width: "100%",
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
  imageBanner: {
    height: 100,
    width: 100,
  },
  Banner: {
    alignItems: "center",
    borderBottomColor: Color.Texttitle,
    borderBottomWidth: 5,
    height: 200,
    justifyContent: "center",
  },
});
export default AddGroundList;
