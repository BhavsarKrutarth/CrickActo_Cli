import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import Color from '../../../../Color/Color'
import scoketservices from '../../../../scoket/scoketservices';


const Summary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [intervalId, setIntervalId] = useState(null);
  const [Matchid, setMatchid] = useState(null);

  const [TeamAName, setTeamAName] = useState(null);
  const [TeamA_Run, setTeamA_Run] = useState(null);
  const [TeamA_Out, setTeamA_Out] = useState(null);
  const [TeamA_Ball, setTeamA_Ball] = useState(null);
  const [TeamA_CRR, setTeamA_CRR] = useState(null);
  const [TeamA_PROJ_SCORE, setTeamA_PROJ_SCORE] = useState(null);
  const [TeamA_PartnerShipRun, setTeamA_PartnerShipRun] = useState(null);
  const [TeamA_PartnerShipBall, setTeamA_PartnerShipBall] = useState(null);
  const [TeamA_Description, setTeamA_Description] = useState(null);
  const [Batter_DetailsList, setBatter_DetailsList] = useState([])
  const [Bowler_DetailsList, setBowler_DetailsList] = useState([])
  const [DISPLAYMESSGAE, setDISPLAYMESSGAE] = useState(null);
  const [TeamB_REQ, setTeamB_REQ] = useState(null);
  const [TeamBTarget, setTeamBTarget] = useState(null);
  const [TeamBName, setTeamBName] = useState(null);
  const [TeamB_Run, setTeamB_Run] = useState(null);
  const [TeamB_Out, setTeamB_Out] = useState(null);
  const [TeamB_Ball, setTeamB_Ball] = useState(null);

  useEffect(() => {
    console.log("Navigation/Screen/Match/Report/Summary.js");
    scoketservices.initializeSocket()
    scoketservices.on("received_message",(data => {
      
      if(Matchid == data)
      {
        setMatchid(data)
        Bind_Summary_List(data)
      }
    }))
    
    if (route.params?.MatchId) {
      
      setMatchid(route.params?.MatchId)
      Bind_Summary_List(route.params?.MatchId)
    }
    // // Start the interval when the component mounts
    // const id = setInterval(() => {
    //   // Call your function here
    //   myFunction(route.params?.MatchId);
      
    // }, 2000); // 1000 milliseconds = 1 second

    // // Save the interval ID so we can clear it later
    // setIntervalId(id);

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  // Your function to be called every second
  // function myFunction(Matchid) {
  //   Bind_Summary_List(Matchid);
  // }
  const Bind_Summary_List = async (Matchid) => {

    try {
      var data = {
        MOBILENO: global.MobileNo,
        MATCHID: Matchid,
        SPNAME: "INDIVIDUALMATCH_SUMMARY_GET",
      }
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "INDIVIDUALMATCH_SUMMARY_GET",
          },
          body: JSON.stringify(data)
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          List = BindData.SERVICERESPONSE;

          if (BindData.SERVICERESPONSE.RESPONSECODE = "0") {
            
            if (List.DETAILSLIST) {

              if (List.DETAILSLIST.DETAILS.PAGENAME == "MatchScoring" || List.DETAILSLIST.DETAILS.PAGENAME == "NextInning_MatchScoring" || List.DETAILSLIST.DETAILS.PAGENAME == "Done_MatchScoring") {

                setTeamAName(List.DETAILSLIST.DETAILS.TeamAName);
                setTeamA_Run(List.DETAILSLIST.DETAILS.TeamA_Run);
                setTeamA_Out(List.DETAILSLIST.DETAILS.TeamA_Out);
                setTeamA_Ball(List.DETAILSLIST.DETAILS.TeamA_Ball);
                setTeamA_CRR(List.DETAILSLIST.DETAILS.TeamA_CRR);
                setTeamA_PROJ_SCORE(List.DETAILSLIST.DETAILS.TeamA_PROJ_SCORE);
                setTeamA_PartnerShipRun(List.DETAILSLIST.DETAILS.TeamA_PartnerShipRun);
                setTeamA_PartnerShipBall(List.DETAILSLIST.DETAILS.TeamA_PartnerShipBall);
                setTeamA_Description(List.DETAILSLIST.DETAILS.TeamA_Description)
                setTeamB_REQ(List.DETAILSLIST.DETAILS.TeamB_REQ)
                setTeamBTarget(List.DETAILSLIST.DETAILS.TeamBTarget)
                setTeamBName(List.DETAILSLIST.DETAILS.TeamBName);
                setTeamB_Run(List.DETAILSLIST.DETAILS.TeamB_Run);
                setTeamB_Out(List.DETAILSLIST.DETAILS.TeamB_Out);
                setTeamB_Ball(List.DETAILSLIST.DETAILS.TeamB_Ball);

                var Batter_DetailsList1, Bowler_Detailslist1;
                var Batter_DetailsList1_setarray = [], Bowler_Detailslist1_setarray = [];
                if (List.BATTER_DETAILSLIST) {
                  Batter_DetailsList1 = List.BATTER_DETAILSLIST.BATTER_DETAILS;
                }
                if (List.BOWLER_DETAILSLIST) {
                  Bowler_Detailslist1 = List.BOWLER_DETAILSLIST.BOWLER_DETAILS;
                }

                if (List.BATTER_DETAILSLIST) {
                  if (Batter_DetailsList1.length > 1) {
                    if (Batter_DetailsList1) {
                      Batter_DetailsList1.forEach((Batter_DetailsList1) => {
                        Batter_DetailsList1_setarray.push({
                          id: Batter_DetailsList1.id,
                          Batter_Name: Batter_DetailsList1.Batter_Name,
                          Batter_Run: Batter_DetailsList1.Batter_Run,
                          Batter_Ball: Batter_DetailsList1.Batter_Ball,
                          Batter_TotalFour: Batter_DetailsList1.Batter_TotalFour,
                          Batter_TotalSix: Batter_DetailsList1.Batter_TotalSix,
                          Batter_SR: Batter_DetailsList1.Batter_SR,
                          Batter_Color: Batter_DetailsList1.Batter_Color,
                        });
                      });
                    }
                  } else if (Batter_DetailsList1.length == 1) {
                    Batter_DetailsList1_setarray.push({
                      id: Batter_DetailsList1.id,
                      Batter_Name: Batter_DetailsList1.Batter_Name,
                      Batter_Run: Batter_DetailsList1.Batter_Run,
                      Batter_Ball: Batter_DetailsList1.Batter_Ball,
                      Batter_TotalFour: Batter_DetailsList1.Batter_TotalFour,
                      Batter_TotalSix: Batter_DetailsList1.Batter_TotalSix,
                      Batter_SR: Batter_DetailsList1.Batter_SR,
                      Batter_Color: Batter_DetailsList1.Batter_Color,
                    });
                  }

                  if (Batter_DetailsList1_setarray)
                    setBatter_DetailsList(Batter_DetailsList1_setarray)
                  else
                    setBatter_DetailsList(null)
                }

                if (List.BOWLER_DETAILSLIST) {
                  if (Bowler_Detailslist1.length > 1) {
                    if (Bowler_Detailslist1) {
                      Bowler_Detailslist1.forEach((Bowler_Detailslist1) => {
                        Bowler_Detailslist1_setarray.push({
                          id: Bowler_Detailslist1.Bowlerid,
                          BowlerName: Bowler_Detailslist1.BowlerName,
                          Bowle: Bowler_Detailslist1.Bowle,
                          Run: Bowler_Detailslist1.Run,
                          OUT: Bowler_Detailslist1.OUT,
                          BowlerMaidan: Bowler_Detailslist1.BowlerMaidan,
                          ECO: Bowler_Detailslist1.ECO
                        });
                      });
                    }
                  } else {
                    Bowler_Detailslist1_setarray.push({
                      id: Bowler_Detailslist1.Bowlerid,
                      BowlerName: Bowler_Detailslist1.BowlerName,
                      Bowle: Bowler_Detailslist1.Bowle,
                      Run: Bowler_Detailslist1.Run,
                      OUT: Bowler_Detailslist1.OUT,
                      BowlerMaidan: Bowler_Detailslist1.BowlerMaidan,
                      ECO: Bowler_Detailslist1.ECO
                    });
                  }


                  if (Bowler_Detailslist1_setarray)
                    setBowler_DetailsList(Bowler_Detailslist1_setarray)
                  else
                    setBowler_DetailsList(null)
               }

              }
              else if (List.DETAILSLIST.DETAILS.PAGENAME == "NextInning") {
                setTeamAName(null);
                setTeamA_Run(null);
                setTeamA_Out(null);
                setTeamA_Ball(null);
                setTeamA_CRR(null);
                setTeamA_PROJ_SCORE(null);
                setTeamA_PartnerShipRun(null);
                setTeamA_PartnerShipBall(null);
                setTeamA_Description(null);
                setBatter_DetailsList([]);
                setBowler_DetailsList([]);
                setDISPLAYMESSGAE(List.DETAILSLIST.DETAILS.DISPLAYMESSGAE);
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

  const Batter_DetailsList1_renderItem = ({ item }) => (
    <View style={[styles.body100, { flexDirection: "row", marginBottom: 5 }]}>
      <View style={[styles.body40]}>
        <Text style={[styles.subtableTitle, { marginLeft: 5 }]}>{item.Batter_Name} {item.Batter_Color == '#DC6933' ? (<Text style={{ color: "#DC6933" }}>*</Text>) : null}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.Batter_Run}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.Batter_Ball}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.Batter_TotalFour}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.Batter_TotalSix}</Text>
      </View>
      <View style={[styles.body20]}>
        <Text style={styles.subtableTitle}>{item.Batter_SR}</Text>
      </View>
    </View>
  );

  const Bowler_DetailsList1_renderItem = ({ item }) => (
    <View style={[styles.body100, { flexDirection: "row", marginBottom: 5 }]}>
      <View style={[styles.body40]}>
        <Text style={[styles.subtableTitle, { marginLeft: 5 }]}>{item.BowlerName}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.Bowle}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.BowlerMaidan}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.Run}</Text>
      </View>
      <View style={styles.body10}>
        <Text style={styles.subtableTitle}>{item.OUT}</Text>
      </View>
      <View style={[styles.body20]}>
        <Text style={styles.subtableTitle}>{item.ECO}</Text>
      </View>
    </View>
  );


  return (
    <View style={styles.Container}>

      <View style={[styles.body100, { marginTop: 10 }]}>
        <Text style={styles.title}>{DISPLAYMESSGAE}</Text>
      </View>

      <View style={styles.body100}>
        {TeamAName != null ?
          (
            <Text style={styles.title}>{TeamAName}</Text>
          ) : null}
      </View>

      <View style={[styles.body100, { flexDirection: "row" }]}>
        <View style={[styles.body40, { flexDirection: "row" }]}>
          {TeamA_Out != null ?
            (<Text style={styles.SubTitle}>{TeamA_Run}/{TeamA_Out} </Text>) : null
          }
          {TeamA_Ball != null ?
            (<Text style={styles.OverTitle}>({TeamA_Ball} Ov) </Text>) : null
          }
        </View>
        <View style={[styles.body60, { flexDirection: "row" }]}>
          {TeamA_CRR != null ? (<Text style={styles.OverTitle}>CRR </Text>) : null}
          {TeamA_CRR != null ? (<Text style={styles.CRR}>{TeamA_CRR} </Text>) : null}
          {TeamA_PROJ_SCORE != null ? (<Text style={styles.OverTitle}>PROJ.SCORE </Text>) : null}
          {TeamA_PROJ_SCORE != null ? (<Text style={styles.CRR}>{TeamA_PROJ_SCORE}</Text>) : null}
          {TeamB_REQ != null ? (<Text style={styles.OverTitle}>REQ </Text>) : null}
          {TeamB_REQ != null ? (<Text style={styles.CRR}>{TeamB_REQ}</Text>) : null}
        </View>
      </View>
      {TeamBName ? (
        <View style={styles.body100}>
          <View style={styles.body100}>
            <Text style={styles.title}>{TeamBName}</Text>
          </View>
          <View style={[styles.body100, { flexDirection: "row" }]}>
            <View style={[styles.body40, { flexDirection: "row" }]}>
              <Text style={styles.SubTitle}>{TeamB_Run}/{TeamB_Out} </Text>
              <Text style={styles.OverTitle}>({TeamB_Ball} Ov) </Text>
            </View>
          </View>
        </View>
      ) : null}

      <View style={styles.body100}>
        {TeamA_Description != null ? (<Text style={styles.tossTitle}>Status : {TeamA_Description}</Text>) : null}
      </View>
      {
        Batter_DetailsList != [] ?
          (
            <View style={[styles.body100, { flexDirection: "row", borderBottomColor: "#F7EFF2", borderBottomWidth: 2, marginTop: 10, paddingBottom: 5 }]}>
              <View style={[styles.body40]}>
                <Text style={[styles.tableTitle, { marginLeft: 5 }]}>Batter</Text>
              </View>
              <View style={styles.body10}>
                <Text style={styles.tableTitle}>R</Text>
              </View>
              <View style={styles.body10}>
                <Text style={styles.tableTitle}>B</Text>
              </View>
              <View style={styles.body10}>
                <Text style={styles.tableTitle}>4s</Text>
              </View>
              <View style={styles.body10}>
                <Text style={styles.tableTitle}>6s</Text>
              </View>
              <View style={[styles.body20]}>
                <Text style={styles.tableTitle}>SR</Text>
              </View>
            </View>
          ) : null
      }

      <SafeAreaView>
        <FlatList
          data={Batter_DetailsList}
          renderItem={Batter_DetailsList1_renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={[styles.body100, { flexDirection: "row" }]}>
        {
          TeamA_PartnerShipRun ? (
            <View>
              <Text style={[styles.PartnerShiptitle]}>PartnerShip {TeamA_PartnerShipRun}({TeamA_PartnerShipBall}) </Text>
            </View>
          ) : null
        }
        {
          TeamBTarget ?
            (
              <View>
                <Text style={[styles.PartnerShiptitle]}>Target {TeamBTarget}</Text>
              </View>
            ) : null
        }
      </View>
      {Bowler_DetailsList != [] ?
        (
          <View style={[styles.body100, { flexDirection: "row", borderBottomColor: "#F7EFF2", borderBottomWidth: 2, marginTop: 10, paddingBottom: 5 }]}>
            <View style={[styles.body40]}>
              <Text style={[styles.tableTitle, { marginLeft: 5 }]}>Bowlers</Text>
            </View>
            <View style={styles.body10}>
              <Text style={styles.tableTitle}>O</Text>
            </View>
            <View style={styles.body10}>
              <Text style={styles.tableTitle}>M</Text>
            </View>
            <View style={styles.body10}>
              <Text style={styles.tableTitle}>R</Text>
            </View>
            <View style={styles.body10}>
              <Text style={styles.tableTitle}>W</Text>
            </View>
            <View style={[styles.body20]}>
              <Text style={styles.tableTitle}>ECO</Text>
            </View>
          </View>
        ) : null
      }
      <SafeAreaView>
        <FlatList
          data={Bowler_DetailsList}
          renderItem={Bowler_DetailsList1_renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
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
  body80: {
    width: "80%",
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
  body10: {
    width: "10%"
  },
  title: {
    color: Color.Texttitle,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
  },
  SubTitle: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 5,
    color:Color.FontColor
  },
  OverTitle: {
    color: Color.Texttitle,
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 5,
    textAlignVertical: 'bottom'
  },
  CRR: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 5,
    textAlignVertical: 'bottom'
  },
  tossTitle: {
    color: Color.PrimaryColor,
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: {
    margin: 10
  },
  tableTitle: {
    color: Color.Texttitle,
    fontWeight: "bold",
    fontSize: 12,
  },
  subtableTitle: {
    fontSize: 12,
    color:Color.FontColor
  },
  PartnerShiptitle: {
    color: Color.Texttitle,
    fontWeight: "bold",
    fontSize: 14,
    padding: 5,
  }
});

export default Summary;