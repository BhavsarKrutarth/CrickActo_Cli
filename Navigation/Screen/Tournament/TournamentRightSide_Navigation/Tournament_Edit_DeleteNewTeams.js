import { StyleSheet, Text, View ,Image, Pressable,TextInput } from 'react-native'
import React ,{useEffect,useState} from 'react'
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from 'expo-image-picker';

import Color from '../../../../Color/Color'
// import { TextInput } from 'react-native-gesture-handler';

const Tournament_EditNewTeams = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [id,setid] = useState(null);
    const [ImageName,setImageName] = useState(null);
    const [ImageFlieName,setImageFlieName] = useState(null);
    const [imgtitle,setimgtitle] = useState(null);
    const [title,settitle] = useState(null);
    const [CityId,setCityId] = useState(null);
    const [CityName,setCityName] = useState(null);
    const [image, setImage] = useState(null);
    const [PageRedirect,setPageRedirect] = useState(null);
    
    
    const [errortxtTeamName, seterrortxtTeamName] = useState(Color.Texttitle);
    const [errorddlCity, seterrorddlCity] = useState(Color.Texttitle);

    useEffect(() => {
      console.log("Navigation/Screen/Tournament/TournamentRightSide_Navigation/Tournament_EditNewTeams.js");

    if(route.params?.PageRedirect)
      setPageRedirect(route.params?.PageRedirect);

    if(route.params?.id)
        setid(route.params?.id);

    if(route.params?.ImageName)
        setImageName(route.params?.ImageName);

    if(route.params?.ImageFlieName)
        setImageFlieName(route.params?.ImageFlieName);

    if(route.params?.imgtitle)
        setimgtitle(route.params?.imgtitle);
        
    if(route.params?.title)
        settitle(route.params?.title);


    if(route.params?.Common_CityId)
    {
      setCityId(route.params?.Common_CityId);
    }
    else
    {
      if(route.params?.CityId)
        setCityId(route.params?.CityId);
    }

    if(route.params?.Common_CityName)
    {
      setCityName(route.params?.Common_CityName);
    }
    else
    {
      if(route.params?.CityName)
      setCityName(route.params?.CityName);
    }

      }, [route.params]);

      const btnUpdate = () => {
        // console.log(imgtitle)
        var tempImageName = ""
        ,tempImageFlieName = ""
        if(ImageName == null)
        {
          tempImageName = "";
        }
        else 
        {
          tempImageName = ImageName
        }
       
        if(ImageFlieName == null)
        {
          tempImageFlieName = "";
        }
        else 
        {
          tempImageFlieName = ImageFlieName
        }
       
        navigation.navigate(PageRedirect, {
          updateid: id,
          updateImageName : tempImageName,
          updateImageFlieName : tempImageFlieName,
          updateimgtitle: imgtitle,
          updatetitle : title,
          updateCityId : CityId,
          updateCityName : CityName,
        });
      }

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
          type: "image",
        });
        if (!result.canceled) {
          BannerImageUpload(result.assets[0].base64, result.assets[0].uri);
          const fileName = result.assets[0].uri.split("/").pop();
          setImageName(fileName);
          setImageFlieName(result.assets[0].uri);
          // setImage(result.assets[0].uri);
          // setImgUI(true);
        }
      }
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
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.width100,
          { marginTop: 10, justifyContent: "center", alignItems: "center" },
        ]}
      >
        {
        ImageFlieName ? (
          <Image source={{ uri: ImageFlieName }} style={styles.mainImg} />
        ) : (
          <Pressable onPress={ImagePickerFN}>
            <View style={[styles.img]}>
              <Text style={styles.imgtitle}>{imgtitle}</Text>
            </View>
          </Pressable>
        )}
      </View>

      <View style={[styles.width100]}>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 14,color:Color.FontColor,fontWeight:"600" }}>
            Team Name <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            onChangeText={(txt) => {
              seterrortxtTeamName(Color.Texttitle);
              settitle(txt);
              setimgtitle(txt.substring(0, 2));
            }}
            style={{
              borderBottomColor: errortxtTeamName,
              borderBottomWidth: 2,
              color:Color.FontColor
            }}
            placeholder="Enter name"
            onChange={(text) => settitle(text)}
            value={title}
          ></TextInput>
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            KeyboardAvoidingView={true}
            placeholder="Search City"
            onFocus={() => {
              seterrorddlCity(Color.Texttitle);
              navigation.navigate("UserProfileCity", {
                CityId:CityId,
                CityName:CityName,
                PageRedirect: "Tournament_EditNewTeams",
              });
            }}
            style={[
              styles.input,
              { borderBottomColor: errorddlCity, borderBottomWidth: 2,color:Color.FontColor },
            ]}
            value={CityName}
          />
        </View>
        <View style={{ marginTop: 40 }}>
        <Pressable
              onPress={() => btnUpdate()}
              style={[styles.button, styles.buttonSave]}
            >
              <Text style={styles.btntitle}>Update</Text>
            </Pressable>
        </View>
        
      </View>
    </View>
  );
}

export default Tournament_EditNewTeams

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    padding:20

  },
  width100:{
    width:"100%"
  },
  img:{
    height: 100,
    width: 100,
    borderColor: Color.Texttitle,
    borderWidth: 2,
    backgroundColor: "#DC7633",
    color: Color.WhiteBGColor,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  mainImg:{
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle:{
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "900",
  },
  button: {
    padding: 10,
    alignItems: "center",
    borderRadius:20
  },
  buttonClose: {
    backgroundColor: Color.WhiteBGColor,
  },
  buttonSave: {
    backgroundColor: Color.SaveBtn,
  },
  input: {
    // height: 40,
    // paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.Texttitle,
  },
  btntitle: {
    fontSize: 18,
    fontWeight: "600",
    color:Color.WhiteBGColor
  },
})