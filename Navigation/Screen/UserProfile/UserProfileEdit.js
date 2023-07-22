import React, { useState,useCallback,useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  Alert,
  Modal
} from "react-native";
import Color from "../../../Color/Color";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import BowlingStyle from "./UserProfileDropDown/BowlingStyle";


const UserProfileEdit = props => {
    
    const navigation = useNavigation();
    const route = useRoute();
    let MobileNo = route.params.MobileNo || '';
    const [Passwordshow, setPasswordshow] = useState(true);
    const [errroborder, seterrroborder] = useState(Color.Texttitle);
    const [test, settest] = useState("test");
    const [USERMASTERID, setUSERMASTERID] = useState("");
    const [Gender,setGender] = useState('female');
    const [Name, setName] = useState("-");
    const [location, setlocation] = useState("");
    const [Email, setEmail] = useState("");
    const [pin, setpin] = useState("");
    const { handleSubmit, control } = useForm();
    const [scrollEnabled, setscrollEnabled] = useState(false);
    const [PlayingroleOpen, setPlayingroleOpen] = useState(false);
    const [PlayingroleValue, setPlayingroleValue] = useState(null);
    const [PAYINGROLENAME, setPAYINGROLENAME] = useState("");
    const [Playingrole, setPlayingrole] = useState([]);
   
    const [BATTINGSTYLENAME, setBATTINGSTYLENAME] = useState("");
    const [BattingStyleOpen, setBattingStyleOpen] = useState(false);
    const [BattingStyleValue, setBattingStyleValue] = useState(null);
    const [BattingStyle, setBattingStyle] = useState([]);

    const [BOWLINGSTYLENAME, setBOWLINGSTYLENAME] = useState("");
    const [BowlingstyleOpen, setBowlingstyleOpen] = useState(false);
    const [BowlingstyleValue, setBowlingstyleValue] = useState(null);
    const [Bowlingstyle, setBowlingstyle] = useState([]);

    const [TextErrorDisplay, setTextErrorDisplay] = useState("");
    const [ErrorFlag,setErrorFlag] = useState(false);
    const [Ref, setRef] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [CityId, setCityId] = useState(null);
    const [CityName, setCityName] = useState(null);
    
    React.useEffect(() => {
      console.log("Navigation/Screen/UserProfile/UserProfileEdit.js");
      // if(route.params?.CityId || route.params?.CityName || route.params?.PayingRoletitle)
      // {
      //   UserProfile_GET();
      // }
        

      // if(route.params?.CityId)
      //   setCityId(route.params?.CityId) 
      
      // if(route.params?.CityName)
      //   setCityName(route.params?.CityName)

      // if(route.params?.PayingRoletitle)
      //   setPAYINGROLENAME(route.params?.PayingRoletitle)

      // if(route.params?.PayingRoleid)
      //   setPlayingroleValue(route.params?.PayingRoleid)
      
      console.log(route.params?.Oper)
      if(route.params?.Oper == 'Add')
      {
        storeData(
          route.params?.PayingRoletitle,
          route.params?.PayingRoleid,
          route.params?.Battingstyleid,
          route.params?.Battingstyletitle,
          route.params?.Bowlingstyleid,
          route.params?.Bowlingstyletitle,
          route.params?.CityId,
          route.params?.CityName,
        );
      }
      else{
        if(route.params?.CityId)
          setCityId(route.params?.CityId) 
        
        if(route.params?.CityName)
          setCityName(route.params?.CityName)

        if(route.params?.PayingRoletitle)
          setPAYINGROLENAME(route.params?.PayingRoletitle)

        if(route.params?.PayingRoleid)
          setPlayingroleValue(route.params?.PayingRoleid)
        
        if (route.params?.Battingstyletitle != null) {
          setBATTINGSTYLENAME(route.params?.Battingstyletitle);
        }

        if (route.params?.Battingstyleid != undefined && route.params?.Battingstyleid != null)
         {
           setBattingStyleValue(route.params?.Battingstyleid);
         } 

        if (
          route.params?.Bowlingstyletitle != undefined &&
          route.params?.Bowlingstyletitle != null
        ) {
          setBOWLINGSTYLENAME(route.params?.Bowlingstyletitle);
        } 
        if (
          route.params?.Bowlingstyleid != undefined &&
          route.params?.Bowlingstyleid != null
        ) {
          setBowlingstyleValue(route.params?.Bowlingstyleid);
        } 
      }
      route.params?.Oper == 'Edit';
      
    }, [(route.params)]);
    const storeData = async (
      PayingRoletitle,
      PayingRoleid,
      Battingstyleid,
      Battingstyletitle,
      Bowlingstyleid,
      Bowlingstyletitle,
      CityId,
      CityName
    ) => {
      try {
        UserProfile_GET(
          PayingRoletitle,
          PayingRoleid,
          Battingstyleid,
          Battingstyletitle,
          Bowlingstyleid,
          Bowlingstyletitle,
          CityId,
          CityName
        );
      } catch (e) {}
    };
    const checkbutton = async (PayingRoletitle,PayingRoleid,Battingstyleid,Battingstyletitle) => {
      console.log(CityId)
      console.log(CityName)
      console.log(PlayingroleValue)
      console.log(BattingStyleValue)
      console.log(BowlingstyleValue)
    };
    
    const btnSave = async () => {
      if(ErrorFlag == false)
      {
      try {
        const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/USERPROFILE/`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            },
            body: JSON.stringify({
              USERMASTERID: USERMASTERID,
              MOBILENO: MobileNo,
              NAME:Name,
              EMAIL:Email,
              GENDER:Gender,
              PAYINGROLE:PlayingroleValue,
              BATTINGSTYLE:BattingStyleValue,
              BOWLINGSTYLE:BowlingstyleValue,
              // LOCATION:location,
              CITYID:CityId,
              CITYNAME:CityName,
              PIN:pin,
              OPER:"edit"
            }),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            /*-------------------- Page Call -----------------------*/
            global.CityId = CityId;
            global.CityName = CityName; 


            setModalVisible(true)
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
    else 
    {
      alert("Set validation")
    }
    };
    
    const UserProfile_GET = async (
      PayingRoletitle,
      PayingRoleid,
      Battingstyleid,
      Battingstyletitle,
      Bowlingstyleid,
      Bowlingstyletitle,
      CityId,
      CityName
    ) => {
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
                  setUSERMASTERID(List.USERMASTERID);
                  setName(List.NAME);
                  if (CityId != null) {
                    setCityId(CityId);
                  } else {
                    setCityId(List.CITYID);
                  }
                  
                  if (CityName != null) {
                    setCityName(CityName);
                  } else {
                    setCityName(List.CITYNAME);
                  }
                  
                  setEmail(List.EMAIL);
                  setpin(List.PASSWORD);

                  if (PayingRoletitle) setPAYINGROLENAME(PayingRoletitle);
                  else setPAYINGROLENAME(List.PAYINGROLENAME);

                  if (PayingRoleid != null) {
                    setPlayingroleValue(PayingRoleid);
                  } else {
                    setPlayingroleValue(List.PAYINGROLE);
                  }

                  if (Battingstyletitle != null) {
                    setBATTINGSTYLENAME(Battingstyletitle);
                  } else {
                    setBATTINGSTYLENAME(List.BATTINGSTYLENAME);
                  }

                  if (Battingstyleid != undefined && Battingstyleid != null) {
                    setBattingStyleValue(Battingstyleid);
                  } else {
                    setBattingStyleValue(List.BATTINGSTYLE);
                  }
                  if (
                    Bowlingstyletitle != undefined &&
                    Bowlingstyletitle != null
                  ) {
                    setBOWLINGSTYLENAME(Bowlingstyletitle);
                  } else {
                    setBOWLINGSTYLENAME(List.BOWLINGSTYLENAME);
                  }
                  //setBattingStyleValue(List.BATTINGSTYLE)
                  // setBowlingstyleValue(List.BOWLINGSTYLE)
                  if (Bowlingstyleid != undefined && Bowlingstyleid != null) {
                    setBowlingstyleValue(Bowlingstyleid);
                  } else {
                    setBowlingstyleValue(List.BOWLINGSTYLE);
                  }
                  if (List.GENDER == "male") {
                    setGender("male");
                  } else if (List.GENDER == "female") {
                    setGender("female");
                  } else {
                    setGender("female");
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
    const validateEmail = (text) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setEmail({ text });
        setTextErrorDisplay(
          <Text style={styles.error}>
            {" "}
            * Please Enter Correct Email Address
          </Text>
        );
        setErrorFlag(true);
        seterrroborder("red");
        return false;
      } else {
        setEmail({ text });
        setTextErrorDisplay("");
        seterrroborder(Color.Texttitle);

        setErrorFlag(false);
      }
    };
  
    const Bowlingstyle_GET = async () => {
      try {
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/Common/3`,
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
            var PayingRoleData = JSON.parse(json);
            if (PayingRoleData.SERVICERESPONSE.RESPONSECODE == "0") {
              var DataTransfer =
                PayingRoleData.SERVICERESPONSE.DETAILSLIST.DETAILS;
  
              var setarray = [],
                CheckTransferName = "";
              DataTransfer.forEach((DataTransfer) => {
                setarray.push({
                  label: DataTransfer.NAME,
                  value: DataTransfer.ID,
                });
              });
              setBowlingstyle(setarray);
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


    return (
      <View style={styles.Container}>
        <View style={[styles.header]}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: Color.PrimaryColor,
            }}
            onPress={() => checkbutton()}
          >
            My Profile
          </Text>
        </View>
        <ScrollView scrollEnabled={true}>
          <View style={styles.body}>
            <View style={styles.body100}>
              <Text style={styles.title}>MOBILE NO</Text>
              <Text style={styles.title1}>{MobileNo}</Text>
            </View>
            <View style={styles.body100}>
              <Text style={styles.title}>Player Name</Text>
              <TextInput
                autoFocus
                placeholderTextColor={"black"}
                value={Name == "-" ? "" : Name}
                style={styles.input}
                onChangeText={(text) => setName(text)}
                placeholder="Enter Name"
              />
            </View>
            <View style={styles.body100}>
              <Text style={styles.title}>Location</Text>
              {/* <TextInput
                placeholderTextColor={"black"}
                value={location == "-" ? "" : location}
                style={styles.input}
                onChangeText={(text) => setlocation(text)}
                placeholder="Enter Location"
              /> */}
               <TextInput
                    KeyboardAvoidingView={true}
                    placeholder="Search City"
                    onFocus={() => navigation.navigate("UserProfileCity",{
                      MobileNo,
                      PageRedirect:"UserProfileEdit"
                    })}
                    style={styles.input}
                    value={CityName}
                  />
            </View>
            <View style={styles.body100}>
              <Text style={styles.title}>Email</Text>
              <TextInput
                placeholderTextColor={"black"}
                style={[styles.input, { borderBottomColor: errroborder }]}
                placeholder="Enter Email Address"
                value={Email == "-" ? "" : Email}
                onChangeText={(text) => validateEmail(text)}
              />
              {TextErrorDisplay}
            </View>
            <View style={styles.body100}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>PIN</Text>
                <Ionicons
                  onPress={() =>
                    Passwordshow == true
                      ? setPasswordshow(false)
                      : setPasswordshow(true)
                  }
                  name="eye"
                  size={30}
                  style={{ marginRight: 15 }}
                />
              </View>
              <TextInput
                placeholderTextColor={"black"}
                placeholder="Enter Pin Set"
                style={styles.input}
                value={pin == "-" ? "" : pin}
                secureTextEntry={Passwordshow}
                onChangeText={(text) => setpin(text)}
              />
            </View>
            <View style={styles.body100}>
              <Text style={styles.title}>Paying Role</Text>
              <TextInput
                placeholderTextColor={"black"}
                value={PAYINGROLENAME}
                style={styles.input}
                placeholder="Select Paying Role"
                onFocus={() =>
                  navigation.navigate("PayingRole", {
                    MobileNo,
                  })
                }
              />
            </View>
            <View style={styles.body100}>
              <Text style={styles.title}>Batting Style</Text>
              <TextInput
                placeholderTextColor={"black"}
                value={BATTINGSTYLENAME}
                style={styles.input}
                placeholder="Select Batting Style"
                onFocus={() =>
                  navigation.navigate("BattingStyle", {
                    MobileNo,
                  })
                }
              />
            </View>
            <View style={styles.body100}>
              <Text style={styles.title}>Bowling Style</Text>
              <TextInput
                placeholderTextColor={"black"}
                value={BOWLINGSTYLENAME}
                style={styles.input}
                placeholder="Select Bowling Style"
                onFocus={() =>
                  navigation.navigate("BowlingStyle", {
                    MobileNo,
                  })
                }
              />
            </View>
            {/* <View style={styles.body100}>
              <Text style={styles.title}>Paying Role</Text>
              <View style={styles.width100}>
                <View style={[styles.dropdown]}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select a Paying Role...",
                      value: null,
                    }}
                    onValueChange={(value) => setPlayingroleValue(value)}
                    value={PlayingroleValue}
                    items={Playingrole}
                  />
                </View>
              </View>
            </View>

            <View style={styles.body100}>
              <Text style={styles.title}>Batting Style</Text>
              <View style={styles.width100}>
                <View style={[styles.dropdown]}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select a Batting Type...",
                      value: null,
                    }}
                    onValueChange={(value) => setBattingStyleValue(value)}
                    value={BattingStyleValue}
                    items={BattingStyle}
                  />
                </View>
              </View>
            </View>

            <View style={styles.body100}>
              <Text style={styles.title}>Bowling Style</Text>
              <View style={styles.width100}>
                <View style={[styles.dropdown]}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select a Bowling Type...",
                      value: null,
                    }}
                    onValueChange={(value) => setBowlingstyleValue(value)}
                    value={BowlingstyleValue}
                    items={Bowlingstyle}
                  />
                </View>
              </View>
            </View> */}

            <View style={styles.body100}>
              <Text style={styles.title}>Gender</Text>
              <View style={[styles.width100, styles.rbtwrapper]}>
                {["female", "male"].map((feeling) => (
                  <View key={feeling} style={styles.rbtmood}>
                    <TouchableOpacity
                      style={styles.rbtnborder}
                      onPress={() => setGender(feeling)}
                    >
                      {[
                        Gender === feeling && (
                          <View key={feeling} style={styles.rbtninner} />
                        ),
                      ]}
                    </TouchableOpacity>
                    <Text
                      onPress={() => setGender(feeling)}
                      style={styles.rbtfeeling}
                    >
                      {feeling}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.body100, { color: "white" }]}>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => btnSave()}
              >
                <Text style={{ color: "white" }}>
                  {" "}
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={Color.ButtonSize}
                  />{" "}
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View style={styles.ModalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{backgroundColor:"#000000AA",flex:1}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.image}
                  source={{
                    uri: ""+global.domainName+"/CricbuddyAdmin/Content/assets/confrim.png",
                  }}
                />
                <Text style={styles.modalText}>
                  profile updated successfully
                </Text>
                <Pressable
                  style={[styles.Modalbutton, styles.ModalbuttonClose]}
                  onPress={() => navigation.navigate("MainPage")}
                >
                  <Text style={styles.textStyle}> Ok </Text>
                </Pressable>
              </View>
            </View>
            </View>
          </Modal>
        </View>
      </View>
    );
    };
const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: Color.WhiteBGColor,
      borderColor: Color.WhiteBGColor,
      borderWidth: 5,
      margin: 10,
      
    },
    header: {
      flexDirection: "row",
      justifyContent: "center",
    },
    body: {
      flexDirection: "column",
      flexWrap: "wrap",
      marginTop: 10,
      alignItems: "center",
    },
    body100: {
      width: "100%",
      paddingVertical: 5,
    },
    title: {
      color: Color.Texttitle,
      fontWeight: "bold",
      fontSize: 18,
      margin: 5,
    },
    title1: {
      color: "black",
      Weight: "bold",
      fontSize: 20,
      marginLeft: 5,
    },
    input: {
      height: 40,
      paddingLeft: 12,
      borderBottomWidth: 1,
      borderBottomColor: Color.Texttitle,
    },
    dropdowninput:{
      height: 30,
      paddingLeft: 12,
      borderBottomWidth: 1,
      borderBottomColor: Color.Texttitle,
    },
    rbtnborder:{
      width:25,
      height:25,
      borderWidth:1,
      borderRadius:15,
      justifyContent:'center',
      alignItems:'center',
      borderColor:Color.PrimaryColor,
    },
    rbtninner:{
      width:12,
      height:12,
      backgroundColor:Color.PrimaryColor,
      borderRadius:10
    },
    rbtwrapper:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      marginTop:10
    },
    rbtmood:{
      marginHorizontal:15,
      alignItems:'center',
      flexDirection:"row"
    },
    rbtfeeling:{
      fontSize:14,
      textTransform:'capitalize',
      marginHorizontal:10
    },
    button:{
      borderRadius: 20,
      elevation: 2,
      padding:12,
      alignItems:'center',
      color:"green"
  
    },
    buttonSave: {
      backgroundColor: Color.PrimaryColor,
      
    },
    dropdown:{
      borderColor: "black",
      borderWidth: 1,
      borderRadius:10
    }
    ,error:{
      color:"red"
      ,paddingLeft:10
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
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    Modalbutton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    ModalbuttonOpen: {
      backgroundColor: "#F194FF",
    },
    ModalbuttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    ModalContainer:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100
    },
    image:{
      marginTop:30,
      width: 70,
      height: 70,
      marginBottom:30
     },
  });
  


export default UserProfileEdit;

