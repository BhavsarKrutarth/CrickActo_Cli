import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  Image,
  Button,
  TextInput,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Color from "../../../Color/Color";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { not } from "react-native-reanimated";
import InertNetCheck from "../InertNetCheck";

const storeData = async (MobileNo) => {
  try {
    const firstPair = ["@login", "true"];
    const secondPair = ["@MobileNo", MobileNo];
    //await AsyncStorage.setItem([firstPair,secondPair]);
    await AsyncStorage.setItem("@MobileNo", MobileNo);
    await AsyncStorage.setItem("@login", "true");
    global.login = "true";
    global.MobileNo = MobileNo;
    // console.log(await AsyncStorage.setItem('@MobileNo',MobileNo))
  } catch (e) {
    // saving error
  }
};
const PinSet = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  let GetParam_MobileNo = route.params.GetParam_MobileNo || "";
  let GetParam_Countrycode = route.params.Countrycode || "";
  const [phoneNumber, setPhoneNumber] = useState(GetParam_MobileNo);
  const [FillCountrycode, setFillCountrycode] = useState(GetParam_Countrycode);
  const [pinset, setpinset] = useState("");
  const [Name, SetName] = useState("");
  const [NameEditable, setNameEditable] = useState(true);

  const [CityId, setCityId] = useState(null);
  const [CityName, setCityName] = useState(null);

  const [CountryCode, setCountryCode] = useState("");
  const [CountryCode_state, setCountryCode_state] = useState("");
  const [buttoncolor, setbuttoncolor] = useState(Color.PrimaryColor);
  const phoneInput = useRef(null);

  const UserMasterDeatil = async (phoneNumber) => {
    try {
      var data = {
        MOBILENO: phoneNumber,
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "USERMASTER_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          console.log(BindData);
          if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;

              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                console.log(List);
                if (List.CITYID) setCityId(List.CITYID);
                if (List.CITYNAME) setCityName(List.CITYNAME);
                // if(List.PASSWORD)
                if (List.PASSWORD) setpinset(List.PASSWORD);
                if (List.NAME) SetName(List.NAME);
                if (List.NAME != "" && List.NAME != null)
                  setNameEditable(false);
                else setNameEditable(true);
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

  React.useEffect(() => {
    console.log("Navigation/Screen/Login/PinSet.js");

    UserMasterDeatil(phoneNumber);

    if (route.params?.CityId) setCityId(route.params?.CityId);

    if (route.params?.CityName) setCityName(route.params?.CityName);

    //console.log(phoneNumber || 'Null Mobile no')
    // if(route.params?.MobileNo)
    //   setPhoneNumber(route.params?.MobileNo);
  }, [route.params]);

  const checkphonenumber = (phoneNumber) => {
    //setPhoneNumber(mobileno);
  };
  const CityName_GET = async (MobileNo) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/UserMaster/` + MobileNo,
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
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              if (List) {
                if (List.CITYID != null) {
                  global.CityId = List.CITYID;
                }
                if (List.CITYNAME != null) {
                  global.CityName = List.CITYNAME;
                }
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
  function btnclicklogin() {
    if (CityName != null && pinset != "" && Name != "") {
      PinSet(GetParam_MobileNo, GetParam_Countrycode);
    } else {
      AlertShow();
    }
  }
  function AlertShow() {
    Alert.alert("Warning", "Please Set PassWord,Location and Name.", [
      { text: "OK" },
    ]);
  }

  const PinSet = async (MobileNo, Countrycode) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/PinSet/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            MobileNo: phoneNumber,
            PIN: pinset,
            CITYID: CityId,
            CITYNAME: CityName,
            NAME: Name,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          CityName_GET(phoneNumber);
          storeData(phoneNumber);
          navigation.navigate("Drawer", {
            phoneNumber,
          });

          /*-------------------- Page Call -----------------------*/

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
  return (
    <View style={styleSheet.MainContainer}>
      <InertNetCheck />
      <Image
        style={styleSheet.image}
        source={{
          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tiny_logo.png`,
        }}
      />

      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode={FillCountrycode}
        layout="first"
        withShadow
        containerStyle={styleSheet.phoneNumberView}
        textInputProps={{ maxLength: 10 }}
        textContainerStyle={{ paddingVertical: 0 }}
        onChangeFormattedText={(text) => {
          // setPhoneNumber(text)
          setCountryCode(phoneInput.current?.getCountryCode() || "");
          setCountryCode_state(phoneInput.current.state.code || "");
        }}
        onChangeText={(phoneNumber) => checkphonenumber(phoneNumber)}
      />
      <TextInput
        onChangeText={(Name) => SetName(Name)}
        value={Name}
        editable={NameEditable}
        style={[
          styleSheet.phoneNumberView,
          { marginVertical: 10, paddingLeft: 10, elevation: 16 },
        ]}
        autoFocus
        placeholder="Enter Register Name."
      />
      <TextInput
        onChangeText={(pinset) => setpinset(pinset)}
        value={pinset}
        placeholder="Set New PassWord"
        style={[
          styleSheet.phoneNumberView,
          { marginBottom: 10, paddingLeft: 10, elevation: 16 },
        ]}
      />

      <TextInput
        KeyboardAvoidingView={true}
        placeholder="  Search City"
        onFocus={() =>
          navigation.navigate("UserProfileCity", {
            GetParam_MobileNo,
            PageRedirect: "PinSet",
          })
        }
        style={[styleSheet.phoneNumberView, { elevation: 16, paddingLeft: 10 }]}
        value={CityName}
      />

      <Pressable
        style={[styleSheet.button, { backgroundColor: buttoncolor }]} //onPress={() => props.navigation.navigate('OTP_Verify')}
        onPress={() => btnclicklogin()}
      >
        <Text style={styleSheet.buttonText}>Let's Play</Text>
      </Pressable>

      {/* <Text style={styleSheet.terms1}>By clicking. I accept the terms of services and privacy policy.</Text> */}
    </View>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
  },
  image: {
    marginTop: 80,
    width: 70,
    height: 70,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 20,
    color: "black",
  },

  phoneNumberView: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    width: "60%",
    padding: 8,
    //backgroundColor: '#DC6933',
    //backgroundColor: Color.sliverColor,
    borderRadius: 12,
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  terms1: {
    textAlign: "center",
  },
  terms2: {
    textAlign: "center",
    marginLeft: 500,
  },
});

export default PinSet;
