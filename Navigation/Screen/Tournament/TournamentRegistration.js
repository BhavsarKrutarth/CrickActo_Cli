import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Text,
  ToastAndroid,
  TextInput,
  PermissionsAndroid
} from "react-native";
import Checkbox from "expo-checkbox";
import Color from "../../../Color/Color";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

const TournamentRegistration = (props) => {
/*-------------------- Image Upload  -------------------------------*/
  const selectFile = async () => {
    var options = {
      mediaType: 'photo',
      includeBase64: true
    }
    const OpenCamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    // console.log(OpenCamera)
    if (OpenCamera === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary(options)
      if (!result.canceled) {
        BannerImageUpload(result.assets[0].base64, result.assets[0].uri);
        // const fileName = result.assets[0].uri.split('/').pop();
        // setImageName(fileName);
        setImageFlieName(result.assets[0].uri);
        setImage(result.assets[0].uri);
        setImgUI(true);
      }
    }
  };


  function showToast(Text) {
    ToastAndroid.show(Text, ToastAndroid.SHORT);
  }

  const navigation = useNavigation();
  const route = useRoute();
  const [image, setImage] = useState(null);
  const [MainBanner, setMainBanner] = useState(true);
  const [MainBannerUI, setMainBannerUI] = useState(false);
  const [SendBannerImage, setSendBannerImage] = useState(null);

  const [userprofileimage, setuserprofileimage] = useState(null);
  const [UserProfile, setUserProfile] = useState(true);
  const [UserProfileUI, setUserProfileUI] = useState(false);
  const [sendUserProfileImage, setsendUserProfileImage] = useState(null);

  const [cityid, setcityid] = useState(null);
  const [citytitle, setcitytitle] = useState(null);
  const [cityError, setcityError] = useState(false);

  const [Groundid, setGroundid] = useState(null);
  const [Groundtitle, setGroundtitle] = useState(null);
  const [GroundError, setGroundError] = useState(false);

  const [isChecked, setChecked] = useState(false);

  const [startDateshow, setstartDateshow] = useState(false);
  const [date, setdate] = useState(new Date());
  const [DateText, setDateText] = useState("Start Date *");
  const [startDateError, setstartDateError] = useState(false);
  const [SendDateText, setSendDateText] = useState(null);
  const [MinStartDate, setMinStartDate] = useState(new Date());
  const [MaxStartDate, setMaxStartDate] = useState(null);
  const [startcmpDate, setstartcmpDate] = useState(null);

  const [EndDateshow, setEndDateshow] = useState(false);
  const [enddate, setenddate] = useState(new Date());
  const [EndDateText, setEndDateText] = useState("End Date *");
  const [EndDateError, setEndDateError] = useState(false);
  const [SendEndDateText, setSendEndDateText] = useState(null);
  const [MinEndDate, setMinEndDate] = useState(new Date());
  const [MaxEndDate, setMaxEndDate] = useState(null);
  const [EndcmpDate, setEndcmpDate] = useState(null);
  const [TermsError, setTermsError] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    setstartDateshow(false);
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
    var g1 = tempDate.getFullYear() + "-" + startMonth + "-" + startday;
    var g2 = EndcmpDate;

    if (g1 < g2) {
      setEndcmpDate(null);
      setSendEndDateText(null);
      setEndDateText(null);
    } else {
      setstartcmpDate(EndcmpDate);
    }
    setMinEndDate(new Date(tempDate.getFullYear(), startMonth - 1, startday));
    setSendDateText(sdate);
    setDateText(fdate);
    setstartDateError(false);
  };
  const onChangeEnd = (event, selectedDate) => {
    setEndDateshow(false);
    const currentDate = selectedDate || date;
    setenddate(currentDate);

    let tempDate = new Date(currentDate);
    let endtday = tempDate.getDate().toString();
    let endMonth = (tempDate.getMonth() + 1).toString();
    let endtdaylength = endtday.length;
    let endMonthlength = endMonth.length;
    if (endtdaylength == 1) {
      endtday = "0" + endtday;
    }
    if (endMonthlength == 1) {
      endMonth = "0" + endMonth;
    }
    let fdate = endtday + "/" + endMonth + "/" + tempDate.getFullYear();
    let sdate = tempDate.getFullYear() + "" + endMonth + "" + endtday;
    setEndcmpDate(tempDate.getFullYear() + "-" + endMonth + "-" + endtday);
    setSendEndDateText(sdate);
    setEndDateText(fdate);
    setEndDateError(false);
  };

  const [Categoryid, setCategoryid] = useState(null);
  const [Categorytitle, setCategorytitle] = useState(null);

  const [BallTypeid, setBallTypeid] = useState(null);
  const [BallTypetitle, setBallTypetitle] = useState(null);

  const [PitchTypeid, setPitchTypeid] = useState(null);
  const [PitchTypetitle, setPitchTypetitle] = useState(null);

  const [MatchTypeid, setMatchTypeid] = useState(null);
  const [MatchTypetitle, setMatchTypetitle] = useState(null);

  const [Remark, setRemark] = useState(null);

  const txtTournamentName = useRef(null);
  const [txtTournamentname, settxtTournamentname] = useState(null);
  const [txtTournamentname_Error, settxtTournamentname_Error] = useState(false);
  const [txtTournamentname_ErrorStyle, settxtTournamentname_ErrorStyle] =
    useState(Color.Texttitle);

  const OrganiserName = useRef(null);
  const [txtOrganiserName, settxtOrganiserName] = useState(null);
  const [txtOrganiserName_Error, settxtOrganiserName_Error] = useState(false);
  const [txtOrganiserName_ErrorStyle, settxtOrganiserName_ErrorStyle] =
    useState(Color.Texttitle);

  const OrganiserNumber = useRef(null);
  const [txtOrganiserNumber, settxtOrganiserNumber] = useState(null);
  const [txtOrganiserNumber_Error, settxtOrganiserNumber_Error] =
    useState(false);
  const [txtOrganiserNumber_ErrorStyle, settxtOrganiserNumber_ErrorStyle] =
    useState(Color.Texttitle);

  const [OPER, setOPER] = useState("add");
  const [TOURNAMENTID, setTOURNAMENTID] = useState(null);

  React.useEffect(() => {
    console.log("Navigation/Screen/Tournament/TournamentRegistration.js");
    storeData();
    // if (route.params?.title) setcitytitle(route.params?.title);
    if (route.params?.CityName) setcitytitle(route.params?.CityName);

    if (route.params?.CityId) {
      setcityError(false);
      // setcityid(route.params?.id);
      setcityid(route.params?.CityId);
    }

    if (route.params?.Groundid) {
      setGroundError(false);
      setGroundid(route.params?.Groundid);
    }

    if (route.params?.Groundtitle) setGroundtitle(route.params?.Groundtitle);

    if (route.params?.Categoryid) setCategoryid(route.params?.Categoryid);

    if (route.params?.Categorytitle)
      setCategorytitle(route.params?.Categorytitle);

    if (route.params?.BallTypeid) setBallTypeid(route.params?.BallTypeid);

    if (route.params?.BallTypetitle)
      setBallTypetitle(route.params?.BallTypetitle);

    if (route.params?.PitchTypeid) setPitchTypeid(route.params?.PitchTypeid);

    if (route.params?.PitchTypetitle)
      setPitchTypetitle(route.params?.PitchTypetitle);

    if (route.params?.MatchTypeid) setMatchTypeid(route.params?.MatchTypeid);

    if (route.params?.MatchTypetitle)
      setMatchTypetitle(route.params?.MatchTypetitle);
  }, [route.params]);

  const [MobileNo, setMobileNo] = useState("");
  const storeData = async () => {
    try {
      setMobileNo(await AsyncStorage.getItem("@MobileNo"));
    } catch (e) { }
  };

  const Tournament_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/TournamentRegistration/` +
        global.MobileNo,
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

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
            if (List) {
              setOPER("Edit");
              setTOURNAMENTID(List.TOURNAMENTID);
              setMobileNo(List.MOBILENO);
              settxtTournamentname(List.TOURNAMENTNAME);
              if (List.BANNERIMAGE) {
                setMainBannerUI(true);
                setMainBanner(false);
                setImage(
                  `${global.domainName}/cricbuddyAPI/UploadFiles/temp/${List.BANNERIMAGE}`
                );
                setSendBannerImage(List.BANNERIMAGE);
              } else {
                setMainBannerUI(false);
                setMainBanner(true);
                setImage(null);
                setSendBannerImage(null);
              }

              if (List.USERPROFILEIMAGE) {
                setUserProfileUI(true);
                setUserProfile(false);
                setuserprofileimage(
                  `${global.domainName}/cricbuddyAPI/UploadFiles/temp/${List.USERPROFILEIMAGE}`
                );
                setsendUserProfileImage(List.USERPROFILEIMAGE);
              } else {
                setUserProfileUI(false);
                setUserProfile(true);
                setuserprofileimage(null);
                setsendUserProfileImage(null);
              }

              setcityid(List.CITYID);
              setcitytitle(List.CITYTITLE);

              setGroundid(List.GROUNDID);
              setGroundtitle(List.GROUNDTITLE);

              settxtOrganiserName(List.ORGANISERNAME);
              settxtOrganiserNumber(List.ORGANISERNO);

              setSendDateText(List.STARTDATETEXT);
              setDateText(List.STARTDATE);

              setSendEndDateText(List.ENDDATETEXT);
              setEndDateText(List.ENDDATE);

              setCategoryid(List.CATEGORYID);
              setCategorytitle(List.CATEGORYTITLE);

              setBallTypeid(List.BALLTYPEID);
              setBallTypetitle(List.BALLTYPETITLE);

              setPitchTypeid(List.PITCHTYPEID);
              setPitchTypetitle(List.PITCHTYPETITLE);

              setMatchTypeid(List.MATCHTYPEID);
              setMatchTypetitle(List.MATCHTYPETITLE);

              if (List.TEAMREGISTRATION == 1) {
                setChecked(true);
              } else {
                setChecked(false);
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
  const btnSave = async () => {
    try {
      if (txtTournamentname == null || txtTournamentname == "") {
        settxtTournamentname_ErrorStyle(Color.ErrorColor);
        settxtTournamentname_Error(true);
        txtTournamentName.current.focus();
        return;
      } else {
        settxtTournamentname_ErrorStyle(Color.Texttitle);
        settxtTournamentname_Error(false);
      }
      if (cityid == null) {
        setcityError(true);
        showToast("Please Select City.");
        return;
      }
      if (Groundid == null) {
        setGroundError(true);
        showToast("Please Select Ground.");
        return;
      }

      if (txtOrganiserName == null || txtOrganiserName == "") {
        settxtOrganiserName_ErrorStyle(Color.ErrorColor);
        settxtOrganiserName_Error(true);
        OrganiserName.current.focus();
        return;
      } else {
        settxtOrganiserName_ErrorStyle(Color.Texttitle);
        settxtOrganiserName_Error(false);
      }

      if (txtOrganiserNumber == null || txtOrganiserNumber == "") {
        settxtOrganiserNumber_ErrorStyle(Color.ErrorColor);
        settxtOrganiserNumber_Error(true);
        OrganiserNumber.current.focus();
        return;
      } else {
        settxtOrganiserNumber_ErrorStyle(Color.Texttitle);
        settxtOrganiserNumber_Error(false);
      }
      if (SendDateText == null) {
        setstartDateError(true);
        showToast("Please Select Start Date.");
        return;
      }
      if (SendEndDateText == null) {
        setEndDateError(true);
        showToast("Please Select End Date.");
        return;
      }

      if (isChecked == false) {
        setTermsError(true);
        showToast("Please Select Team Registration.");
        return;
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/TournamentRegistration`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            Oper: OPER,
            TournamentId: TOURNAMENTID,
            MobileNo: MobileNo,
            BannerImage: SendBannerImage,
            Userprofileimage: sendUserProfileImage,
            Tournamentname: txtTournamentname,
            Cityid: cityid || 0,
            Citytitle: citytitle,
            Groundid: Groundid || 0,
            Groundtitle: Groundtitle,
            Organisername: txtOrganiserName,
            Organiserno: txtOrganiserNumber,
            Startdate: SendDateText,
            Enddate: SendEndDateText,
            // Categoryid: Categoryid || 0,
            // Categorytitle: Categorytitle,
            // Balltypeid: BallTypeid || 0,
            // Balltypetitle: BallTypetitle,
            // Pitchtypeid: PitchTypeid || 0,
            // Pitchtypetitle: PitchTypetitle,
            // Matchtypeid: MatchTypeid || 0,
            // Matchtypetitle: MatchTypetitle,
            Categoryid: 0,
            Categorytitle: "",
            Balltypeid: 0,
            Balltypetitle: "",
            Pitchtypeid: 0,
            Pitchtypetitle: "",
            Matchtypeid: 0,
            Matchtypetitle: "",
            Remark: Remark,
            TeamRegistration: isChecked,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          var TOURNAMENTNAME = "";
          var TOURNAMENTID = "";

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            global.TournamentAdmin = 1;
            global.TournamentName =
              BindData.SERVICERESPONSE.TOURNAMENTNAME || "";
            global.Tournamentid = BindData.SERVICERESPONSE.TOURNAMENTID || "";
          }
          if (SendBannerImage != null)
            TransferImage([{ Image: SendBannerImage }]);

          navigation.navigate("TournamentRegistrationSucces", {
            MobileNo,
          });
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

  const ProfileImagepickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      fileName: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
      canceled: false,
      cancelled: false,
    });
    if (!result.canceled) {
      UserProfileImageUpload(result.assets[0].base64, result.assets[0].uri);
      setuserprofileimage(result.assets[0].uri);
      setUserProfile(false);
      setUserProfileUI(true);
    }
  };

  const MainBannerUIpickImage = async () => {
    var options = {
      mediaType: 'photo',
      includeBase64: true
    }
    const OpenCamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    // console.log(OpenCamera)
    if (OpenCamera === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary(options)
      if (!result.canceled) {
          BannerImageUpload(result.assets[0].base64, result.assets[0].uri);
          setImage(result.assets[0].uri);
          setMainBanner(false);
          setMainBannerUI(true);
      }
    }
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   fileName: true,
    //   base64: true,
    //   aspect: [4, 3],
    //   quality: 1,
    //   canceled: false,
    //   cancelled: false,
    // });
    // if (!result.canceled) {
    //   BannerImageUpload(result.assets[0].base64, result.assets[0].uri);
    //   setImage(result.assets[0].uri);
    //   setMainBanner(false);
    //   setMainBannerUI(true);
    // }
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

  const TransferImage = async (Image) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/ImageTransfer/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            ImageDeatile: { Image },
            OldFloderName: "temp",
            NewFloderName: "UserProfile",
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
  const UserProfileImageUpload = async (Base64, IMAGEUPLOAD) => {
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
              setsendUserProfileImage(BindData.SERVICERESPONSE.FILENAME);
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

  const TermValuechnage = () => {
    setChecked(true)
    setTermsError(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 200 }}
          style={styles.scrollContainer}
        >
          <View>
            <Text>1</Text>
          </View>
          <View style={styles.Container}>
            <View style={[styles.header, { position: "relative" }]}>
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
                <Pressable onPress={
                  MainBannerUIpickImage
                }>
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
            </View>

            <View style={styles.body}>
              <View style={styles.width100}>
                <TextInput
                  ref={txtTournamentName}
                  autoFocus
                  placeholder={"Tournament / Series Name *"}
                  placeholderTextColor={Color.FontColor}
                  onChangeText={(text) => {
                    settxtTournamentname(text);
                    settxtTournamentname_ErrorStyle(Color.Texttitle);
                    settxtTournamentname_Error(false);
                  }}
                  value={txtTournamentname}
                  style={[
                    {
                      borderBottomColor: txtTournamentname_ErrorStyle,
                      borderBottomWidth: 2,
                      color:Color.FontColor
                    },
                  ]}
                />
                {txtTournamentname_Error ? (
                  <Text style={{ color: "red" }}>
                    Please Enter Tournamen / Series Name
                  </Text>
                ) : null}
              </View>
              <View style={[styles.width100, { marginTop: 20 }]}>
                <Text
                  style={[
                    styles.paragraph,
                    {
                      color: cityError == true ? Color.ErrorColor : Color.FontColor,
                    },
                  ]}
                >
                  City <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  KeyboardAvoidingView={true}
                  placeholder="Search City"
                  placeholderTextColor={Color.FontColor}
                  onFocus={() => navigation.navigate("UserProfileCity", {
                    PageRedirect: "TournamentRegistration",
                  })}
                  style={{
                    borderBottomColor:
                      cityError == true ? Color.ErrorColor : Color.Texttitle,
                    borderBottomWidth: 2,
                    color:Color.FontColor
                  }}
                  value={citytitle}
                />
                {cityError == true ? (
                  <Text style={{ color: Color.ErrorColor }}>
                    Please Select City.
                  </Text>
                ) : null}
              </View>
              <View style={[styles.width100, { marginTop: 20 }]}>
                <Text
                  style={[
                    styles.paragraph,
                    {
                      color:
                        GroundError == true ? Color.ErrorColor : Color.FontColor,
                    },
                  ]}
                >
                  Ground <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  KeyboardAvoidingView={true}
                  placeholder="Search Ground"
                  placeholderTextColor={Color.FontColor}
                  onFocus={() =>
                    // navigation.navigate("TouranamentGround", {
                    //   PageRedirect: "TournamentRegistration",
                    // })
                    navigation.navigate("TournamentGroundNewList", {
                      PageRedirect: "TournamentRegistration",
                    })
                  }
                  style={{
                    borderBottomColor:
                      GroundError == true ? Color.ErrorColor : Color.Texttitle,
                    borderBottomWidth: 2,
                    color:Color.FontColor
                  }}
                  value={Groundtitle}
                />
                {GroundError == true ? (
                  <Text style={{ color: Color.ErrorColor }}>
                    Please Select Ground
                  </Text>
                ) : null}
              </View>
              <View style={[styles.width100, { marginTop: 20 }]}>
                <Text style={[styles.paragraph, { color: Color.FontColor }]}>
                  Organiser Name <Text style={{ color: "red" }}>*</Text>
                </Text>

                <TextInput
                  ref={OrganiserName}
                  placeholder={"Enter Organiser Name"}
                  placeholderTextColor={Color.FontColor}
                  onChangeText={(text) => {
                    settxtOrganiserName(text);
                    settxtOrganiserName_ErrorStyle(Color.Texttitle);
                    settxtOrganiserName_Error(false);
                  }}
                  value={txtOrganiserName}
                  style={[
                    {
                      borderBottomColor: txtOrganiserName_ErrorStyle,
                      borderBottomWidth: 2,
                      color:Color.FontColor
                    },
                  ]}
                />
                {txtOrganiserName_Error ? (
                  <Text style={{ color: "red" }}>
                    Please Enter Organiser Name
                  </Text>
                ) : null}
              </View>
              <View style={[styles.width100, { marginTop: 20 }]}>
                <Text style={styles.paragraph}>
                  Organiser Number <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  keyboardType="numeric"
                  ref={OrganiserNumber}
                  maxLength={10}
                  placeholder={"Enter Organiser Number"}
                  placeholderTextColor={Color.FontColor}
                  onChangeText={(text) => {
                    settxtOrganiserNumber(text);
                    settxtOrganiserNumber_ErrorStyle(Color.Texttitle);
                    settxtOrganiserNumber_Error(false);
                  }}
                  value={txtOrganiserNumber}
                  style={[
                    {
                      borderBottomColor: txtOrganiserNumber_ErrorStyle,
                      borderBottomWidth: 2,
                      color:Color.FontColor
                    },
                  ]}
                />
                {txtOrganiserNumber_Error ? (
                  <Text style={{ color: "red" }}>
                    Please Enter Organiser Number
                  </Text>
                ) : null}
              </View>

              <View style={[styles.width100]}>
                <View style={[styles.width100, { marginTop: 20 }]}>
                  <Text style={{ fontSize: 18, color: Color.FontColor }}>Tournament Date</Text>
                </View>
                <View style={styles.section}>
                  <View style={{ width: "45%", marginTop: 20 }}>
                    <Pressable onPress={() => setstartDateshow(true)}>
                      <View
                        style={[
                          styles.section,
                          {
                            borderBottomColor:
                              startDateError != true
                                ? Color.sliverColor
                                : Color.ErrorColor,
                            borderBottomWidth: 2,
                          },
                        ]}
                      >
                        <Text style={{ color: Color.FontColor }}>{DateText}</Text>
                        <Image
                          style={styles.image}
                          source={{
                            uri:
                              "" +
                              global.domainName +
                              "/CricbuddyAdmin/Content/assets/datepick.png",
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>

                  <View style={{ width: "45%", marginTop: 20 }}>
                    <Pressable onPress={() => setEndDateshow(true)}>
                      <View
                        style={[
                          styles.section,
                          {
                            borderBottomColor:
                              EndDateError == true
                                ? Color.ErrorColor
                                : Color.sliverColor,
                            borderBottomWidth: 2,
                          },
                        ]}
                      >
                        <Text style={{ color: Color.FontColor }}>{EndDateText}</Text>
                        <Image
                          style={styles.image}
                          source={{
                            uri:
                              "" +
                              global.domainName +
                              "/CricbuddyAdmin/Content/assets/datepick.png",
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
             <View style={[styles.width100, { marginTop: 20 }]}>
                <Text style={styles.paragraph}>Tournament Category</Text>
                <TextInput
                  KeyboardAvoidingView={true}
                  placeholder="Search Category"
                  placeholderTextColor={Color.FontColor}
                  onFocus={() => navigation.navigate("TouranmentCategory")}
                  style={{
                    borderBottomColor: Color.Texttitle,
                    borderBottomWidth: 2,
                    color:Color.FontColor
                  }}
                  value={Categorytitle}
                />
              </View>
              {/*  <View style={[styles.width100, { marginTop: 20 }]}>
                <Text style={styles.paragraph}>Select Ball Type</Text>
                <TextInput
                  KeyboardAvoidingView={true}
                  placeholder="Select Ball Type"
                  placeholderTextColor={Color.FontColor}
                  onFocus={() => navigation.navigate("TouranmentBallType")}
                  style={{
                    borderBottomColor: Color.Texttitle,
                    borderBottomWidth: 2,
                  }}
                  value={BallTypetitle}
                />
              </View>
              <View style={[styles.width100, { marginTop: 20 }]}>
                <Text style={styles.paragraph}>Pitch Type</Text>
                <TextInput
                  KeyboardAvoidingView={true}
                  placeholder="Select Pitch Type"
                  placeholderTextColor={Color.FontColor}
                  onFocus={() => navigation.navigate("TouranmentPitchType")}
                  style={{
                    borderBottomColor: Color.Texttitle,
                    borderBottomWidth: 2,
                  }}
                  value={PitchTypetitle}
                />
              </View>

              <View style={[styles.width100, { marginTop: 20 }]}>
                <Text style={styles.paragraph}>Match Type</Text>
                <TextInput
                  KeyboardAvoidingView={true}
                  placeholder="Select Match Type"
                  placeholderTextColor={Color.FontColor}
                  onFocus={() => navigation.navigate("TouranmentMatchType")}
                  style={{
                    borderBottomColor: Color.Texttitle,
                    borderBottomWidth: 2,
                  }}
                  value={MatchTypetitle}
                />
              </View> */}
              <View style={[styles.width100, { marginTop: 20 }]}>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={TermValuechnage}
                    color={isChecked ? Color.PrimaryColor : undefined}
                    tintColors={"#368098"}
                  />
                  <Text
                    style={[
                      styles.paragraph,
                      {
                        color:
                          TermsError == true ? Color.ErrorColor : Color.FontColor,
                      },
                    ]}
                  >
                    Allow Players to message on Cric
                    <Text style={{ color: Color.PrimaryColor }}>Buddy</Text> Dm
                    for Team Registration.
                  </Text>
                </View>
              </View>

              <View style={[styles.width100, { marginTop: 20 }]}>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => btnSave()}
                >
                  <Text style={{ color: "white" }}>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
            {startDateshow && (
              <DateTimePicker
                testID="dateTimePicker"
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
            {EndDateshow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={enddate}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChangeEnd}
                minimumDate={MinEndDate}
                maximumDate={MaxEndDate}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.WhiteBGColor,
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  body: {
    flexDirection: "column",
    width: "90%",
    marginTop: 30,
    marginLeft: "5%",
  },
  body100: {
    width: "100%",
  },
  input: {
    borderBottomColor: Color.Texttitle,
    borderBottomWidth: 1,
  },
  Banner: {
    alignItems: "center",
    borderBottomColor: Color.Texttitle,
    borderBottomWidth: 5,
    height: 200,
    justifyContent: "center",
  },
  imageBanner: {
    height: 100,
    width: 100,
  },
  imagelogo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  inputtext: {
    borderBottomColor: "black",
    borderBottomWidth: 5,
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
  },
  buttonSave: {
    backgroundColor: Color.PrimaryColor,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paragraph: {
    fontSize: 12,
    color: Color.FontColor
  },
  checkbox: {
    margin: 8,
  },

  image: {
    width: 20,
    height: 20,
  },
});

export default TournamentRegistration;
