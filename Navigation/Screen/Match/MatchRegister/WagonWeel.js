import { StyleSheet, Text, View, Pressable, Image, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../../../Color/Color'
import { RadioButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { color } from 'react-native-reanimated';
import scoketservices from '../../../../scoket/scoketservices';

const WagonWeel = props => {
    const navigation = useNavigation();
    const route = useRoute();
    const [WagonWeel, setWagonWeel] = useState(null)
    const [Matchid, setMatchid] = useState(null);
    const [FunctionName, setFunctionName] = useState(null);
    const [FunctionRun, setFunctionRun] = useState(null);
    const [RedirectPage, setRedirectPage] = useState(null);
    const [ShortType, setShortType] = useState(0);

    const GetShortType_Value = async (Matchid) => {
        try {
            var data = {
                MOBILENO: global.MobileNo,
                WHERE_EQ_MATCHID: Matchid,
                SPNAME: "MATCH_API_GET",
            }

            const resposneJSON = await fetch(
                `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
                        SpName: "MATCH_API_GET",
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((response) => response.json())
                .then((json) => {
                    var BindData = JSON.parse(json);
                    var List;
                    if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
                        if (BindData.SERVICERESPONSE.DETAILSLIST)
                            setShortType(BindData.SERVICERESPONSE.DETAILSLIST.DETAILS.ShortType)
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

    const Close = () => {
        navigation.navigate(RedirectPage)
    }
    const Done = (ShortType) => {
        if (WagonWeel) {
            if(Matchid)
            {
                scoketservices.emit("SendMessage",Matchid)
            }
            //alert("Select Weedl " + ShortType )
            navigation.navigate(RedirectPage,{
                WagonWeel : WagonWeel,
                ShortType : ShortType ? ShortType : "",
                FunctionName: FunctionName,
                FunctionRun: FunctionRun ? FunctionRun : 0
            })
        }
        else {
            Alert.alert('Warning', 'Please Select Wagon Weep Type First.', [
                { text: 'OK' },
            ]);
        }
    }
    React.useEffect(() => {
        console.log("Navigation/Screen/Match/MatchRegister/WagonWeel.js");

        if (route.params?.Matchid) {
            setMatchid(route.params?.Matchid)
            GetShortType_Value(route.params?.Matchid)
        }
        else {
            setShortType(0)
        }

        if (route.params?.FunctionName)
            setFunctionName(route.params?.FunctionName)

        if (route.params?.FunctionRun)
            setFunctionRun(route.params?.FunctionRun)

        if (route.params?.RedirectPage)
            setRedirectPage(route.params?.RedirectPage)

    }, [route.params])
    return (
        <View style={styles.Container}>
            <ScrollView>
                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Wagon Weel</Text>
                </View>
                <View style={[styles.body]}>
                    <View style={[styles.body100, { flexDirection: "row", }]}>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Third Man" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Third Man")}
                            />
                            <Pressable onPress={() => setWagonWeel("Third Man")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16}}>Third Man</Text>
                            </Pressable>

                        </View>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Deep point" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Deep point")}
                            />
                            <Pressable onPress={() => setWagonWeel("Deep point")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16}}>Deep point</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.body100, { flexDirection: "row", }]}>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Deep Cover" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Deep Cover")}
                            />
                            <Pressable onPress={() => setWagonWeel("Deep Cover")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16 }}>Deep Cover</Text>
                            </Pressable>

                        </View>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Long Off" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Long Off")}
                            />
                            <Pressable onPress={() => setWagonWeel("Long Off")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16 }}>Long Off</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.body100, { flexDirection: "row", }]}>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Long On" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Long On")}
                            />
                            <Pressable onPress={() => setWagonWeel("Long On")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16 }}>Long On</Text>
                            </Pressable>

                        </View>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Deep Mid Wicket" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Deep Mid Wicket")}
                            />
                            <Pressable onPress={() => setWagonWeel("Deep Mid Wicket")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16 }}>Deep Mid Wicket</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.body100, { flexDirection: "row", }]}>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Deep Square Leg" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Deep Square Leg")}
                            />
                            <Pressable onPress={() => setWagonWeel("Deep Square Leg")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16 }}>Deep Square Leg</Text>
                            </Pressable>

                        </View>
                        <View style={[styles.Modal_bodyBox, { paddingBottom: 10 }]}>
                            <RadioButton
                                value="Bye"
                                status={WagonWeel === "Deep Final Leg" ? "checked" : "unchecked"}
                                onPress={() => setWagonWeel("Deep Final Leg")}
                            />
                            <Pressable onPress={() => setWagonWeel("Deep Final Leg")}>
                                <Text style={{ paddingTop: 7,color:Color.FontColor,fontSize:16 }}>Deep Final Leg</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                {
                    WagonWeel == "Third Man" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Third Man</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Outside Edge")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/OutSide_edge.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>OUTSIDE EDGE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Top Edge")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Top_Edge.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>TOP EDGE</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Late Cut")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Late_Cut.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>LATE CUT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Reverse Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Reverse_Sweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>REVERSE SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                
                            </View>

                        ) : null
                }
                {
                    WagonWeel == "Deep point" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Point</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Defence")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Defence.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DEFENCE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Late Cut")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Late_Cut.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>LATE CUT</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Cut Short")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Cut_Short.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>CUT SHORT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Backfoot Punch")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/BackFoot_Punch.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>BACKFOOT PUNCH</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Square Drive")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Square_Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SQUARE DRIVE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Slash")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Slash.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SLASH</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Reverse Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Reverse_Sweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>REVERSE SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Switch Hit")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Switch_Hit.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SWITCH HIT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                
                            </View>

                        ) : null
                }
                {
                    WagonWeel == "Deep Cover" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Cover</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Defence")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Defence.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DEFENCE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Drive")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DRIVE</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Backfoot Punch")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/BackFoot_Punch.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>BACKFOOT PUNCH</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Inside Out")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Inside_Out.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>INSIDE OUT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Reverse Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Reverse_Sweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>REVERSE SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Switch Hit")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Switch_Hit.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SWITCH HIT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                        ) : null
                }
                {
                    WagonWeel == "Long Off" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Long Off</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Defence")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Defence.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DEFENCE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Punch")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>PUNCH</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Straight Drive")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Straight_Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>STRAIGHT DRIVE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Off Drive")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Off_Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>OFF DRIVE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Lofted Shot")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Lofted_Shot.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>LOFTED SHOT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Inside Out")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Inside_Out.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>INSIDE OUT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                        ) : null
                }
                {
                    WagonWeel == "Long On" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Long On</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Defence")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Defence.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DEFENCE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Punch")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>PUNCH</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Straight Drive")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Straight_Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>STRAIGHT DRIVE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("On Drive")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/On_Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>ON DRIVE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Step Out")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Step_Out.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>STEP OUT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Lofted Shot")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Lofted_Shot.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>LOFTED SHOT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                        ) : null
                }
                {
                    WagonWeel == "Deep Mid Wicket" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Mid Wicket</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Flick")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Flick.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>Flick</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Pull")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Pull.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>Pull</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Lofted Shot")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Lofted_Shot.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>LOFTED SHOT</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Slog Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Slog_Sweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SLOG SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Sweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Drive")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Drive.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DRIVE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Punch")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Punch.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>PUNCH</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Defence")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Defence.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DEFENCE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                        ) : null
                }
                {
                    WagonWeel == "Deep Square Leg" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Square Leg</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Flick")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Flick.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>FLICK</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Pull")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Pull.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>PULL</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Punch")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Punch.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>PUNCH</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Defence")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Defence.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>DEFENCE</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Inside Edge")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/InsideEdge.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>INSIDE EDGE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Sweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                            </View>

                        ) : null
                }
                {
                    WagonWeel == "Deep Final Leg" && ShortType == 1 ?
                        (
                            <View>
                                <View style={[styles.body100, { alignItems: "center", marginTop: 10 }]}>
                                    <Text style={{ fontSize: 16, color: Color.PrimaryColor, fontWeight: "700" }}>Short Type - Fine Leg</Text>
                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Leg Glance")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/leg_glance1.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>LEG GLANCE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.padding10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Inside Edge")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/InsideEdge.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>INSIDE EDGE</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Top Edge")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/TopEdge.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>TOP EDGE</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Pull")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/PULL.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>PULL</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                                <View style={[styles.body100, { flexDirection: "row" }]}>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/Sweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.body50, styles.paddingH10]}>
                                        <Pressable style={[styles.body100, styles.whiteborder]} onPress={() => Done("Paddle Sweep")}>
                                            <View style={[styles.body40]}>
                                                <Image
                                                    source={{
                                                        uri: `${global.domainName}/CricbuddyAdmin/Content/assets/WagonWeel/FineLeg/PaddleSweep.jpg`,
                                                    }}
                                                    resizeMode="stretch"
                                                    style={styles.img}
                                                />
                                            </View>
                                            <View style={[styles.body60]}>
                                                <Text style={{color:Color.FontColor}}>PADDLE SWEEP</Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                            </View>

                        ) : null
                }
                <View style={[styles.Modal_Footer]}>
                    <View style={styles.body50}>
                        <Pressable
                            onPress={() => Close()}
                            style={styles.Modla_Cancelbtn}
                        >
                            <Text style={[styles.Modal_Cancelbtn_text,{color:Color.FontColor,fontWeight:"700"}]}>CANCEL</Text>
                        </Pressable>
                    </View>
                    <View style={styles.body50}>
                        <Pressable
                            style={styles.Modal_Donebtn}
                            onPress={() => Done()}
                        >
                            <Text style={styles.Modal_Donebtn_text}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default WagonWeel

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
    },
    body: {
        marginTop: 25,
        alignItems: "center",
        width: "100%",
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
    Modal_bodyBox: {
        width: "50%",
        //marginHorizontal:"5%",
        flexDirection: "row",
        paddingLeft: 20,
    },
    Modal_Footer: {
        flexDirection: "row",
        width: "100%",
    },
    Modla_Cancelbtn: {
        backgroundColor: "#e7e8ea",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    Modal_Donebtn: {
        backgroundColor: Color.PrimaryColor,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    Modal_Donebtn_text: {
        color: "white",
        fontWeight: "500",
    },
    Modal_Cancelbtn_text: {
        fontWeight: "500",
    },
    img: {
        height: 60,
        width: 50,
        marginLeft:5
    },
    padding10: {
        padding: 10
    },
    paddingH10: {
        paddingHorizontal: 10
        , paddingBottom: 10
    },
    whiteborder: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        borderColor: Color.borderColor
        , borderWidth: 2
        , padding: 5
        , paddingHorizontal: 0
    }
})