import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Custombutton from "../../../Component/PressableButton/Custombutton";
// import LineButton from "../../../Component/LineButton/LineButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../Color/Color";
// import CustomFlatList from "../../../Component/FlatList/CustomFlatList";
// import { ScrollView } from "react-native-gesture-handler";
/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
/* -----------------------refreshing ------------------------------*/
const MyTeam = (props) => {
  /* -----------------------refreshing ------------------------------*/ 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    TournamentMyTeam();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
/* -----------------------refreshing ------------------------------*/
  const navigation = useNavigation();
  const route = useRoute();
  const [listItems, setListItems] = useState([]);

  React.useEffect(() => {
    console.log("Navigation/Screen/MyTeams/MyTeam.js");
    if(route.params?.LoadRef == "True")
      TournamentMyTeam();
    
    TournamentMyTeam();
    console.log(global.CityId)
  }, [route.params]);

  const TournamentMyTeam = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/MyTeam/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: global.MobileNo,
            Where_nq_MyTeamid:""
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
              if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                if (List) {
                  List.forEach((List) => {
                    setarray.push({
                      id: List.MYTEAMID,
                      MobileNo: List.MOBILENO,
                      MyTeam_Guid: List.MYTEAM_GUID,
                      ImageName: List.IMAGENAME,
                      imgtitle: List.IMGTITLE,
                      title: List.TITLE,
                      CityId: List.CITYID,
                      CityName: List.CITYNAME,
                      Color: "gray",
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.MYTEAMID,
                  MobileNo: List.MOBILENO,
                  MyTeam_Guid: List.MYTEAM_GUID,
                  ImageName: List.IMAGENAME,
                  imgtitle: List.IMGTITLE,
                  title: List.TITLE,
                  CityId: List.CITYID,
                  CityName: List.CITYNAME,
                  Color: "gray",
                });
              }
              // console.log(setarray)
              setListItems(setarray);
              setRefreshing(false);
              //setDisplayList("true");
            } else {
              //setDisplayList("false")
              setListItems([])
            }
          } else {
            alert("Error: UNAUTHORIZATION PERSON");
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
  const renderItem = ({ item }) => (
    <View style={[styles.item, { borderColor: item.Color, borderWidth: 3 }]}>
      <Pressable
        onPress={() =>
          //alert("Click")
          navigation.navigate("PlayerPageMain", {
            MyTeam: item.title,
            MyTeamId: item.id,
            id: item.id,
            MobileNo: item.MobileNo,
            MyTeam_Guid: item.MyTeam_Guid,
            ImageName: item.ImageName,
            imgtitle: item.imgtitle,
            title: item.title,
            CityId: item.CityId,
            CityName: item.CityName,
            PageRedirect:"MyTeam"
          })
        }
      >
        <View
          style={[
            styles.body100,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <View style={[styles.body20]}>
            {item.ImageName != null ? (
              <Image
                source={{
                  uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                }}
                style={[styles.img,{backgroundColor:"white"}]}
              />
            ) : (
              <View style={[styles.img]}>
                <Text style={[styles.imgtitle]}>{item.imgtitle}</Text>
              </View>
            )}
          </View>
          <View style={[styles.body60]}>
            <View style={{ marginLeft: 5 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "900",color:Color.FontColor }}>
                  {item.title}
                </Text>
              </View>
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text style={{color:Color.FontColor }}>
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
        </View> 
      </Pressable>
    </View>
  );

  return (
    <View style={styles.Container}>
       <View style={styles.BannerBox}>
        <Pressable
          onPress={() =>
            navigation.navigate("CreateMyTeam",{Team_RedirectPage:"MyTeam"})
            //alert("Start a match")
          }
        >
          <View style={styles.BannerSpaceBetween}>
            <Text style={styles.BannerTitle}>Want to create a new team ?</Text>
            <Text style={styles.BannerTitle}>CREATE</Text>
          </View>
        </Pressable>
      </View>

      {listItems.length == "0" ? (
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={styles.body100}>
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  "/CricbuddyAdmin/Content/assets/tournament/tournament_Background.png",
              }}
              style={styles.Image}
            />
          </View>
          <View style={styles.body}>
            <View style={[styles.body100, { padding: 5 }]}>
              <Custombutton
                title={"START MATCH"}
                onPress={() =>
                  navigation.navigate("CreateMyTeam",{Team_RedirectPage:"MyTeam"})
                }
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <SafeAreaView style={styles.Container}>
          <FlatList
            data={listItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </SafeAreaView>
      )} 
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
  Image: {
    marginTop: 10,
    height: 400,
    width: "auto",
  },
  body: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 25,
    alignItems: "center",
  },
  body100: {
    width: "100%",
  },
  body50: {
    width: "50%",
  },
  body40: {
    width: "40%",
  },
  body60: {
    width: "60%",
  },
  body20: {
    width: "20%",
  },
  title: {
    color: Color.Texttitle,
    fontWeight: "bold",
    fontSize: 18,
    margin: 5,
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
  BannerBox: {
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    width: "95%",
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
  item: {
    backgroundColor: Color.WhiteBGColor,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  img: {
    height: 60,
    width: 60,
    borderColor: Color.Texttitle,
    borderWidth: 2,
    backgroundColor: "#DC7633",
    // color: Color.WhiteBGColor,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "900",
  },
});

export default MyTeam;
