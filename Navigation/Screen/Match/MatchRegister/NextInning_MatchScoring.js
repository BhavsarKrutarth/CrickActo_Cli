import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
    Alert,
    ImageBackground,
    Modal,
    TextInput
  } from "react-native";
  
  //import basic react native components
  import { BottomSheet } from "react-native-btr";
  
  //import to show social icons
  // import { SocialIcon } from "react-native-elements";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { useRoute } from "@react-navigation/native";
  import Color from "../../../../Color/Color";
  // import { TextInput } from "react-native-gesture-handler";
  import { RadioButton } from "react-native-paper";
  // import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
  import scoketservices from "../../../../scoket/scoketservices";
  
  const NextInning_MatchScoring = () => {
    const navigation = useNavigation();
    const route = useRoute();
  
    const [isSelected, setSelection] = useState(false);
    const [NextInning,setNextInning] = useState(false);
  
    const [Matchid, setMatchid] = useState(null);
    const [TeamBBatterid, setTeamBBatterid] = useState(null);
    const [TeamABowlerid, setTeamABowlerid] = useState(null);
    const [TeamBBatterName, setTeamBBatterName] = useState(null);
    const [TeamABowlerName, setTeamABowlerName] = useState(null);

    const[TeamDescription,setTeamDescription] = useState(null);
  
    const [Stickerid, setStickerid] = useState(null);
    const [StickerName, setStickerName] = useState("Striker");
    const [StickerImg, setStickerImg] = useState(
      "/CricbuddyAdmin/Content/assets/Batter.png"
    );
    const [StickerRun, setStickerRun] = useState(0);
    const [StickerBall, setStickerBall] = useState(0);
    const [StickerColor, setStickerColor] = useState(Color.PrimaryColor_Org);
    const [StickerPlayerid, setStickerPlayerid] = useState(0);
    
  
    const [Non_Stickerid, setNon_Stickerid] = useState(null);
    const [Non_StickerName, setNon_StickerName] = useState("Non-Striker");
    const [Non_StickerImg, setNon_StickerImg] = useState(
      "/CricbuddyAdmin/Content/assets/Non_Striker.png"
    );
    const [Non_StickerRun, setNon_StickerRun] = useState(0);
    const [Non_StickerBall, setNon_StickerBall] = useState(0);
    const [Non_StickerColor, setNon_StickerColor] = useState("white");
    const [Non_StickerPlayerid, setNon_StickerPlayerid] = useState(0);
  
    const [Bowlerid, setBowlerid] = useState(null);
    const [BowlerName, setBowlerName] = useState("Bowler");
    const [BowlerImg, setBowlerImg] = useState(
      "/CricbuddyAdmin/Content/assets/Bowler.png"
    );
    const [BowleOver, setBowleOver] = useState(0);
    const [BowlerPlayerid, setBowlerPlayerid] = useState(0);
    const [BowleCount, setBowleCount] = useState(0);
    const [BowlerWiseBallCount, setBowlerWiseBallCount] = useState(0);
    const [Maidon_Count, setMaidon_Count] = useState(0);
  
    const [maidan, setmaidan] = useState(0);
    const [BowlerRun, setBowlerRun] = useState(0);
    const [BowlerOut, setBowlerOut] = useState(0);
  
    const [Run, setRun] = useState(0);
    const [Out, setOut] = useState(0);
    const [Ball, setBall] = useState(0);
    const [TotalOver, setTotalOver] = useState(0);
  
    const [WicketModal, setWicketModal] = useState(true);
    const [BowlingSide, setBowlingSide] = useState("stump");
    const [NextOverModal, setNextOverModal] = useState(false);
    const [RunDisplay, setRunDisplay] = useState(null);
    const [WideBallModal, setWideBallModal] = useState(false);
    const [wideBall_Default_Run, setwideBall_Default_Run] = useState(1);
    const [WideBallRun, setWideBallRun] = useState(null);
    const [WideBall, setWideBall] = useState(wideBall_Default_Run + WideBallRun);
  
    const [NoBallModal, setNoBallModal] = useState(false);
    const [NoBall_Default_Run, setNoBall_Default_Run] = useState(1);
    const [NoBallRun, setNoBallRun] = useState(null);
    const [NoBall, setNoBall] = useState(NoBall_Default_Run + NoBallRun);
    const [NoBallchecked, setNoBallchecked] = useState(null);
    const [NoBallTypeVisible, setNoBallTypeVisible] = useState(false);
  
    const [ByeBallModal,setByeBallModal] = useState(false);
    const [ByeBallSelect,setByeBallSelect] = useState(null);
    const [ByeBall,setByeBall] = useState(0);
  
    const [LegByeBallModal,setLegByeBallModal] = useState(false);
    const [LegByeBallSelect,setLegByeBallSelect] = useState(null);
    const [LegByeBall,setLegByeBall] = useState(0);
  
    const [RunningScoredModal,setRunningScoredModal] = useState(false);
    const [RunningScored,setRunningScored] = useState(0)
  
    const [MatchInningid,setMatchInningid] = useState(null);
    const [MatchTeamBid_undo,setMatchTeamBid_undo] = useState(null);
  
    const [ModalStickerSelect,setModalStickerSelect] = useState(false);
    const [ModalStickerSelectStyle,setModalStickerSelectStyle] = useState(null);
  
    const ModalStickerSelectSave = async () => {
      
      if(ModalStickerSelectStyle == 'Non_Striker')
      {
        setStickerColor("white");
        setNon_StickerColor(Color.PrimaryColor_Org);
      }
      else
      {
        setStickerColor(Color.PrimaryColor_Org);
        setNon_StickerColor("white");
      }
      var data = {
        OPER: "ModalStickerSelectSave",
        MATCHID: Matchid,
        MOBILENO: global.MobileNo,
        MATCHINNINGID:MatchInningid,
        STREAKENAME:ModalStickerSelectStyle != "Non_Striker" ? StickerName : Non_StickerName
      }
      var url = `${global.domainName}/cricbuddyAPI/api/Commonsp`
      const resposneJSON = await fetch(
        `${url}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName:"MATCHINNING_API_CRUD"
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
            setModalStickerSelect(!ModalStickerSelect)
            setModalStickerSelect(false)
            setModalStickerSelectStyle(null);
           
          }
          return json;
        })
        .catch(error => {
          console.error('Error:', error);
        });
     
  
  
      
    }
    
    const RunningScored_Calculate = async (WagonWeel, ShortType) => {
      
      if(RunningScored != 0)
      {
        if (StickerColor == "white") {
          setNon_StickerBall(Non_StickerBall + 1);
        } else {
          setStickerBall(StickerBall + 1);
        }
        setRun(parseInt(Run) + parseInt(RunningScored));
        setRunDisplay(
          RunDisplay != null
            ? RunDisplay + " - " + RunningScored 
            : RunningScored
        );
        setRunningScoredModal(false);
  
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/CommonSp`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              SpName:"MATCHTEAMB_API_CRUD",
            },
            body: JSON.stringify({
              OPER: "add",
              SpName:"MATCHTEAMB_API_CRUD",
              MATCHID: Matchid,
              WAGONWEEL: WagonWeel ? WagonWeel : "",
              SHORTTYPE: ShortType ? ShortType : "",
              MOBILENO: global.MobileNo,
              TEAMBID: TeamBBatterid,
              TEAMBNAME: TeamBBatterName,
              BOWLERID: Bowlerid,
              BOWLERNAME: BowlerName,
              BOWLERPLAYERID: BowlerPlayerid,
              BOWLINGSIDE: BowlingSide,
              STREAKERID:
              StickerColor == Color.PrimaryColor_Org ? Stickerid : Non_Stickerid,
              STREAKENAME:
                StickerColor == Color.PrimaryColor_Org ? StickerName : Non_StickerName,
              STICKERPLAYERID:
                StickerColor == Color.PrimaryColor_Org
                  ? StickerPlayerid
                  : Non_StickerPlayerid,
              RUNNERID:
                Non_StickerColor != Color.PrimaryColor_Org ? Non_Stickerid : Stickerid,
              RUNNERNAME:
                Non_StickerColor != Color.PrimaryColor_Org
                  ? Non_StickerName
                  : StickerName,
              RUNNERPLAYERID:
                Non_StickerColor != Color.PrimaryColor_Org
                  ? Non_StickerPlayerid
                  : StickerPlayerid,
              BOWLE: Ball,
              BOWLEOVER: BowleOver,
              BOWLECOUNT: BowleCount,
              BOWLERWISEBALLCOUNT: BowlerWiseBallCount,
              TOTALOVER: TotalOver,
              RUN: RunningScored,
              FOURS: 0,
              SIXS: 0,
              TYPE: "RunningScored",
              WIDEBALLRUN: 0,
              NOBALLRUN: 0,
              NOBALLCHECKED: "",
              OUTBATTERID: "",
              OUTBATTERTYPE: "",
              OUTBYBOWLERID: "",
              OUTBYBOWLERNAME: "",
              DESCRIPTION: "",
              MATCHINNINGID:MatchInningid,
              MATCHTEAMBID_UNDO:MatchTeamBid_undo,
              FLAGBATTERTYPE:StickerColor == Color.PrimaryColor_Org ? "Sticker" : "Runner"
            }),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            /*-------------------- Page Call -----------------------*/
            var BindData = JSON.parse(json);
            
            if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
              if(Matchid)
              {
                scoketservices.emit("SendMessage",Matchid)
              }
              if(BindData.SERVICERESPONSE.NEXTINNING == 'true')
              {
                setNextInning(false);
                setNextInning(true);
              }
              setTeamDescription(BindData.SERVICERESPONSE.TEAMDESCRIPTION);
              setMatchTeamBid_undo(BindData.SERVICERESPONSE.MATCHTEAMBID_UNDO);
              setBall(BindData.SERVICERESPONSE.BOWLE);
              setBowleCount(BindData.SERVICERESPONSE.BOWLECOUNT);
              setBowleOver(BindData.SERVICERESPONSE.BOWLEOVER);
              setBowlerWiseBallCount(BindData.SERVICERESPONSE.BOWLERWISEBALLCOUNT);
              setNextOverModal(false);
              setNextOverModal(
                BindData.SERVICERESPONSE.NEXTOVER == "true" ? true : false
              );
              
             if (BindData.SERVICERESPONSE.NEXTOVER == "true") {
                setRunDisplay(null);
              }
              
              setRunningScored(0)
              setBowlerRun(parseInt(BowlerRun) + parseInt(RunningScored));
              if (RunningScored % 2 != 0) {
                if (StickerColor != "white") {
                  setStickerColor("white");
                  setNon_StickerColor(Color.PrimaryColor_Org);
                  setStickerRun(parseInt(StickerRun) + parseInt(RunningScored));
                  setStickerBall(parseInt(StickerBall) + 1);
                  
                } else {
                  setStickerColor(Color.PrimaryColor_Org);
                  setNon_StickerColor("white");
                  setNon_StickerRun(parseInt(Non_StickerRun) + parseInt(RunningScored));
                  setNon_StickerBall(parseInt(Non_StickerBall) + 1);
                }
              }
              else 
              {
                if (StickerColor != "white") {
                  setStickerRun(parseInt(StickerRun) + parseInt(RunningScored));
                  setStickerBall(parseInt(StickerBall) + 1);
                  
                } else {
                  setNon_StickerRun(parseInt(Non_StickerRun) + parseInt(RunningScored));
                  setNon_StickerBall(parseInt(Non_StickerBall) + 1);
                }
              }
              
            }
            return json;
          });
      }
      else
      {
        Alert.alert("Warning", "By Leg Ball should always > 0.", [
          { text: "OK" },
        ]);
        return
      }
    }
  
    const LegByeBall_Calculate = async () => {
      if(LegByeBall != 0)
      {
        if (StickerColor == "white") {
          setNon_StickerBall(+Non_StickerBall + 1);
        } else {
          setStickerBall(+StickerBall + 1);
        }
        setRun(parseInt(Run) + parseInt(LegByeBall));
        setRunDisplay(
          RunDisplay != null
            ? RunDisplay + " - " + LegByeBall + "(LB)"
            : LegByeBall + "(LB)"
        );
        setLegByeBallModal(false);
  
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/CommonSp`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              SpName:"MATCHTEAMB_API_CRUD",
            },
            body: JSON.stringify({
              OPER: "add",
              SPNAME:"MATCHTEAMB_API_CRUD",
              MATCHID: Matchid,
              WAGONWEEL: "",
              SHORTTYPE: "",
              MOBILENO: global.MobileNo,
              TEAMBID: TeamBBatterid,
              TEAMBNAME: TeamBBatterName,
              BOWLERID: Bowlerid,
              BOWLERNAME: BowlerName,
              BOWLERPLAYERID: BowlerPlayerid,
              BOWLINGSIDE: BowlingSide,
              STREAKERID:
              StickerColor == Color.PrimaryColor_Org ? Stickerid : Non_Stickerid,
              STREAKENAME:
                StickerColor == Color.PrimaryColor_Org ? StickerName : Non_StickerName,
              STICKERPLAYERID:
                StickerColor == Color.PrimaryColor_Org
                  ? StickerPlayerid
                  : Non_StickerPlayerid,
              RUNNERID:
                Non_StickerColor != Color.PrimaryColor_Org ? Non_Stickerid : Stickerid,
              RUNNERNAME:
                Non_StickerColor != Color.PrimaryColor_Org
                  ? Non_StickerName
                  : StickerName,
              RUNNERPLAYERID:
                Non_StickerColor != Color.PrimaryColor_Org
                  ? Non_StickerPlayerid
                  : StickerPlayerid,
              BOWLE: Ball,
              BOWLEOVER: BowleOver,
              BOWLECOUNT: BowleCount,
              BOWLERWISEBALLCOUNT: BowlerWiseBallCount,
              TOTALOVER: TotalOver,
              RUN: LegByeBall,
              FOURS: 0,
              SIXS: 0,
              TYPE: "LegByeBall",
              WIDEBALLRUN: 0,
              NOBALLRUN: 0,
              NOBALLCHECKED: "",
              OUTBATTERID: "",
              OUTBATTERTYPE: "",
              OUTBYBOWLERID: "",
              OUTBYBOWLERNAME: "",
              DESCRIPTION: "",
              MATCHINNINGID:MatchInningid,
              MATCHTEAMBID_UNDO:MatchTeamBid_undo,
              FLAGBATTERTYPE:StickerColor == Color.PrimaryColor_Org ? "Sticker" : "Runner"
            }),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            /*-------------------- Page Call -----------------------*/
            var BindData = JSON.parse(json);
    
            if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
              if(Matchid)
              {
                scoketservices.emit("SendMessage",Matchid)
              }
              if(BindData.SERVICERESPONSE.NEXTINNING == 'true')
              {
                setNextInning(false);
                setNextInning(true);
              }

              setMatchTeamBid_undo(BindData.SERVICERESPONSE.MATCHTEAMBID_UNDO);
              setBall(BindData.SERVICERESPONSE.BOWLE);
              setBowleCount(BindData.SERVICERESPONSE.BOWLECOUNT);
              setBowleOver(BindData.SERVICERESPONSE.BOWLEOVER);
              setBowlerWiseBallCount(BindData.SERVICERESPONSE.BOWLERWISEBALLCOUNT);
              setNextOverModal(false);
              setNextOverModal(
                BindData.SERVICERESPONSE.NEXTOVER == "true" ? true : false
              );
              
              if (BindData.SERVICERESPONSE.NEXTOVER == "true") {
                setRunDisplay(null);
              }
  
              setLegByeBallSelect(null)
              setBowlerRun(parseInt(BowlerRun) + parseInt(LegByeBall));
              // if (LegByeBall % 2 != 0) {
              //   if (StickerColor != "white") {
              //     setStickerColor("white");
              //     setNon_StickerColor(Color.PrimaryColor_Org);
              //   } else {
              //     setStickerColor(Color.PrimaryColor_Org);
              //     setNon_StickerColor("white");
              //   }
              // }
              if (LegByeBall % 2 != 0) {
                if(BindData.SERVICERESPONSE.BOWLECOUNT = 6)
                {
                  if (StickerColor == "white") {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  } else {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  }
                } 
                else 
                {
                  if (StickerColor != "white") {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  } else {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  }
                  
                }
              }
              else{
                if(BindData.SERVICERESPONSE.BOWLECOUNT = 6)
                {
                  console.log("if")
                  if (StickerColor == "white") {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  } else {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  }
                } 
                else 
                {
                  console.log("else");
                  if (StickerColor != "white") {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  } else {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  }
                  
                }
              }
              
            }
            return json;
          });
      }
      else
      {
        Alert.alert("Warning", "By Leg Ball should always > 0.", [
          { text: "OK" },
        ]);
        return
      }
    }
    const ByeBall_Calculate = async () => {
      if(ByeBall != 0)
      {
        if (StickerColor == "white") {
          setNon_StickerBall(+Non_StickerBall + 1);
        } else {
          setStickerBall(+StickerBall + 1);
        }
        setRun(parseInt(Run) + parseInt(ByeBall));
        setRunDisplay(
          RunDisplay != null
            ? RunDisplay + " - " + ByeBall + "(BYE)"
            : ByeBall + "(BYE)"
        );
        setByeBallModal(false);
  
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/CommonSp`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              SpName:"MATCHTEAMB_API_CRUD"
            },
            body: JSON.stringify({
              OPER: "add",
              SPNAME:"MATCHTEAMB_API_CRUD",
              MATCHID: Matchid,
              WAGONWEEL: "",
              SHORTTYPE: "",
              MOBILENO: global.MobileNo,
              TEAMBID: TeamBBatterid,
              TEAMBNAME: TeamBBatterName,
              BOWLERID: Bowlerid,
              BOWLERNAME: BowlerName,
              BOWLERPLAYERID: BowlerPlayerid,
              BOWLINGSIDE: BowlingSide,
              STREAKERID:
              StickerColor == Color.PrimaryColor_Org ? Stickerid : Non_Stickerid,
              STREAKENAME:
              StickerColor == Color.PrimaryColor_Org ? StickerName : Non_StickerName,
              STICKERPLAYERID:
              StickerColor == Color.PrimaryColor_Org
                ? StickerPlayerid
                : Non_StickerPlayerid,
              RUNNERID:
              Non_StickerColor != Color.PrimaryColor_Org ? Non_Stickerid : Stickerid,
              RUNNERNAME:
              Non_StickerColor != Color.PrimaryColor_Org
                ? Non_StickerName
                : StickerName,
              RUNNERPLAYERID:
              Non_StickerColor != Color.PrimaryColor_Org
                ? Non_StickerPlayerid
                : StickerPlayerid,
              BOWLE: Ball,
              BOWLEOVER: BowleOver,
              BOWLECOUNT: BowleCount,
              BOWLERWISEBALLCOUNT: BowlerWiseBallCount,
              TOTALOVER: TotalOver,
              RUN: ByeBall,
              FOURS: 0,
              SIXS: 0,
              TYPE: "ByeBall",
              WIDEBALLRUN: 0,
              NOBALLRUN: 0,
              NOBALLCHECKED: "",
              OUTBATTERID: "",
              OUTBATTERTYPE: "",
              OUTBYBOWLERID: "",
              OUTBYBOWLERNAME: "",
              DESCRIPTION: "",
              MATCHINNINGID:MatchInningid,
              MATCHTEAMBID_UNDO:MatchTeamBid_undo,
              FLAGBATTERTYPE:StickerColor == Color.PrimaryColor_Org ? "Sticker" : "Runner"
            }),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            /*-------------------- Page Call -----------------------*/
            var BindData = JSON.parse(json);
    
            if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
              if(Matchid)
              {
                scoketservices.emit("SendMessage",Matchid)
              }

              if(BindData.SERVICERESPONSE.NEXTINNING == 'true')
              {
                setNextInning(false);
                setNextInning(true);
              }

              setMatchTeamBid_undo(BindData.SERVICERESPONSE.MATCHTEAMBID_UNDO);
              setBall(BindData.SERVICERESPONSE.BOWLE);
              setBowleCount(BindData.SERVICERESPONSE.BOWLECOUNT);
              setBowleOver(BindData.SERVICERESPONSE.BOWLEOVER);
              setBowlerWiseBallCount(BindData.SERVICERESPONSE.BOWLERWISEBALLCOUNT);
              setNextOverModal(false);
              setNextOverModal(
                BindData.SERVICERESPONSE.NEXTOVER == "true" ? true : false
              );
              
              if (BindData.SERVICERESPONSE.NEXTOVER == "true") {
                setRunDisplay(null);
              }
  
              setByeBallSelect(null)
              setBowlerRun(parseInt(BowlerRun) + parseInt(ByeBall));
              // if (ByeBall % 2 != 0) {
              //   if (StickerColor != "white") {
              //     setStickerColor("white");
              //     setNon_StickerColor(Color.PrimaryColor_Org);
              //   } else {
              //     setStickerColor(Color.PrimaryColor_Org);
              //     setNon_StickerColor("white");
              //   }
              // }
              if (ByeBall % 2 != 0) {
                if(BindData.SERVICERESPONSE.BOWLECOUNT = 6)
                {
                  if (StickerColor == "white") {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  } else {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  }
                } 
                else 
                {
                  if (StickerColor != "white") {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  } else {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  }
                  
                }
              }
              else{
                if(BindData.SERVICERESPONSE.BOWLECOUNT = 6)
                {
                  console.log("if")
                  if (StickerColor == "white") {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  } else {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  }
                } 
                else 
                {
                  if (StickerColor != "white") {
                    setStickerColor("white");
                    setNon_StickerColor(Color.PrimaryColor_Org);
                  } else {
                    setStickerColor(Color.PrimaryColor_Org);
                    setNon_StickerColor("white");
                  }
                  
                }
              }
            }
            return json;
          });
      }
      else
      {
        Alert.alert("Warning", "By Ball should always > 0.", [
          { text: "OK" },
        ]);
        return
      }
    }
  
    const NoBall_Calculate = async (WagonWeel, ShortType) => {
      if (StickerColor == "white") {
        setNon_StickerBall(+Non_StickerBall + 1);
      } else {
        setStickerBall(+StickerBall + 1);
      }
      if (NoBallTypeVisible == true) {
        if (NoBallchecked == null) {
          Alert.alert("Warning", "Please select Bye,Leg Bye,From Bat option.", [
            { text: "OK" },
          ]);
          return
        }
        
      }
      setRun(+Run + +NoBall);
      setRunDisplay(
        RunDisplay != null
          ? RunDisplay + " - " + (NoBallRun == null ? '' : NoBallRun) + "(NB)"
          : (NoBallRun == null ? '' : NoBallRun) + "(NB)"
      );
      setNoBallModal(false);
  
      var data = {
        OPER: "add",
        SPNAME:"MATCHTEAMB_API_CRUD",
        MATCHID: Matchid,
        WAGONWEEL: NoBallRun > 0 ? (WagonWeel ? WagonWeel : "" ): "",
        SHORTTYPE: NoBallRun > 0 ? (ShortType ? ShortType : "") : "",
        MOBILENO: global.MobileNo,
        TEAMBID: TeamBBatterid,
        TEAMBNAME: TeamBBatterName,
        BOWLERID: Bowlerid,
        BOWLERNAME: BowlerName,
        BOWLERPLAYERID: BowlerPlayerid,
        BOWLINGSIDE: BowlingSide,
        STREAKERID:
          StickerColor == Color.PrimaryColor_Org ? Stickerid : Non_Stickerid,
        STREAKENAME:
          StickerColor == Color.PrimaryColor_Org ? StickerName : Non_StickerName,
        STICKERPLAYERID:
          StickerColor == Color.PrimaryColor_Org
            ? StickerPlayerid
            : Non_StickerPlayerid,
        RUNNERID:
          Non_StickerColor != Color.PrimaryColor_Org ? Non_Stickerid : Stickerid,
        RUNNERNAME:
          Non_StickerColor != Color.PrimaryColor_Org
            ? Non_StickerName
            : StickerName,
        RUNNERPLAYERID:
          Non_StickerColor != Color.PrimaryColor_Org
            ? Non_StickerPlayerid
            : StickerPlayerid,
        BOWLE: Ball,
        BOWLEOVER: BowleOver,
        BOWLECOUNT: 0,
        BOWLERWISEBALLCOUNT: BowlerWiseBallCount,
        TOTALOVER: TotalOver,
        RUN: NoBall,
        FOURS: 0,
        SIXS: 0,
        TYPE: "NoBall",
        WIDEBALLRUN: 0,
        NOBALLRUN: NoBallRun,
        NOBALLCHECKED: NoBallchecked,
        OUTBATTERID: "",
        OUTBATTERTYPE: "",
        OUTBYBOWLERID: "",
        OUTBYBOWLERNAME: "",
        DESCRIPTION: "",
        MATCHINNINGID:MatchInningid,
        MATCHTEAMBID_UNDO:MatchTeamBid_undo,
        FLAGBATTERTYPE:StickerColor == Color.PrimaryColor_Org ? "Sticker" : "Runner"
      }
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName:"MATCHTEAMB_API_CRUD"
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
  
          if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
            if(Matchid)
            {
              scoketservices.emit("SendMessage",Matchid)
            }
            /*------------------------ Clear Wagon params --------------------*/
            route.params.FunctionName = null;
            route.params.FunctionRun = null;
            route.params.WagonWeel = null;
            route.params.ShortType = null;
            /*------------------------ Clear Wagon params --------------------*/
            if(BindData.SERVICERESPONSE.NEXTINNING == 'true')
            {
              setNextInning(false);
              setNextInning(true);
            }

            setMatchTeamBid_undo(BindData.SERVICERESPONSE.MATCHTEAMBID_UNDO);
            setBowlerRun(parseInt(BowlerRun) + NoBall);
            if (NoBallRun % 2 != 0) {
              if (StickerColor != "white") {
                setStickerColor("white");
                setNon_StickerColor(Color.PrimaryColor_Org);
              } else {
                setStickerColor(Color.PrimaryColor_Org);
                setNon_StickerColor("white");
              }
            }
            setNoBallchecked(null);
            setNoBallTypeVisible(false);
            setNoBallRun(0);
            setNoBall(1);
          }
          return json;
        });
    };
  
    const WideBall_Calculate = async () => {
      
      setRun(+Run + +WideBall);
      setRunDisplay(
        RunDisplay != null
          ? RunDisplay + " - " + WideBall + "(WD)"
          : RunDisplay + "(WD)"
      );
      var data = {
        OPER: "add",
        SPNAME:"MATCHTEAMB_API_CRUD",
        MATCHID: Matchid,
        WAGONWEEL: "",
        SHORTTYPE: "",
        MOBILENO: global.MobileNo,
        TEAMBID: TeamBBatterid,
        TEAMBNAME: TeamBBatterName,
        BOWLERID: Bowlerid,
        BOWLERNAME: BowlerName,
        BOWLERPLAYERID: BowlerPlayerid,
        BOWLINGSIDE: BowlingSide,
        STREAKERID:
        StickerColor == Color.PrimaryColor_Org ? Stickerid : Non_Stickerid,
        STREAKENAME:
          StickerColor == Color.PrimaryColor_Org ? StickerName : Non_StickerName,
        STICKERPLAYERID:
          StickerColor == Color.PrimaryColor_Org
            ? StickerPlayerid
            : Non_StickerPlayerid,
        RUNNERID:
          Non_StickerColor != Color.PrimaryColor_Org ? Non_Stickerid : Stickerid,
        RUNNERNAME:
          Non_StickerColor != Color.PrimaryColor_Org
            ? Non_StickerName
            : StickerName,
        RUNNERPLAYERID:
          Non_StickerColor != Color.PrimaryColor_Org
            ? Non_StickerPlayerid
            : StickerPlayerid,
        BOWLE: Ball,
        BOWLEOVER: BowleOver,
        BOWLECOUNT: 0,
        BOWLERWISEBALLCOUNT: BowlerWiseBallCount,
        TOTALOVER: TotalOver,
        RUN: WideBall,
        FOURS: 0,
        SIXS: 0,
        TYPE: "WideBall",
        WIDEBALLRUN: WideBallRun,
        NOBALLRUN: 0,
        NOBALLCHECKED: "",
        OUTBATTERID: "",
        OUTBATTERTYPE: "",
        OUTBYBOWLERID: "",
        OUTBYBOWLERNAME: "",
        DESCRIPTION: "",
        MATCHINNINGID:MatchInningid,
        MATCHTEAMBID_UNDO:MatchTeamBid_undo,
        FLAGBATTERTYPE:StickerColor == Color.PrimaryColor_Org ? "Sticker" : "Runner"
      }
      const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/CommonSp`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              SpName:"MATCHTEAMB_API_CRUD"
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => response.json())
          .then((json) => {
       //     /*-------------------- Page Call -----------------------*/
            var BindData = JSON.parse(json);
  
            if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {

              if(BindData.SERVICERESPONSE.NEXTINNING == 'true')
              {
                setNextInning(false);
                setNextInning(true);
              }
              
              setMatchTeamBid_undo(BindData.SERVICERESPONSE.MATCHTEAMBID_UNDO);
              if (WideBallRun % 2 != 0) {
                if (StickerColor != "white") {
                  setStickerColor("white");
                  setNon_StickerColor(Color.PrimaryColor_Org);
                } else {
                  setStickerColor(Color.PrimaryColor_Org);
                  setNon_StickerColor("white");
                }
              }
              
              setBowlerRun(parseInt(BowlerRun) + WideBall);
              setwideBall_Default_Run(1);
              setWideBallRun(null);
              setWideBall(1);
              setWideBallModal(false);
              setRunDisplay(
                RunDisplay != null
                  ? RunDisplay + " - " + (WideBallRun == null ? '' : WideBallRun) + " (WD)"
                  : + (WideBallRun == null ? '' : WideBallRun) + " (WD)"
              );
              if(Matchid)
              {
                scoketservices.emit("SendMessage",Matchid)
              }
            }
            
            return json;
          });
    };
  
    const MyMatch = async (Matchid) => {
      try {
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/Match/`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              MobileNo: global.MobileNo,
              Matchid: Matchid,
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
                if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                  if (List.NoOfOver) setTotalOver(List.NoOfOver);
                }
              }
            } else {
              alert("Error: internal server error");
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
    React.useEffect(() => {
      console.log("Navigation/Screen/Match/MatchRegister/NextInning_MatchScoring.js");
  

      if (route.params?.WagonWeel) {
        var TempRun = route.params?.FunctionRun ? route.params?.FunctionRun : 0
        RedirectToFunction(route.params?.FunctionName, TempRun, route.params?.WagonWeel, route.params?.ShortType)
      }
      if(route.params?.TeamDescription)
        setTeamDescription(route.params?.TeamDescription)


      if (route.params?.NextOverModal == 'true') 
      {
        
        setNextOverModal(false);
        setNextOverModal(true);
        
      }
      
  
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault(); // Prevent default action
        unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
        navigation.navigate('MyMatch') // Navigate to your desired screen
      });
  
      if (route.params?.MatchInningid) setMatchInningid(route.params?.MatchInningid);
      if (route.params?.MatchTeamBid_undo) setMatchTeamBid_undo(route.params?.MatchTeamBid_undo);
      
      if (route.params?.Bowlerid) setBowlerid(route.params?.Bowlerid);
      if (route.params?.RunDisplay) 
      {
        setRunDisplay(route.params?.RunDisplay);
      }
      if (route.params?.RunDisplay == " ") {
        setRunDisplay(null);
      }
      
      if (route.params?.BowlerName) setBowlerName(route.params?.BowlerName);
      if (route.params?.BowlerImg) setBowlerImg(route.params?.BowlerImg);
  
      if (route.params?.Non_Stickerid)
        setNon_Stickerid(route.params?.Non_Stickerid);
  
      if (route.params?.Non_StickerName)
        setNon_StickerName(route.params?.Non_StickerName);
  
      if (route.params?.Non_StickerImg)
        setNon_StickerImg(route.params?.Non_StickerImg);
  
      if (route.params?.Stickerid) setStickerid(route.params?.Stickerid);
  
      if (route.params?.StickerName) setStickerName(route.params?.StickerName);
  
      if (route.params?.StickerImg) setStickerImg(route.params?.StickerImg);
  
      if (route.params?.Matchid) {
        setMatchid(route.params?.Matchid);
        MyMatch(route.params?.Matchid);
      }
  
      if (route.params?.TeamBBatterid) {
        setTeamBBatterid(route.params?.TeamBBatterid);
      }
  
      if (route.params?.TeamABowlerid) {
        setTeamABowlerid(route.params?.TeamABowlerid);
      }
  
      if (route.params?.TeamBBatterName) {
        setTeamBBatterName(route.params?.TeamBBatterName);
      }
  
      if (route.params?.TeamABowlerName) {
        setTeamABowlerName(route.params?.TeamABowlerName);
      }
      if (route.params?.BowlerPlayerid)
        setBowlerPlayerid(route.params?.BowlerPlayerid);
  
      // if (route.params.StickerPlayerid)
      // {
      //   setStickerPlayerid(route.params?.StickerPlayerid);
      // }
      if (route.params?.StickerPlayerid)
      setStickerPlayerid(route.params?.StickerPlayerid);
      
      if (route.params?.Non_StickerPlayerid) {
        setNon_StickerPlayerid(route.params?.Non_StickerPlayerid);
      }
      if (route.params?.BowlerWiseBallCount) {
        setBowlerWiseBallCount(route.params?.BowlerWiseBallCount);
      }
      if (route.params?.Maidon_Count) {
        setmaidan(route.params?.Maidon_Count);
      }
      if (route.params?.BowlerWiseRun) {
        setBowlerRun(route.params?.BowlerWiseRun);
      }
  
      if (route.params?.WicketModal) {
        setWicketModal(true);
      }
      
      if (route.params?.StickerRun) {
        setStickerRun(route.params?.StickerRun);
      }
      else if (route.params?.StickerRun == 0)
      {
        setStickerRun(route.params?.StickerRun);
      }
  
      if (route.params?.StickerBall) {
        setStickerBall(route.params?.StickerBall);
      }
      else if(route.params?.StickerBall == 0)
      {
        setStickerBall(route.params?.StickerBall);
      }
      if (route.params?.Non_StickerRun) {
        setNon_StickerRun(route.params?.Non_StickerRun);
      }
      else if (route.params?.Non_StickerRun == 0) {
        setNon_StickerRun(route.params?.Non_StickerRun);
      }
  
      if (route.params?.Non_StickerBall) {
        setNon_StickerBall(route.params?.Non_StickerBall);
      }
      else if (route.params?.Non_StickerBall == 0) {
        setNon_StickerBall(route.params?.Non_StickerBall);
      }
  
      if (route.params?.Ball) {
        setBall(route.params?.Ball);
      }
      if (route.params?.BowleCount) {
        setBowleCount(route.params?.BowleCount);
      }
      if (route.params?.BowleOver) {
        setBowleOver(route.params?.BowleOver);
      }
      if (route.params?.BowlerWiseBallCount) {
        setBowlerWiseBallCount(route.params?.BowlerWiseBallCount);
      }
  
      if (route.params?.BowlerOut) setBowlerOut(route.params?.BowlerOut);
  
      if (route.params?.Out) setOut(route.params?.Out);
  
      if (route.params?.ModalStickerSelect == 'true') {
        setModalStickerSelect(false);
        setModalStickerSelect(true);
      }
      else 
      {
        setModalStickerSelect(false);
      }
      if (route.params?.Run) setRun(route.params?.Run);

      function onBeforeRemove(event) {
        event.preventDefault(); //prevented nav from going back
  
        // alert("test")
        navigation.navigate("MyMatch", {
          LoadRef:true
        });
  
      }
      navigation.addListener('beforeRemove', onBeforeRemove); // listener added
      return function cleanup() {
        navigation.removeListener('beforeRemove', onBeforeRemove) // clean up 
      };
    }, [route.params]);
  
    const RedirectToFunction = async (FunctionName, FunctionRun, WagonWeel, ShortType) => {
      if (FunctionName == "CalculateSocring") {
        CalculateSocring(FunctionRun, WagonWeel, ShortType)
      }
      else if (FunctionName == "RunningScored_Calculate") {
        RunningScored_Calculate(WagonWeel, ShortType)
      }
      else if (FunctionName == 'NoBall_Calculate')
      {
        NoBall_Calculate(WagonWeel, ShortType)
      }
    };
  
    const CalculateUndo = async () => {
      // console.log(MatchTeamBid_undo + " || MatchTeamBid_undo")
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            "SpName":"UNDOCALCULATETEAMB_API_CRUD"
          },
          body: JSON.stringify({
            Oper: "UNDO",
            SpName:"UNDOCALCULATETEAMB_API_CRUD",
            Matchid: Matchid,
            MatchInningid:MatchInningid,
            MatchTeamBid_undo:MatchTeamBid_undo || 0
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var BindData = JSON.parse(json);
          if(BindData.SERVICERESPONSE.RESPONSECODE == 0)
          {
              if(Matchid)
              {
                scoketservices.emit("SendMessage",Matchid)
              }
              // console.log(BindData.SERVICERESPONSE.TYPE + " Type")
              // console.log(BindData.SERVICERESPONSE.OLD_STREAKENAME + '')
              // console.log(BindData.SERVICERESPONSE.CALCULATE_RUN + ' CALCULATE_RUN')
              var data = BindData.SERVICERESPONSE;
              setRun(data.RUN);
              setOut(data.OUT);
              setBall(data.BALL);
              setTotalOver(data.TOTALOVER);
              setTeamBBatterName(data.TEAMBBATTERNAME);
              setStickerid(data.STREAKERID);
              setStickerPlayerid(data.STICKERPLAYERID)
              setStickerName(data.STREAKENAME)
              setStickerRun(data.STICKERRUN);
              setStickerBall(data.STICKERBALL);
              setNon_StickerPlayerid(data.RUNNERPLAYERID);
              setNon_Stickerid(data.RUNNERID);
              setNon_StickerName(data.RUNNERNAME);
              setNon_StickerBall(data.RUNNERBALL);
              setNon_StickerRun(data.RUNNERRUN);
              setBowlerPlayerid(data.BOWLERPLAYERID);
              setBowlerid(data.BOWLERID);
              setBowlerName(data.BOWLERNAME);
              setBowlingSide(data.BOWLINGSIDE);
              setBowlerWiseBallCount(data.BOWLERWISEBALLCOUNT);
              setmaidan(data.BOWLERMAIDAN);
              setBowlerRun(data.BOWLERRUN);
              setBowlerOut(data.BOWLEROUT);
              setRunDisplay(data.BOWLERRUNDISPLAY);
              setStickerColor(data.STICKERCOLOR);
              setNon_StickerColor(data.NON_STICKERCOLOR);
              setBowleCount(data.BOWLECOUNT);
              setBowleOver(data.BOWLEOVER);
              setMatchTeamBid_undo(data.MATCHTEAMBID_UNDO);
              setTeamDescription(data.TEAMDESCRIPTION);
          }
          return json;
        });
      // .catch((error) => {
      //   console.error(error);
      // });
    };
  
    const CalculateSocring = async (OneBallRun,WagonWeel,ShortType) => {
      setRunDisplay(
        RunDisplay != null ? RunDisplay + " - " + OneBallRun : OneBallRun
      );
      var FourS = 0,
        SixS = 0;
  
      if (OneBallRun == 4) {
        FourS = 1;
      }
  
      if (OneBallRun == 6) {
        SixS = 1;
      }
      setBowlerRun(parseInt(BowlerRun) + OneBallRun);
      setRun(+Run + +OneBallRun);
  
      if (OneBallRun != 1 || OneBallRun != 3) {
        if (StickerColor != "white") {
          setStickerRun(+StickerRun + OneBallRun);
          setStickerBall(+StickerBall + 1);
        } else {
          setNon_StickerRun(+Non_StickerRun + OneBallRun);
          setNon_StickerBall(+Non_StickerBall + 1);
        }
      }
      var data = {
        OPER: "add",
        SPNAME:"MATCHTEAMB_API_CRUD",
        MATCHID: Matchid,
        WAGONWEEL: WagonWeel ? WagonWeel : "",
        SHORTTYPE: ShortType ? ShortType : "",
        MOBILENO: global.MobileNo,
        TEAMBID: TeamBBatterid,
        TEAMBNAME: TeamBBatterName,
        BOWLERID: Bowlerid,
        BOWLERNAME: BowlerName,
        BOWLERPLAYERID: BowlerPlayerid,
        BOWLINGSIDE: BowlingSide,
        STREAKERID:
          StickerColor == Color.PrimaryColor_Org ? Stickerid : Non_Stickerid,
        STREAKENAME:
          StickerColor == Color.PrimaryColor_Org ? StickerName : Non_StickerName,
        STICKERPLAYERID:
          StickerColor == Color.PrimaryColor_Org
            ? StickerPlayerid
            : Non_StickerPlayerid,
        RUNNERID:
          Non_StickerColor != Color.PrimaryColor_Org ? Non_Stickerid : Stickerid,
        RUNNERNAME:
          Non_StickerColor != Color.PrimaryColor_Org
            ? Non_StickerName
            : StickerName,
        RUNNERPLAYERID:
          Non_StickerColor != Color.PrimaryColor_Org
            ? Non_StickerPlayerid
            : StickerPlayerid,
        BOWLE: Ball,
        BOWLEOVER: BowleOver,
        BOWLECOUNT: BowleCount,
        BOWLERWISEBALLCOUNT: BowlerWiseBallCount,
        TOTALOVER: TotalOver,
        RUN: OneBallRun,
        FOURS: FourS,
        SIXS: SixS,
        TYPE: "Main",
        WIDEBALLRUN: 0,
        NOBALLRUN: 0,
        NOBALLCHECKED: "",
        OUTBATTERID: "",
        OUTBATTERTYPE: "",
        OUTBYBOWLERID: "",
        OUTBYBOWLERNAME: "",
        DESCRIPTION: "",
        MATCHINNINGID:MatchInningid,
        MATCHTEAMBID_UNDO:MatchTeamBid_undo,
        FLAGBATTERTYPE:StickerColor == Color.PrimaryColor_Org ? "Sticker" : "Runner"
      }
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName:"MATCHTEAMB_API_CRUD"
          },
          body: JSON.stringify(data),
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
            if(BindData.SERVICERESPONSE.NEXTINNING == 'true')
            {
              setNextInning(false);
              setNextInning(true);
            }
            setTeamDescription(BindData.SERVICERESPONSE.TEAMDESCRIPTION);
            setMatchTeamBid_undo(BindData.SERVICERESPONSE.MATCHTEAMBID_UNDO);
            setBall(BindData.SERVICERESPONSE.BOWLE);
            setBowleCount(BindData.SERVICERESPONSE.BOWLECOUNT);
            setBowleOver(BindData.SERVICERESPONSE.BOWLEOVER);
            setBowlerWiseBallCount(BindData.SERVICERESPONSE.BOWLERWISEBALLCOUNT);
            setNextOverModal(false);
            setNextOverModal(
              BindData.SERVICERESPONSE.NEXTOVER == "true" ? true : false
            );
  
            if (OneBallRun != 1 && OneBallRun != 3) {
              if (BindData.SERVICERESPONSE.NEXTOVER == "true") {
                if (StickerColor != "white") {
                  setStickerColor("white");
                  setNon_StickerColor(Color.PrimaryColor_Org);
                } else {
                  setStickerColor(Color.PrimaryColor_Org);
                  setNon_StickerColor("white");
                }
              }
            }
  
            if (BindData.SERVICERESPONSE.NEXTOVER == "true") {
              setRunDisplay(null);
            }
            if (BowleCount != 5) {
              if (OneBallRun == 1 || OneBallRun == 3) {
                if (StickerColor == "white") {
                  setStickerColor(Color.PrimaryColor_Org);
                  setNon_StickerColor("white");
                  setNon_StickerRun(+Non_StickerRun + OneBallRun);
                  setNon_StickerBall(+Non_StickerBall + 1);
                } else {
                  setStickerColor("white");
                  setNon_StickerColor(Color.PrimaryColor_Org);
                  setStickerRun(+StickerRun + OneBallRun);
                  setStickerBall(+StickerBall + 1);
                }
              }
            }

            if(Matchid)
            {
              scoketservices.emit("SendMessage",Matchid)
            }
          }
          return json;
        });
      // .catch((error) => {
      //   console.error(error);
      // });
    };
  
    return (
      <View style={styles.Container}>
        {NextInning == true ? (
          <View style={[styles.modalcenteredView, { position: "absolute" }]}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={NextInning}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setNextInning(!NextInning);
              }}
            >
              <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
                <View style={styles.modalcenteredView}>
                  <View style={styles.modalView}>
                    <View style={styles.body100}>
                      <Text style={[styles.ModalTitle]}>Inning completed</Text>
                    </View>
  
                    <View
                      style={[
                        styles.modalText,
                        {
                          marginTop: 20,
                        },
                      ]}
                    >
                      <Pressable
                        style={styles.modalbutton}
                        onPress={() =>
                          navigation.navigate("MyMatch",{
                            LoadRef:"True"
                          })
                        }
                      >
                        <Text style={{ color: "white", fontWeight: "600" }}>
                          Done !
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        ) : null}

        {NextOverModal == true ? (
          <View style={[styles.modalcenteredView, { position: "absolute" }]}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={NextOverModal}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setWicketModal(!WicketModal);
              }}
            >
              <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
                <View style={styles.modalcenteredView}>
                  <View style={styles.modalView}>
                    <View style={styles.body100}>
                      <Text style={[styles.ModalTitle]}>Over Complete</Text>
                    </View>
  
                    <View
                      style={[
                        styles.modalText,
                        {
                          marginTop: 20,
                        },
                      ]}
                    >
                      <Pressable
                        style={styles.modalbutton}
                        onPress={() =>
                          navigation.navigate("NextInning_MatchNextOver", {
                            PageName: "Select Bowler",
                            Matchid: Matchid,
                            Where_nq_Bowlerid: Bowlerid,
                            BowleOver: BowleOver,
                            MatchInningid: MatchInningid,
                          })  
                        }
                      >
                        <Text style={{ color: "white", fontWeight: "600" }}>
                          Start Next Over
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        ) : null}
        {/* Wide Ball */}
        {WideBallModal == true ? (
          <View style={styles.bottomNavigationcontainer}>
            <BottomSheet 
            visible={WideBallModal}
            >
              {/*Bottom Sheet inner View*/}
              <View style={styles.bottomNavigationView}>
                <View style={styles.bottomNavigationTitle}>
                  <Text style={styles.bottomNavigationTxt}>Wide Ball</Text>
                </View>
                <View style={[styles.bottomNavigationBody]}>
                  <View>
                    <Text style={{ padding: 10, fontSize: 18,color:Color.FontColor }}>WD</Text>
                  </View>
                  <View>
                    <Text style={styles.bottomNavigationInput}>
                      {wideBall_Default_Run}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        marginHorizontal: 10,
                        color: Color.FontColor,
                      }}
                    >
                      +
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      maxLength={2}
                      keyboardType="number-pad"
                      style={styles.bottomNavigationInput1}
                      onChangeText={(newText) => {
                        // console.log(newText);
                        setWideBallRun(newText);
                        setWideBall(
                          parseInt(newText != "" ? newText : 0) +
                            parseInt(wideBall_Default_Run)
                        );
                      }}
                      value={WideBallRun}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        marginHorizontal: 10,
                        color: Color.FontColor,
                      }}
                    >
                      =
                    </Text>
                  </View>
                  <View>
                    <Text style={{ padding: 10, fontSize: 18,color:Color.FontColor }}>{WideBall}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.body100, { flexDirection: "row" }]}>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      setwideBall_Default_Run(1);
                      setWideBallRun(null);
                      setWideBall(1);
                      setWideBallModal(false);
                    }}
                    style={{ padding: 10, backgroundColor: Color.borderColor }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color:Color.FontColor
                      }}
                    >
                      CANCEL
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      WideBall_Calculate();
                    }}
                    style={{ padding: 10, backgroundColor: Color.PrimaryColor_Org }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      OK
                    </Text>
                  </Pressable>
                </View>
              </View>
            </BottomSheet>
          </View>
        ) : null}
        {/* Wide Ball */}
  
        {/* No Ball */}
        {NoBallModal == true ? (
          <View style={styles.bottomNavigationcontainer}>
            <BottomSheet visible={NoBallModal}>
              {/*Bottom Sheet inner View*/}
              <View style={styles.bottomNavigationView}>
                <View style={styles.bottomNavigationTitle}>
                  <Text style={styles.bottomNavigationTxt}>No Ball</Text>
                </View>
                <View style={[styles.bottomNavigationBody]}>
                  <View>
                    <Text style={{ padding: 10, fontSize: 18,color:Color.FontColor }}>NB</Text>
                  </View>
                  <View>
                    <Text style={styles.bottomNavigationInput}>
                      {NoBall_Default_Run}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        marginHorizontal: 10,
                        color: Color.FontColor,
                      }}
                    >
                      +
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      maxLength={2}
                      keyboardType="number-pad"
                      style={styles.bottomNavigationInput1}
                      onChangeText={(newText) => {
                        if (newText > 0) setNoBallTypeVisible(true);
                        setNoBallRun(newText);
                        setNoBall(
                          parseInt(newText != "" ? newText : 0) +
                            parseInt(NoBall_Default_Run)
                        );
                      }}
                      value={NoBallRun}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        marginHorizontal: 10,
                        color: Color.FontColor,
                      }}
                    >
                      =
                    </Text>
                  </View>
                  <View>
                    <Text style={{ padding: 10, fontSize: 18,color:Color.FontColor }}>{NoBall}</Text>
                  </View>
                </View>
                {NoBallTypeVisible ? (
                  <View
                    style={[
                      styles.bottomNavigationBody,
                      { justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <RadioButton
                      value="From_Bat"
                      status={
                        NoBallchecked === "From_Bat" ? "checked" : "unchecked"
                      }
                      onPress={() => setNoBallchecked("From_Bat")}
                    />
                    <Text style={{color:Color.FontColor,}}>From Bat</Text>
                    <RadioButton
                      value="Bye"
                      status={NoBallchecked === "Bye" ? "checked" : "unchecked"}
                      onPress={() => setNoBallchecked("Bye")}
                    />
                    <Text style={{color:Color.FontColor,}}>Bye</Text>
                    <RadioButton
                      value="Leg_Bye"
                      status={
                        NoBallchecked === "Leg_Bye" ? "checked" : "unchecked"
                      }
                      onPress={() => setNoBallchecked("Leg_Bye")}
                    />
                    <Text style={{color:Color.FontColor,}}>Leg Bye</Text>
                  </View>
                ) : null}
              </View>
  
              <View style={[styles.body100, { flexDirection: "row" }]}>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      setNoBallchecked(null);
                      setNoBallTypeVisible(false);
                      setNoBallRun(0);
                      setNoBall(1);
                      setNoBallModal(false);
                    }}
                    style={{ padding: 10, backgroundColor: Color.borderColor }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color:Color.FontColor
                      }}
                    >
                      CANCEL
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      if (NoBall > 1 && NoBallchecked == "From_Bat" ) {
                      
                        if (NoBallchecked == null) {
                          Alert.alert("Warning", "Please select Bye,Leg Bye,From Bat option.", [
                            { text: "OK" },
                          ]);
                          return
                        }
  
                        navigation.navigate("WagonWeel", {
                          Matchid: Matchid
                          , FunctionName: "NoBall_Calculate"
                          , FunctionRun: NoBall
                          , RedirectPage: "NextInning_MatchScoring"
                          , PageName: StickerName
                        })
                      }
                      else {
                        NoBall_Calculate();
                      }
                      // NoBall_Calculate();
                    }}
                    style={{ padding: 10, backgroundColor: Color.PrimaryColor_Org }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      OK
                    </Text>
                  </Pressable>
                </View>
              </View>
            </BottomSheet>
          </View>
        ) : null}
        {/* No Ball */}
  
        {/* BYE RUNS */}
        {ByeBallModal == true ? (
          <View style={styles.bottomNavigationcontainer}>
            <BottomSheet visible={ByeBallModal}>
              {/*Bottom Sheet inner View*/}
              <View style={styles.bottomNavigationView}>
                <View
                  style={[
                    styles.body100,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 20, fontWeight: "600",color:Color.FontColor }}>
                    Bye Ball
                  </Text>
                </View>
                <View
                  style={[
                    styles.body100,
                    {
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    },
                  ]}
                >
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          ByeBallSelect == 1 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setByeBall(1);
                      setByeBallSelect(1);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>1</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          ByeBallSelect == 2 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setByeBall(2);
                      setByeBallSelect(2);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>2</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          ByeBallSelect == 3 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setByeBall(3);
                      setByeBallSelect(3);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>3</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          ByeBallSelect == 4 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setByeBall(4);
                      setByeBallSelect(4);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>4</Text>
                  </Pressable>
                  <Pressable
                    style={
                      ByeBallSelect == "plus"
                        ? styles.ByeBoxSelectplue
                        : styles.ByeBoxPlus
                    }
                    onPress={() => {
                      setByeBall(0);
                      setByeBallSelect("plus");
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>+</Text>
                  </Pressable>
                  {ByeBallSelect == "plus" ? (
                    <TextInput
                      style={[styles.ByeBox, { padding: 10,color:Color.FontColor }]}
                      values={ByeBall}
                      onChangeText={(text) => setByeBall(text)}
                      keyboardType="numeric"
                    />
                  ) : null}
                </View>
              </View>
  
              <View style={[styles.body100, { flexDirection: "row" }]}>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      setByeBallSelect(null);
                      setByeBallModal(false);
                      setByeBall(0);
                    }}
                    style={{ padding: 10, backgroundColor: Color.borderColor }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color:Color.FontColor
                      }}
                    >
                      CANCEL
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      ByeBall_Calculate();
                    }}
                    style={{ padding: 10, backgroundColor: Color.PrimaryColor_Org }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      OK
                    </Text>
                  </Pressable>
                </View>
              </View>
            </BottomSheet>
          </View>
        ) : null}
        {/* BYE RUNS */}
  
        {/* LEG BYE RUNS */}
        {LegByeBallModal == true ? (
          <View style={styles.bottomNavigationcontainer}>
            <BottomSheet visible={LegByeBallModal}>
              {/*Bottom Sheet inner View*/}
              <View style={styles.bottomNavigationView}>
                <View
                  style={[
                    styles.body100,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 20, fontWeight: "600",color:Color.FontColor }}>
                    {" "}
                    Leg Bye Ball
                  </Text>
                </View>
                <View
                  style={[
                    styles.body100,
                    {
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    },
                  ]}
                >
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          LegByeBallSelect == 1 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setLegByeBall(1);
                      setLegByeBallSelect(1);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>1</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          LegByeBallSelect == 2 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setLegByeBall(2);
                      setLegByeBallSelect(2);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>2</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          LegByeBallSelect == 3 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setLegByeBall(3);
                      setLegByeBallSelect(3);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>3</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.ByeBox,
                      {
                        backgroundColor:
                          LegByeBallSelect == 4 ? Color.PrimaryColor_Org : "white",
                      },
                    ]}
                    onPress={() => {
                      setLegByeBall(4);
                      setLegByeBallSelect(4);
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>4</Text>
                  </Pressable>
                  <Pressable
                    style={
                      LegByeBallSelect == "plus"
                        ? styles.ByeBoxSelectplue
                        : styles.ByeBoxPlus
                    }
                    onPress={() => {
                      setLegByeBall(0);
                      setLegByeBallSelect("plus");
                    }}
                  >
                    <Text style={{color:Color.FontColor}}>+</Text>
                  </Pressable>
                  {LegByeBallSelect == "plus" ? (
                    <TextInput
                      style={[styles.ByeBox, { padding: 10,color:Color.FontColor }]}
                      values={LegByeBall}
                      onChangeText={(text) => setLegByeBall(text)}
                      keyboardType="numeric"
                    />
                  ) : null}
                </View>
              </View>
  
              <View style={[styles.body100, { flexDirection: "row" }]}>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      setLegByeBallSelect(null);
                      setLegByeBallModal(false);
                      setLegByeBall(0);
                    }}
                    style={{ padding: 10, backgroundColor: Color.borderColor }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color:Color.FontColor
                      }}
                    >
                      CANCEL
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.body50}>
                  <Pressable
                    onPress={() => {
                      LegByeBall_Calculate();
                    }}
                    style={{ padding: 10, backgroundColor: Color.PrimaryColor_Org }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      OK
                    </Text>
                  </Pressable>
                </View>
              </View>
            </BottomSheet>
          </View>
        ) : null}
        {/* LEG BYE RUNS */}
  
        {/* 5,7 RUNS */}
        {RunningScoredModal == true ?
        (<View style={styles.bottomNavigationcontainer}>
          <BottomSheet visible={RunningScoredModal}>
            {/*Bottom Sheet inner View*/}
            <View style={styles.bottomNavigationView}>
              <View
                style={[
                  styles.body100,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  },
                ]}
              >
                <Text style={{ fontSize: 20, fontWeight: "600",color:Color.FontColor }}>
                  {" "}
                  Run Scored by running
                </Text>
              </View>
              <View
                style={[
                  styles.body100,
                  {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  },
                ]}
              >
                <TextInput
                  style={[
                    styles.ByeBox,
                    { paddingHorizontal: 30, paddingVertical: 10,color:Color.FontColor },
                  ]}
                  values={LegByeBall}
                  onChangeText={(text) => setRunningScored(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
  
            <View style={[styles.body100, { flexDirection: "row" }]}>
              <View style={styles.body50}>
                <Pressable
                  onPress={() => {
                    setRunningScored(0);
                    setRunningScoredModal(false);
                  }}
                  style={{ padding: 10, backgroundColor: Color.borderColor }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color:Color.FontColor
                    }}
                  >
                    CANCEL
                  </Text>
                </Pressable>
              </View>
              <View style={styles.body50}>
                <Pressable
                  onPress={() => {
                    navigation.navigate("WagonWeel", {
                      Matchid: Matchid
                      , FunctionName: "RunningScored_Calculate"
                      , FunctionRun: RunningScored
                      , RedirectPage: "NextInning_MatchScoring"
                      , PageName: StickerName
                    })
                    //RunningScored_Calculate();
                  }}
                  style={{ padding: 10, backgroundColor: Color.PrimaryColor_Org }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    OK
                  </Text>
                </Pressable>
              </View>
            </View>
          </BottomSheet>
        </View>
        ):null}
        {/* 5,7 RUNS */}
        {WicketModal == true ?
        (<View style={[styles.modalcenteredView, { position: "absolute" }]}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={WicketModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setWicketModal(!WicketModal);
            }}
          >
            <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
              <View style={styles.modalcenteredView}>
                <View style={styles.modalView}>
                  <View style={styles.body100}>
                    <Text style={[styles.ModalTitle]}>Select Bowling Side!</Text>
                  </View>
                  <View
                    style={[
                      styles.body100,
                      {
                        flexDirection: "row",
                        marginTop: 20,
                      },
                    ]}
                  >
                    <Pressable
                      onPress={() => {
                        setBowlingSide("stump Round");
                        setWicketModal(!WicketModal);
                      }}
                      style={styles.ModalBox}
                    >
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/stump_Round1.png`,
                        }}
                        style={{ height: 60, width: 60 }}
                      />
                      <Text style={{ fontSize: 10 }}>Round the wicket</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setBowlingSide("stump Between");
                        setWicketModal(!WicketModal);
                      }}
                      style={styles.ModalBox}
                    >
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/stump_Between1.png`,
                        }}
                        style={{ height: 60, width: 60 }}
                      />
                      <Text style={{ fontSize: 10 }}>Betweenthe wicket</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setBowlingSide("stump Over");
                        setWicketModal(!WicketModal);
                      }}
                      style={styles.ModalBox}
                    >
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/stump_Over1.png`,
                        }}
                        style={{ height: 60, width: 60 }}
                      />
                      <Text style={{ fontSize: 10 }}>Over the wicket</Text>
                    </Pressable>
                  </View>
                  <View style={[styles.modalText, { marginTop: 20 }]}>
                    <Pressable
                      onPress={() => {
                        setBowlingSide("stump");
                        setWicketModal(!WicketModal);
                      }}
                      style={styles.modalbutton}
                    >
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        CANCEL
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        ):null}
        {/* --------------------------Main Degin Start Here------------------------------ */}
        <View style={{ width: "100%", height: "50%" }}>
          <ImageBackground
            source={{
              uri:
                "" +
                global.domainName +
                "/CricbuddyAdmin/Content/assets/ScoringBoard.jpg",
            }}
            resizeMode="stretch"
            style={styles.image}
          >
            <View style={{ width: "100%", height: "80%" }}>
              <View style={styles.Banner}>
                <Text style={styles.BannerTitle}>
                  {Run}/{Out}{" "}
                  <Text style={styles.BannerTitleMin}>
                    ({Ball}/{TotalOver})
                  </Text>
                </Text>
                <Text style={styles.BannerSubTitle}>
                  {TeamDescription}
                </Text>
              </View>
            </View>
            <View style={styles.playerDiv}>
              <View style={styles.PlayerBox}>
                <View style={[styles.PlayerName]}>
                  <View style={styles.Playericon}>
                    <Image
                      resizeMode="center"
                      source={{
                        uri:
                          "" +
                          global.domainName +
                          "/CricbuddyAdmin/Content/assets/bat_White.png",
                      }}
                      style={styles.Playerimg}
                    />
                  </View>
                  <View style={styles.PlayerNamediv}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: StickerColor,
                      }}
                    >
                      {StickerName}
                    </Text>
                  </View>
                </View>
                <View style={styles.body100}>
                  <View style={styles.PlayerScorediv}>
                    <Text style={styles.PlayerScoreName}>
                      {StickerRun}({StickerBall})
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.body50}>
                <View style={[styles.PlayerName]}>
                  <View style={styles.Playericon}>
                    <Image
                      resizeMode="center"
                      source={{
                        uri:
                          "" +
                          global.domainName +
                          "/CricbuddyAdmin/Content/assets/bat_White.png",
                      }}
                      style={styles.Playerimg}
                    />
                  </View>
                  <View style={styles.PlayerNamediv}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: Non_StickerColor,
                      }}
                    >
                      {Non_StickerName}
                    </Text>
                  </View>
                </View>
                <View style={styles.body100}>
                  <View style={styles.PlayerScorediv}>
                    <Text style={styles.PlayerScoreName}>
                      {Non_StickerRun}({Non_StickerBall})
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ width: "100%", height: "50%" }}>
          <View style={[{ height: "30%" }, styles.Bowlerdiv]}>
            <View
              style={[
                styles.body100,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={styles.Playericon}>
                  <Image
                    resizeMode="center"
                    source={{
                      uri:
                        "" +
                        global.domainName +
                        "/CricbuddyAdmin/Content/assets/Ball_red2.png",
                    }}
                    style={styles.Playerimg}
                  />
                </View>
                <View style={styles.PlayerNamediv}>
                  <Text style={styles.PlayerNametxt}>{BowlerName}</Text>
                </View>
                <View style={{ height: 30, width: 30 }}>
                  <Pressable onPress={() => setWicketModal(true)}>
                    <Image
                      resizeMode="center"
                      source={{
                        uri:
                          "" +
                          global.domainName +
                          `/CricbuddyAdmin/Content/assets/${BowlingSide}.png`,
                      }}
                      style={styles.Playerimg}
                    />
                  </Pressable>
                </View>
              </View>
  
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "400",
                    marginRight: 10,
                  }}
                >
                  {BowlerWiseBallCount}-{maidan}-{BowlerRun}-{BowlerOut}
                </Text>
              </View>
            </View>
            <ScrollView horizontal={true} style={{ flex: 1 }}>
              <View style={styles.item}>
                <Text style={styles.itemtext}>{RunDisplay}</Text>
              </View>
            </ScrollView>
          </View>
          <View style={[{ height: "70%" }, styles.ScoreDiv]}>
            <View style={{ flexDirection: "row", height: "66%", width: "100%" }}>
              <View style={{ width: "75%", backgroundColor: "white" }}>
                <View style={[styles.body100, styles.Number]}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("WagonWeel", {
                        Matchid: Matchid
                        , FunctionName: "CalculateSocring"
                        , FunctionRun: 0
                        , RedirectPage: "NextInning_MatchScoring"
                        , PageName: StickerName
                      })
                      // CalculateSocring(0)
                    }}
                    style={styles.Numberbox_0_1}
                  >
                    <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:20}}>0</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("WagonWeel", {
                        Matchid: Matchid
                        , FunctionName: "CalculateSocring"
                        , FunctionRun: 1
                        , RedirectPage: "NextInning_MatchScoring"
                        , PageName: StickerName
                      })
                      // CalculateSocring(0)
                    }}
                    style={styles.Numberbox_0_1}
                  >
                    <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:20}}>1</Text>
                  </Pressable>
  
                  <Pressable
                    onPress={() => {
                      navigation.navigate("WagonWeel", {
                        Matchid: Matchid
                        , FunctionName: "CalculateSocring"
                        , FunctionRun: 2
                        , RedirectPage: "NextInning_MatchScoring"
                        , PageName: StickerName
                      })
                      // CalculateSocring(0)
                    }}
                    style={styles.NumberBox_2}
                  >
                    <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:20}}>2</Text>
                  </Pressable>
                </View>
                <View style={[styles.body100, styles.Numberbox_3_4_6]}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("WagonWeel", {
                        Matchid: Matchid
                        , FunctionName: "CalculateSocring"
                        , FunctionRun: 3
                        , RedirectPage: "NextInning_MatchScoring"
                        , PageName: StickerName
                      })
                      // CalculateSocring(0)
                    }}
                    style={styles.NumberBox_3_4}
                  >
                    <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:20}}>3</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("WagonWeel", {
                        Matchid: Matchid
                        , FunctionName: "CalculateSocring"
                        , FunctionRun: 4
                        , RedirectPage: "NextInning_MatchScoring"
                        , PageName: StickerName
                      })
                      // CalculateSocring(0)
                    }}
                    style={styles.NumberBox_3_4}
                  >
                    <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:20}}>4</Text>
                  </Pressable>
                  <Pressable
                   onPress={() => {
                    navigation.navigate("WagonWeel", {
                      Matchid: Matchid
                      , FunctionName: "CalculateSocring"
                      , FunctionRun: 6
                      , RedirectPage: "NextInning_MatchScoring"
                      , PageName: StickerName
                    })
                    // CalculateSocring(0)
                  }}
                    style={styles.NumberBox_6}
                  >
                    <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:20}}>6</Text>
                  </Pressable>
                </View>
              </View>
              <View style={{ width: "25%" }}>
                <Pressable
                  style={styles.UNDO}
                  onPress={() => {
                    Alert.alert('confirmation', 'Are you sure you want to undo?', [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => CalculateUndo()},
                    ]);
                  //  CalculateUndo()
                  }}
                >
                  <Text style={{ color: Color.PrimaryColor_Org, fontWeight: "900" }}>
                    UNDO
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.NumberBox_5_7}
                  onPress={() => {
                    setRunningScoredModal(false)
                    setRunningScoredModal(true)
                  }}
                >
                  <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:20}}>5,7</Text>
                </Pressable>
                <Pressable
                  style={styles.Out}
                  onPress={() => {
                    navigation.navigate("NextInning_MatchOut", {
                      PageName: "How Out ?",
                      Matchid: Matchid,
                      TeamBBatterid: TeamBBatterid,
                      TeamBBatterName: TeamBBatterName,
                      TeamABowlerid:TeamABowlerid,
                      TeamABowlerName:TeamABowlerName,
                      Bowlerid: Bowlerid,
                      BowlerName: BowlerName,
                      BowlerPlayerid: BowlerPlayerid,
                      BowlingSide: BowlingSide,
                      
                      original_Stickerid:Stickerid,
                      original_StickerName:StickerName,
                      original_StickerPlayerid:StickerPlayerid,
                      original_Non_Stickerid:Non_Stickerid,
                      original_Non_StickerName:Non_StickerName,
                      original_Non_StickerPlayerid:Non_StickerPlayerid,
  
                      Stickerid:
                        StickerColor == Color.PrimaryColor_Org
                          ? Stickerid
                          : Non_Stickerid,
                      StickerName:
                        StickerColor == Color.PrimaryColor_Org
                          ? StickerName
                          : Non_StickerName,
                      StickerPlayerid:
                        StickerColor == Color.PrimaryColor_Org
                          ? StickerPlayerid
                          : Non_StickerPlayerid,
                     
                      Runnerid:
                        Non_StickerColor != Color.PrimaryColor_Org
                          ? Non_Stickerid
                          : Stickerid,
                      RunnerName:
                        Non_StickerColor != Color.PrimaryColor_Org
                          ? Non_StickerName
                          : StickerName,
                      RunnerPlayerid:
                        Non_StickerColor != Color.PrimaryColor_Org
                          ? Non_StickerPlayerid
                          : StickerPlayerid,
                      Bowle: Ball,
                      BowleOver: BowleOver,
                      BowleCount: BowleCount,
                      BowlerWiseBallCount: BowlerWiseBallCount,
                      TotalOver: TotalOver,
                      MatchInningid: MatchInningid,
                      PosstionFlag:
                        StickerColor == Color.PrimaryColor_Org ? "Sticker" : "Runner",
                      MatchTeamBid_undo:MatchTeamBid_undo,
                      FlagBatterType:StickerColor == Color.PrimaryColor_Org ? Color.PrimaryColor_Org : "white"
                    });
                  }}
                >
                  <Text style={{ color: "red", fontWeight: "700" }}>OUT</Text>
                </Pressable>
                
              </View>
            </View>
            <View
              style={{
                height: "33%",
                flexDirection: "row",
                width: "100%",
                borderBottomWidth: 2,
                borderBottomColor: "#dedfe1",
                borderTopColor: "#dedfe1",
                borderTopWidth: 2,
              }}
            >
              <Pressable style={styles.WD} onPress={() => {
                setWideBallModal(false);
                setWideBallModal(true);
                }}>
                <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:18}}>WD</Text>
              </Pressable>
              <Pressable style={styles.WD} onPress={() => {
                setNoBallModal(false)
                setNoBallModal(true)
                }}>
                <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:18}}>NB</Text>
              </Pressable>
              <Pressable style={styles.WD} onPress={() => {
                setByeBallModal(false)
                setByeBallModal(true)
                }}>
                <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:18}}>BYE</Text>
              </Pressable>
              <Pressable
                style={styles.WD}
                onPress={() => {
                  setLegByeBallModal(false)
                  setLegByeBallModal(true)}}
              >
                <Text style={{color:Color.FontColor,fontWeight:"400",fontSize:18}}>LB</Text>
              </Pressable>
            </View>
          </View>
        </View>
      {/* --------------------------Main Degin Start Here------------------------------ */}
      {/* --------------------------Stricker Select------------------------------ */}
        <View style={[styles.modalcenteredView, { position: "absolute" }]}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={ModalStickerSelect}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setModalStickerSelect(!ModalStickerSelect);
              }}
  
            >
              <View style={{backgroundColor:"#000000AA",flex:1}}>
              <View style={styles.modalcenteredView}>
                <View style={styles.modalView}>
                  <View style={styles.body100}>
                    <View style={[styles.body100]}>
                      <Text style={styles.modaltitle}>Who is on Striker ?</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.body100,
                      { flexDirection: "row", marginTop: 10 },
                    ]}
                  >
                    <View
                      style={[
                        styles.body45,
                        ModalStickerSelectStyle === "Striker"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable onPress={() => setModalStickerSelectStyle("Striker")}>
                        <View style={[styles.body100, styles.modal_imgcenter]}>
                          <Image
                            source={{
                              uri: `${global.domainName}${StickerImg}`,
                            }}
                            style={[styles.img]}
                          />
                        </View>
                        <View style={[styles.body100, styles.modal_imgcenter]}>
                          <Text style={styles.modalsubtitle}>{StickerName} </Text>
                        </View>
                      </Pressable>
                    </View>
                    <View style={styles.body10}></View>
                    <View
                      style={[
                        styles.body45,
                        ModalStickerSelectStyle === "Non_Striker"
                          ? { borderColor: "green" }
                          : { borderColor: Color.Texttitle },
                        { borderWidth: 2, backgroundColor: "#f2f2f2" },
                      ]}
                    >
                      <Pressable onPress={() => setModalStickerSelectStyle("Non_Striker")}>
                        <View style={[styles.body100, , styles.modal_imgcenter]}>
                          <Image
                            source={{
                              uri: `${global.domainName}${Non_StickerImg}`,
                            }}
                            style={styles.img}
                          />
                        </View>
                        <View style={[styles.body100, styles.modal_imgcenter]}>
                          <Text style={styles.modalsubtitle}>{Non_StickerName}</Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        flexDirection: "row",
                        marginTop: 20,
                      },
                    ]}
                  >
                  
                    <View style={{ width: "3%" }}></View>
                    {/* <View style={{ width: "45%" }}>
                      <Pressable
                        style={[styles.modalbutton, styles.modalbuttonClose]}
                        onPress={() => {
                          // setBattingStyle(null);
                          // setmodalVisible(false);
                          setModalStickerSelect(!ModalStickerSelect);
                        }}
                      >
                        <Text style={[styles.modaltextStyle, { color: "black" }]}>
                          CANCEL
                        </Text>
                      </Pressable>
                    </View> */}
                    <View style={{ width: "5%" }}></View>
                    <View style={{ width: "90%" }}>
                      <Pressable
                        style={[styles.modalbutton, styles.modalbuttonOpen]}
                        onPress={() => ModalStickerSelectSave()}
                      >
                        <Text style={styles.modaltextStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
              </View>
            </Modal>
          </View>
        {/* --------------------------Stricker Select------------------------------ */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
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
    Banner: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    BannerTitle: {
      color: "white",
      fontSize: 24,
      fontWeight: "900",
    },
    BannerSubTitle: {
      color: "white",
      fontSize: 12,
      fontWeight: "400",
    },
    BannerTitleMin: {
      fontSize: 16,
      fontWeight: "400",
    },
    playerDiv: {
      width: "100%",
      height: "20%",
      borderTopWidth: 2,
      borderTopColor: "white",
      borderBottomWidth: 2,
      borderBottomColor: "white",
      flexDirection: "row",
    },
    PlayerBox: {
      width: "50%",
      borderRightColor: "white",
      borderRightWidth: 2,
    },
    PlayerName: {
      marginTop: 10,
      flexDirection: "row",
      width: "100%",
    },
    Playericon: {
      height: 25,
      width: 25,
      marginLeft: 10,
    },
    Playerimg: {
      height: "100%",
      width: "100%",
    },
    PlayerNamediv: {
      marginLeft: 10,
    },
    PlayerNametxt: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    PlayerScorediv: {
      marginLeft: 45,
    },
    PlayerScoreName: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    Bowlerdiv: {
      width: "100%",
  
      backgroundColor: "#2a373f",
    },
    ScoreDiv: {
      width: "100%",
    },
    Number: {
      flexDirection: "row",
      height: "50%",
      borderRightWidth: 2,
      borderRightColor: "#dedfe1",
      borderBottomColor: "#dedfe1",
      borderBottomWidth: 2,
    },
    Numberbox_0_1: {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
      borderRightColor: "#dedfe1",
      borderRightWidth: 2,
    },
    NumberBox_2: {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
    },
    Numberbox_3_4_6: {
      flexDirection: "row",
      height: "50%",
      borderRightColor: "#dedfe1",
      borderRightWidth: 2,
    },
    NumberBox_3_4: {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
      borderRightColor: "#dedfe1",
      borderRightWidth: 2,
    },
    NumberBox_6: {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
    },
    UNDO: {
      width: "100%",
      height: "33%",
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: "#dedfe1",
      borderBottomWidth: 2,
      borderTopColor: "#dedfe1",
      borderTopWidth: 2,
    },
    NumberBox_5_7: {
      width: "100%",
      height: "33%",
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: "#dedfe1",
      borderBottomWidth: 2,
    },
    Out: {
      width: "100%",
      height: "33%",
      justifyContent: "center",
      alignItems: "center",
    },
    WD: {
      width: "25%",
      justifyContent: "center",
      alignItems: "center",
      borderRightColor: "#dedfe1",
      borderRightWidth: 2,
      
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
      backgroundColor: Color.PrimaryColor_Org,
    },
    ModalBox: {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
    },
    ModalTitle: {
      color: Color.PrimaryColor_Org,
      fontSize: 18,
      fontWeight: "500",
    },
    item: {
      // marginVertical: 8,
      // marginHorizontal: 5,
      // marginLeft:15,
      // borderColor: "white",
      // borderWidth: 3,
      // borderRadius: 50,
      // height:55,
      // width:55,
      // justifyContent:"center",
      // alignItems:"center"
      marginLeft: 10,
    },
    itemtext: {
      color: "white",
      fontSize: 22,
      padding: 10,
    },
    bottomNavigationcontainer: {
      flex: 1,
      margin: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#E0F7FA",
    },
    bottomNavigationView: {
      backgroundColor: "#fff",
      width: "100%",
      height: "25%",
      // justifyContent: "center",
      // alignItems: "center",
    },
    bottomNavigationTitle: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    bottomNavigationTxt: {
      textAlign: "center",
      padding: 20,
      fontSize: 20,
      color:Color.FontColor
    },
    bottomNavigationBody: {
      width: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    },
    bottomNavigationInput: {
      borderWidth: 2,
      borderColor: Color.LightGreenBorder,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 14,
      backgroundColor: Color.PrimaryColor_Org,
    },
    bottomNavigationInput1: {
      borderWidth: 2,
      borderColor: Color.LightGreenBorder,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 14,
      backgroundColor: Color.PrimaryColor_Org,
    },
    ByeBox: {
      borderWidth: 2,
      borderColor: Color.borderColor,
      padding: 15,
      borderRadius: 5,
      fontSize: 14,
      fontWeight: "600",
      backgroundColor: "white",
      marginLeft:5
    },
    ByeBoxPlus:{
      padding: 15,
      fontSize: 24 
    },
    ByeBoxSelectplue:{
      borderWidth: 2,
      borderColor: Color.borderColor,
      padding: 15,
      borderRadius: 5,
      fontSize: 14,
      fontWeight: "600",
      backgroundColor: "white",
      marginLeft:5,
      backgroundColor:Color.PrimaryColor_Org
    },
    modaltitle: { fontSize: 20, color: Color.PrimaryColor_Org, fontWeight: "600" },
    modalsubtitle: { fontSize: 16,color:Color.FontColor },
    modalbuttonClose: {
      backgroundColor: "#f2f2f2",
    },
    body45: {
      width: "45%",
      borderColor: Color.borderColor,
      borderWidth: 3,
    },
    body10: {
      width: "10%",
    },
    modalbuttonOpen: {
      backgroundColor: "#2196F3",
    },
    modal_imgcenter: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    img: {
      height: 60,
      width: 60,
    },
    modaltextStyle:{
      color:"white"
    }
  });
  export default NextInning_MatchScoring;
  