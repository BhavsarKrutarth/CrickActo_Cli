import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import Color from '../../../../Color/Color';
// import { Pressable } from 'react-native';
import scoketservices from '../../../../scoket/scoketservices';


const Scorecard = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [Matchid, setMatchid] = useState(null);
  const [TeamAName, setTeamAName] = useState(null);
  const [TeamARun, setTeamARun] = useState(null);
  const [TeamABall, setTeamABall] = useState(null);
  const [TotalOut_TeamA, setTotalOut_TeamA] = useState(null);
  const [TeamARR, setTeamARR] = useState(null);
  const [BindTeamA_DetailsList, setBindTeamA_DetailsList] = useState([])
  const [BindTeamA_Bowler_Detailslist, setBindTeamA_Bowler_Detailslist] = useState([])
  const [BindTeamA_Fall_Wickets_Detailslist, setBindTeamA_Fall_Wickets_Detailslist] = useState([])


  const [BindTeamBTotalRecored, setBindTeamBTotalRecored] = useState(null);
  const [TeamBRun, setTeamBRun] = useState(null);
  const [TeamBBall, setTeamBBall] = useState(null);
  const [TeamBRR, setTeamBRR] = useState(null);
  const [TeamBName, setTeamBName] = useState(null);
  const [TotalOut_TeamB, setTotalOut_TeamB] = useState(null);
  const [BindTeamB_DetailsList, setBindTeamB_DetailsList] = useState([])
  const [BindTeamB_Bowler_Detailslist, setBindTeamB_Bowler_Detailslist] = useState([])
  const [BindTeamB_Fall_Wickets_Detailslist, setBindTeamB_Fall_Wickets_Detailslist] = useState([])


  React.useEffect(() => {
    console.log("Navigation/Screen/Match/Report/Scorecard.js");

    scoketservices.initializeSocket()
    scoketservices.on("received_message",(data => {
      
      if(Matchid == data)
      {
        setMatchid(data)
        BindTeamA(data)
        BindTeamB(data)
      }
    }))

    if (route.params?.MatchId) {
      BindTeamA(route.params?.MatchId)
      BindTeamB(route.params?.MatchId)
      setMatchid(route.params?.MatchId)
    }
  }, [route.params])
  const BindTeamA = async (Matchid) => {
    try {
      var data = {
        MOBILENO: global.MobileNo,
        SPNAME: "SCORECARD_TEAMA_GET",
        MATCHID: Matchid
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "SCORECARD_TEAMA_GET",
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
                setTeamARun(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamARun);
                setTeamABall(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamABall);
                setTeamARR(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamARR);
                setTeamAName(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamAName);
                setTotalOut_TeamA(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TotalOut_TeamA);


                if (List.Batter_Detailslist) {
                  var BindTeamA_setarray = [], BindTeamAlist

                  BindTeamAlist = List.Batter_Detailslist.Batter_Details;
                  if (BindTeamAlist.length > 1) {
                    if (BindTeamAlist) {
                      BindTeamAlist.forEach((BindTeamAlist) => {
                        BindTeamA_setarray.push({
                          id: BindTeamAlist.stickerplayerid,
                          streakename: BindTeamAlist.streakename,
                          run: BindTeamAlist.run,
                          ball: BindTeamAlist.ball,
                          fours: BindTeamAlist.fours,
                          sixs: BindTeamAlist.sixs,
                          sr: BindTeamAlist.sr,
                          OutMatch: BindTeamAlist.OutMatch,


                        });
                      });
                    }
                  } else {
                    BindTeamA_setarray.push({
                      id: BindTeamAlist.stickerplayerid,
                      streakename: BindTeamAlist.streakename,
                      run: BindTeamAlist.run,
                      ball: BindTeamAlist.ball,
                      fours: BindTeamAlist.fours,
                      sixs: BindTeamAlist.sixs,
                      sr: BindTeamAlist.sr,
                      OutMatch: BindTeamAlist.OutMatch,
                    });
                  }


                  if (BindTeamA_setarray)
                    setBindTeamA_DetailsList(BindTeamA_setarray)
                  else
                    setBindTeamA_DetailsList(null)
                }

                if (List.Bowler_Detailslist) {
                  var BindTeamA_Bowler_setarray = [], BindTeamA_Bowler_list

                  BindTeamA_Bowler_list = List.Bowler_Detailslist.Bowler_Details;
                  if (BindTeamA_Bowler_list.length > 1) {
                    if (BindTeamA_Bowler_list) {
                      BindTeamA_Bowler_list.forEach((BindTeamA_Bowler_list) => {
                        BindTeamA_Bowler_setarray.push({
                          id: BindTeamA_Bowler_list.bowlerplayerid,
                          bowlername: BindTeamA_Bowler_list.bowlername,
                          bowlerover: BindTeamA_Bowler_list.bowlerover,
                          bowlermaidan: BindTeamA_Bowler_list.bowlermaidan,
                          bowlerrun: BindTeamA_Bowler_list.bowlerrun,
                          bowlerwicket: BindTeamA_Bowler_list.bowlerwicket,
                          bowlereco: BindTeamA_Bowler_list.bowlereco


                        });
                      });
                    }
                  } else {
                    BindTeamA_Bowler_setarray.push({
                      id: BindTeamA_Bowler_list.bowlerplayerid,
                      bowlername: BindTeamA_Bowler_list.bowlername,
                      bowlerover: BindTeamA_Bowler_list.bowlerover,
                      bowlermaidan: BindTeamA_Bowler_list.bowlermaidan,
                      bowlerrun: BindTeamA_Bowler_list.bowlerrun,
                      bowlerwicket: BindTeamA_Bowler_list.bowlerwicket,
                      bowlereco: BindTeamA_Bowler_list.bowlereco
                    });
                  }

                  if (BindTeamA_Bowler_setarray)
                    setBindTeamA_Bowler_Detailslist(BindTeamA_Bowler_setarray)
                  else
                    setBindTeamA_Bowler_Detailslist(null)
                }

                if (List.Fall_Wickets_Detailslist) {
                  var BindTeamA_Fall_Wickets_setarray = [], BindTeamA_Fall_Wickets_list

                  BindTeamA_Fall_Wickets_list = List.Fall_Wickets_Detailslist.Fall_Wickets_Details;
                  if (BindTeamA_Fall_Wickets_list.length > 1) {
                    if (BindTeamA_Fall_Wickets_list) {
                      BindTeamA_Fall_Wickets_list.forEach((BindTeamA_Fall_Wickets_list) => {
                        BindTeamA_Fall_Wickets_setarray.push({
                          id: BindTeamA_Fall_Wickets_list.stickerplayerid,
                          Row_Num: BindTeamA_Fall_Wickets_list.Row_Num,
                          streakename: BindTeamA_Fall_Wickets_list.streakename,
                          bowle: BindTeamA_Fall_Wickets_list.bowle
                        });
                      });
                    }
                  } else {
                    BindTeamA_Fall_Wickets_setarray.push({
                      id: BindTeamA_Fall_Wickets_list.stickerplayerid,
                      Row_Num: BindTeamA_Fall_Wickets_list.Row_Num,
                      streakename: BindTeamA_Fall_Wickets_list.streakename,
                      bowle: BindTeamA_Fall_Wickets_list.bowle
                    });
                  }

                  if (BindTeamA_Fall_Wickets_setarray)
                    setBindTeamA_Fall_Wickets_Detailslist(BindTeamA_Fall_Wickets_setarray)
                  else
                    setBindTeamA_Fall_Wickets_Detailslist(null)
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
  }

  const BindTeamB = async (Matchid) => {
    try {
      var data = {
        MOBILENO: global.MobileNo,
        SPNAME: "SCORECARD_TEAMB_GET",
        MATCHID: Matchid
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "SCORECARD_TEAMB_GET",
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

                setBindTeamBTotalRecored(List.TOTALRECORDS)
                setTeamBRun(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamBRun);
                setTeamBBall(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamBBall);
                setTeamBRR(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamBRR);
                setTeamBName(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TeamBName);
                setTotalOut_TeamB(List.Extrs_Batter_Detailslist.Extrs_Batter_Details.TotalOut_TeamB);


                if (List.Batter_Detailslist) {
                  var BindTeamB_setarray = [], BindTeamBlist

                  BindTeamBlist = List.Batter_Detailslist.Batter_Details;
                  if (BindTeamBlist.length > 1) {
                    if (BindTeamBlist) {
                      BindTeamBlist.forEach((BindTeamBlist) => {
                        BindTeamB_setarray.push({
                          id: BindTeamBlist.stickerplayerid,
                          streakename: BindTeamBlist.streakename,
                          run: BindTeamBlist.run,
                          ball: BindTeamBlist.ball,
                          fours: BindTeamBlist.fours,
                          sixs: BindTeamBlist.sixs,
                          sr: BindTeamBlist.sr,
                          OutMatch: BindTeamBlist.OutMatch,
                        });
                      });
                    }
                  } else {
                    BindTeamB_setarray.push({
                      id: BindTeamBlist.stickerplayerid,
                      streakename: BindTeamBlist.streakename,
                      run: BindTeamBlist.run,
                      ball: BindTeamBlist.ball,
                      fours: BindTeamBlist.fours,
                      sixs: BindTeamBlist.sixs,
                      sr: BindTeamBlist.sr,
                      OutMatch: BindTeamBlist.OutMatch,
                    });
                  }


                  if (BindTeamB_setarray)
                    setBindTeamB_DetailsList(BindTeamB_setarray)
                  else
                    setBindTeamB_DetailsList(null)
                }

                if (List.Bowler_Detailslist) {
                  var BindTeamB_Bowler_setarray = [], BindTeamB_Bowler_list

                  BindTeamB_Bowler_list = List.Bowler_Detailslist.Bowler_Details;
                  if (BindTeamB_Bowler_list.length > 1) {
                    if (BindTeamB_Bowler_list) {
                      BindTeamB_Bowler_list.forEach((BindTeamB_Bowler_list) => {
                        BindTeamB_Bowler_setarray.push({
                          id: BindTeamB_Bowler_list.bowlerplayerid,
                          bowlername: BindTeamB_Bowler_list.bowlername,
                          bowlerover: BindTeamB_Bowler_list.bowlerover,
                          bowlermaidan: BindTeamB_Bowler_list.bowlermaidan,
                          bowlerrun: BindTeamB_Bowler_list.bowlerrun,
                          bowlerwicket: BindTeamB_Bowler_list.bowlerwicket,
                          bowlereco: BindTeamB_Bowler_list.bowlereco


                        });
                      });
                    }
                  } else {
                    BindTeamB_Bowler_setarray.push({
                      id: BindTeamB_Bowler_list.bowlerplayerid,
                      bowlername: BindTeamB_Bowler_list.bowlername,
                      bowlerover: BindTeamB_Bowler_list.bowlerover,
                      bowlermaidan: BindTeamB_Bowler_list.bowlermaidan,
                      bowlerrun: BindTeamB_Bowler_list.bowlerrun,
                      bowlerwicket: BindTeamB_Bowler_list.bowlerwicket,
                      bowlereco: BindTeamB_Bowler_list.bowlereco
                    });
                  }

                  if (BindTeamB_Bowler_setarray)
                    setBindTeamB_Bowler_Detailslist(BindTeamB_Bowler_setarray)
                  else
                    setBindTeamB_Bowler_Detailslist(null)
                }

                if (List.Fall_Wickets_Detailslist) {
                  var BindTeamB_Fall_Wickets_setarray = [], BindTeamB_Fall_Wickets_list

                  BindTeamB_Fall_Wickets_list = List.Fall_Wickets_Detailslist.Fall_Wickets_Details;
                  if (BindTeamB_Fall_Wickets_list.length > 1) {
                    if (BindTeamB_Fall_Wickets_list) {
                      BindTeamB_Fall_Wickets_list.forEach((BindTeamB_Fall_Wickets_list) => {
                        BindTeamB_Fall_Wickets_setarray.push({
                          id: BindTeamB_Fall_Wickets_list.stickerplayerid,
                          Row_Num: BindTeamB_Fall_Wickets_list.Row_Num,
                          streakename: BindTeamB_Fall_Wickets_list.streakename,
                          bowle: BindTeamB_Fall_Wickets_list.bowle
                        });
                      });
                    }
                  } else {
                    BindTeamB_Fall_Wickets_setarray.push({
                      id: BindTeamB_Fall_Wickets_list.stickerplayerid,
                      Row_Num: BindTeamB_Fall_Wickets_list.Row_Num,
                      streakename: BindTeamB_Fall_Wickets_list.streakename,
                      bowle: BindTeamB_Fall_Wickets_list.bowle
                    });
                  }

                  if (BindTeamB_Fall_Wickets_setarray)
                    setBindTeamB_Fall_Wickets_Detailslist(BindTeamB_Fall_Wickets_setarray)
                  else
                    setBindTeamB_Fall_Wickets_Detailslist(null)
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
  }
  const BindTeamA_renderItem = ({ item }) => (
    <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5 }]}>
      <View style={styles.body50}>
        <Text style={{ paddingLeft: 10 }}>{item.streakename}</Text>
      </View>
      <View style={[styles.body50, { flexDirection: "row" }]}>
        <View style={[styles.body20]}>
          <Text style={{color:Color.FontColor}}>{item.run}</Text>
        </View>
        <View style={styles.body20}>
          <Text style={{color:Color.FontColor}}>{item.ball}</Text>
        </View>
        <View style={styles.body20}>
          <Text style={{color:Color.FontColor}}>{item.fours}</Text>
        </View>
        <View style={styles.body20}>
          <Text style={{color:Color.FontColor}}>{item.sixs}</Text>
        </View>
        <View style={styles.body30}>
          <Text style={{color:Color.FontColor}}>{item.sr}</Text>
        </View>
      </View>
    </View>
  )
  const BindTeamA_Bowler_renderItem = ({ item }) => (
    <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5 }]}>
      <View style={styles.body50}>
        <Text style={{ paddingLeft: 10 }}>{item.bowlername}</Text>
      </View>
      <View style={[styles.body50, { flexDirection: "row" }]}>
        <View style={[styles.body20]}>
          <Text>{item.bowlerover}</Text>
        </View>
        <View style={styles.body20}>
          <Text>{item.bowlermaidan}</Text>
        </View>
        <View style={styles.body20}>
          <Text>{item.bowlerrun}</Text>
        </View>
        <View style={styles.body20}>
          <Text>{item.bowlerwicket}</Text>
        </View>
        <View style={styles.body30}>
          <Text>{item.bowlereco}</Text>
        </View>
      </View>
    </View>
  )
  const BindTeamA_Fall_Wickets_renderItem = ({ item }) => (
    <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5, justifyContent: "space-between", }]}>
      <View>
        <Text style={{ paddingLeft: 10 }}>{item.Row_Num} {item.streakename}</Text>
      </View>
      <View style={{ paddingRight: 10 }}>
        <Text>{item.bowle}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={[styles.body100, { padding: 5, backgroundColor: "#2a373f", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }]}>
          <View>
            <Text style={{ color: "white", paddingLeft: 10 }}>{TeamAName}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {TeamABall ? (<>
              <Text style={{ color: "white", fontSize: 18 }}>{TeamARun} / {TotalOut_TeamA}</Text>
              <Text style={{ color: "white", fontSize: 13, textAlignVertical: "bottom" }}> ( {TeamABall} Ov )</Text>
              </>) : null
            }

          </View>
        </View>
        {
          BindTeamA_DetailsList ?
            (<><View style={[styles.body100, { flexDirection: "row", backgroundColor: "#f2f2f2", padding: 5 }]}>
              <View style={styles.body50}>
                <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Batters</Text>
              </View>
              <View style={[styles.body50, { flexDirection: "row" }]}>
                <View style={[styles.body20,]}>
                  <Text style={{color:Color.FontColor}}>R</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>B</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>4s</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>6s</Text>
                </View>
                <View style={styles.body30}>
                  <Text style={{color:Color.FontColor}}>SR</Text>
                </View>
              </View>
            </View>
              <View style={[styles.body100]}>
                {/* <SafeAreaView style={{flex: 1}}>
                  <FlatList
                    data={BindTeamA_DetailsList}
                    renderItem={BindTeamA_renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView> */}
                {BindTeamA_DetailsList.map((item, index) => (
                  <View key={index}>
                    <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5 }]}>
                      <View style={styles.body50}>
                        <Text style={{ paddingLeft: 10,color:Color.FontColor}}>{item.streakename}</Text>
                      </View>
                      <View style={[styles.body50, { flexDirection: "row" }]}>
                        <View style={[styles.body20]}>
                          <Text style={{color:Color.FontColor}}>{item.run}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.ball}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.fours}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.sixs}</Text>
                        </View>
                        <View style={styles.body30}>
                          <Text style={{color:Color.FontColor}}>{item.sr}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View></>) : null
        }
        {TeamABall ? (<>
          <View style={[styles.body100, styles.BorderBottom, { justifyContent: "space-between", flexDirection: "row", padding: 5, }]}>
            <View>
              <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Total</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={{ fontSize: 14,color:Color.FontColor }}>{TeamARun} / {TotalOut_TeamA}</Text>
              <Text style={[{ fontSize: 14, color: "#7e7e7e" }]}> ( {TeamABall} Ov )</Text>
              {TeamARR ? (<Text style={{color:Color.FontColor}}>  RR {TeamARR}</Text>) : null}
            </View>
          </View>
        </>) : null
        }
        {BindTeamA_Bowler_Detailslist ? (
          <><View style={[styles.body100, { paddingTop: 20 }]}>
            <View style={[styles.body100, { flexDirection: "row", backgroundColor: "#f2f2f2", padding: 5 }]}>
              <View style={styles.body50}>
                <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Bowlers</Text>
              </View>
              <View style={[styles.body50, { flexDirection: "row" }]}>
                <View style={[styles.body20,]}>
                  <Text style={{color:Color.FontColor}}>O</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>M</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>R</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>W</Text>
                </View>
                <View style={styles.body30}>
                  <Text style={{color:Color.FontColor}}>Eco</Text>
                </View>
              </View>
            </View>
          </View><View style={[styles.body100]}>
              {/* <SafeAreaView>
              <FlatList
                data={BindTeamA_Bowler_Detailslist}
                renderItem={BindTeamA_Bowler_renderItem}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView> */}
              {BindTeamA_Bowler_Detailslist.map((item, index) => (
                <View key={index}>
                  <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5 }]}>
                    <View style={styles.body50}>
                      <Text style={{ paddingLeft: 10,color:Color.FontColor }}>{item.bowlername}</Text>
                    </View>
                    <View style={[styles.body50, { flexDirection: "row" }]}>
                      <View style={[styles.body20]}>
                        <Text style={{color:Color.FontColor}}>{item.bowlerover}</Text>
                      </View>
                      <View style={styles.body20}>
                        <Text style={{color:Color.FontColor}}>{item.bowlermaidan}</Text>
                      </View>
                      <View style={styles.body20}>
                        <Text style={{color:Color.FontColor}}>{item.bowlerrun}</Text>
                      </View>
                      <View style={styles.body20}>
                        <Text style={{color:Color.FontColor}}>{item.bowlerwicket}</Text>
                      </View>
                      <View style={styles.body30}>
                        <Text style={{color:Color.FontColor}}>{item.bowlereco}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}

            </View></>
        ) : null}

        {
          BindTeamA_Fall_Wickets_Detailslist ? (
            <View style={[styles.body100, { paddingTop: 20 }]}>
              <View style={[styles.body100, { flexDirection: "row", backgroundColor: "#f2f2f2", padding: 5, justifyContent: "space-between", }]}>
                <View>
                  <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Fall of Wickets</Text>
                </View>
                <View style={{ paddingRight: 10,color:Color.FontColor }}>
                  <Text>Score(over)</Text>
                </View>
              </View>
              <View style={[styles.body100]}>
                {/* <SafeAreaView>
                  <FlatList
                    data={BindTeamA_Fall_Wickets_Detailslist}
                    renderItem={BindTeamA_Fall_Wickets_renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView> */}
                {BindTeamA_Fall_Wickets_Detailslist.map((item, index) => (
                  <View key={index}>
                    <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5, justifyContent: "space-between", }]}>
                      <View>
                        <Text style={{ paddingLeft: 10,color:Color.FontColor }}>{item.Row_Num} {item.streakename}</Text>
                      </View>
                      <View style={{ paddingRight: 10 }}>
                        <Text style={{color:Color.FontColor}}>{item.bowle}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

          ) : null

        }


        {BindTeamBTotalRecored ? (<>
          <View style={[styles.body100, { padding: 5, backgroundColor: "#2a373f", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }]}>
            <View>
              <Text style={{ color: "white", paddingLeft: 10 }}>{TeamBName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {TeamBBall ? (<>
                <Text style={{ color: "white", fontSize: 18 }}>{TeamBRun} / {TotalOut_TeamB}</Text>
                <Text style={{ color: "white", fontSize: 13, textAlignVertical: "bottom" }}> ( {TeamBBall} Ov )</Text></>) : null
              }
            </View>
          </View>
          {BindTeamB_DetailsList ? (
            <><View style={[styles.body100, { flexDirection: "row", backgroundColor: "#f2f2f2", padding: 5 }]}>
              <View style={styles.body50}>
                <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Batters</Text>
              </View>
              <View style={[styles.body50, { flexDirection: "row" }]}>
                <View style={[styles.body20,]}>
                  <Text style={{color:Color.FontColor}}>R</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>B</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>4s</Text>
                </View>
                <View style={styles.body20}>
                  <Text style={{color:Color.FontColor}}>6s</Text>
                </View>
                <View style={styles.body30}>
                  <Text style={{color:Color.FontColor}}>SR</Text>
                </View>
              </View>
            </View><View style={[styles.body100]}>
                {/* <SafeAreaView>
                    <FlatList
                      data={BindTeamB_DetailsList}
                      renderItem={BindTeamA_renderItem}
                      keyExtractor={(item) => item.id}
                    />
                  </SafeAreaView> */}
                {BindTeamB_DetailsList.map((item, index) => (
                  <View key={index}>
                    <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5 }]}>
                      <View style={styles.body50}>
                        <Text style={{ paddingLeft: 10,color:Color.FontColor }}>{item.streakename}</Text>
                      </View>
                      <View style={[styles.body50, { flexDirection: "row" }]}>
                        <View style={[styles.body20]}>
                          <Text style={{color:Color.FontColor}}>{item.run}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.ball}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.fours}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.sixs}</Text>
                        </View>
                        <View style={styles.body30}>
                          <Text style={{color:Color.FontColor}}>{item.sr}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View></>
          ) : null}

          <View style={[styles.body100, styles.BorderBottom, { justifyContent: "space-between", flexDirection: "row", padding: 5, }]}>
            <View>
              <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Total</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {TeamBBall ? (<>
                <Text style={{ fontSize: 14,color:Color.FontColor }}>{TeamBRun} / {TotalOut_TeamB}</Text>
                <Text style={[{ fontSize: 14, color: "#7e7e7e" }]}> ( {TeamBBall} Ov )</Text>
                {TeamBRR ? (<Text style={{color:Color.FontColor}}>  RR {TeamBRR}</Text>) : null}
              </>) : null

              }
            </View>
          </View>
          {BindTeamB_Bowler_Detailslist ? (
            <><View style={[styles.body100, { paddingTop: 20 }]}>
              <View style={[styles.body100, { flexDirection: "row", backgroundColor: "#f2f2f2", padding: 5 }]}>
                <View style={styles.body50}>
                  <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Bowlers</Text>
                </View>
                <View style={[styles.body50, { flexDirection: "row" }]}>
                  <View style={[styles.body20,]}>
                    <Text style={{color:Color.FontColor}}>O</Text>
                  </View>
                  <View style={styles.body20}>
                    <Text style={{color:Color.FontColor}}>M</Text>
                  </View>
                  <View style={styles.body20}>
                    <Text style={{color:Color.FontColor}}>R</Text>
                  </View>
                  <View style={styles.body20}>
                    <Text style={{color:Color.FontColor}}>W</Text>
                  </View>
                  <View style={styles.body30}>
                    <Text style={{color:Color.FontColor}}>Eco</Text>
                  </View>
                </View>
              </View>
            </View><View style={[styles.body100]}>
                {/* <SafeAreaView>
                  <FlatList
                    data={BindTeamB_Bowler_Detailslist}
                    renderItem={BindTeamA_Bowler_renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView> */}
                {BindTeamB_Bowler_Detailslist.map((item, index) => (
                  <View key={index}>
                    <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5 }]}>
                      <View style={styles.body50}>
                        <Text style={{ paddingLeft: 10,color:Color.FontColor }}>{item.bowlername}</Text>
                      </View>
                      <View style={[styles.body50, { flexDirection: "row" }]}>
                        <View style={[styles.body20]}>
                          <Text style={{color:Color.FontColor}}>{item.bowlerover}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.bowlermaidan}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.bowlerrun}</Text>
                        </View>
                        <View style={styles.body20}>
                          <Text style={{color:Color.FontColor}}>{item.bowlerwicket}</Text>
                        </View>
                        <View style={styles.body30}>
                          <Text style={{color:Color.FontColor}}>{item.bowlereco}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View></>
          ) : null}

          {
            BindTeamB_Fall_Wickets_Detailslist ? (
              <View style={[styles.body100, { paddingTop: 20 }]}>
                <View style={[styles.body100, { flexDirection: "row", backgroundColor: "#f2f2f2", padding: 5, justifyContent: "space-between", }]}>
                  <View>
                    <Text style={{ paddingLeft: 10,color:Color.FontColor }}>Fall of Wickets</Text>
                  </View>
                  <View style={{ paddingRight: 10 }}>
                    <Text style={{color:Color.FontColor}}>Score(over)</Text>
                  </View>
                </View>
                <View style={[styles.body100]}>
                  {/* <SafeAreaView>
                    <FlatList
                      data={BindTeamB_Fall_Wickets_Detailslist}
                      renderItem={BindTeamA_Fall_Wickets_renderItem}
                      keyExtractor={(item) => item.id}
                    />
                  </SafeAreaView> */}
                  {BindTeamB_Fall_Wickets_Detailslist.map((item, index) => (
                    <View key={index}>
                      <View style={[styles.body100, styles.BorderBottom, { flexDirection: "row", padding: 5, justifyContent: "space-between", }]}>
                        <View>
                          <Text style={{ paddingLeft: 10,color:Color.FontColor }}>{item.Row_Num} {item.streakename}</Text>
                        </View>
                        <View style={{ paddingRight: 10 }}>
                          <Text style={{color:Color.FontColor}}>{item.bowle}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

            ) : null

          }
        </>) : null
        }
      </ScrollView>
    </View>

  )
}

export default Scorecard

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
  },
  LeftTitle: {
    paddingLeft: 10, marginVertical: 5
  },
  RightTitle: {
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
  body85: {
    width: "85%"
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
  subimage: {
    width: "10%",
    height: "10%"
  },
  BorderBottom: {
    borderBottomColor: Color.borderColor
    , borderBottomWidth: 2
  },
  BorderColor: {
    color: "#f2f2f2"
  }
})