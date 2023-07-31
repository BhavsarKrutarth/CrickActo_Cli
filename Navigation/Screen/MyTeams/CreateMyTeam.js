import { ToastAndroid, Image, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Color from '../../../Color/Color';
// import { ScrollView, TextInput,LayoutAnimation } from 'react-native-gesture-handler';

// import LineTextInput from '../../../Component/LineTextInput/LineTextInput';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
// import * as ImagePicker from 'expo-image-picker';
// import TransferImage from '../../../Component/TransferImage/TransferImage';


const CreateMyTeam = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ImgNameinitialElements, ImgName_changeEl] = useState([]);
  const [initialElements, changeEl] = useState([]);
  const [TeamData, setTeamData] = useState(initialElements);

  const [Common_CityId, setCommon_CityId] = useState(null);
  const [Common_CityName, setCommon_CityName] = useState(null);
  const [errorddlCity, seterrorddlCity] = useState(Color.Texttitle);

  const [ImgUI, setImgUI] = useState(false);
  const [image, setImage] = useState(null);
  const [SendBannerImage, setSendBannerImage] = useState(null);
  const [ImageName, setImageName] = useState("")
  const [ImageFlieName, setImageFlieName] = useState("")

  //let txtTeamName = "";
  const [txtTeamName, settxtTeamName] = useState('');
  const [errortxtTeamName, seterrortxtTeamName] = useState(Color.Texttitle);
  const txtTeamNameRef = useRef(null);
  const [Team_RedirectPage, setTeam_RedirectPage] = useState(null);
  const [btndisabled, setbtndisabled] = useState(false);


  const btnDone = async () => {
    if (btndisabled == false) {
      setbtndisabled(true);
      if (initialElements.length != 0) {
        // console.log(initialElements)
        try {
          var Tournamentid = global.Tournamentid
          var TournamentName = global.TournamentName
          const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/TournamentMyTeam`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              },
              body: JSON.stringify({
                Oper: 'add',
                Subiteam: initialElements,
                Tournamentid: 0,
                TournamentName: ""
              }),
            }
          )
            .then((response) => response.json())
            .then((json) => {

              /*-------------------- Page Call -----------------------*/
              var BindData = JSON.parse(json);
              if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
                setbtndisabled(false)
                if (ImgNameinitialElements.length != 0)
                  TransferImage(ImgNameinitialElements);
                navigation.navigate(Team_RedirectPage, {
                  LoadRef: 'True',
                });
                // }
              }
              return json;
            })
            .catch((error) => {
              console.error(error);
              setbtndisabled(false)
            });
        } catch (error) {
          alert(error);
          setbtndisabled(false)
          return;
        } finally {
          setbtndisabled(false)
        }
      }
      else {
        setbtndisabled(false)
        btnSave_AddoneMore();

        // console.log("else")
        // console.log("else")
        ToastAndroid.showWithGravityAndOffset(
          "Please at list One teams",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );

      }
    }

  }

  const btnSave_AddoneMore = () => {
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
    var newArray = [...initialElements, {
      MobileNo: global.MobileNo,
      id: guid,
      ImageName: ImageName,
      ImageFlieName: ImageFlieName,
      imgtitle: txtTeamName.substring(0, 2),
      title: txtTeamName,
      CityId: Common_CityId,
      CityName: Common_CityName,
    }];
    if (ImageName != "") {
      ImgName_changeEl([...ImgNameinitialElements, {
        id: guid,
        Image: ImageName
      }])

    }

    setTeamData(newArray);
    changeEl(newArray);
    setImageName("");
    setImageFlieName("");
    setImage("")
    setImgUI(false)
    settxtTeamName("")
  };

  function CreateGuid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  useEffect(() => {
    console.log("Navigation/Screen/MyTeams/CreateMyTeam.js");
    if (route.params?.Team_RedirectPage)
      setTeam_RedirectPage(route.params?.Team_RedirectPage);

    // SetData(route.params?.Common_CityId, route.params?.Common_CityName);
    if (route.params?.CityId) {
      SetData(route.params?.CityId, route.params?.CityName);
    }


    if (route.params?.updateid) {

      let arr = initialElements.filter(function (item) {
        return item.id !== route.params?.updateid
      })
      // setTeamData(arr);
      // changeEl(arr);

      var newArray = [...arr, {
        MobileNo: global.MobileNo,
        id: route.params?.updateid,
        ImageName: route.params?.updateImageName,
        ImageFlieName: route.params?.updateImageFlieName,
        imgtitle: route.params?.updateimgtitle,
        title: route.params?.updatetitle,
        CityId: route.params?.updateCityId,
        CityName: route.params?.updateCityName,
      }];
      if (route.params?.updateImageName != "") {
        ImgName_changeEl([...arr, {
          id: route.params?.updateid,
          Image: route.params?.updateImageName
        }])
      }


      setTeamData(newArray);
      changeEl(newArray);


    }


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
      type: "image"
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

  const BtnEdit = (
    id,
    ImageName,
    ImageFlieName,
    imgtitle,
    title,
    CityId,
    CityName) => {
    navigation.navigate("Tournament_EditNewTeams", {
      id,
      ImageName,
      ImageFlieName,
      imgtitle,
      title,
      CityId,
      CityName,
      PageRedirect: "CreateMyTeam"
    });
    // alert("My id is "+id);
  }
  const BtnDelete = (id) => {
    let arr = initialElements.filter(function (item) {
      return item.id !== id
    })
    let arr1 = ImgNameinitialElements.filter(function (item) {
      return item.id !== id
    })

    ImgName_changeEl(arr1)
    setTeamData(arr);
    changeEl(arr);
  }

  const renderItem = ({ item }) => (
    // console.log("renderItem");
    <View style={styles.item}>
      <View
        style={[
          styles.width100,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <View style={[styles.width20]}>
          {item.ImageName != "" ? (
            <Image
              source={{
                uri: item.ImageFlieName,
              }}
              style={styles.img}
            />
          ) : (
            <View style={[styles.img]}>
              <Text style={[styles.imgtitle, { color: "white" }]}>{item.imgtitle}</Text>
            </View>
          )}
          {/* <View style={[styles.img]}>
            <Text style={styles.imgtitle}>{item.imgtitle}</Text>
          </View> */}
        </View>
        <View style={[styles.width60]}>
          <View style={{ marginLeft: 5 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "900", color: Color.FontColor }}>
                {item.title}
              </Text>
            </View>
            <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
              <Text style={{ color: Color.FontColor }}>
                <Image
                  source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/icon_Location.png`,
                  }}
                  style={{ width: 15, height: 15 }}
                />{" "}
                {item.CityName}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.width20, { flexDirection: "row" }]}>
          <Pressable
            onPress={() =>

              BtnEdit(
                item.id,
                item.ImageName,
                item.ImageFlieName,
                item.imgtitle,
                item.title,
                item.CityId,
                item.CityName
              )
            }
          >
            <Image
              source={{
                uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/Edit.png`,
              }}
              style={{ width: 25, height: 25 }}
            />
          </Pressable>
          <Text> </Text>
          <Pressable onPress={() => BtnDelete(item.id)}>
            <Image
              source={{
                uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/remove.png`,
              }}
              style={{ width: 25, height: 25 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );

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
                <Pressable onPress={
                  () => {
                    // alert("image upload function coming soon")
                    ImagePickerFN
                  }
                }>
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
                  <Text style={{ fontSize: 12, color: Color.FontColor }}>
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
                      color: Color.FontColor
                    }}
                    placeholder="Enter Team Name"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 12, color: Color.FontColor }}>
                    City/Town <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <TextInput
                    KeyboardAvoidingView={true}
                    placeholder="Search City"
                    onFocus={() => {
                      seterrorddlCity(Color.Texttitle);
                      navigation.navigate("UserProfileCity", {
                        CityId: CityId,
                        CityName: CityName,
                        // PageName: "Tournament_AddNewTeams",
                        PageRedirect: "CreateMyTeam"
                      });
                    }}
                    style={[
                      styles.input,
                      { borderBottomColor: errorddlCity, borderBottomWidth: 2, color: Color.FontColor },
                    ]}
                    value={Common_CityName}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <FlatList
          data={TeamData}
          //ListFooterComponent={extraData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={false}
        />
      </SafeAreaView>
      <View
        style={[
          styles.width100,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <View style={[styles.width50]}>
          <Pressable
            onPress={() => btnSave_AddoneMore()}
            style={[styles.button, styles.buttonClose]}
          >
            <Text style={[styles.btntitle, { color: Color.FontColor }]}>Add One More</Text>
          </Pressable>
        </View>
        <View style={styles.width50}>
          <Pressable
            onPress={() => btnDone()}
            style={[styles.button, styles.buttonSave]}

          >
            <Text style={[styles.btntitle, { color: "white" }]}>Done</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default CreateMyTeam

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
  width80: {
    width: "80%"
  },
  input: {
    // height: 40,
    // paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.Texttitle,
  },
});