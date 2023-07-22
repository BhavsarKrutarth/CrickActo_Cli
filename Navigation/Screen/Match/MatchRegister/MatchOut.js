import { StyleSheet, Text, View, Image, Pressable, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from '../../../../Color/Color';
import scoketservices from '../../../../scoket/scoketservices';

const MatchOut = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Matchid, setMatchid] = useState(null);

  const [TeamABatterid, setTeamABatterid] = useState(null);
  const [TeamABatterName, setTeamABatterName] = useState(null);
  const [TeamBBowlerid, setTeamBBowlerid] = useState(null);
  const [TeamBBowlerName, setTeamBBowlerName] = useState(null);

  const [BowlingSide, setBowlingSide] = useState("stump");

  const [BowledModal, setBowledModal] = useState(false);
  const [CaughtBowledModal, setCaughtBowledModal] = useState(false);
  const [LbwModal, setLbwModal] = useState(false);
  const [Stickerid, setStickerid] = useState(null);
  const [StickerName, setStickerName] = useState("Striker");
  const [StickerPlayerid, setStickerPlayerid] = useState(0);

  const [Bowlerid, setBowlerid] = useState(null);
  const [BowlerName, setBowlerName] = useState("Bowler");
  const [BowlerPlayerid, setBowlerPlayerid] = useState(0);

  const [Bowle, setBowle] = useState(null);
  const [BowleOver, setBowleOver] = useState(null);

  const [Runnerid, setRunnerid] = useState(null);
  const [RunnerName, setRunnerName] = useState(null);
  const [RunnerPlayerid, setRunnerPlayerid] = useState(null)
  const [RunDisplay, setRunDisplay] = useState(null);

  const [TotalOver, setTotalOver] = useState(null);
  const [MatchInningid, setMatchInningid] = useState(null)
  const [MatchTeamAid_undo, setMatchTeamAid_undo] = useState(null);

  const [BowleCount, setBowleCount] = useState(null);
  const [BowlerWiseBallCount, setBowlerWiseBallCount] = useState(null);

  const [Ball, setBall] = useState(null);
  const [setNextOverModal, setsetNextOverModal] = useState(false)
  const [Nextinning, setNextinning] = useState(false);

  const [PosstionFlag, setPosstionFlag] = useState(false);

  const [original_Stickerid, setoriginal_Stickerid] = useState(false);
  const [original_StickerName, setoriginal_StickerName] = useState(false);
  const [original_StickerPlayerid, setoriginal_StickerPlayerid] = useState(false);
  const [original_Non_Stickerid, setoriginal_Non_Stickerid] = useState(false);
  const [original_Non_StickerName, setoriginal_Non_StickerName] = useState(false);
  const [original_Non_StickerPlayerid, setoriginal_Non_StickerPlayerid] = useState(false);
  const [FlagBatterType, setFlagBatterType] = useState(null);
  const [RunOutMankadedModal, setRunOutMankadedModal] = useState(false);
  const [NextInningModal, setNextInningModal] = useState(false);

  const [WagonWeel, setWagonWeel] = useState(null);
  const [ShortType, setShortType] = useState(null);
  const [FunctionName, setFunctionName] = useState(null);
  const [FunctionRun, setFunctionRun] = useState(null);

  React.useEffect(() => {
    console.log("Navigation/Screen/Match/MatchRegister/MatchOut.js");
    if (route.params?.FlagBatterType) setFlagBatterType(route.params?.FlagBatterType);
    if (route.params?.original_Stickerid) setoriginal_Stickerid(route.params?.original_Stickerid);
    if (route.params?.original_StickerName) setoriginal_StickerName(route.params?.original_StickerName);
    if (route.params?.original_StickerPlayerid) setoriginal_StickerPlayerid(route.params?.original_StickerPlayerid);
    if (route.params?.original_Non_Stickerid) setoriginal_Non_Stickerid(route.params?.original_Non_Stickerid);
    if (route.params?.original_Non_StickerName) setoriginal_Non_StickerName(route.params?.original_Non_StickerName);
    if (route.params?.original_Non_StickerPlayerid) setoriginal_Non_StickerPlayerid(route.params?.original_Non_StickerPlayerid);

    if (route.params?.Matchid) setMatchid(route.params?.Matchid);
    if (route.params?.TeamABatterid) setTeamABatterid(route.params?.TeamABatterid);
    if (route.params?.TeamABatterName) setTeamABatterName(route.params?.TeamABatterName);
    if (route.params?.TeamBBowlerid) setTeamBBowlerid(route.params?.TeamBBowlerid);
    if (route.params?.TeamBBowlerName) setTeamBBowlerName(route.params?.TeamBBowlerName);

    if (route.params?.Bowlerid) setBowlerid(route.params?.Bowlerid);
    if (route.params?.BowlerName) setBowlerName(route.params?.BowlerName);
    if (route.params?.BowlerPlayerid) setBowlerPlayerid(route.params?.BowlerPlayerid);
    if (route.params?.BowlingSide) setBowlingSide(route.params?.BowlingSide);

    if (route.params?.Stickerid) setStickerid(route.params?.Stickerid);
    if (route.params?.StickerName) setStickerName(route.params?.StickerName);
    if (route.params.StickerPlayerid)
      setStickerPlayerid(route.params?.StickerPlayerid);

    if (route.params?.Runnerid) setRunnerid(route.params?.Runnerid);
    if (route.params?.RunnerName) setRunnerName(route.params?.RunnerName);
    if (route.params?.RunnerPlayerid)
      setRunnerPlayerid(route.params?.RunnerPlayerid);

    if (route.params?.Bowle) setBowle(route.params?.Bowle);
    if (route.params?.BowleOver) setBowleOver(route.params?.BowleOver);
    if (route.params?.TotalOver) setTotalOver(route.params?.TotalOver);
    if (route.params?.MatchInningid) setMatchInningid(route.params?.MatchInningid);

    if (route.params?.MatchTeamAid_undo) setMatchTeamAid_undo(route.params?.MatchTeamAid_undo);



    if (route.params?.BowleCount) setBowleCount(route.params?.BowleCount);
    if (route.params?.BowlerWiseBallCount) setBowlerWiseBallCount(route.params?.BowlerWiseBallCount);
    if (route.params?.BowlerWiseBallCount) setBowlerWiseBallCount(route.params?.BowlerWiseBallCount);

    if (route.params?.PosstionFlag) setPosstionFlag(route.params?.PosstionFlag);

    if (route.params?.WagonWeel) {
      setWagonWeel(route.params?.WagonWeel)
      setShortType(route.params?.ShortType)
      //tempfunctionName(route.params?.FunctionRun)
      //alert(tempfunctionName)
      
      var TempRun = route.params?.FunctionRun ? route.params?.FunctionRun : 0
      RedirectToFunction(route.params?.FunctionName, TempRun, route.params?.WagonWeel, route.params?.ShortType)
    }

  }, [route.params]);

  const RedirectToFunction = async (FunctionName, FunctionRun, WagonWeel, ShortType) => {
    if (FunctionName == "btnSaveBowled") {
      btnSaveBowled('CaughtBowled', WagonWeel, ShortType)
    }
   
  };
  const UPDATE_LASTPAGENAME_MATCH_CRUD = async () => {
    try {

      var data = {
        oper: "Edit",
        MATCHID: Matchid,
        LASTPAGENAME: "NextInning",
        SPNAME: "UPDATE_LASTPAGENAME_MATCH_CRUD",
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "UPDATE_LASTPAGENAME_MATCH_CRUD",
          },
          body: JSON.stringify(data)
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            navigation.navigate("NextInning", {
              Matchid: Matchid,
              MatchInningid: MatchInningid,
              TeamABatterName: TeamABatterName,
              TeamABatterid: TeamABatterid,
              TeamBBowlerName: TeamBBowlerName,
              TeamBBowlerid: TeamBBowlerid
            })
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

  const NextInning = () => {
    // navigation.navigate("NextInning", {
    //   Matchid: Matchid,
    //   MatchInningid: MatchInningid,
    //   TeamABatterName: TeamABatterName,
    //   TeamABatterid: TeamABatterid,
    //   TeamBBowlerName: TeamBBowlerName,
    //   TeamBBowlerid: TeamBBowlerid
    // })
    UPDATE_LASTPAGENAME_MATCH_CRUD();
  }

  const Retired = () => {
    navigation.navigate("MatchOut_Retired",
      {
        original_Stickerid: original_Stickerid,
        original_StickerName: original_StickerName,
        original_StickerPlayerid: original_StickerPlayerid,
        original_Non_Stickerid: original_Non_Stickerid,
        original_Non_StickerName: original_Non_StickerName,
        original_Non_StickerPlayerid: original_Non_StickerPlayerid,
        PageName: "Retired",
        TeamBBowlerid: TeamBBowlerid,
        TeamBBowlerName: TeamBBowlerName,
        Matchid: Matchid,
        TeamABatterid: TeamABatterid,
        TeamABatterName: TeamABatterName,
        Bowlerid: Bowlerid,
        BowlerName: BowlerName,
        BowlerPlayerid: BowlerPlayerid,
        BowlingSide: BowlingSide,
        Bowle: Bowle,
        BowleOver: BowleOver,
        BowleCount: BowleCount,
        BowlerWiseBallCount: BowlerWiseBallCount,
        TotalOver: TotalOver,
        MatchTeamAid_undo: MatchTeamAid_undo,
        MatchInningid: MatchInningid,
        PosstionFlag: PosstionFlag,
        FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
      }
    )
  }
  const Obstr_The_Field = () => {
    navigation.navigate("MatchOut_ObstructingTheField",
      {
        original_Stickerid: original_Stickerid,
        original_StickerName: original_StickerName,
        original_StickerPlayerid: original_StickerPlayerid,
        original_Non_Stickerid: original_Non_Stickerid,
        original_Non_StickerName: original_Non_StickerName,
        original_Non_StickerPlayerid: original_Non_StickerPlayerid,
        PageName: "ObstructingTheField",
        TeamBBowlerid: TeamBBowlerid,
        TeamBBowlerName: TeamBBowlerName,
        Matchid: Matchid,
        TeamABatterid: TeamABatterid,
        TeamABatterName: TeamABatterName,
        Bowlerid: Bowlerid,
        BowlerName: BowlerName,
        BowlerPlayerid: BowlerPlayerid,
        BowlingSide: BowlingSide,
        Bowle: Bowle,
        BowleOver: BowleOver,
        BowleCount: BowleCount,
        BowlerWiseBallCount: BowlerWiseBallCount,
        TotalOver: TotalOver,
        MatchTeamAid_undo: MatchTeamAid_undo,
        MatchInningid: MatchInningid,
        PosstionFlag: PosstionFlag,
        FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
      }
    )
  }

  const RunOut = async () => {
    navigation.navigate("MatchOut_RunOut",
      {
        original_Stickerid: original_Stickerid,
        original_StickerName: original_StickerName,
        original_StickerPlayerid: original_StickerPlayerid,
        original_Non_Stickerid: original_Non_Stickerid,
        original_Non_StickerName: original_Non_StickerName,
        original_Non_StickerPlayerid: original_Non_StickerPlayerid,
        PageName: "Run Out",
        TeamBBowlerid: TeamBBowlerid,
        TeamBBowlerName: TeamBBowlerName,
        Matchid: Matchid,
        TeamABatterid: TeamABatterid,
        TeamABatterName: TeamABatterName,
        Bowlerid: Bowlerid,
        BowlerName: BowlerName,
        BowlerPlayerid: BowlerPlayerid,
        BowlingSide: BowlingSide,
        Bowle: Bowle,
        BowleOver: BowleOver,
        BowleCount: BowleCount,
        BowlerWiseBallCount: BowlerWiseBallCount,
        TotalOver: TotalOver,
        MatchTeamAid_undo: MatchTeamAid_undo,
        MatchInningid: MatchInningid,

      }
    )
  }

  const Stumped = async () => {
    navigation.navigate("MatchOutBehind_Caught", {
      //StickerName:StickerName,
      //Matchid:Matchid,
      PageName: "Stumped",
      TeamBBowlerid: TeamBBowlerid,
      TeamBBowlerName: TeamBBowlerName,
      PosstionFlag: PosstionFlag,

      Oper: "add",
      Matchid: Matchid,
      MobileNo: global.MobileNo,
      TeamABatterid: TeamABatterid,
      TeamABatterName: TeamABatterName,
      Bowlerid: Bowlerid,
      BowlerName: BowlerName,
      BowlerPlayerid: BowlerPlayerid,
      BowlingSide: BowlingSide,
      Stickerid: Stickerid,
      StickerName: StickerName,
      StickerPlayerid: StickerPlayerid,
      Runnerid: Runnerid,
      RunnerName: RunnerName,
      RunnerPlayerid: RunnerPlayerid,
      Bowle: Bowle || 0,
      BowleOver: BowleOver || 0,
      BowleCount: BowleCount || 0,
      BowlerWiseBallCount: BowlerWiseBallCount || 0,
      TotalOver: TotalOver,
      Run: 0,
      FourS: 0,
      SixS: 0,
      Type: "Out",
      WideBallRun: 0,
      NoBallRun: 0,
      NoBallchecked: "",
      OutBatterid: Stickerid,
      OutBatterType: "Stumped",
      OutByBowlerid: Bowlerid,
      OutByBowlerName: BowlerName,
      Description: "",
      MatchInningid: MatchInningid,
      MatchTeamAid_undo: MatchTeamAid_undo,
      FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
    });
  }
  const Hit_TheBallTwisce = () => {
    navigation.navigate("MatchOut_Hit_TheBallTwisce", {
      //StickerName:StickerName,
      //Matchid:Matchid,
      TeamBBowlerid: TeamBBowlerid,
      TeamBBowlerName: TeamBBowlerName,
      PosstionFlag: PosstionFlag,

      Oper: "add",
      Matchid: Matchid,
      MobileNo: global.MobileNo,
      TeamABatterid: TeamABatterid,
      TeamABatterName: TeamABatterName,
      Bowlerid: Bowlerid,
      BowlerName: BowlerName,
      BowlerPlayerid: BowlerPlayerid,
      BowlingSide: BowlingSide,
      Stickerid: Stickerid,
      StickerName: StickerName,
      StickerPlayerid: StickerPlayerid,
      Runnerid: Runnerid,
      RunnerName: RunnerName,
      RunnerPlayerid: RunnerPlayerid,
      Bowle: Bowle || 0,
      BowleOver: BowleOver || 0,
      BowleCount: BowleCount || 0,
      BowlerWiseBallCount: BowlerWiseBallCount || 0,
      TotalOver: TotalOver,
      Run: 0,
      FourS: 0,
      SixS: 0,
      Type: "Out",
      WideBallRun: 0,
      NoBallRun: 0,
      NoBallchecked: "",
      OutBatterid: Stickerid,
      OutBatterType: "Hit_TheBallTwisce",
      OutByBowlerid: Bowlerid,
      OutByBowlerName: BowlerName,
      Description: "",
      MatchInningid: MatchInningid,
      MatchTeamAid_undo: MatchTeamAid_undo,
      FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
    });
  }
  const Absent_Hurt = () => {

    navigation.navigate("MatchOut_Absent_Hurt", {
      //StickerName:StickerName,
      //Matchid:Matchid,
      TeamBBowlerid: TeamBBowlerid,
      TeamBBowlerName: TeamBBowlerName,
      PosstionFlag: PosstionFlag,

      Oper: "add",
      Matchid: Matchid,
      MobileNo: global.MobileNo,
      TeamABatterid: TeamABatterid,
      TeamABatterName: TeamABatterName,
      Bowlerid: Bowlerid,
      BowlerName: BowlerName,
      BowlerPlayerid: BowlerPlayerid,
      BowlingSide: BowlingSide,
      Stickerid: Stickerid,
      StickerName: StickerName,
      StickerPlayerid: StickerPlayerid,
      Runnerid: Runnerid,
      RunnerName: RunnerName,
      RunnerPlayerid: RunnerPlayerid,
      Bowle: Bowle || 0,
      BowleOver: BowleOver || 0,
      BowleCount: BowleCount || 0,
      BowlerWiseBallCount: BowlerWiseBallCount || 0,
      TotalOver: TotalOver,
      Run: 0,
      FourS: 0,
      SixS: 0,
      Type: "Out",
      WideBallRun: 0,
      NoBallRun: 0,
      NoBallchecked: "",
      OutBatterid: Stickerid,
      OutBatterType: "Absent_Hurt",
      OutByBowlerid: Bowlerid,
      OutByBowlerName: BowlerName,
      Description: "",
      MatchInningid: MatchInningid,
      MatchTeamAid_undo: MatchTeamAid_undo,
      FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
    });

  }

  const RunOutMankaded = () => {
    setRunOutMankadedModal(false);
    setRunOutMankadedModal(true);
  }
  const Retired_Out = () => {
    navigation.navigate("MatchOut_Retired_Out",
      {
        original_Stickerid: original_Stickerid,
        original_StickerName: original_StickerName,
        original_StickerPlayerid: original_StickerPlayerid,
        original_Non_Stickerid: original_Non_Stickerid,
        original_Non_StickerName: original_Non_StickerName,
        original_Non_StickerPlayerid: original_Non_StickerPlayerid,
        PageName: "Retired Hurt",
        TeamBBowlerid: TeamBBowlerid,
        TeamBBowlerName: TeamBBowlerName,
        Matchid: Matchid,
        TeamABatterid: TeamABatterid,
        TeamABatterName: TeamABatterName,
        Bowlerid: Bowlerid,
        BowlerName: BowlerName,
        BowlerPlayerid: BowlerPlayerid,
        BowlingSide: BowlingSide,
        Bowle: Bowle,
        BowleOver: BowleOver,
        BowleCount: BowleCount,
        BowlerWiseBallCount: BowlerWiseBallCount,
        TotalOver: TotalOver,
        MatchTeamAid_undo: MatchTeamAid_undo,
        MatchInningid: MatchInningid,
        PosstionFlag: PosstionFlag,
        FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
      }
    )
  }

  const Retired_Hurt = () => {
    navigation.navigate("MatchOut_Retired_Hurt",
      {
        original_Stickerid: original_Stickerid,
        original_StickerName: original_StickerName,
        original_StickerPlayerid: original_StickerPlayerid,
        original_Non_Stickerid: original_Non_Stickerid,
        original_Non_StickerName: original_Non_StickerName,
        original_Non_StickerPlayerid: original_Non_StickerPlayerid,
        PageName: "Retired Hurt",
        TeamBBowlerid: TeamBBowlerid,
        TeamBBowlerName: TeamBBowlerName,
        Matchid: Matchid,
        TeamABatterid: TeamABatterid,
        TeamABatterName: TeamABatterName,
        Bowlerid: Bowlerid,
        BowlerName: BowlerName,
        BowlerPlayerid: BowlerPlayerid,
        BowlingSide: BowlingSide,
        Bowle: Bowle,
        BowleOver: BowleOver,
        BowleCount: BowleCount,
        BowlerWiseBallCount: BowlerWiseBallCount,
        TotalOver: TotalOver,
        MatchTeamAid_undo: MatchTeamAid_undo,
        MatchInningid: MatchInningid,
        PosstionFlag: PosstionFlag,
        FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
      }
    )
  }

  const Hit_Wicket = () => {
    navigation.navigate("MatchOut_Hit_Wicket", {
      //StickerName:StickerName,
      //Matchid:Matchid,
      PageName: "Hit Wicket",
      TeamBBowlerid: TeamBBowlerid,
      TeamBBowlerName: TeamBBowlerName,
      PosstionFlag: PosstionFlag,

      Oper: "add",
      Matchid: Matchid,
      MobileNo: global.MobileNo,
      TeamABatterid: TeamABatterid,
      TeamABatterName: TeamABatterName,
      Bowlerid: Bowlerid,
      BowlerName: BowlerName,
      BowlerPlayerid: BowlerPlayerid,
      BowlingSide: BowlingSide,
      Stickerid: Stickerid,
      StickerName: StickerName,
      StickerPlayerid: StickerPlayerid,
      Runnerid: Runnerid,
      RunnerName: RunnerName,
      RunnerPlayerid: RunnerPlayerid,
      Bowle: Bowle || 0,
      BowleOver: BowleOver || 0,
      BowleCount: BowleCount || 0,
      BowlerWiseBallCount: BowlerWiseBallCount || 0,
      TotalOver: TotalOver,
      Run: 0,
      FourS: 0,
      SixS: 0,
      Type: "Out",
      WideBallRun: 0,
      NoBallRun: 0,
      NoBallchecked: "",
      OutBatterid: Stickerid,
      OutBatterType: "Caught_Behind",
      OutByBowlerid: Bowlerid,
      OutByBowlerName: BowlerName,
      Description: "",
      MatchInningid: MatchInningid,
      MatchTeamAid_undo: MatchTeamAid_undo,
      FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
    });
  }

  const Lbw = async () => {
    setLbwModal(false);
    setLbwModal(true);
  }

  const CaughtBowled = async () => {
    setCaughtBowledModal(false);
    setCaughtBowledModal(true);
  }
  const Bowled = async () => {
    setBowledModal(false);
    setBowledModal(true);
  }
  const CaughtBehind_Modal = async () => {
    navigation.navigate("MatchOutBehind_Caught", {
      //StickerName:StickerName,
      //Matchid:Matchid,
      PageName: "Catch Behind",
      TeamBBowlerid: TeamBBowlerid,
      TeamBBowlerName: TeamBBowlerName,
      PosstionFlag: PosstionFlag,

      Oper: "add",
      Matchid: Matchid,
      MobileNo: global.MobileNo,
      TeamABatterid: TeamABatterid,
      TeamABatterName: TeamABatterName,
      Bowlerid: Bowlerid,
      BowlerName: BowlerName,
      BowlerPlayerid: BowlerPlayerid,
      BowlingSide: BowlingSide,
      Stickerid: Stickerid,
      StickerName: StickerName,
      StickerPlayerid: StickerPlayerid,
      Runnerid: Runnerid,
      RunnerName: RunnerName,
      RunnerPlayerid: RunnerPlayerid,
      Bowle: Bowle || 0,
      BowleOver: BowleOver || 0,
      BowleCount: BowleCount || 0,
      BowlerWiseBallCount: BowlerWiseBallCount || 0,
      TotalOver: TotalOver,
      Run: 0,
      FourS: 0,
      SixS: 0,
      Type: "Out",
      WideBallRun: 0,
      NoBallRun: 0,
      NoBallchecked: "",
      OutBatterid: Stickerid,
      OutBatterType: "Caught_Behind",
      OutByBowlerid: Bowlerid,
      OutByBowlerName: BowlerName,
      Description: "",
      MatchInningid: MatchInningid,
      MatchTeamAid_undo: MatchTeamAid_undo,
      FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
    });
  }
  const Caught_Modal = async () => {

    navigation.navigate("MatchOut_Caught", {
      //StickerName:StickerName,
      //Matchid:Matchid,
      TeamBBowlerid: TeamBBowlerid,
      TeamBBowlerName: TeamBBowlerName,
      PosstionFlag: PosstionFlag,

      Oper: "add",
      Matchid: Matchid,
      MobileNo: global.MobileNo,
      TeamABatterid: TeamABatterid,
      TeamABatterName: TeamABatterName,
      Bowlerid: Bowlerid,
      BowlerName: BowlerName,
      BowlerPlayerid: BowlerPlayerid,
      BowlingSide: BowlingSide,
      Stickerid: Stickerid,
      StickerName: StickerName,
      StickerPlayerid: StickerPlayerid,
      Runnerid: Runnerid,
      RunnerName: RunnerName,
      RunnerPlayerid: RunnerPlayerid,
      Bowle: Bowle || 0,
      BowleOver: BowleOver || 0,
      BowleCount: BowleCount || 0,
      BowlerWiseBallCount: BowlerWiseBallCount || 0,
      TotalOver: TotalOver,
      Run: 0,
      FourS: 0,
      SixS: 0,
      Type: "Out",
      WideBallRun: 0,
      NoBallRun: 0,
      NoBallchecked: "",
      OutBatterid: Stickerid,
      OutBatterType: "Bowled",
      OutByBowlerid: Bowlerid,
      OutByBowlerName: BowlerName,
      Description: "",
      MatchInningid: MatchInningid,
      MatchTeamAid_undo: MatchTeamAid_undo,
      FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
    });
  }
  const btnSaveBowled = async (OutBatterType,WagonWeel,ShortType) => {
    const resposneJSON = await fetch(
      `${global.domainName}/cricbuddyAPI/api/MatchTeamA`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
        },
        body: JSON.stringify({
          Oper: "add",
          Matchid: Matchid,
          WagonWeel:OutBatterType == 'CaughtBowled' ? (WagonWeel  ? WagonWeel : "") : "",
          ShortType:OutBatterType == 'CaughtBowled' ? (ShortType  ? ShortType : "") : "",
          MobileNo: global.MobileNo,
          TeamAid: TeamABatterid,
          TeamAName: TeamABatterName,
          Bowlerid: Bowlerid,
          BowlerName: BowlerName,
          BowlerPlayerid: BowlerPlayerid,
          BowlingSide: BowlingSide,
          Streakerid: Stickerid,
          StreakeName: StickerName,
          StickerPlayerid: StickerPlayerid,
          Runnerid: Runnerid,
          RunnerName: RunnerName,
          RunnerPlayerid: RunnerPlayerid,
          Bowle: Bowle || 0,
          BowleOver: BowleOver || 0,
          BowleCount: BowleCount || 0,
          BowlerWiseBallCount: BowlerWiseBallCount || 0,
          TotalOver: TotalOver,
          Run: 0,
          FourS: 0,
          SixS: 0,
          Type: "Out",
          WideBallRun: 0,
          NoBallRun: 0,
          NoBallchecked: "",
          OutBatterid: Stickerid,
          OutBatterType: OutBatterType,
          OutByBowlerid: Bowlerid,
          OutByBowlerName: BowlerName,
          Description: "",
          MatchInningid: MatchInningid,
          MatchTeamAid_undo: MatchTeamAid_undo,
          FlagBatterType: FlagBatterType == Color.PrimaryColor ? "Sticker" : "Runner"
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        /*-------------------- Page Call -----------------------*/
        var BindData = JSON.parse(json);
        
        if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
           /*------------------------ Clear Wagon params --------------------*/
           route.params.FunctionName = null;
           route.params.FunctionRun = null;
           route.params.WagonWeel = null;
           route.params.ShortType = null;
           /*------------------------ Clear Wagon params --------------------*/

          setMatchTeamAid_undo(BindData.SERVICERESPONSE.MATCHTEAMAID_UNDO)
          setBall(BindData.SERVICERESPONSE.BOWLE);
          setBowleCount(BindData.SERVICERESPONSE.BOWLECOUNT);
          setBowleOver(BindData.SERVICERESPONSE.BOWLEOVER);
          setBowlerWiseBallCount(BindData.SERVICERESPONSE.BOWLERWISEBALLCOUNT);
          setRunDisplay(BindData.SERVICERESPONSE.BOWLERRUNDISPLAY);
          // setNextOverModal(
          //   BindData.SERVICERESPONSE.NEXTOVER == "true" ? true : false
          // );
          if(Matchid)
          {
            scoketservices.emit("SendMessage",Matchid)
          }
          if (BindData.SERVICERESPONSE.NEXTINNING == "true") {
            setRunOutMankadedModal(false)
            setLbwModal(false)
            setCaughtBowledModal(false)
            setBowledModal(false);
            setNextInningModal(false)
            setNextInningModal(true)
          }
          else {
            navigation.navigate("MatchNextBatterTeamA", {
              Non_Stickerid: Stickerid + "," + Runnerid,
              Matchid: Matchid,
              PosstionFlag: PosstionFlag,
              Ball: BindData.SERVICERESPONSE.BOWLE,
              BowleCount: BindData.SERVICERESPONSE.BOWLECOUNT,
              BowleOver: BindData.SERVICERESPONSE.BOWLEOVER,
              BowlerWiseBallCount: BindData.SERVICERESPONSE.BOWLERWISEBALLCOUNT,
              BowlerOut: BindData.SERVICERESPONSE.BOWLEROUT,
              Out: BindData.SERVICERESPONSE.OUT,
              MatchInningid: MatchInningid,
              MatchTeamAid_undo: BindData.SERVICERESPONSE.MATCHTEAMAID,
              RunDisplay: BindData.SERVICERESPONSE.NEXTOVER == 'true' ? " " : BindData.SERVICERESPONSE.BOWLERRUNDISPLAY,
              ModalStickerSelect: "false",
              NextOver: BindData.SERVICERESPONSE.NEXTOVER,
              FlagBatterType: FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white",
              Run: BindData.SERVICERESPONSE.RUN,
              BowlerRun: BindData.SERVICERESPONSE.BOWLERRUN,
            })
          }
        }
        return json;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  return (
    <View style={styles.Container}>
      <Modal animationType="slide" transparent={true} visible={NextInningModal}>
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <View style={[styles.body100, { justifyContent: "center", alignItems: "center" }]}>
                {/* <Text style={[styles.ModalTitle]}>Over Complete</Text> */}
                <Image
                  source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/DWarning.jpg`,
                  }}
                  resizeMode="stretch"
                  style={styles.img}
                />
                <Text style={{ fontSize: 20, fontWeight: "700" }}>{TeamBBowlerName}</Text>
                <Text style={{ fontSize: 16 }}>Confirme Next Inning Start?</Text>
              </View>

              <View style={[styles.modalText, { marginTop: 20 }]}>
                <Pressable
                  style={styles.modalbutton}
                  onPress={() => NextInning()

                  }
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Yes,I'M Sure
                  </Text>
                </Pressable>
                <View style={{ marginTop: 10 }}>
                  {/* <Pressable
                    style={styles.CancelBtn}
                    onPress={() => {
                      setNextInningModal(!NextInningModal)}}
                  >
                    <Text style={{ color: Color.PrimaryColor, fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </Pressable> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={BowledModal}>
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <View style={[styles.body100, { justifyContent: "center", alignItems: "center" }]}>
                {/* <Text style={[styles.ModalTitle]}>Over Complete</Text> */}
                <Image
                  source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/DWarning.jpg`,
                  }}
                  resizeMode="stretch"
                  style={styles.img}
                />
                <Text style={{ fontSize: 20, fontWeight: "700" }}>{StickerName}</Text>
                <Text style={{ fontSize: 16 }}>Confirmed out - Bowled?</Text>
              </View>

              <View style={[styles.modalText, { marginTop: 20 }]}>
                <Pressable
                  style={styles.modalbutton}
                  onPress={() => btnSaveBowled('Bowled')}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Yes,I'M Sure
                  </Text>
                </Pressable>
                <View style={{ marginTop: 10 }}>
                  <Pressable
                    style={styles.CancelBtn}
                    onPress={() => {
                      setBowledModal(!BowledModal)
                    }}
                  >
                    <Text style={{ color: Color.PrimaryColor, fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={CaughtBowledModal}>
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <View style={[styles.body100, { justifyContent: "center", alignItems: "center" }]}>
                {/* <Text style={[styles.ModalTitle]}>Over Complete</Text> */}
                <Image
                  source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/DWarning.jpg`,
                  }}
                  resizeMode="stretch"
                  style={styles.img}
                />
                <Text style={{ fontSize: 20, fontWeight: "700" }}>{StickerName}</Text>
                <Text style={{ fontSize: 16 }}>Confirmed out - Caught & Bowled?</Text>
              </View>

              <View style={[styles.modalText, { marginTop: 20 }]}>
                <Pressable
                  style={styles.modalbutton}
                  onPress={() => {
                    navigation.navigate("WagonWeel", {
                      Matchid: Matchid
                      , FunctionName: "btnSaveBowled"
                      , FunctionRun: 0
                      , RedirectPage: "MatchOut"
                      , PageName: StickerName
                    })
                   // btnSaveBowled('CaughtBowled')
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Yes,I'M Sure
                  </Text>
                </Pressable>
                <View style={{ marginTop: 10 }}>
                  <Pressable
                    style={styles.CancelBtn}
                    onPress={() => {
                      setCaughtBowledModal(!CaughtBowledModal)
                    }}
                  >
                    <Text style={{ color: Color.PrimaryColor, fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={LbwModal}>
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <View style={[styles.body100, { justifyContent: "center", alignItems: "center" }]}>
                {/* <Text style={[styles.ModalTitle]}>Over Complete</Text> */}
                <Image
                  source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/DWarning.jpg`,
                  }}
                  resizeMode="stretch"
                  style={styles.img}
                />
                <Text style={{ fontSize: 20, fontWeight: "700" }}>{StickerName}</Text>
                <Text style={{ fontSize: 16 }}>Confirmed out - LBW?</Text>
              </View>

              <View style={[styles.modalText, { marginTop: 20 }]}>
                <Pressable
                  style={styles.modalbutton}
                  onPress={() => btnSaveBowled('LBW')}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Yes,I'M Sure
                  </Text>
                </Pressable>
                <View style={{ marginTop: 10 }}>
                  <Pressable
                    style={styles.CancelBtn}
                    onPress={() => {
                      setLbwModal(!LbwModal)
                    }}
                  >
                    <Text style={{ color: Color.PrimaryColor, fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={RunOutMankadedModal}>
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <View style={[styles.body100, { justifyContent: "center", alignItems: "center" }]}>
                {/* <Text style={[styles.ModalTitle]}>Over Complete</Text> */}
                <Image
                  source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/DWarning.jpg`,
                  }}
                  resizeMode="stretch"
                  style={styles.img}
                />
                <Text style={{ fontSize: 20, fontWeight: "700" }}>{StickerName}</Text>
                <Text style={{ fontSize: 16 }}>Confirmed out - Run Out(Mankaded)?</Text>
              </View>

              <View style={[styles.modalText, { marginTop: 20 }]}>
                <Pressable
                  style={styles.modalbutton}
                  onPress={() => btnSaveBowled('RunOutMankaded')}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Yes,I'M Sure
                  </Text>
                </Pressable>
                <View style={{ marginTop: 10 }}>
                  <Pressable
                    style={styles.CancelBtn}
                    onPress={() => {
                      setRunOutMankadedModal(!RunOutMankadedModal)
                    }}
                  >
                    <Text style={{ color: Color.PrimaryColor, fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={[styles.body100, { flexDirection: "row", marginTop: 10 }]}>
          <Pressable style={styles.body25} onPress={() => Bowled()}>
            <Image
              source={{
                uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Bowl_ed.jpg`,
              }}
              resizeMode="stretch"
              style={styles.img}
            />
          </Pressable>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Caught_Modal()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/caught.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => CaughtBehind_Modal()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Caught_Behind.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>

            <Pressable style={styles.body25} onPress={() => CaughtBowled()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Caught_Bowled.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.body100, { flexDirection: "row" }]}>
          <Pressable style={styles.body25} onPress={() => Bowled()}>
            <Text style={styles.Titletxt}>Bowled</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => Caught_Modal()}>
            <Text style={styles.Titletxt}>Caught</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => CaughtBehind_Modal()}>
            <Text style={[styles.Titletxt]}>Caught & Behind</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => CaughtBowled()}>
            <Text style={styles.Titletxt}>Caught & Bowled</Text>
          </Pressable>
        </View>

        <View style={[styles.body100, { flexDirection: "row", marginTop: 10 }]}>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Stumped()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Stumped.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => RunOut()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Run_Out.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>

          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Lbw()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/LBW.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Hit_Wicket()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Hit_Wicket.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.body100, { flexDirection: "row" }]}>
          <Pressable style={styles.body25} onPress={() => Stumped()}>
            <Text style={styles.Titletxt}>Stumped</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => RunOut()}>
            <Text style={styles.Titletxt}>Run Out</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => LbW()}>
            <Text style={[styles.Titletxt]}>LBW</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => Hit_Wicket()}>
            <Text style={styles.Titletxt}>Hit Wicket</Text>
          </Pressable>
        </View>

        <View style={[styles.body100, { flexDirection: "row", marginTop: 10 }]}>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Retired_Hurt()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Retired_Hurt.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Retired_Out()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Retired_Out.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => RunOutMankaded()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Run_Out_Mankaded.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Absent_Hurt()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Absent_Hurt.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>

        </View>

        <View style={[styles.body100, { flexDirection: "row" }]}>
          <Pressable style={styles.body25} onPress={() => Retired_Hurt()}>
            <Text style={styles.Titletxt}>Retired Hurt</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => Retired_Out()}>
            <Text style={styles.Titletxt}>Retired Out</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => RunOutMankaded()}>
            <Text style={[styles.Titletxt]}>Run Out (Mankaded)</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => Absent_Hurt()}>
            <Text style={styles.Titletxt}>Absent Hurt</Text>
          </Pressable>
        </View>

        <View style={[styles.body100, { flexDirection: "row", marginTop: 10 }]}>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Hit_TheBallTwisce()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Hit_The_Ball_Twisce.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Obstr_The_Field()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Obstr_The_Field.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
          <View style={styles.body25}>
            <Image
              source={{
                uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Time_Out.jpg`,
              }}
              resizeMode="stretch"
              style={styles.img}
            />
          </View>
          <View style={styles.body25}>
            <Pressable style={styles.body25} onPress={() => Retired()}>
              <Image
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Out/Retired.jpg`,
                }}
                resizeMode="stretch"
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.body100, { flexDirection: "row" }]}>
          <Pressable style={styles.body25} onPress={() => Hit_TheBallTwisce()}>
            <Text style={styles.Titletxt}>Hit The Ball Twisce</Text>
          </Pressable>
          <Pressable style={styles.body25} onPress={() => Obstr_The_Field()}>
            <Text style={styles.Titletxt}>Obstr.the Field</Text>
          </Pressable>
          <View style={styles.body25}>
            <Text style={[styles.Titletxt]}>Time Out</Text>
          </View>
          <Pressable style={styles.body25} onPress={() => Retired()}>
            <Text style={styles.Titletxt}>Retired</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default MatchOut

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    margin: 10,
  },
  body100: {
    width: "100%",

  },
  body25: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 90,
    width: 90,
  },
  Titletxt: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  modalcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalbutton: {
    borderRadius: 20,
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
    backgroundColor: Color.PrimaryColor,
  },
  CancelBtn: {
    borderRadius: 20,
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
    backgroundColor: "white",
    elevation: 3,
  },
  ModalBox: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,

  },
  ModalTitle: {
    color: Color.PrimaryColor,
    fontSize: 18,
    fontWeight: "500",
  },
});