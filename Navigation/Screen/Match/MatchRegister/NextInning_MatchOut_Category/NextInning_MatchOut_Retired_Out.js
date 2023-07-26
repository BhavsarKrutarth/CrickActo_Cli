import Checkbox from 'expo-checkbox';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Alert, Pressable,ScrollView,Modal } from 'react-native';
import Color from '../../../../../Color/Color';
import { TextInput } from 'react-native-gesture-handler';
import scoketservices from '../../../../../scoket/scoketservices';
const NextInning_MatchOut_Retired_Out = () => {


    const navigation = useNavigation();
    const route = useRoute();
    const [StreakeName, setStreakeName] = useState("Striker");
    const [TeamABowlerid, setTeamABowlerid] = useState(null);
    const [TeamABowlerName, setTeamABowlerName] = useState(null);
    const [Matchid, setMatchid] = useState(null);
    const [Oper, setOper] = useState(null);
    const [TeamBid, setTeamBid] = useState(null);
    const [TeamBName, setTeamBName] = useState(null);
    const [Bowlerid, setBowlerid] = useState(null);
    const [BowlerName, setBowlerName] = useState(null);
    const [BowlerPlayerid, setBowlerPlayerid] = useState(null);
    const [BowlingSide, setBowlingSide] = useState(null);
    const [StickerPlayerid, setStickerPlayerid] = useState(null);
    const [Runnerid, setRunnerid] = useState(null);
    const [RunnerName, setRunnerName] = useState(null);
    const [RunnerPlayerid, setRunnerPlayerid] = useState(null);
    const [Bowle, setBowle] = useState(null);
    const [BowleOver, setBowleOver] = useState(null);
    const [BowleCount, setBowleCount] = useState(null);
    const [BowlerWiseBallCount, setBowlerWiseBallCount] = useState(null);
    const [TotalOver, setTotalOver] = useState(null);
    const [Run, setRun] = useState(null);
    const [FourS, setFourS] = useState(null);
    const [SixS, setSixS] = useState(null);
    const [Type, setType] = useState(null);
    const [WideBallRun, setWideBallRun] = useState(null);
    const [NoBallRun, setNoBallRun] = useState(null);
    const [NoBallchecked, setNoBallchecked] = useState(null);
    const [OutBatterid, setOutBatterid] = useState(null);
    const [OutBatterType, setOutBatterType] = useState(null);
    const [OutByBowlerid, setOutByBowlerid] = useState(null);
    const [OutByBowlerName, setOutByBowlerName] = useState(null);
    const [Description, setDescription] = useState(null);
    const [MatchInningid, setMatchInningid] = useState(null);
    const [MatchTeamBid_undo, setMatchTeamBid_undo] = useState(null);
    const [TeamBBatterid, setTeamBBatterid] = useState(null);
    const [TeamBBatterName, setTeamBBatterName] = useState(null);
    const [Stickerid, setStickerid] = useState(null);
    const [StickerName, setStickerName] = useState(null);


    const [MatchTeamBPlayerid, setMatchTeamBPlayerid] = useState(null);
    const [FielderName, setFielderName] = useState("Fielder");
    const [FielderImg, setFielderImg] = useState(`/FielderBGRemove.png`);
    const [FielderPlayerid, setFielderPlayerid] = useState(null);
    const [btnDisplay, setbtnDisplay] = useState(false);
    const [isDirectHits, setisDirectHits] = useState(false);
    const [isChecked, setChecked] = useState(true);

    const [original_Stickerid, setoriginal_Stickerid] = useState(false);
    const [original_StickerName, setoriginal_StickerName] = useState(false);
    const [original_StickerPlayerid, setoriginal_StickerPlayerid] = useState(false);
    const [original_Non_Stickerid, setoriginal_Non_Stickerid] = useState(false);
    const [original_Non_StickerName, setoriginal_Non_StickerName] = useState(false);
    const [original_Non_StickerPlayerid, setoriginal_Non_StickerPlayerid] = useState(false);

   
    
    const [StrickerSelect,setStrickerSelect] = useState(null);
    const [DeliveryTypeSelect,setDeliveryTypeSelect] = useState(null);
    const [RunScored,setRunScored] = useState(false);
    const [RunScoredSelect,setRunScoredSelect] = useState(0);
    const [PosstionFlag,setPosstionFlag] = useState(null);
    const [FlagBatterType,setFlagBatterType] = useState(null);
    const [NextInningModal,setNextInningModal] = useState(false);

    React.useEffect(() => {
        console.log("Navigation/Screen/Match/MatchRegister/NextInning_MatchOut_Category/NextInning_MatchOut_Retired_Out.js");

        if (route.params?.FlagBatterType) setFlagBatterType(route.params?.FlagBatterType);
        if (route.params?.original_Stickerid) setoriginal_Stickerid(route.params?.original_Stickerid);
        if (route.params?.original_StickerName) setoriginal_StickerName(route.params?.original_StickerName);
        if (route.params?.original_StickerPlayerid) setoriginal_StickerPlayerid(route.params?.original_StickerPlayerid);
        if (route.params?.original_Non_Stickerid) setoriginal_Non_Stickerid(route.params?.original_Non_Stickerid);
        if (route.params?.original_Non_StickerName) setoriginal_Non_StickerName(route.params?.original_Non_StickerName);
        if (route.params?.original_Non_StickerPlayerid) setoriginal_Non_StickerPlayerid(route.params?.original_Non_StickerPlayerid);
        
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
            setbtnDisplay(true);
            setFielderName(route.params?.FielderName)
        };
        if (route.params?.FielderImg) setFielderImg(route.params?.FielderImg);
        if (route.params?.FielderPlayerid) setFielderPlayerid(route.params?.FielderPlayerid);
        if (route.params?.PosstionFlag) setPosstionFlag(route.params?.PosstionFlag);
        
    });
    const NextInning = () => {
        navigation.navigate("MyMatch",{
            LoadRef:"True"
          })
      
      } 
    const btnDone = async () => {
    
        if(StrickerSelect == null)
        {
            Alert.alert('Warning', 'Please Select dismissed Batter.', [
                {text: 'OK'},
              ]);
              return   
        }
        if (DeliveryTypeSelect == 'ByeBall' || DeliveryTypeSelect == 'LegByeBall')
         {
            if(+RunScoredSelect == 0)
            {
                Alert.alert('Warning', 'Not Selected Zero Scored in ByeBall and LegByeBall.', [
                    {text: 'OK'},
                  ]);  
                  return
            }
         }
        
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
            STREAKERID:StrickerSelect == "Sticker" ? original_Stickerid : original_Non_Stickerid,
            STREAKENAME:StrickerSelect == "Sticker" ? original_StickerName : original_Non_StickerName,
            STICKERPLAYERID:StrickerSelect == "Sticker" ? original_StickerPlayerid : original_Non_StickerPlayerid,
            RUNNERID:StrickerSelect != "Sticker" ? original_Stickerid : original_Non_Stickerid,
            RUNNERNAME:StrickerSelect != "Sticker" ? original_StickerName : original_Non_StickerName,
            RUNNERPLAYERID:StrickerSelect != "Sticker" ? original_StickerPlayerid : original_Non_StickerPlayerid,
            BOWLE: Bowle || 0,
            BOWLEOVER: BowleOver || 0,
            BOWLECOUNT:BowleCount || 0,
            BOWLERWISEBALLCOUNT: BowlerWiseBallCount || 0,
            TOTALOVER: TotalOver,
            FOURS: 0,
            SIXS: 0,
            RETIREDHURT:1,
            NOBALLCHECKED: "",
            OUTBATTERID: StrickerSelect == "Sticker" ? original_Stickerid : original_Non_Stickerid,
            OUTBATTERTYPE: "RetiredOut",
            OUTBYBOWLERID: Bowlerid,
            OUTBYBOWLERNAME: BowlerName,
            DESCRIPTION: "",
            MATCHINNINGID:MatchInningid,
            MATCHTEAMBID_UNDO:MatchTeamBid_undo,
            FLAGBATTERTYPE:StrickerSelect == "Sticker" ?  "Sticker" : "Runner"
          }
          
          if(isChecked != false)
          {
            data.RUN = 0;
            data.TYPE = "Out"
            data.WIDEBALLRUN = 0;
            data.NOBALLRUN= +0;
            data.COUNTBALL=1;
          }
          else 
          {
            
            if(DeliveryTypeSelect != null)
            {
                if(DeliveryTypeSelect == "WideBall")
                {
                    data.TYPE = "Out";
                    data.RUN =  1 + +RunScoredSelect || 0;
                    data.WIDEBALLRUN= +RunScoredSelect;
                    data.NOBALLRUN= +0;
                    data.COUNTBALL=1;
                }
                else if (DeliveryTypeSelect == "NoBall")
                {
                    data.TYPE = "Out";
                    data.RUN =  1 + +RunScoredSelect || 0;
                    data.NOBALLRUN= +RunScoredSelect;
                    data.WIDEBALLRUN= +0;
                    data.COUNTBALL=1;
                }
                else if (DeliveryTypeSelect == "ByeBall")
                {
                    data.TYPE = "Out";
                    data.RUN = +RunScoredSelect || 0;
                    data.WIDEBALLRUN= +0;
                    data.NOBALLRUN= +0;
                    data.COUNTBALL=0;
                }
                else if (DeliveryTypeSelect == "LegByeBall")
                {
                    data.TYPE = "Out";
                    data.RUN =  +RunScoredSelect || 0;
                    data.WIDEBALLRUN= +0;
                    data.NOBALLRUN= +0;
                    data.COUNTBALL=0;
                }
            }
            else{
                data.TYPE = "Out"
                data.WIDEBALLRUN = 0;
                data.COUNTBALL=0;
                if(RunScoredSelect > 0)
                {
                    data.RUN = +RunScoredSelect;
                }
                else 
                {
                    data.RUN = 0;
                }
            }
          }
          //RunScoredSelect
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
                if(Matchid)
                {
                    scoketservices.emit("SendMessage",Matchid)
                }
                 if(BindData.SERVICERESPONSE.NEXTINNING == "true")
                 {
                    setNextInningModal(false)
                    setNextInningModal(true)
                 }
                 else
                 {
                    
                   navigation.navigate("NextInning_MatchNextBatterTeamB",{
                     Non_Stickerid:original_Stickerid+","+original_Non_Stickerid,
                     Matchid:Matchid,
                     PosstionFlag:StrickerSelect == "Sticker" ? "Sticker" : "Runner",
                     Ball:BindData.SERVICERESPONSE.BOWLECOUNT == 0 && ( BowleCount != 5 || DeliveryTypeSelect == 'WideBall' || DeliveryTypeSelect == 'NoBall' ) ? Bowle :BindData.SERVICERESPONSE.BOWLE,
                     BowleCount:BindData.SERVICERESPONSE.BOWLECOUNT == 0 && ( BowleCount != 5 || DeliveryTypeSelect == 'WideBall' || DeliveryTypeSelect == 'NoBall' ) ? BowleCount :BindData.SERVICERESPONSE.BOWLECOUNT,
                     BowleOver:BindData.SERVICERESPONSE.BOWLEOVER,
                     BowlerWiseBallCount:BindData.SERVICERESPONSE.BOWLECOUNT == 0 && ( BowleCount != 5 || DeliveryTypeSelect == 'WideBall' || DeliveryTypeSelect == 'NoBall' ) ? BowlerWiseBallCount :BindData.SERVICERESPONSE.BOWLERWISEBALLCOUNT,
                     BowlerOut:BindData.SERVICERESPONSE.BOWLEROUT,
                     BowlerRun:BindData.SERVICERESPONSE.BOWLERRUN,
                     Out:BindData.SERVICERESPONSE.OUT,
                     MatchInningid:MatchInningid,
                     MatchTeamBid_undo:BindData.SERVICERESPONSE.MATCHTEAMBID_UNDO,
                     RunDisplay:BindData.SERVICERESPONSE.NEXTOVER == "true" ? " " : BindData.SERVICERESPONSE.BOWLERRUNDISPLAY,
                     ModalStickerSelect:"false",
                     NextOver: BindData.SERVICERESPONSE.NEXTOVER,
                     FlagBatterType:FlagBatterType == Color.PrimaryColor ? Color.PrimaryColor : "white",
                     Run:BindData.SERVICERESPONSE.RUN
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
            <ScrollView>
            <View style={[styles.with100, { paddingTop: 10 }]}>
                <View style={[styles.with45,
                        StrickerSelect === "Sticker"
                        ? { borderColor: "green" }
                        : { borderColor: Color.sliverColor }
                        ,]}>
                    <Pressable onPress={() => setStrickerSelect("Sticker")}>
                        <View style={[styles.with100, { justifyContent: "center", alignItems: "center" }]}>
                            <Image
                                source={{
                                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile.png`,
                                }}
                                style={{ height: 100, width: 100 }}
                            />
                        </View>
                        <View style={[styles.with100, { justifyContent: "center", alignItems: "center" }]}>
                            <Text>{original_StickerName}</Text>
                        </View>
                        <View style={[styles.with100, { justifyContent: "center", alignItems: "center" }]}>
                            <Text style={{ color: Color.GunmetalGray, fontWeight: "700" }}>Striker</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.width05}></View>
                <View style={[styles.with45,
                 StrickerSelect === "Runner"
                 ? { borderColor: "green" }
                 : { borderColor: Color.sliverColor }
                ]}>
                    <Pressable onPress={() => setStrickerSelect("Runner")}>
                        <View style={[styles.with100, { justifyContent: "center", alignItems: "center" }]}>
                            <Image
                                source={{
                                    uri: `${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile.png`,
                                }}
                                style={{ height: 100, width: 100 }}
                            />
                        </View>
                        <View style={[styles.with100, { justifyContent: "center", alignItems: "center" }]}>
                            <Text>{original_Non_StickerName}</Text>
                        </View>
                        <View style={[styles.with100, { justifyContent: "center", alignItems: "center" }]}>
                            <Text style={{ color: Color.GunmetalGray, fontWeight: "700" }} >Non - Striker</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={[styles.with100, { justifyContent: "space-between", paddingTop: 10, paddingHorizontal: 10 }]}>
                
                <View style={{ display: "flex", flexDirection: "row" }}>

                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
                    <Text style={{ marginLeft: 6, fontSize: 14 }}>Don't Count Ball</Text>
                </View>
            </View>
           {
                isChecked == false ? (
                <><View style={[styles.with100, { paddingTop: 10, paddingHorizontal: 10 }]}>
                        <View>
                            <Text style={styles.Title}>Delivery Type</Text>
                        </View>
                    </View><View style={[styles.with100, { marginTop: 10 }]}>
                            <View style={[styles.width01]}></View>
                            <Pressable style={[styles.width24,
                            DeliveryTypeSelect === "WideBall"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => setDeliveryTypeSelect("WideBall")}>
                                <Text>WD</Text>
                            </Pressable>
                            <View style={[styles.width01]}></View>
                            <Pressable style={[styles.width24,
                            DeliveryTypeSelect === "NoBall"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => setDeliveryTypeSelect("NoBall")}>
                                <Text>NB</Text>
                            </Pressable>
                            <View style={[styles.width01]}></View>
                            <Pressable style={[styles.width24,
                            DeliveryTypeSelect === "ByeBall"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => setDeliveryTypeSelect("ByeBall")}>
                                <Text>BYE</Text>
                            </Pressable>
                            <View style={[styles.width01]}></View>
                            <Pressable style={[styles.width24,
                            DeliveryTypeSelect === "LegByeBall"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => setDeliveryTypeSelect("LegByeBall")}>
                                <Text>LB</Text>
                            </Pressable>
                        </View><View style={[styles.with100, { paddingTop: 10, paddingHorizontal: 10 }]}>
                            <View>
                                <Text style={{ fontSize: 14 }}>Runs Scored</Text>
                            </View>
                        </View><View style={[styles.with100, { paddingTop: 10, paddingHorizontal: 10 }]}>
                            <View style={styles.width01}></View>

                            <Pressable style={[styles.width08, styles.RunBorder,
                            RunScoredSelect === "0"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => {
                                setRunScoredSelect("0");
                                setRunScored(false);
                            } }>
                                <Text>0</Text>
                            </Pressable>

                            <View style={styles.width02}></View>
                            <Pressable style={[styles.width08, styles.RunBorder,
                            RunScoredSelect === "1"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => {
                                setRunScoredSelect("1");
                                setRunScored(false);
                            } }>
                                <Text>1</Text>
                            </Pressable>

                            <View style={styles.width02}></View>
                            <Pressable style={[styles.width08, styles.RunBorder,
                            RunScoredSelect === "2"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => {
                                setRunScoredSelect("2");
                                setRunScored(false);
                            } }>
                                <Text>2</Text>
                            </Pressable>
                            <View style={styles.width02}></View>
                            <Pressable style={[styles.width08, styles.RunBorder,
                            RunScoredSelect === "3"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => {
                                setRunScoredSelect("3");
                                setRunScored(false);
                            } }>
                                <Text>3</Text>
                            </Pressable>
                            <View style={styles.width02}></View>
                            <Pressable style={[styles.width08, styles.RunBorder,
                            RunScoredSelect === "4"
                                ? { borderColor: "green" }
                                : { borderColor: Color.sliverColor }
                            ]} onPress={() => {
                                setRunScoredSelect("4");
                                setRunScored(false);
                            } }>
                                <Text>4</Text>
                            </Pressable>
                            <View style={styles.width02}></View>
                            <Pressable style={[styles.width08, styles.RunBorder]} onPress={() => {
                                setRunScored(true);
                                setRunScoredSelect(0);
                            } }>
                                <Text>+</Text>
                            </Pressable>
                            <View style={styles.width02}></View>
                            {RunScored == true ? (
                                <>
                                    <View style={[styles.width08, styles.RunBorder, { borderColor: "green" }]}>
                                        <TextInput maxLength={2} onValueChange={setRunScoredSelect} keyboardType='decimal-pad' />
                                    </View></>
                            ) : null}

                        </View></>
                        ) : null
            }
            
            <Pressable onPress={() => btnDone()} style={[styles.with100,styles.btnout]}>
                <Text onChangeText={setRunScoredSelect} value={RunScoredSelect} style={{color:"white"}}>RETIRED HURT</Text>
            </Pressable>
            </ScrollView>
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
    myText: {
        fontSize: 18,
        color: Color.PrimaryColor,
        fontWeights: 900, marginBottom: 10
    },
    StrickerWrapper: {
        marginHorizontal: 10,
        marginTop: 15,
        flex: 0.3,
        backgroundColor: Color.sliverColor,
        borderWidth: 2,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '90%'
    },
    StrickerTitle: {
        marginLeft: 10,
        margintop: 10
    },
    footerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
    with100:
    {
        width: "100%",
        flexDirection: "row",

    },
    with45:
    {
        width: "45%",
        // backgroundColor: Color.sliverColor,
        borderWidth: 2,
        borderRadius: 20,
        marginLeft:5
    },
    width05: {
        width: "5%"
    },
    Title: {
        fontSize: 18, fontWeight: "bold"
    },
    width24: {
        width: "24%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.sliverColor,
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 7
    },
    width01: {
        width: "1%"
    },
    RunBorder: {
        backgroundColor: Color.sliverColor,
        borderWidth: 2,
        padding: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    width08: {
        width: "8%"
    },
    width02: {
        width: "2%"
    },
    btnout:{
        padding: 10
        ,marginTop:10
        ,paddingHorizontal: 10
        ,justifyContent: "center"
        ,alignItems: "center"
        ,borderWidth: 2
        ,borderColor:Color.sliverColor
        ,backgroundColor:Color.PrimaryColor
        ,borderRadius:15
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


export default NextInning_MatchOut_Retired_Out;