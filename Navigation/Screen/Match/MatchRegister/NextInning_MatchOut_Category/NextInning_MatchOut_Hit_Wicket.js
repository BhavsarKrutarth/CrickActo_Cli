import Checkbox from 'expo-checkbox';
import { useNavigation, useRoute } from '@react-navigation/native';
import React,{ useState,useEffect} from 'react'
import {View,Text,StyleSheet,Image, Pressable,Alert,Modal} from 'react-native';
import Color from '../../../../../Color/Color';
import scoketservices from '../../../../../scoket/scoketservices';



const NextInning_MatchOut_Hit_Wicket = () => {
    

    const navigation = useNavigation();
    const route = useRoute();
    const [StreakeName, setStreakeName] = useState("Striker");
    const [TeamABowlerid,setTeamABowlerid] = useState(null);
    const [TeamABowlerName,setTeamABowlerName] = useState(null);
    const [Matchid,setMatchid] = useState(null);
    const [Oper,setOper] = useState(null);
    const [TeamBid,setTeamBid] = useState(null);
    const [TeamBName,setTeamBName] = useState(null);
    const [Bowlerid,setBowlerid] = useState(null);
    const [BowlerName,setBowlerName] = useState(null);
    const [BowlerPlayerid,setBowlerPlayerid] = useState(null);
    const [BowlingSide,setBowlingSide] = useState(null);
    const [StickerPlayerid,setStickerPlayerid] = useState(null);
    const [Runnerid,setRunnerid] = useState(null);
    const [RunnerName,setRunnerName] = useState(null);
    const [RunnerPlayerid,setRunnerPlayerid] = useState(null);
    const [Bowle,setBowle] = useState(null);
    const [BowleOver,setBowleOver] = useState(null);
    const [BowleCount,setBowleCount] = useState(null);
    const [BowlerWiseBallCount,setBowlerWiseBallCount] = useState(null);
    const [TotalOver,setTotalOver] = useState(null);
    const [Run,setRun] = useState(null);
    const [FourS,setFourS] = useState(null);
    const [SixS,setSixS] = useState(null);
    const [Type,setType] = useState(null);
    const [WideBallRun,setWideBallRun] = useState(null);
    const [NoBallRun,setNoBallRun] = useState(null);
    const [NoBallchecked,setNoBallchecked] = useState(null);
    const [OutBatterid,setOutBatterid] = useState(null);
    const [OutBatterType,setOutBatterType] = useState(null);
    const [OutByBowlerid,setOutByBowlerid] = useState(null);
    const [OutByBowlerName,setOutByBowlerName] = useState(null);
    const [Description,setDescription] = useState(null);
    const [MatchInningid,setMatchInningid] = useState(null);
    const [MatchTeamBid_undo,setMatchTeamBid_undo] = useState(null);
    const [TeamBBatterid,setTeamBBatterid] = useState(null);
    const [TeamBBatterName,setTeamBBatterName] = useState(null);
    const [Stickerid,setStickerid] = useState(null);
    const [StickerName,setStickerName] = useState(null);
    

    const [MatchTeamBPlayerid,setMatchTeamBPlayerid] = useState(null);
    const [FielderName,setFielderName] = useState("Fielder");
    const [FielderImg,setFielderImg] = useState(`/FielderBGRemove.png`);
    const [FielderPlayerid,setFielderPlayerid] = useState(null);
    
    const [PosstionFlag,setPosstionFlag] = useState(null);
    const [FlagBatterType,setFlagBatterType] = useState(null);
    const [hitcheck,sethitcheck] = useState(false);
    const [NextInningModal,setNextInningModal] = useState(false);

    React.useEffect(() => {
        
        console.log("Navigation/Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Hit_Wicket.js");
        
        //console.log(route.params?.StreakeName + "|| StreakeName")
        if (route.params?.FlagBatterType) setFlagBatterType(route.params?.FlagBatterType);
        if (route.params?.PosstionFlag) setPosstionFlag(route.params?.PosstionFlag);
        if (route.params?.StreakeName) setStreakeName(route.params?.StreakeName);
        if (route.params?.Matchid) setMatchid(route.params?.Matchid); 
        if (route.params?.TeamABowlerid) setTeamABowlerid(route.params?.TeamABowlerid); 
        if (route.params?.TeamABowlerName) setTeamABowlerName(route.params?.TeamABowlerName);
        if (route.params?.MatchTeamBPlayerid) setMatchTeamBPlayerid(route.params?.MatchTeamBPlayerid);
        if (route.params?.Oper) setOper(route.params?.Oper);
        if (route.params?.TeamBid) setTeamBid(route.params?.TeamBid);
        if (route.params?.TeamBName) setTeamBName(route.params?.TeamBName);
        if (route.params?.Bowlerid) setBowlerid(route.params?.Bowlerid);
        if (route.params?.BowlerName) setBowlerName(route.params?.BowlerName);
        if (route.params?.BowlerPlayerid) setBowlerPlayerid(route.params?.BowlerPlayerid);
        if (route.params?.BowlingSide) setBowlingSide(route.params?.BowlingSide);
        if (route.params?.StickerPlayerid) setStickerPlayerid(route.params?.StickerPlayerid);
        if (route.params?.Runnerid) setRunnerid(route.params?.Runnerid);
        if (route.params?.RunnerName) setRunnerName(route.params?.RunnerName);
        if (route.params?.RunnerPlayerid) setRunnerPlayerid(route.params?.RunnerPlayerid);
        if (route.params?.Bowle) setBowle(route.params?.Bowle);
        if (route.params?.BowleOver) setBowleOver(route.params?.BowleOver);
        if (route.params?.BowleCount) setBowleCount(route.params?.BowleCount);
        if (route.params?.BowlerWiseBallCount) setBowlerWiseBallCount(route.params?.BowlerWiseBallCount);
        if (route.params?.TotalOver) setTotalOver(route.params?.TotalOver);
        if (route.params?.Run) setRun(route.params?.Run);
        if (route.params?.FourS) setFourS(route.params?.FourS);
        if (route.params?.SixS) setSixS(route.params?.SixS);
        if (route.params?.Type) setType(route.params?.Type);
        if (route.params?.WideBallRun) setWideBallRun(route.params?.WideBallRun);
        if (route.params?.NoBallRun) setNoBallRun(route.params?.NoBallRun);
        if (route.params?.NoBallchecked) setNoBallchecked(route.params?.NoBallchecked);
        if (route.params?.OutBatterid) setOutBatterid(route.params?.OutBatterid);
        if (route.params?.OutBatterType) setOutBatterType(route.params?.OutBatterType);
        if (route.params?.OutByBowlerid) setOutByBowlerid(route.params?.OutByBowlerid);
        if (route.params?.OutByBowlerName) setOutByBowlerName(route.params?.OutByBowlerName);
        if (route.params?.Description) setDescription(route.params?.Description);
        if (route.params?.MatchInningid) setMatchInningid(route.params?.MatchInningid);
        if (route.params?.MatchTeamBid_undo) setMatchTeamBid_undo(route.params?.MatchTeamBid_undo);
        if (route.params?.TeamBBatterid) setTeamBBatterid(route.params?.TeamBBatterid);
        
        if (route.params?.TeamBBatterName) setTeamBBatterName(route.params?.TeamBBatterName);
        if (route.params?.Stickerid) setStickerid(route.params?.Stickerid);
        if (route.params?.StickerName) setStickerName(route.params?.StickerName);

        if (route.params?.FielderName) {
            setFielderName(route.params?.FielderName)
        };
        if (route.params?.FielderImg) setFielderImg(route.params?.FielderImg);
        if (route.params?.FielderPlayerid) setFielderPlayerid(route.params?.FielderPlayerid);  
    });
    const NextInning = () => {
      navigation.navigate("MyMatch",{
        LoadRef:"True"
      })
    
    } 
    const BtnNext = async () =>
    {
      var data = {
        OPER: "add",
        MATCHID: Matchid,
        WAGONWEEL:"",
        SHORTTYPE:"",
        MOBILENO: global.MobileNo,
        TEAMBID: TeamBBatterid,
        TEAMBNAME: TeamBBatterName,
        BOWLERID: Bowlerid,
        BOWLERNAME: BowlerName,
        BOWLERPLAYERID: BowlerPlayerid,
        BOWLINGSIDE: BowlingSide,
        STREAKERID:Stickerid,
        STREAKENAME:StickerName,
        STICKERPLAYERID:StickerPlayerid,
        RUNNERID:Runnerid,
        RUNNERNAME:RunnerName,
        RUNNERPLAYERID:RunnerPlayerid,
        BOWLE: Bowle || 0,
        BOWLEOVER: BowleOver || 0,
        BOWLECOUNT:BowleCount || 0,
        BOWLERWISEBALLCOUNT: BowlerWiseBallCount || 0,
        TOTALOVER: TotalOver,
        
        FOURS: 0,
        SIXS: 0,
        TYPE: "Out",
        
        NOBALLRUN: 0,
        NOBALLCHECKED: "",
        OUTBATTERID: Stickerid,
        OUTBATTERTYPE: "Hit_Wicket",
        OUTBYBOWLERID: Bowlerid,
        OUTBYBOWLERNAME: BowlerName,
        DESCRIPTION: "",
        MATCHINNINGID:MatchInningid,
        MATCHTEAMBID_UNDO:MatchTeamBid_undo
        ,FLAGBATTERTYPE:FlagBatterType == Color.PrimaryColor ? "Sticker" : "Runner"
      }
      if(hitcheck)
      {
        data.OUTDELIVERYTYPE = 'WideBall'
        data.WIDEBALLRUN= 1
        data.RUN= 1
      }
      else 
      {
        data.WIDEBALLRUN= 0
        data.RUN= 0
      }
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            Spname:"MATCHTEAMB_API_CRUD"
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
              
              var List = BindData.SERVICERESPONSE;
              if(List.NEXTINNING == "true")
              {
                setNextInningModal(false)
                setNextInningModal(true)
              }
              else 
              {
                navigation.navigate('NextInning_MatchNextBatterTeamB',{
                  PageName:"Select Next Batter"
                  // ,Stickerid:id
                  // ,StreakeName:Name
                  // ,StickerImg:Img
                  // ,StickerPlayerid:Playerid
                  ,Ball: List.BOWLE
                  ,BowleCount : List.BOWLECOUNT
                  ,BowleOver: List.BOWLEOVER
                  ,BowlerWiseBallCount: List.BOWLERWISEBALLCOUNT
                  ,BowlerOut:List.BOWLEROUT
                  ,BowlerRun:List.BOWLERRUN
                  ,RunDisplay : List.NEXTOVER == 'true' ? " " : List.BOWLERRUNDISPLAY
                  ,NextOver: List.NEXTOVER
                  ,NextInning: List.NEXTINNING
                  ,Out : List.OUT
                  ,Run:List.RUN
                  ,Non_Stickerid:Stickerid+","+Runnerid
                  ,Matchid:Matchid
                  ,MatchInningid:MatchInningid,
                  MatchTeamBid_undo:List.MATCHTEAMBID_UNDO
                  ,PosstionFlag:PosstionFlag
                  ,FlagBatterType:FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white"
                  ,ModalStickerSelect:"false"
                });
              }
            }
    
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    return(
        <View style={[styles.container]}>
            <Modal animationType="slide" transparent={true} visible={NextInningModal}>
            <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
              <View style={styles.modalcenteredView}>
                <View style={styles.modalView}>
                  <View style={[styles.body100,{justifyContent:"center",alignItems:"center"}]}>
                    {/* <Text style={[styles.ModalTitle]}>Over Complete</Text> */}
                    <Image
                      source={{
                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/DWarning.jpg`,
                      }}
                      resizeMode="stretch"
                      style={styles.img}
                    />
                    <Text style={{fontSize:16}}>Inning completed</Text>
                  </View>

                  <View style={[styles.modalText, { marginTop: 20 }]}>
                      <Pressable
                        style={styles.modalbutton}
                        onPress={() => NextInning()}
                      >
                        <Text style={{ color: "white", fontWeight: "600" }}>
                          Yes,I'M Sure
                        </Text>
                      </Pressable>
                      <View style={{marginTop:10}}>
                      
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </Modal>
            <View style={styles.StrickerWrapper}>
                <Text style={styles.myText} >Striker</Text>
                <Image
                    source={{
                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile.png`,
                    }}
                    resizeMode="stretch"
                    style={styles.img}
                /> 
                <Text style={styles.StrickerTitle}>{StickerName}</Text>
            </View>
            <View style={styles.ChkWrapper}>
              <Checkbox
                value={hitcheck}
                onValueChange={sethitcheck}
                style={styles.checkbox}
                color={hitcheck ? '#4630EB' : undefined}
              />
              <Text style={styles.StrickerTitle}>Wide Ball</Text>
            </View>
            <View>
              <View
                style={[{  marginTop : 10}]}
              >
                <Pressable
                  style={{
                    borderRadius: 20,
                    elevation: 2,
                    padding: 12,
                    alignItems: "center",
                    color: "green",
                    backgroundColor: Color.PrimaryColor,
                  }}
                  onPress={() => BtnNext()}
                >
                  <Text style={styles.footerText}>Done</Text>
                </Pressable>
              </View>
            </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 90,
        width: 90,
      },
    container: { 
        flex: 1,
    },
    myText:{
        fontSize:18,
        color:Color.PrimaryColor,
        fontWeights :900,marginBottom:10
    },
    StrickerWrapper:{
        marginHorizontal:10,
        marginTop:15,
        flex: 0.3,
        backgroundColor: Color.sliverColor,
        borderWidth: 2,
        borderRadius: 20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:'40%'
    },
    StrickerTitle:{
        marginLeft:10,
        margintop:10
    },
    footerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
      },
    ChkWrapper:{
     marginTop:10,
     marginLeft:10,
     display: "flex",
      flexDirection: "row"  
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
    
})


export default NextInning_MatchOut_Hit_Wicket;