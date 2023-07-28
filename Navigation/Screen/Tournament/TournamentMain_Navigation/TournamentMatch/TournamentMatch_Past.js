import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, Pressable, Ionicons, Alert, SafeAreaView, FlatList, RefreshControl, Modal } from "react-native"

import Custombutton from "../../../../../Component/PressableButton/Custombutton";
import LineButton from "../../../../../Component/LineButton/LineButton";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import Color from "../../../../../Color/Color";


/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
/* -----------------------refreshing ------------------------------*/
// LoadRef - true condtion pending - TeaA Side 
const TournamentMatch_Past = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [MatchStart, setMatchStart] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [id, setid] = useState(null);
  const [MobileNo, setMobileNo] = useState(null);
  const [TeamAid, setTeamAid] = useState(null);
  const [TeamAName, setTeamAName] = useState(null);
  const [TeamASubName, setTeamASubName] = useState(null);
  const [TeamBid, setTeamBid] = useState(null);
  const [TeamBName, setTeamBName] = useState(null);
  const [TeamBSubName, setTeamBSubName] = useState(null);
  const [TeamACapTainId, setTeamACapTainId] = useState(null);
  const [TeamAKeeperTainId, setTeamAKeeperTainId] = useState(null);
  const [TeamBCapTainId, setTeamBCapTainId] = useState(null);
  const [TeamBKeeperTainId, setTeamBKeeperTainId] = useState(null);
  const [MatchType, setMatchType] = useState(null);
  const [NoOfOver, setNoOfOver] = useState(null);
  const [OverperBowler, setOverperBowler] = useState(null);
  const [Cityid, setCityid] = useState(null);
  const [CityName, setCityName] = useState(null);
  const [Groundid, setGroundid] = useState(null);
  const [GroundName, setGroundName] = useState(null);
  const [DisplayGroundName, setDisplayGroundName] = useState(null);
  const [MatchDate, setMatchDate] = useState(null);
  const [MatchTime, setMatchTime] = useState(null);
  const [BallType, setBallType] = useState(null);
  const [ShortType, setShortType] = useState(null);
  const [PowerPlay1To, setPowerPlay1To] = useState(null);
  const [PowerPlay1From, setPowerPlay1From] = useState(null);
  const [PowerPlay2To, setPowerPlay2To] = useState(null);
  const [PowerPlay2From, setPowerPlay2From] = useState(null);
  const [PowerPlay3To, setPowerPlay3To] = useState(null);
  const [PowerPlay3From, setPowerPlay3From] = useState(null);
  const [TeamABatter, setTeamABatter] = useState(null);
  const [TeamBBowler, setTeamBBowler] = useState(null);
  const [StickerPlayerid, setStickerPlayerid] = useState(null);
  const [Streakerid, setStreakerid] = useState(null);
  const [StreakeName, setStreakeName] = useState(null);
  const [RunnerPlayerid, setRunnerPlayerid] = useState(null);
  const [Runnerid, setRunnerid] = useState(null);
  const [RunnerName, setRunnerName] = useState(null);
  const [Streaker, setStreaker] = useState(null);
  const [Runner, setRunner] = useState(null);
  const [TossWin, setTossWin] = useState(null);
  const [LastPageName, setLastPageName] = useState(null);
  const [PageName, setPageName] = useState(null);
  const [RedirectPage, setRedirectPage] = useState(null);
  const [TeamAPlayerCount, setTeamAPlayerCount] = useState(null);
  const [TeamABatterName, setTeamABatterName] = useState(null);
  const [TeamBBowlerName, setTeamBBowlerName] = useState(null);
  const [MatchInningid, setMatchInningid] = useState(null);
  const [Stickerid, setStickerid] = useState(null);
  const [StickerName, setStickerName] = useState(null);
  const [StickerRun, setStickerRun] = useState(null);
  const [StickerBall, setStickerBall] = useState(null);
  const [Non_StickerPlayerid, setNon_StickerPlayerid] = useState(null);
  const [Non_Stickerid, setNon_Stickerid] = useState(null);
  const [Non_StickerName, setNon_StickerName] = useState(null);
  const [Non_StickerBall, setNon_StickerBall] = useState(null);
  const [Non_StickerRun, setNon_StickerRun] = useState(null);
  const [BowlerPlayerid, setBowlerPlayerid] = useState(null);
  const [Bowlerid, setBowlerid] = useState(null);
  const [BowlerName, setBowlerName] = useState(null);
  const [BowlingSide, setBowlingSide] = useState(null);
  const [BowlerWiseBallCount, setBowlerWiseBallCount] = useState(null);
  const [maidan, setmaidan] = useState(null);
  const [BowlerRun, setBowlerRun] = useState(null);
  const [BowlerOut, setBowlerOut] = useState(null);
  const [RunDisplay, setRunDisplay] = useState(null);
  const [Run, setRun] = useState(null);
  const [Ball, setBall] = useState(null);
  const [TotalOver, setTotalOver] = useState(null);
  const [Out, setOut] = useState(null);
  const [StickerColor, setStickerColor] = useState(null);
  const [Non_StickerColor, setNon_StickerColor] = useState(null);
  const [MatchTeamAid_undo, setMatchTeamAid_undo] = useState(null);
  const [MatchTeamBid_undo, setMatchTeamBid_undo] = useState(null);
  const [TeamABowlerid, setTeamABowlerid] = useState(null);
  const [TeamABowlerName, setTeamABowlerName] = useState(null);
  const [TeamBBatterid, setTeamBBatterid] = useState(null);
  const [TeamBBatterName, setTeamBBatterName] = useState(null);
  const [Inningcomplete, setInningcomplete] = useState(null);
  const [BowleCount, setBowleCount] = useState(null);
  const [BowleOver, setBowleOver] = useState(null);
  const [Description,setDescription] = useState(null);



  const onRefresh = React.useCallback(() => {
    IndividualMatchList();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    console.log("Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentMatch/TournamentMatch_Past.js");

    if (route.params?.LoadRef == "True")
      IndividualMatchList();

    IndividualMatchList();
  }, [route.params])

  const IndividualMatchList = async () => {
    try {
      var data = {
        MOBILENO: global.MobileNo,
        TOURNAMENTID:global.Tournamentid,
        SPNAME: "TOURNAMENT_PAST_GET",
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "TOURNAMENT_PAST_GET",
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
                List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
                var setarray = [];
                if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                  if (List) {
                    List.forEach((List) => {
                      setarray.push({

                        id: List.Matchid,
                        MatchTitle:List.MatchTitle,
                        Status:List.Status,
                        MobileNo: List.MobileNo,
                        TeamAid: List.TeamAid,
                        TeamAName: List.TeamAName,
                        TeamASubName: List.TeamASubName,
                        TeamBid: List.TeamBid,
                        TeamBName: List.TeamBName,
                        TeamBSubName: List.TeamBSubName,
                        TeamACapTainId: List.TeamACapTainId,
                        TeamAKeeperTainId: List.TeamAKeeperTainId,
                        TeamBCapTainId: List.TeamBCapTainId,
                        TeamBKeeperTainId: List.TeamBKeeperTainId,
                        MatchType: List.MatchType,
                        NoOfOver: List.NoOfOver,
                        OverperBowler: List.OverperBowler,
                        Cityid: List.Cityid,
                        CityName: List.CityName,
                        Groundid: List.Groundid,
                        GroundName: List.GroundName,
                        DisplayGroundName: List.DisplayGroundName,
                        MatchDate: List.MatchDate,
                        MatchTime: List.MatchTime,
                        BallType: List.BallType,
                        ShortType: List.ShortType,
                        PowerPlay1To: List.PowerPlay1To,
                        PowerPlay1From: List.PowerPlay1From,
                        PowerPlay2To: List.PowerPlay2To,
                        PowerPlay2From: List.PowerPlay2From,
                        PowerPlay3To: List.PowerPlay3To,
                        PowerPlay3From: List.PowerPlay3From,
                        TeamABatter: List.TeamABatter,
                        TeamBBowler: List.TeamBBowler,
                        StickerPlayerid: List.StickerPlayerid,
                        Streakerid: List.Streakerid,
                        StreakeName: List.StreakeName,
                        RunnerPlayerid: List.RunnerPlayerid,
                        Runnerid: List.Runnerid,
                        RunnerName: List.RunnerName,
                        // BowlerPlayerid: List.BowlerPlayerid,
                        // Bowlerid: List.Bowlerid,
                        // BowlerName: List.BowlerName,
                        Streaker: List.Streaker,
                        Runner: List.Runner,
                        TossWin: List.TossWin,
                        LastPageName: List.LastPageName,
                        PageName: List.PageName,
                        RedirectPage: List.RedirectPage,
                        TeamAPlayerCount: List.TeamAPlayerCount,
                        TeamABatterName: List.TeamABatterName,
                        TeamBBowlerName: List.TeamBBowlerName,
                        MatchInningid: List.MatchInningid,
                        Stickerid: List.Stickerid,
                        StickerName: List.StickerName,
                        StickerRun: List.StickerRun,
                        StickerBall: List.StickerBall,
                        Non_StickerPlayerid: List.Non_StickerPlayerid,
                        Non_Stickerid: List.Non_Stickerid,
                        Non_StickerName: List.Non_StickerName,
                        Non_StickerBall: List.Non_StickerBall,
                        Non_StickerRun: List.Non_StickerRun,
                        BowlerPlayerid: List.BowlerPlayerid,
                        Bowlerid: List.Bowlerid,
                        BowlerName: List.BowlerName,
                        BowlingSide: List.BowlingSide,
                        BowlerWiseBallCount: List.BowlerWiseBallCount,
                        maidan: List.maidan,
                        BowlerRun: List.BowlerRun,
                        BowlerOut: List.BowlerOut,
                        RunDisplay: List.RunDisplay,
                        Run: List.Run,
                        Ball: List.Ball,
                        TotalOver: List.TotalOver,
                        Out: List.Out,
                        StickerColor: List.StickerColor,
                        Non_StickerColor: List.Non_StickerColor,
                        MatchTeamAid_undo: List.MatchTeamAid_undo,
                        MatchTeamBid_undo: List.MatchTeamBid_undo,
                        TeamABowlerid: List.TeamABowlerid,
                        TeamABowlerName: List.TeamABowlerName,
                        TeamBBatterid: List.TeamBBatterid,
                        TeamBBatterName: List.TeamBBatterName,
                        Inningcomplete: List.Inningcomplete,
                        CreateMatch: List.CreateMatch,
                        BowleCount: List.BowleCount,
                        BowleOver: List.BowleOver,
                        Description:List.Description
                      });
                    });
                  }
                } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                  setarray.push({
                    id: List.Matchid,
                    MatchTitle:List.MatchTitle,
                    Status:List.Status,
                    MobileNo: List.MobileNo,
                    TeamAid: List.TeamAid,
                    TeamAName: List.TeamAName,
                    TeamASubName: List.TeamASubName,
                    TeamBid: List.TeamBid,
                    TeamBName: List.TeamBName,
                    TeamBSubName: List.TeamBSubName,
                    TeamACapTainId: List.TeamACapTainId,
                    TeamAKeeperTainId: List.TeamAKeeperTainId,
                    TeamBCapTainId: List.TeamBCapTainId,
                    TeamBKeeperTainId: List.TeamBKeeperTainId,
                    MatchType: List.MatchType,
                    NoOfOver: List.NoOfOver,
                    OverperBowler: List.OverperBowler,
                    Cityid: List.Cityid,
                    CityName: List.CityName,
                    Groundid: List.Groundid,
                    GroundName: List.GroundName,
                    DisplayGroundName: List.DisplayGroundName,
                    MatchDate: List.MatchDate,
                    MatchTime: List.MatchTime,
                    BallType: List.BallType,
                    ShortType: List.ShortType,
                    PowerPlay1To: List.PowerPlay1To,
                    PowerPlay1From: List.PowerPlay1From,
                    PowerPlay2To: List.PowerPlay2To,
                    PowerPlay2From: List.PowerPlay2From,
                    PowerPlay3To: List.PowerPlay3To,
                    PowerPlay3From: List.PowerPlay3From,
                    TeamABatter: List.TeamABatter,
                    TeamBBowler: List.TeamBBowler,
                    StickerPlayerid: List.StickerPlayerid,
                    Streakerid: List.Streakerid,
                    StreakeName: List.StreakeName,
                    RunnerPlayerid: List.RunnerPlayerid,
                    Runnerid: List.Runnerid,
                    RunnerName: List.RunnerName,
                    // BowlerPlayerid: List.BowlerPlayerid,
                    // Bowlerid: List.Bowlerid,
                    // BowlerName: List.BowlerName,
                    Streaker: List.Streaker,
                    Runner: List.Runner,
                    TossWin: List.TossWin,
                    LastPageName: List.LastPageName,
                    PageName: List.PageName,
                    RedirectPage: List.RedirectPage,
                    TeamAPlayerCount: List.TeamAPlayerCount,
                    TeamABatterName: List.TeamABatterName,
                    TeamBBowlerName: List.TeamBBowlerName,
                    MatchInningid: List.MatchInningid,
                    Stickerid: List.Stickerid,
                    StickerName: List.StickerName,
                    StickerRun: List.StickerRun,
                    StickerBall: List.StickerBall,
                    Non_StickerPlayerid: List.Non_StickerPlayerid,
                    Non_Stickerid: List.Non_Stickerid,
                    Non_StickerName: List.Non_StickerName,
                    Non_StickerBall: List.Non_StickerBall,
                    Non_StickerRun: List.Non_StickerRun,
                    BowlerPlayerid: List.BowlerPlayerid,
                    Bowlerid: List.Bowlerid,
                    BowlerName: List.BowlerName,
                    BowlingSide: List.BowlingSide,
                    BowlerWiseBallCount: List.BowlerWiseBallCount,
                    maidan: List.maidan,
                    BowlerRun: List.BowlerRun,
                    BowlerOut: List.BowlerOut,
                    RunDisplay: List.RunDisplay,
                    Run: List.Run,
                    Ball: List.Ball,
                    TotalOver: List.TotalOver,
                    Out: List.Out,
                    StickerColor: List.StickerColor,
                    Non_StickerColor: List.Non_StickerColor,
                    MatchTeamAid_undo: List.MatchTeamAid_undo,
                    MatchTeamBid_undo: List.MatchTeamBid_undo,
                    TeamABowlerid: List.TeamABowlerid,
                    TeamABowlerName: List.TeamABowlerName,
                    TeamBBatterid: List.TeamBBatterid,
                    TeamBBatterName: List.TeamBBatterName,
                    Inningcomplete: List.Inningcomplete,
                    CreateMatch: List.CreateMatch,
                    BowleCount: List.BowleCount,
                    BowleOver: List.BowleOver,
                    Description:List.Description
                  });
                }
                setListItems(setarray);
                setRefreshing(false);
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
  const btnModalOpen = async () => {
    //  console.log(StickerName)
    // console.log(LastPageName != 'NextInning' ? StickerName : "Striker")
    //return
    if (MatchStart == "RESUMESCORING") {
      navigation.navigate(LastPageName, {
        Matchid: id,
        MatchInningid: MatchInningid,
        PageName: PageName,
        Run: Run,
        Out: Out,
        Ball: Ball,
        TotalOver: TotalOver,
        Stickerid: LastPageName != 'NextInning' ? Stickerid : null,
        StickerPlayerid: LastPageName != 'NextInning' ? StickerPlayerid : null,
        StickerName: LastPageName != 'NextInning' ? StickerName : "Striker",
        StickerRun: StickerRun,
        StickerBall: StickerBall,
        StickerColor: StickerColor,
        Non_Stickerid: LastPageName != 'NextInning' ? Non_Stickerid : null,
        Non_StickerPlayerid: LastPageName != 'NextInning' ? Non_StickerPlayerid : null,
        Non_StickerName: LastPageName != 'NextInning' ? Non_StickerName : "Non-Striker",
        Non_StickerRun: Non_StickerRun,
        Non_StickerBall: Non_StickerBall,
        Non_StickerColor: Non_StickerColor,
        Bowlerid: LastPageName != 'NextInning' ? Bowlerid : null,
        BowlerName: LastPageName != 'NextInning' ? BowlerName : "Bowler",
        BowlerPlayerid: LastPageName != 'NextInning' ? BowlerPlayerid : null,
        BowlingSide: BowlingSide,
        BowlerWiseBallCount: BowlerWiseBallCount,
        maidan: maidan,
        BowlerWiseRun: BowlerRun,
        BowlerOut: BowlerOut,
        RunDisplay: RunDisplay,
        MatchTeamAid_undo: MatchTeamAid_undo,
        MatchTeamBid_undo: MatchTeamBid_undo,
        TeamAid: TeamAid,
        TeamAName: TeamAName,
        RedirectPage: RedirectPage,
        TeamAPlayerCount: TeamAPlayerCount,
        TeamBid: TeamBid,
        TeamBName: TeamBName,
        TeamABatterid: TeamABatter,
        TeamBBowlerid: TeamBBowler,
        TeamABatterName: TeamABatterName,
        TeamBBowlerName: TeamBBowlerName,

        TeamABowlerid: TeamABowlerid,
        TeamABowlerName: TeamABowlerName,
        TeamBBatterid: TeamBBatterid,
        TeamBBatterName: TeamBBatterName,
        BowleCount: BowleCount,
        BowleOver: BowleOver,
        TeamDescription: Description
      })
    }
    else if (MatchStart == "VIEWFULLSCORECARD") {

      navigation.navigate("Report_IndividualMatch", {
        Matchid: id,
        PageName: "Summary"
      })
    }
  }
  const renderItem = ({ item }) => (
    <View style={[styles.item, { borderColor: item.Color, borderWidth: 1 }]}>
      <Pressable
        onPress={() => {
          // navigation.navigate(item.LastPageName, {
          //   Matchid: item.id,
          //   MatchInningid: item.MatchInningid,
          //   PageName: item.PageName,
          //   Run: item.Run,
          //   Out: item.Out,
          //   Ball: item.Ball,
          //   TotalOver: item.TotalOver,
          //   Stickerid: item.LastPageName != 'NextInning' ? item.Stickerid : null,
          //   StickerPlayerid: item.LastPageName != 'NextInning' ? item.StickerPlayerid : null,
          //   StickerName: item.LastPageName != 'NextInning' ? item.StickerName : "Striker",
          //   StickerRun: item.StickerRun,
          //   StickerBall: item.StickerBall,
          //   StickerColor: item.StickerColor,
          //   Non_Stickerid: item.LastPageName != 'NextInning' ? item.Non_Stickerid : null,
          //   Non_StickerPlayerid: item.LastPageName != 'NextInning' ? item.Non_StickerPlayerid : null,
          //   Non_StickerName: item.LastPageName != 'NextInning' ? item.Non_StickerName : "Non-Striker",
          //   Non_StickerRun: item.Non_StickerRun,
          //   Non_StickerBall: item.Non_StickerBall,
          //   Non_StickerColor: item.Non_StickerColor,
          //   Bowlerid: item.LastPageName != 'NextInning' ? item.Bowlerid : null,
          //   BowlerName: item.LastPageName != 'NextInning' ? item.BowlerName : "Bowler",
          //   BowlerPlayerid: item.LastPageName != 'NextInning' ? item.BowlerPlayerid : null,
          //   BowlingSide: item.BowlingSide,
          //   BowlerWiseBallCount: item.BowlerWiseBallCount,
          //   maidan: item.maidan,
          //   BowlerWiseRun: item.BowlerRun,
          //   BowlerOut: item.BowlerOut,
          //   RunDisplay: item.RunDisplay,
          //   MatchTeamAid_undo: item.MatchTeamAid_undo,
          //   MatchTeamBid_undo: item.MatchTeamBid_undo,
          //   TeamAid: item.TeamAid,
          //   TeamAName: item.TeamAName,
          //   RedirectPage: item.RedirectPage,
          //   TeamAPlayerCount: item.TeamAPlayerCount,
          //   TeamBid: item.TeamBid,
          //   TeamBName: item.TeamBName,
          //   TeamABatterid: item.TeamABatter,
          //   TeamBBowlerid: item.TeamBBowler,
          //   TeamABatterName: item.TeamABatterName,
          //   TeamBBowlerName: item.TeamBBowlerName,

          //   TeamABowlerid: item.TeamABowlerid,
          //   TeamABowlerName: item.TeamABowlerName,
          //   TeamBBatterid: item.TeamBBatterid,
          //   TeamBBatterName: item.TeamBBatterName
          // })
          console.log(item.id)
          setLastPageName(item.LastPageName)
          setid(item.id)
          setMatchInningid(item.MatchInningid)
          setPageName(item.PageName)
          setRun(item.Run)
          setOut(item.Out)
          setBall(item.Ball)
          setTotalOver(item.TotalOver)
          setStickerid(item.Stickerid)
          setStickerPlayerid(item.StickerPlayerid)
          setStickerName(item.StickerName)
          setStickerRun(item.StickerRun)
          setStickerBall(item.StickerBall)
          setStickerColor(item.StickerColor)
          setNon_Stickerid(item.Non_Stickerid)
          setNon_StickerPlayerid(item.Non_StickerPlayerid)
          setNon_StickerName(item.Non_StickerName)
          setNon_StickerRun(item.Non_StickerRun)
          setNon_StickerBall(item.Non_StickerBall)
          setNon_StickerColor(item.Non_StickerColor)
          setBowlerid(item.Bowlerid)
          setBowlerName(item.BowlerName)
          setBowlerPlayerid(item.BowlerPlayerid)
          setBowlingSide(item.BowlingSide)
          setBowlerWiseBallCount(item.BowlerWiseBallCount)
          setmaidan(item.maidan)
          setBowlerRun(item.BowlerRun)
          setBowlerOut(item.BowlerOut)
          setRunDisplay(item.RunDisplay)
          setMatchTeamAid_undo(item.MatchTeamAid_undo)
          setMatchTeamBid_undo(item.MatchTeamBid_undo)
          setTeamAid(item.TeamAid)
          setTeamAName(item.TeamAName)
          setRedirectPage(item.RedirectPage)
          setTeamAPlayerCount(item.TeamAPlayerCount)
          setTeamBid(item.TeamBid)
          setTeamBName(item.TeamBName)
          setTeamABatter(item.TeamABatter)
          setTeamBBowler(item.TeamBBowler)
          setTeamABatterName(item.TeamABatterName)
          setTeamBBowlerName(item.TeamBBowlerName)
          setTeamABowlerid(item.TeamABowlerid)
          setTeamABowlerName(item.TeamABowlerName)
          setTeamBBatterid(item.TeamBBatterid)
          setTeamBBatterName(item.TeamBBatterName)
          setInningcomplete(item.Inningcomplete)
          setBowleCount(item.BowleCount)
          setBowleOver(item.BowleOver)
          
          setDescription(item.Description)

          if (item.Inningcomplete == 1 || item.CreateMatch == 1) {
            // console.log(item.id)
            navigation.navigate("Report_IndividualMatch", {
              Matchid: item.id,
              PageName: "Summary"
            })
          }
          else {
            setModalVisible(false)
            setModalVisible(true)
          }

        }

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

          <View style={[styles.body80]}>
            <Text style={[styles.italic]}>{item.MatchTitle}</Text>
          </View>
          <View style={[styles.body20, { alignItems: "center" }]}>
            <Text style={styles.italic}>{item.Status}</Text>
          </View>

        </View>
        <View style={[styles.body100, styles.BorderBottom]}>
          {
            item.DisplayGroundName != null ? (<Text style={{color:Color.FontColor}}>{item.DisplayGroundName}</Text>) : null
          }

        </View>
        <View style={[styles.body100, styles.BannerSpaceBetween]}>
          <Text style={{color:Color.FontColor}}>{item.TeamAName}</Text>
          <Text style={{color:Color.FontColor}}>
            {
              item.Run ? (<Text style={{ color: "#1bb191", fontSize: 16, fontWeight: "900" }}>{item.Run} / {item.Out}</Text>) : null
            }
            {
              item.Ball ? (<Text style={{ fontWeight: "700" }} > ({item.Ball} Ov)</Text>) : null
            }
          </Text>
        </View>
        <View style={[styles.body100, styles.BannerSpaceBetween, styles.BorderBottom]}>
          <Text style={{color:Color.FontColor}}>{item.TeamBName}</Text>
          {/* <Text style={{ fontWeight: "700" }} >Yet to bat</Text> */}
        </View>
        <View style={[styles.body100, styles.BannerSpaceBetween]}>
          {
            item.TossWin != null ? (<Text style={{color:Color.FontColor}}>{item.Description}</Text>) : null
          }
          <Text></Text>
        </View>

      </Pressable>
    </View>
  );
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
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modal_centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.Modal_header]}>
                <View style={styles.Modal_HeaderTitle}>
                  <Text style={styles.Modal_Hedertxt}>What would you like to do ?</Text>
                </View>
              </View>
              <View style={[styles.modal_body]}>
                {/* <View style={styles.Modal_HederTitle}>
                  <Text>Tab to assign one or more roles to the player.</Text>
                </View> */}
                <View style={styles.Modal_bodyBox}>
                  <RadioButton
                    value="RESUMESCORING"
                    status={
                      MatchStart === "RESUMESCORING" ? "checked" : "unchecked"
                    }
                    onPress={() => setMatchStart("RESUMESCORING")}
                  />
                  <Pressable onPress={() => setMatchStart("RESUMESCORING")}>
                    <Text style={{ paddingTop: 7 }}>RESUME SCORING</Text>
                  </Pressable>
                </View>
                <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                  <RadioButton
                    value="Bye"
                    status={MatchStart === "VIEWFULLSCORECARD" ? "checked" : "unchecked"}
                    onPress={() => setMatchStart("VIEWFULLSCORECARD")}
                  />
                  <Pressable onPress={() => setMatchStart("VIEWFULLSCORECARD")}>
                    <Text style={{ paddingTop: 7 }}>VIEW FULL SCORECARD</Text>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.Modal_Footer]}>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.Modla_Cancelbtn}
                  >
                    <Text style={styles.Modal_Cancelbtn_text}>CANCEL</Text>
                  </Pressable>
                </View>
                <View style={styles.body50}>
                  <Pressable
                    style={styles.Modal_okbtn}
                    onPress={() => {
                      btnModalOpen()
                      setModalVisible(false)
                    }}
                  >
                    <Text style={styles.Modal_okbtn_text}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      
      {listItems.length == "0" ? (

        <View>
          <View style={styles.body100}>
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
              <Image
                source={{
                  uri: "" + global.domainName + "/CricbuddyAdmin/Content/assets/tournament/tournament_Background.png",
                }}
                style={styles.Image}
              />
            </RefreshControl>
          </View>
        </View>

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
}
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
  italic: {
    fontStyle: 'italic',
    color: Color.GunmetalGray
  },
  BorderBottom: {
    borderBottomColor: "#f2f2f2", borderBottomWidth: 2, paddingBottom: 5
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
    backgroundColor: "white",
    flexDirection: "row",
  },
  modal_body: {
    width: "100%",
  },
  Modal_Footer: {
    flexDirection: "row",
    width: "100%",
  },

  Modal_HeaderTitle: {
    justifyContent: "center",
    width: "80%",
    paddingLeft: 20
  },
  Modal_Hedertxt: {
    fontSize: 16,
    color: Color.PrimaryColor,
    fontWeight: "600",
    fontSize: 18
  },
  Modal_HederTitle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Modal_bodyBox: {
    width: "100%",
    //marginHorizontal:"5%",
    flexDirection: "row",
    paddingLeft: 20,
  },
  Modal_Box: {
    width: "30%",
    height: 80,
    // borderColor:"#3f3f3f",
    borderWidth: 3,
    margin: 5
  },
  Modal_BoxImg: {
    width: "70%",
    height: "100%",
    resizeMode: "stretch",
  },
  modal_BoximgDiv: {
    height: "70%", width: "100%", alignItems: "center", paddingTop: "5%"
  }
});

export default TournamentMatch_Past;