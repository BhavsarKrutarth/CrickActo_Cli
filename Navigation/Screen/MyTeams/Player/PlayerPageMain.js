import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  Alert,
  Modal,
  Button
} from "react-native";
import React, { useState, useEffect } from "react";
import Custombutton from "../../../../Component/PressableButton/Custombutton";
import LineButton from "../../../../Component/LineButton/LineButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

import Color from "../../../../Color/Color";
import CustomFlatList from "../../../../Component/FlatList/CustomFlatList";

const PlayerPageMain = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [listItems, setListItems] = useState([]);
  const [MyTeam,setMyTeam] = useState(null);
  const [MyTeamId,setMyTeamId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [Iteamid,setIteamid] = useState(null);
  const [IteamName, setIteamName] = useState(null);
  const [IteamIMG, setIteamIMG] = useState(null);
  const [role,setrole] = useState([])
  

  const [batsman, setbatsman] = useState(Color.Texttitle);
  const [Bowler,setBowler] = useState(Color.Texttitle);
  const [BowlerImg,setBowlerImg] = useState("Sticker_2");
  const [AllRounder,setAllRounder] = useState(Color.Texttitle);

  const [WicketKeeper,setWicketKeeper] = useState(Color.Texttitle);
  const [Captain,setCaptain] = useState(Color.Texttitle);
  const [Admin,setAdmin] = useState(Color.Texttitle);

  const [WicketKeeperFlag,setWicketKeeperFlag] = useState(0);
  const [CaptainFlag,setCaptainFlag] = useState(0);
  const [AdminFlag,setAdminFlag] = useState(0);
  const [RedirectPage,setRedirectPage] = useState(null);
  
  

  

  

  React.useEffect(() => {

    console.log("Navigation/Screen/MyTeams/Player/PlayerPageMain.js");

    if(route.params?.MyTeamId)
    {
      setMyTeamId(route.params?.MyTeamId);
      Player_GET(route.params?.MyTeamId)
    }
    if(route.params?.RedirectPage)  
    {
      setRedirectPage(route.params?.RedirectPage)
    }
    
    if(route.params?.MyTeam)
      setMyTeam(route.params?.MyTeam);
    
    // TournamentMyTeam();
  }, [(route.params)]);
  const Player_GET = async (MyTeamId) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Player/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: "",
            MyTeamId:MyTeamId
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
                      id: List.PLAYERID,
                      userMasterid:List.USERMASTERID,
                      MyTeamid:List.MYTEAMID,
                      MyTeam:List.MYTEAM,
                      MobileNo: List.MOBILENO,
                      CityId: List.CITYID,
                      CityName: List.CITYNAME,
                      CountryCode: List.COUNTRYCODE,
                      CountryName: List.COUNTRYNAME,
                      ImageName: List.IMAGENAME,
                      Name:List.NAME
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.PLAYERID,
                  userMasterid:List.USERMASTERID,
                  MyTeamid:List.MYTEAMID,
                  MyTeam:List.MYTEAM,
                  MobileNo: List.MOBILENO,
                  CityId: List.CITYID,
                  CityName: List.CITYNAME,
                  CountryCode: List.COUNTRYCODE,
                  CountryName: List.COUNTRYNAME,
                  ImageName: List.IMAGENAME,
                  Name:List.NAME
                });
              }
              //console.log(setarray)
              setListItems(setarray);
            } else {
              //setDisplayList("false")
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



  const RemoveItem = (id) => {
    setListItems((ListItems) => {
      return ListItems.filter((List) => List.id !== id)
    })
    DeleteItem(id)
  }

  const DeleteItem = async (id) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Player/${id}`,
        {
          method: "DELETE",
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
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            Alert.alert("Delete", "Delete Succesfully", [
              { text: "OK" },
            ]);
          }
          else 
          {
            alert("something went wrong");
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
    <View
      style={[styles.item, { borderColor: Color.Texttitle, borderWidth: 2 }]}
    >
      <Pressable android_ripple={{ color: Color.PrimaryColor }}>
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
            <Pressable
              onPress={() => {
                ModalCall(item.id, item.Name, item.ImageName);
              }}
            >
              <Image
                source={{
                  uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                }}
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={[styles.body60]}>
            <Pressable
              onPress={() =>
                ModalCall(item.id, item.Name, item.ImageName)
              }
            >
              <View style={{ marginLeft: 5 }}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "900",color:Color.FontColor }}>
                    {item.Name}
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
            </Pressable>
          </View>

          <View style={[styles.body20, { alignItems: "center" }]}>
            <Pressable onPress={() => RemoveItem(item.id)}>
              <Text
                style={{
                  borderBottomColor: Color.ErrorColor,
                  color: Color.ErrorColor,
                  borderBottomWidth: 1,
                  fontWeight: "900",
                }}
              >
                Remove
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );

  const BtnSaveModal = async () => {
    

    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/PlayerRole`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            Oper: "EDIT_ROLE",
            Playerid: Iteamid, 
            PlayerRole: role.PlayerRole != undefined ? role.PlayerRole : null, 
            WicketKeeperFlag:WicketKeeperFlag,
            CaptainFlag:CaptainFlag,
            AdminFlag:AdminFlag,
            MyTeamId:MyTeamId
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            alert("Update successfully");

            setIteamid(null)
            setIteamName(null)
            setIteamIMG(null)
            setrole([])

            setbatsman(Color.Texttitle)
            setBowler(Color.Texttitle)
            setBowlerImg("Sticker_2");
            setAllRounder(Color.Texttitle)
            setWicketKeeper(Color.Texttitle)
            setCaptain(Color.Texttitle)
            setAdmin(Color.Texttitle)

            setWicketKeeperFlag(0);
            setCaptainFlag(0);
            setAdminFlag(0);

            setModalVisible(false);
          }
          else if(BindData.SERVICERESPONSE.RESPONSECODE == "-1")
          {
            alert(BindData.SERVICERESPONSE.RESPONSEMESSAGE)
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
  const ModalCall =(id,Name,IMG) => {
    Modal_GET(id)
    setModalVisible(true);
    setIteamName(Name);
    setIteamIMG(IMG);
    setIteamid(id);
  }

  const Modal_GET = async (id) => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/PlayerRole/` + id,
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
          var setarray = [];
          if (BindData.SERVICERESPONSE.TOTALRECORDS == "1") {
            List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS
            setIteamid(List.PLAYERID)
            setIteamName(List.NAME)
            setIteamName(List.IMAGENAME)
            setIteamIMG(List.NAME)
            setrole({
              Playerid: List.PLAYERID,
              PlayerName: List.NAME,
              PlayerRole: List.ROLE,
            });

            if(List.ROLE == "Bowler")
            {
              //setBowler("green");
              setBowlerImg("Sticker_2_Color");
            }
            else 
            {
              //setBowler(Color.Texttitle);
              setBowlerImg("Sticker_2");
            }


            if(List.ROLE == "Batsman")
              setbatsman("green");
            else 
              setbatsman(Color.Texttitle);
            
            if(List.ROLE == "All Rounder")
              setAllRounder("green");
            else 
              setAllRounder(Color.Texttitle);


            if(List.WICKETKEEPER != 0)
            {
              setWicketKeeper("green")
              setWicketKeeperFlag(1)
            }
            else 
            {
              setWicketKeeper(Color.Texttitle)
              setWicketKeeperFlag(0)
            }

            if(List.CAPTAIN != 0)
            {
              setCaptain("green")
              setCaptainFlag(1)
            }
            else 
            {
              setCaptain(Color.Texttitle)
              setCaptainFlag(0)
            }

            if(List.ADMIN != 0)
            {
              setAdmin("green")
              setAdminFlag(1)
            }
            else 
            {
              setAdmin(Color.Texttitle)
              setAdminFlag(0)
            }

            setModalVisible(true);

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
const ModalClose = () => {
        setIteamid(null)
        setIteamName(null)
        setIteamIMG(null)
        setrole([])

        setbatsman(Color.Texttitle);
        setBowler(Color.Texttitle)
        setBowlerImg("Sticker_2");
        setAllRounder(Color.Texttitle)
        setWicketKeeper(Color.Texttitle)
        setCaptain(Color.Texttitle)
        setAdmin(Color.Texttitle)

        setWicketKeeperFlag(0);
        setCaptainFlag(0);
        setAdminFlag(0);

        setModalVisible(false);
}
  return (
    <View style={styles.Container}>
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
        <View style={styles.modal_centeredView}>
          <View style={styles.modalView}>
            <View style={[styles.Modal_header]}>
              <View style={[styles.Modal_img]}>
                <Image
                  source={{
                    uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${IteamIMG}`,
                  }}
                  style={{ width: 50, height: 50 }}
                />
              </View>

              <View style={styles.Modal_HeaderTitle}>
                <Text style={[styles.Modal_Hedertxt,{color:Color.FontColor}]}>{IteamName}</Text>
              </View>
            </View>
            <View style={[styles.modal_body]}>
              <View style={styles.Modal_HederTitle}>
                <Text style={{color:Color.FontColor}}>Tab to assign one or more roles to the player.</Text>
              </View>
              <View style={styles.Modal_bodyBox}>
                <View style={[styles.Modal_Box, { borderColor: batsman }]}>
                  <Pressable
                    onPress={() => {
                      setbatsman("green");
                      setBowler(Color.Texttitle);
                      setAllRounder(Color.Texttitle);
                      setrole({
                        Playerid: Iteamid,
                        PlayerName: IteamName,
                        PlayerRole: "Batsman",
                      });
                    }}
                  >
                    <View style={styles.modal_BoximgDiv}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Sticker/Sticker_3.png`,
                        }}
                        style={styles.Modal_BoxImg}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{color:Color.FontColor}}>BatsMan</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={[styles.Modal_Box, { borderColor: Bowler }]}>
                  <Pressable
                    onPress={() => {
                      // setBowler("green");
                      setBowlerImg("Sticker_2_Color");
                      setbatsman(Color.Texttitle);
                      setAllRounder(Color.Texttitle);
                      setrole({
                        Playerid: Iteamid,
                        PlayerName: IteamName,
                        PlayerRole: "Bowler",
                      });
                    }}
                  >
                    <View style={styles.modal_BoximgDiv}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Sticker/${BowlerImg}.png`,
                        }}
                        style={styles.Modal_BoxImg}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{color:Color.FontColor}}>Bowler</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={[styles.Modal_Box, { borderColor: AllRounder }]}>
                  <Pressable
                    onPress={() => {
                      setBowler(Color.Texttitle);
                      setbatsman(Color.Texttitle);
                      setAllRounder("green");
                      setrole({
                        Playerid: Iteamid,
                        PlayerName: IteamName,
                        PlayerRole: "All Rounder",
                      });
                    }}
                  >
                    <View style={styles.modal_BoximgDiv}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Sticker/Sticker_6.png`,
                        }}
                        style={styles.Modal_BoxImg}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{color:Color.FontColor}}>All Rounder</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.Modal_bodyBox}>
                <View style={[styles.Modal_Box, { borderColor: WicketKeeper }]}>
                  <Pressable
                    onPress={() => {
                      if (WicketKeeperFlag == "0") {
                        setWicketKeeper("green");
                        setWicketKeeperFlag(1);
                      } else {
                        setWicketKeeper(Color.Texttitle);
                        setWicketKeeperFlag(0);
                      }
                    }}
                  >
                    <View style={styles.modal_BoximgDiv}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Sticker/Sticker_8.png`,
                        }}
                        style={styles.Modal_BoxImg}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{color:Color.FontColor}}>Wicket keeper</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={[styles.Modal_Box, { borderColor: Captain }]}>
                  <Pressable
                    onPress={() => {
                      if (CaptainFlag == "0") {
                        setCaptain("green");
                        setCaptainFlag(1);
                      } else {
                        setCaptain(Color.Texttitle);
                        setCaptainFlag(0);
                      }
                    }}
                  >
                    <View style={styles.modal_BoximgDiv}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Sticker/Captain.png`,
                        }}
                        style={styles.Modal_BoxImg}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{color:Color.FontColor}}>Captain</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={[styles.Modal_Box, { borderColor: Admin }]}>
                  <Pressable
                    onPress={() => {
                      if (AdminFlag == "0") {
                        setAdmin("green");
                        setAdminFlag(1);
                      } else {
                        setAdmin(Color.Texttitle);
                        setAdminFlag(0);
                      }
                    }}
                  >
                    <View style={styles.modal_BoximgDiv}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Sticker/Admin.png`,
                        }}
                        style={styles.Modal_BoxImg}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{color:Color.FontColor}}>Admin</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={[styles.Modal_Footer]}>
              <View style={styles.body50}>
                <Pressable
                  onPress={() => ModalClose()}
                  style={styles.Modla_Cancelbtn}
                >
                  <Text style={[styles.Modal_Cancelbtn_text,{color:Color.FontColor}]}>CANCEL</Text>
                </Pressable>
              </View>
              <View style={styles.body50}>
                <Pressable
                  style={styles.Modal_okbtn}
                  onPress={() => BtnSaveModal()}
                >
                  <Text style={styles.Modal_okbtn_text}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        </View>
      </Modal>
      <View style={styles.BannerBox}>
        <Pressable
          onPress={() =>
            navigation.navigate("PlayerAdd", {
              MyTeam: MyTeam,
              MyTeamId: MyTeamId,
            })
          }
        >
          <View style={styles.BannerSpaceBetween}>
            <Text style={styles.BannerTitle}>
              Want to create a new Player ?
            </Text>
            <Text style={styles.BannerTitle}>CREATE</Text>
          </View>
        </Pressable>
      </View>

      {listItems.length == "0" ? (
        <View>
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
            {/* <View
              style={[
                styles.body60,
                {
                  borderColor: Color.PrimaryColor,
                  borderWidth: 2,
                  borderRadius: 30,
                  alignItems: "center",
                },
              ]}
            >
              <LineButton
                title={"LOOKING FOR"}
                onPress={() => alert("click")}
              />
            </View> */}
            <View style={{ width: "25%" }}></View>
            <View style={[styles.body50]}>
              <Custombutton
                title={"ADD PLAYER"}
                onPress={() =>
                  navigation.navigate("PlayerAdd", {
                    MyTeam: MyTeam,
                    MyTeamId: MyTeamId,
                  })
                }
              />
            </View>
          </View>
        </View>
      ) : (
        <SafeAreaView style={styles.Container}>
          <FlatList
            data={listItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
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
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "900",
  },

  modal_centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    // padding: 5,
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
  Modla_Cancelbtn: {
    backgroundColor: "#e7e8ea",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  Modal_okbtn: {
    backgroundColor: Color.PrimaryColor,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  Modal_okbtn_text: {
    color: "white",
    fontWeight: "500",
  },
  Modal_Cancelbtn_text: {
    fontWeight: "500",
  },
  Modal_header: {
    width: "100%",
    height: 65,

    backgroundColor: "#e7e8ea",
    flexDirection: "row",
  },
  modal_body: {
    width: "100%",
  },
  Modal_Footer: {
    flexDirection: "row",
    width: "100%",
  },
  Modal_img: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  Modal_HeaderTitle: {
    justifyContent: "center",
    width: "80%",
  },
  Modal_Hedertxt: {
    fontWeight: "900",
    fontSize: 16,
  },
  Modal_HederTitle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Modal_bodyBox: {
    width:"100%",
    //marginHorizontal:"5%",
    flexDirection: "row",
  },
  Modal_Box:{
    width:"30%",
    height:80,
    // borderColor:"#3f3f3f",
    borderWidth:3,
    margin:5
  },
  Modal_BoxImg:{
    width: "70%",
    height: "100%",
    resizeMode: "stretch",
  },
  modal_BoximgDiv:{
    height:"70%",width:"100%",alignItems:"center",paddingTop:"5%"
  }
});

export default PlayerPageMain;
