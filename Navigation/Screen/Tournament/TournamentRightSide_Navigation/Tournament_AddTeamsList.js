import {
  ToastAndroid,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Pressable
} from "react-native";
import React, { useState, useEffect } from "react";
import Color from "../../../../Color/Color";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

const Tournament_AddTeamsList = () => {
  const route = useRoute();

  const [Team_RedirectPage,setTeam_RedirectPage] = useState(null);
  const [ListItems, setListItems] = useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
   
    console.log("Navigation/Screen/Tournament/TournamentRightSide_Navigation/Tournament_AddTeamsList.js")
    if(route.params?.Team_RedirectPage)
      setTeam_RedirectPage(route.params?.Team_RedirectPage);
    
    
      Tournament_AddTeamsList_GET();
  }, [route.params]);

  const Tournament_AddTeamsList_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Tournament_AddTeamsList/` +
          global.MobileNo,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo:global.MobileNo,
            Tournamentid:global.Tournamentid

          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          
          var List;
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
                    Color:"gray"
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
                Color:"gray"
              });
            }
            setListItems(setarray);
            //  setDisplayList("true");
            // setMyTeamData(true)
          } else {
            // setDisplayList("false")
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

  const btnDone = async () => {
    let DoneListItems = [];
    ListItems.forEach((key,obj) => {
      
      if(key.Color == "green"){
        DoneListItems = [...DoneListItems,key]
      }
    });
    // console.log(DoneListItems)
    if(DoneListItems.length != 0)
    {
      try {
        var Tournamentid = global.Tournamentid
        var TournamentName = global.TournamentName
         const resposneJSON = await fetch(
           `${global.domainName}/cricbuddyAPI/api/Tournament_AddTeamsList`,
           {
             method: "POST",
             headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
             },
             body: JSON.stringify({
               Oper:'add',
               Subiteam:DoneListItems,
               Tournamentid:Tournamentid,
               TournamentName:TournamentName
               
             }),
           }
         )
           .then((response) => response.json())
           .then((json) => {
             /*-------------------- Page Call -----------------------*/
             var BindData = JSON.parse(json);
            
             if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
              navigation.navigate(Team_RedirectPage, {
                LoadRef: 'True',
              })
                alert("Save Successfully")
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
    }
    else 
    {
      ToastAndroid.showWithGravityAndOffset(
        "Please at list One teams",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }

  const btnPress = (item) => {
     var objIndex = ListItems.findIndex((obj => obj.id == item.id));
    
    if(ListItems[objIndex].Color == "green")
    {
      ListItems[objIndex].Color = "gray"
    }
    else 
    {
      ListItems[objIndex].Color = "green"
    }

    
    var newArray = [...ListItems];
    setListItems(newArray)
  }

  const renderItem = ({ item }) => (
    <View style={[styles.item, { borderColor: item.Color, borderWidth: 3 }]}>
      <Pressable onPress={() => btnPress(item)}>
        <View
          style={[
            styles.width100,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <View style={[styles.width20]}>
            {/* <View style={[styles.img]}>
              <Text style={styles.imgtitle}>{item.imgtitle}</Text>
            </View> */}
            {item.ImageName != null ? (
              <Image
                source={{
                  uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                }}
                style={[styles.img,{backgroundColor:"white"}]}
              />
            ) : (
              <View style={[styles.img]}>
                <Text style={styles.imgtitle}>{item.imgtitle}</Text>
              </View>
            )}
          </View>
          <View style={[styles.width60]}>
            <View style={{ marginLeft: 5 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "900",color:Color.FontColor }}>
                  {item.title}
                </Text>
              </View>
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text style={{color:Color.FontColor}}>
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
    <View style={{flex: 1}}>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ListItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
    <View
        style={[
          styles.width100,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <View style={styles.width100}>
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
};

export default Tournament_AddTeamsList;

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
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle: {
    
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
    width: "80%",
  },
  input: {
    // height: 40,
    // paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.Texttitle,
  },
});
