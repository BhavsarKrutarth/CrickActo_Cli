import { StyleSheet, Text, View, ScrollView, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import Color from '../../../../Color/Color'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

const Info = props => {
    const navigation = useNavigation();
    const route = useRoute();

    const [Matchid, setMatchid] = useState(null);
    const [MobileNo, setMobileNo] = useState(null);
    const [TeamAid, setTeamAid] = useState(null);
    const [TeamAName, setTeamAName] = useState(null);
    const [TeamASubName, setTeamASubName] = useState(null);
    const [TeamBid, setTeamBid] = useState(null);
    const [TeamBName, setTeamBName] = useState(null);
    const [TeamBSubName, setTeamBSubName] = useState(null);
    const [MatchType, setMatchType] = useState(null);
    const [NoOfOver, setNoOfOver] = useState(null);
    const [MatchDate, setMatchDate] = useState(null);
    const [GroundName, setGroundName] = useState(null);
    const [BallType, setBallType] = useState(null);


    React.useEffect(() => {
        console.log("Navigation/Screen/Match/Report/Info.js");
        if (route.params?.MatchId) {
            IndividualMatchList(route.params?.MatchId)
            setMatchid(route.params?.MatchId)
        }


    }, [route.params])



    const IndividualMatchList = async (Matchid) => {
        try {
            var data = {
                MOBILENO: global.MobileNo,
                SPNAME: "INDIVIDUALMATCH_INFO_LIST_GET",
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
                        SpName: "INDIVIDUALMATCH_INFO_LIST_GET",
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

                                if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                                    setMatchid(List.Matchid)
                                    setMobileNo(List.MobileNo)
                                    setTeamAid(List.TeamAid)
                                    setTeamAName(List.TeamAName)
                                    setTeamASubName(List.TeamASubName)
                                    setTeamBid(List.TeamBid)
                                    setTeamBName(List.TeamBName)
                                    setTeamBSubName(List.TeamBSubName)
                                    setMatchType(List.MatchType)
                                    setNoOfOver(List.NoOfOver)
                                    setMatchDate(List.MatchDate)
                                    setGroundName(List.GroundName)
                                    setBallType(List.BallType)
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
    const ConfrimDelete = async () => {
        try {
            var data = {
                SPNAME: "MATCH_DELETE",
                MATCHID: Matchid,
                oper:'Delete'
            }

            const resposneJSON = await fetch(
                `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
                        SpName: "MATCH_DELETE",
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((response) => response.json())
                .then((json) => {
                    var BindData = JSON.parse(json);
                    console.log(BindData)
                    var List;
                    if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
                        if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
                            navigation.navigate("MyMatch",{
                                LoadRef:"True"
                            })
                        } 
                    } else {
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
    const Deletematch = () => {
        Alert.alert('Are you sure you want to delete this match','', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                ConfrimDelete()
            }},
          ]);
    }
    return (
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.body100}>
                    <View style={[styles.body100, { backgroundColor: Color.backgroundColor, padding: 10 }]}>
                        <View style={styles.title}>
                            <Text style={{ color: Color.FontColor }}>SQUADS</Text>
                        </View>
                    </View>
                    <View style={[styles.body100, { marginTop: 10, paddingBottom: 5, flexDirection: "row", borderBottomColor: Color.backgroundColor, borderBottomWidth: 2 }]}>
                        <View style={[styles.width20, { marginLeft: 20 }]}>
                            <View style={[styles.img]}>
                                <Text style={styles.imgtitle}>{TeamASubName}</Text>
                            </View>
                        </View>
                        <View style={[styles.body80, { justifyContent: "center", marginLeft: 20 }]}>
                            <Text style={{ color: Color.FontColor }}>{TeamAName}</Text>
                        </View>
                    </View>
                    <View style={[styles.body100, { marginTop: 10, flexDirection: "row", paddingBottom: 5 }]}>
                        <View style={[styles.width20, { marginLeft: 20 }]}>
                            <View style={[styles.img]}>
                                <Text style={styles.imgtitle}>{TeamBSubName}</Text>
                            </View>
                        </View>
                        <View style={[styles.body80, { justifyContent: "center", marginLeft: 20 }]}>
                            <Text style={{ color: Color.FontColor }}>{TeamBName}</Text>
                        </View>
                    </View>
                    <View style={[styles.body100, { backgroundColor: Color.backgroundColor, padding: 10 }]}>
                        <View style={styles.title}>
                            <Text style={{ color: Color.FontColor }}>INFO</Text>
                        </View>
                    </View>
                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Tournamanet</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>Individual</Text>
                        </View>
                    </View>

                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Match Type</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>{MatchType}</Text>
                        </View>
                    </View>

                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Over</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>{NoOfOver}</Text>
                        </View>
                    </View>

                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Date & Time</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>{MatchDate}</Text>
                        </View>
                    </View>

                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Venu</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>{GroundName}</Text>
                        </View>
                    </View>

                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Toss</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>Frist Play Batter Team - {TeamAName}</Text>
                        </View>
                    </View>

                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Ball Type</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>{BallType}</Text>
                        </View>
                    </View>

                    <View style={[styles.body100, { flexDirection: "row" }]}>
                        <View style={[styles.body40, styles.LeftTitle]}>
                            <Text style={styles.FontSize16}>Match Id</Text>
                        </View>
                        <View style={[styles.body60, styles.RightTitle]}>
                            <Text style={styles.FontSize16}>{Matchid}</Text>
                        </View>
                    </View>
                    <View style={{ width: "100%" }}>
                        <Pressable
                            onPress={() => {
                                Deletematch();
                            }}
                            style={{ padding: 10, backgroundColor: Color.PrimaryColor, borderRadius: 25, marginHorizontal: 10 }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Delete Match
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Info

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
    body40: {
        width: "40%",
    },
    body60: {
        width: "60%",
    },
    body20: {
        width: "20%",
    },
    body30: {
        width: "30%"
    },
    body70: {
        width: "70%"
    },
    title: {
        color: Color.Texttitle,
        fontWeight: "bold",
        fontSize: 18,
        margin: 5,
        marginLeft: 20,

    },
    FontSize16: {
        fontSize: 16,
        color: Color.FontColor
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
})