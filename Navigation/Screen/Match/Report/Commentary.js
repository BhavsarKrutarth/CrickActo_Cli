import { StyleSheet, Text, View,Image,Pressable,SafeAreaView,FlatList,Alert } from 'react-native'
import React ,{useState} from 'react'
import Color from '../../../../Color/Color'
import { color } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import scoketservices from '../../../../scoket/scoketservices';

const Commentary = ({ state }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [Matchid,setMatchid] = useState(null);
    const [TeamSelect,setTeamSelect] = useState("TeamA");
    const [TeamAName,setTeamAName] = useState(null)
    const [TeamBName,setTeamBName] = useState(null)
    // const counter = useSelector(state => state.Matchid)
    const [counter,setcounter] = useState(null)
    
    const [BindTeamA_DetailsList,setBindTeamA_DetailsList] = useState([])
    const [BindTeamB_DetailsList,setBindTeamB_DetailsList] = useState([])
    

    React.useEffect(() => {
        console.log("Navigation/Screen/Match/Report/Info.js");

        scoketservices.initializeSocket()
        scoketservices.on("received_message",(data => {
          
          if(Matchid == data)
          {
            BindTeam(data)
            setMatchid(data)
            BindTeamB(data)
          }
        }))
        if (route.params?.MatchId)
        {
            BindTeam(route.params?.MatchId)
            setMatchid(route.params?.MatchId)
        }
        
        
      }, [route.params])
      const BindTeam = async (Matchid) => {
        try {
          var data = {
            MOBILENO: global.MobileNo,
            SPNAME: "TEAM_GET",
            MATCHID:Matchid
          }
    
          const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
                SpName: "TEAM_GET",
              },
              body: JSON.stringify(data)
            }
          )
            .then((response) => response.json())
            .then((json) => {
              var BindData = JSON.parse(json);
              var List;
              if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
                if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
                  if (BindData.SERVICERESPONSE.TOTALRECORDS > 0) {
                    setTeamAName(BindData.SERVICERESPONSE.DETAILSLIST.DETAILS.TeamAName)
                    setTeamBName(BindData.SERVICERESPONSE.DETAILSLIST.DETAILS.TeamBName)
                    BindTeamA(Matchid)
                    
                  }
                } else {
                  //setDisplayList("false")
                }
              } else {
                alert("Error: No Recored Found");
                Alert.alert('Warning', 'No Recored Found', [
                  { text: 'OK' },
                ]);
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

      const BindTeamA = async (Matchid) => {
        try {
          var data = {
            MOBILENO: global.MobileNo,
            SPNAME: "TEAMA_COMMENTARY_GET",
            MATCHID:Matchid
          }
    
          const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
                SpName: "TEAMA_COMMENTARY_GET",
              },
              body: JSON.stringify(data)
            }
          )
            .then((response) => response.json())
            .then((json) => {
              var BindData = JSON.parse(json);
              var List;
              
              if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
                if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
                  if (BindData.SERVICERESPONSE.TOTALRECORDS > 0) {
                    List = BindData.SERVICERESPONSE;
                    if (List.DETAILSLIST) {
                        var BindTeamA_setarray = [],BindTeamAlist 

                        BindTeamAlist = List.DETAILSLIST.DETAILS;
                        if (BindTeamAlist.length > 1) {
                          if (BindTeamAlist) {
                            BindTeamAlist.forEach((BindTeamAlist) => {
                                BindTeamA_setarray.push({
                                id: BindTeamAlist.Orderid,
                                Type: BindTeamAlist.Type,
                                Over_Detailslist: BindTeamAlist.Over_Detailslist,
                                PlayerName:BindTeamAlist.PlayerName,
                                PlayerAdd_Image:BindTeamAlist.PlayerAdd_Image,
                                Run:BindTeamAlist.Run,
                                Ball:BindTeamAlist.Ball,
                                Description:BindTeamAlist.Description,
                                
                                
                              });
                            });
                          }
                        } else {
                            BindTeamA_setarray.push({
                            id: BindTeamAlist.Orderid,
                            Over_Detailslist: BindTeamAlist.Over_Detailslist,
                            PlayerName:BindTeamAlist.PlayerName,
                            PlayerAdd_Image:BindTeamAlist.PlayerAdd_Image,
                            Run:BindTeamAlist.Run,
                            Ball:BindTeamAlist.Ball,
                            Description:BindTeamAlist.Description,
                          });
                        }
      
      
                        if (BindTeamA_setarray)
                            setBindTeamA_DetailsList(BindTeamA_setarray)
                        else
                            setBindTeamA_DetailsList(null)
                      }
                    
                    
                    
                  }
                } else {
                  //setDisplayList("false")
                }
              } else {
                alert("Error: No Recored Found");
                Alert.alert('Warning', 'No Recored Found', [
                  { text: 'OK' },
                ]);
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


      const BindTeamB = async (Matchid) => {
        try {
          var data = {
            MOBILENO: global.MobileNo,
            SPNAME: "TEAMB_COMMENTARY_GET",
            MATCHID:Matchid
          }
    
          const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
                SpName: "TEAMB_COMMENTARY_GET",
              },
              body: JSON.stringify(data)
            }
          )
            .then((response) => response.json())
            .then((json) => {
              var BindData = JSON.parse(json);
              var List;
              console.log(BindData)
              if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
                if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
                  if (BindData.SERVICERESPONSE.TOTALRECORDS > 0) {
                    List = BindData.SERVICERESPONSE;
                    if (List.DETAILSLIST) {
                        var BindTeamB_setarray = [],BindTeamBlist 

                        BindTeamBlist = List.DETAILSLIST.DETAILS;
                        if (BindTeamBlist.length > 1) {
                          if (BindTeamBlist) {
                            BindTeamBlist.forEach((BindTeamBlist) => {
                              BindTeamB_setarray.push({
                                id: BindTeamBlist.Orderid,
                                Type: BindTeamBlist.Type,
                                Over_Detailslist: BindTeamBlist.Over_Detailslist,
                                PlayerName:BindTeamBlist.PlayerName,
                                PlayerAdd_Image:BindTeamBlist.PlayerAdd_Image,
                                Run:BindTeamBlist.Run,
                                Ball:BindTeamBlist.Ball,
                                Description:BindTeamBlist.Description,
                                
                                
                              });
                            });
                          }
                        } else {
                          BindTeamB_setarray.push({
                            id: BindTeamBlist.Orderid,
                            Over_Detailslist: BindTeamBlist.Over_Detailslist,
                            PlayerName:BindTeamBlist.PlayerName,
                            PlayerAdd_Image:BindTeamBlist.PlayerAdd_Image,
                            Run:BindTeamBlist.Run,
                            Ball:BindTeamBlist.Ball,
                            Description:BindTeamBlist.Description,
                          });
                        }
      
      
                        if (BindTeamB_setarray)
                            setBindTeamB_DetailsList(BindTeamB_setarray)
                        else
                             setBindTeamB_DetailsList(null)
                      }
                    
                    
                    
                  }
                } else {
                  //setDisplayList("false")
                }
              } else {
                alert("Error: No Recored Found");
                Alert.alert('Warning', 'No Recored Found', [
                  { text: 'OK' },
                ]);
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


      

    const BindTeamA_renderItem = ({ item }) => (
        <View style={[styles.body100, { flexDirection: "row" }]}>
          {
          item.Type == "PlayerAdd" && (
            <View style={[styles.body100,styles.BorderBottom, { flexDirection: "row"}]}>
                <View style={[styles.body15,styles.RightBorder,{justifyContent: 'center',margin:5}]}>
                    <Image
                    style={styles.image}
                    source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Cricket_logo_3.png`,
                    }}
                    /> 
                </View>
                <View style={[styles.body60,{margin:5},{justifyContent: 'center',marginLeft:10}]}>
                    <Text>{item.PlayerName}</Text>
                </View>
                <View style={[styles.body10,{margin:5,justifyContent: 'center'}]}>
                    <Image
                    style={styles.imgPlayer}
                    source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/${item.PlayerAdd_Image}.png`,
                    }}
                    /> 
                </View>
            </View>
          )
          || item.Type == "Run" && (
            <View style={[styles.body100,styles.BorderBottom, { flexDirection: "row"}]}>
                <View style={[styles.body15,styles.RightBorder,{justifyContent: 'center',alignItems:"center",flex:1,margin:5}]}>
                    <Text style={[styles.imgtitle,{marginBottom:5}]}>{item.Ball}</Text>
                    <View style={[styles.img]}>
                      <Text style={styles.imgtitle}>{item.Run}</Text>
                    </View>
                </View>
                <View style={[styles.body70,{margin:5,justifyContent: 'center',marginLeft:10,}]}>
                    <Text>{item.Description}</Text>
                </View>
                
            </View>
          )
          || item.Type == "Deatils" && (
            // <Text style={[styles.body100, { flexDirection: "row"}]}>
            //     {item.Over_Detailslist.Over_Details.MatchOver}
            // </Text>
            <View style={[styles.body100]}>
            <View style={[styles.body100, { flexDirection: "row",backgroundColor:Color.backgroundColor,borderBottomColor:"#e4e4e4",borderBottomWidth:2}]}>
              <View style={[styles.body60,{flexDirection: "row", borderRightColor:"#e4e4e4",borderRightWidth:2,margin:5}]}>
                  <View style={[styles.body20,{margin:7,padding:5,borderColor:"#e4e4e4",borderWidth:2,justifyContent:"center",alignItems:"center",borderRadius:10}]}>
                    <Text style={{color:"#4f4e53"}}>Over</Text>
                    <Text> {item.Over_Detailslist.Over_Details.MatchOver}</Text>
                  </View>
                  <View style={[styles.body80,{padding:5,justifyContent:"center"}]}>
                    <Text>{item.Over_Detailslist.Over_Details.Display_Run}</Text>
                    <Text>{item.Over_Detailslist.Over_Details.TotalRun}{item.Over_Detailslist.Over_Details.TotalOut}</Text>
                  </View>
              </View>
              <View style={[styles.body40,{padding:5,justifyContent:"center"}]}>
                  <Text> {item.Over_Detailslist.Over_Details.BelowOverRun}{item.Over_Detailslist.Over_Details.BelowOverOut}</Text>
              </View>
            </View>
            <View style={[styles.body100, { flexDirection: "row",backgroundColor:Color.backgroundColor,borderBottomColor:"#e4e4e4",borderBottomWidth:2}]}>
              <View style={[styles.body60,{flexDirection: "row", borderRightColor:"#e4e4e4",borderRightWidth:2,margin:5}]}>
              {
              item.Over_Detailslist.Over_Details.StreakerBall > 0 ? (
                <View style={[styles.body50,{marginLeft:10}]}>
                    <Text>{item.Over_Detailslist.Over_Details.StreakeName}</Text>
                    <Text>{item.Over_Detailslist.Over_Details.StreakerRun}({item.Over_Detailslist.Over_Details.StreakerBall})</Text>
                </View>
              ) : null}

              {
              item.Over_Detailslist.Over_Details.RunnerBall > 0 ? (
                <View style={styles.body50}>
                    <Text>{item.Over_Detailslist.Over_Details.RunnerName}</Text>
                    <Text>{item.Over_Detailslist.Over_Details.RunnerRun}({item.Over_Detailslist.Over_Details.RunnerBall})</Text>
                </View>
              ) : null}
                
              </View>
              <View style={[styles.body40,{padding:5,justifyContent:"center"}]}>
                  <Text> {item.Over_Detailslist.Over_Details.BowlerName}</Text>
                  <Text> {item.Over_Detailslist.Over_Details.BowlerOver} - {item.Over_Detailslist.Over_Details.BowlerMaidan} - {item.Over_Detailslist.Over_Details.BowlerRun} - {item.Over_Detailslist.Over_Details.BowlerOut}</Text>
              </View>
            </View>
            </View>

          )
          
          }
            
        </View>
      );
    return (
        <View style={styles.Container}>
            {/* <Text>Counter : {counter}</Text> */}
            <View style={styles.body100}>
                <View style={[styles.body100, { backgroundColor: Color.backgroundColor, padding: 5,flexDirection:"row"}]}>
                    <View style={styles.Modal_bodyBox}>
                        <RadioButton
                            value="TeamA"
                            status={
                                TeamSelect === "TeamA" ? "checked" : "unchecked"
                            }
                            onPress={() => {
                                setTeamSelect("TeamA")
                                BindTeamA(Matchid)
                            }}
                        />
                        <Pressable onPress={() => {
                            setTeamSelect("TeamA")
                            BindTeamA(Matchid)
                            }}>
                            <Text style={{ paddingTop: 7 }}>{TeamAName}</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.Modal_bodyBox]}>
                        <RadioButton
                            value="TeamB"
                            status={TeamSelect === "TeamB" ? "checked" : "unchecked"}
                            onPress={() => {
                                setTeamSelect("TeamB")
                                BindTeamB(Matchid)
                            }}
                        />
                        <Pressable onPress={() => {
                            setTeamSelect("TeamB")
                            BindTeamB(Matchid)
                            }}>
                            <Text style={{ paddingTop: 7 }}>{TeamBName}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            {
            TeamSelect == "TeamA" ? (
            <View style={[styles.body100]}>
                <SafeAreaView>
                    <FlatList
                    data={BindTeamA_DetailsList}
                    renderItem={BindTeamA_renderItem}
                    keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            </View>
            ) : null
            }
            {
            TeamSelect == "TeamB" ? (
            <View style={[styles.body100]}>
                <SafeAreaView>
                    <FlatList
                    data={BindTeamB_DetailsList}
                    renderItem={BindTeamA_renderItem}
                    keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            </View>
            ) : null
            }
        </View>
    )
}

export default Commentary

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
    },
    LeftTitle:{
        paddingLeft: 10, marginVertical: 5
    },
    RightTitle:{
        marginVertical: 5
    },
    body100: {
        width: "100%",
    },
    body50: {
        width: "50%",
    },
    body80: {
        width: "80%",
    },
    body85:{
      width:"85%"
    },
    body40: {
        width: "40%",
    },
    body60: {
        width: "60%",
    },
    body15: {
        width: "15%",
    },
    body30: {
        width: "30%"
    },
    body70: {
        width: "80%"
    },
    body10: {
        width: "10%"
    },
    body20: {
      width: "20%"
  },
    title: {
        color: Color.Texttitle,
        fontWeight: "bold",
        fontSize: 18,
        margin: 5,
        marginLeft: 20,

    },
    FontSize16:{
        fontSize:16
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
    Modal_bodyBox: {
        width: "50%",
        //marginHorizontal:"5%",
        flexDirection: "row",
        paddingLeft: 20,
      },
      image:{
        width:50,
        height:50,
       
      },
      BorderBottom:{
        borderBottomColor:Color.borderColor
        ,borderBottomWidth:2
      },
      RightBorder:{
        borderRightColor:Color.borderColor
        ,borderRightWidth:2
      },
      imgPlayer:{
        width:30,
        height:30,
      },
      imgtitle: {
        // color: Color.WhiteBGColor,
        fontSize: 12,
        fontWeight: "900",
      },
      img: {
        height: 35,
        width: 35,
        borderColor: Color.Texttitle,
        borderWidth: 2,
        // backgroundColor: "#DC7633",
        color: Color.WhiteBGColor,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
      },
})


