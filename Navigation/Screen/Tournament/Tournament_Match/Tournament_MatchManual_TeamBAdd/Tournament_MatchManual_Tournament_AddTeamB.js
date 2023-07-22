import { ToastAndroid,Image,SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar ,Pressable } from 'react-native'
import React, { useState, useEffect ,useRef} from 'react'
import Color from '../../../../../Color/Color';
import { ScrollView, TextInput,LayoutAnimation } from 'react-native-gesture-handler';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import TransferImage from '../../../../../Component/TransferImage/TransferImage';


const Tournament_MatchManual_Tournament_AddTeamB = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ImgNameinitialElements, ImgName_changeEl]  = useState([]);
  const [initialElements, changeEl]  = useState([]);
  const [TeamData, setTeamData] = useState(initialElements);

  const [Common_CityId, setCommon_CityId] = useState(null);
  const [Common_CityName, setCommon_CityName] = useState(null);
  const [errorddlCity, seterrorddlCity] = useState(Color.Texttitle);

  const [ImgUI, setImgUI] = useState(false);
  const [image, setImage] = useState(null);
  const [SendBannerImage, setSendBannerImage] = useState(null);
  const [ImageName,setImageName] = useState("")
  const [ImageFlieName,setImageFlieName] = useState("")

  //let txtTeamName = "";
  const [txtTeamName,settxtTeamName] = useState('');
  const [errortxtTeamName, seterrortxtTeamName] = useState(Color.Texttitle);
  const txtTeamNameRef = useRef(null);
  const [Team_RedirectPage,setTeam_RedirectPage] = useState(null);

  const [Roundid,setRoundid] = useState(null);
  const [TeamAid,setTeamAid] = useState(null);
  const [TeamAName,setTeamAName] = useState(null)
  const [RedirectPage,setRedirectPage] = useState(null);
  const [Tournament_Matchid,setTournament_Matchid] = useState(null);

  const btnDone = async (data,guid) => {
    
    const resposneJSON = await fetch(
      `${global.domainName}/cricbuddyAPI/api/Commonsp/`,
       {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          SpName:"MYTEAM_TOURNAMENT_API_CRUD",
        },
         body: JSON.stringify(data)
       }
     )
       .then((response) => response.json())
       .then((json) => {
         
         /*-------------------- Page Call -----------------------*/
         var BindData = JSON.parse(json);
         if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
          
           navigation.navigate("Tournament_Match_TeamBPlayer", {
            Roundid:Roundid,
            TeamBid:BindData.SERVICERESPONSE.TeamBid,
            TeamBName:BindData.SERVICERESPONSE.title,
            Tournament_Matchid:Tournament_Matchid,
            RedirectPage:RedirectPage,
            MyTeam_GuId:guid
           }); 
         }
         return json;
       })
       .catch((error) => {
         console.error(error);
       });
   
  }

  const btnSave_AddoneMore = async () => {
    if (txtTeamName == "") {
      seterrortxtTeamName(Color.ErrorColor);
      // txtTeamNameRef.current.focus();
      ToastAndroid.showWithGravityAndOffset(
        "Please Enter Team Name!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );

      return;
    }
    if (Common_CityId == null || Common_CityId == undefined || Common_CityId == 0) {
      seterrorddlCity(Color.ErrorColor);
      ToastAndroid.showWithGravityAndOffset(
        "Please Select City First",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return;
    }
    
    var guid = CreateGuid();
    guid = txtTeamName.substring(0, 2) + '-' + guid
      var data = {
        Open:'Update',
        Tournamentid:global.Tournamentid,
        TournamentName:global.TournamentName,
        MobileNo:global.MobileNo,
        guid: guid,
        ImageName:ImageName,
        ImageFlieName:ImageFlieName,
        ImgTitle: txtTeamName.substring(0, 2),
        Title: txtTeamName,
        CityId: Common_CityId,
        CityName: Common_CityName,
        SpName:"MYTEAM_TOURNAMENT_API_CRUD",
        Tournament_Matchid:Tournament_Matchid,
        LastPageName:"Tournament_Match_TeamBPlayer",
        REDIRECTPAGE:RedirectPage
      }
      btnDone(data,guid) 
  };

  function CreateGuid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  useEffect(() => {
    console.log("Navigation/Screen/Tournament/Tournament_Match/Tournament_MatchManual_TeamBAdd/Tournament_MatchManual_Tournament_AddTeamB.js");
    /* Note :  Add New Team in Tournament page  */

    if(route.params?.Team_RedirectPage)
      setTeam_RedirectPage(route.params?.Team_RedirectPage);

    if(route.params?.RedirectPage)
      setRedirectPage(route.params?.RedirectPage)

     SetData(route.params?.Common_CityId, route.params?.Common_CityName);

     if(route.params?.Roundid)
        setRoundid(route.params?.Roundid)

      if(route.params?.Roundid) setRoundid(route.params?.Roundid)
      if(route.params?.TeamAName) setTeamAName(route.params?.TeamAName)
      if(route.params?.TeamAid) setTeamAid(route.params?.TeamAid)
      if(route.params?.Tournament_Matchid) setTournament_Matchid(route.params?.Tournament_Matchid)

  }, [route.params]);

  const ImagePickerFN = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      fileName: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
      canceled: false,
      cancelled: false,
      type:"image"
    });
    
    if (!result.canceled) {
      BannerImageUpload(result.assets[0].base64, result.assets[0].uri);
      // const fileName = result.assets[0].uri.split('/').pop();
      // setImageName(fileName);
      setImageFlieName(result.assets[0].uri);
      setImage(result.assets[0].uri);
      setImgUI(true);
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
              setImageName(BindData.SERVICERESPONSE.FILENAME);
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

  const SetData = (Common_CityId, Common_CityName) => {
    if (Common_CityId) {
      setCommon_CityId(Common_CityId);
    } else {
      setCommon_CityId(global.CityId);
    }
    if (Common_CityName) {
      setCommon_CityName(Common_CityName);
    } else {
      setCommon_CityName(global.CityName);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.item]}>
          <View
            style={[
              styles.width100,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View style={[styles.width20]}>
              {ImgUI ? (
                <View style={[styles.Banner]}>
                  {image && (
                    <Image source={{ uri: image }} style={styles.mainImg} />
                  )}
                </View>
              ) : (
                <Pressable onPress={ImagePickerFN}>
                  <Image
                    style={styles.mainImg}
                    source={{
                      uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/icon_plus.png`,
                    }}
                  />
                </Pressable>
              )}
            </View>
            <View style={[styles.width80]}>
              <View style={{ marginLeft: 5 }}>
                <View>
                  <Text style={{ fontSize: 12 }}>
                    Team Name <Text style={{ color: "red" }}>*</Text>
                  </Text>

                  <TextInput
                    onChangeText={(txt) => {
                      seterrortxtTeamName(Color.Texttitle);
                      //txtTeamName = txt
                      settxtTeamName(txt);
                    }}
                    value={txtTeamName}
                    autoFocus={true}
                    ref={txtTeamNameRef}
                    style={{
                      borderBottomColor: errortxtTeamName,
                      borderBottomWidth: 2,
                    }}
                    placeholder="Enter Team Name"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 12 }}>
                    City/Town <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <TextInput
                    KeyboardAvoidingView={true}
                    placeholder="Search City"
                    onFocus={() => {
                      seterrorddlCity(Color.Texttitle);
                      navigation.navigate("AddCity_Common", {
                        PageName: "Tournament_MatchManual_Tournament_AddTeamA",
                      });
                    }}
                    style={[
                      styles.input,
                      { borderBottomColor: errorddlCity, borderBottomWidth: 2 },
                    ]}
                    value={Common_CityName}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <FlatList
          data={TeamData}
          //ListFooterComponent={extraData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={false}
        /> */}
      </SafeAreaView>
      <View
        style={[
          styles.width100,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        {/* <View style={[styles.width50]}>
          <Pressable
            onPress={() => btnSave_AddoneMore()}
            style={[styles.button, styles.buttonClose]}
          >
            <Text style={styles.btntitle}>Add One More</Text>
          </Pressable>
        </View> */}
        <View style={styles.width100}>
          <Pressable
            onPress={() => btnSave_AddoneMore()}
            style={[styles.button, styles.buttonSave]}
          >
            <Text style={[styles.btntitle, { color: "white" }]}>Add Team</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Tournament_MatchManual_Tournament_AddTeamB

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: Color.WhiteBGColor,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  width100: {
    width: "100%",
  },
  width20: {
    width: "20%",
  },
  width60: {
    width: "60%",
  },
  width50: {
    width: "50%",
  },
  img: {
    height: 60,
    width: 60,
    borderColor: Color.Texttitle,
    borderWidth: 2,
    backgroundColor: "#DC7633",
    color: Color.WhiteBGColor,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "900",
  },
  headerFooterStyle: {
    width: "100%",
    height: 45,
    backgroundColor: "#606070",
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    padding: 7,
  },
  button: {
    padding: 10,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: Color.WhiteBGColor,
  },
  buttonSave: {
    backgroundColor: Color.SaveBtn,
  },
  btntitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  mainImg: {
    height: 60,
    width: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  width80:{
    width:"80%"
  },
  input: {
    // height: 40,
    // paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.Texttitle,
  },
});