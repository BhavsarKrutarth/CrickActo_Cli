import { useNavigation, useRoute } from '@react-navigation/native';
import React,{ useState,useEffect} from 'react'
import {View,Text,StyleSheet,Image, Pressable,SafeAreaView,FlatList,
    ScrollView,
    RefreshControl,} from 'react-native';
import Color from '../../../../../Color/Color';



const MatchOut_FielderList = () => {
  
    const [listItems, setListItems] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const [StreakeName, setStreakeName] = useState("Striker");
    const [selectedItem, setSelectedItem] = useState(null);
    const [TeamBBowlerid,setTeamBBowlerid] = useState(null);
    const [TeamBBowlerName,setTeamBBowlerName] = useState(null);
    const [btnDisplay, setbtnDisplay] = useState(false);
    const [id,setid] = useState(null);
    const [Name,setName] = useState(null);
    const [Img,setImg] = useState(null);
    const [Playerid,setPlayerid] = useState(null);

    const [Matchid,setMatchid] = useState(null);
    const [ReturnPage,setReturnPage] = useState(null);
    const [FielderType,setFielderType] = useState(null);

    /* -----------------------refreshing ------------------------------*/ 
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        if(TeamBBowlerid)
        {
            Stiker_GET(TeamBBowlerid,Matchid);
        }
        
       wait(2000).then(() => setRefreshing(false));
     },[Matchid,TeamBBowlerid]);
    /* -----------------------refreshing ------------------------------*/ 

    React.useEffect(() => {
        //console.log("Navigation/Screen/Match/MatchRegister/MatchOut_Category/MatchOut_FielderList.js")
        if (route.params?.FielderType) setFielderType(route.params?.FielderType);
        if (route.params?.StreakeName) setStreakeName(route.params?.StreakeName);
        if (route.params?.TeamBBowlerid) setTeamBBowlerid(route.params?.TeamBBowlerid);
        if (route.params?.TeamBBowlerName) setTeamBBowlerName(route.params?.TeamBBowlerName);
        if (route.params?.Matchid) {
          setMatchid(route.params?.Matchid);
          Stiker_GET(route.params?.TeamBBowlerid,route.params?.Matchid)
        }
        if (route.params?.ReturnPage) setReturnPage(route.params?.ReturnPage);
    });
    
    const Stiker_GET = async (TeamBBowlerid,Matchid) => {
      
        try {
            var data = {
                WHERE_EQ_MYTEAMID: TeamBBowlerid,
                WHERE_EQ_MATCHID:Matchid
              }
          const resposneJSON = await fetch(
            `${global.domainName}/cricbuddyAPI/api/Commonsp`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
                SpName:"MATCHTEAMBPLAYER_GET"
              },
              body: JSON.stringify(data),
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
                  if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                    if (List) {
                      List.forEach((List) => {
                        setarray.push({
                          id: List.MATCHTEAMBPLAYERID,
                          Matchid:List.MATCHID,
                          Playerid:List.PLAYERID,
                          PlayerMobileNo:List.PLAYERMOBILENO,
                          Name:List.NAME,
                          MobileNo: global.MobileNo,
                          userMasterid: List.USERMASTERID,
                          CityId: List.CITYID,
                          CityName: List.CITYNAME,
                          CountryCode: List.COUNTRYCODE,
                          CountryName: List.COUNTRYNAME,
                          ImageName: List.IMAGENAME,
                          MyTeamid:List.MYTEAMID,
                          MyTeam:List.MYTEAM,
                          BattingStyle:List.BATTINGSTYLE,
                          BowlingStyle:List.BOWLINGSTYLE,
                          DisplayTag:List.DISPLAYTAG
                        });
                      });
                    }
                  } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                    setarray.push({
                        id: List.MATCHTEAMBPLAYERID,
                        Matchid:List.MATCHID,
                        Playerid:List.PLAYERID,
                        PlayerMobileNo:List.PLAYERMOBILENO,
                        Name:List.NAME,
                        MobileNo: global.MobileNo,
                        userMasterid: List.USERMASTERID,
                        CityId: List.CITYID,
                        CityName: List.CITYNAME,
                        CountryCode: List.COUNTRYCODE,
                        CountryName: List.COUNTRYNAME,
                        ImageName: List.IMAGENAME,
                        MyTeamid:List.MYTEAMID,
                        MyTeam:List.MYTEAM,
                        BattingStyle:List.BATTINGSTYLE,
                        BowlingStyle:List.BOWLINGSTYLE,
                        DisplayTag:List.DISPLAYTAG
                    });
                  }
                   setListItems(setarray);
                  // setselectedSquad(setarray.filter(List => List.Color === 'green').length)
                } else {
                  //setDisplayList("false")
                }
              } else {
                //alert("Error: UNAUTHORIZATION PERSON");
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
    const SelectedItem = (id,Name,Img,Playerid) => {
      setid(id)
      setName(Name)
      setImg(Img)
      console.log(Img)
      setPlayerid(Playerid)
    }
    const BtnNext = () => {
      if(ReturnPage == "MatchOut_RunOut")
      {
        if(FielderType == "Fielder1")
        {
          navigation.navigate(ReturnPage, {
            Fielderid1:id,
            FielderName1:Name,
            FielderImg1:Img,
            FielderPlayerid1:Playerid
          });
        }
        else if(FielderType == "Fielder2")
        {
          navigation.navigate(ReturnPage, {
            Fielderid2:id,
            FielderName2:Name,
            FielderImg2:Img,
            FielderPlayerid2:Playerid
          });
        }


      }
      else 
      {
        navigation.navigate(ReturnPage, {
          MatchTeamBPlayerid:id,
          FielderName:Name,
          FielderImg:Img,
          FielderPlayerid:Playerid
        });
      }
    }

    const renderItem = ({ item }) => {
      const backgroundColor = item.Color === "gray" ? 'gray' : "red"; 
      return (
        <View
          style={[
            styles.item,
            selectedItem === item.id ? styles.selectedItem : null,
          ]}
        >
          <Pressable
            onPress={() => {
              setSelectedItem(item.id)
              SelectedItem(item.id,item.Name,`${item.ImageName}`,item.Playerid);
              setbtnDisplay(true)
            }}
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
              <View style={[styles.body20]}>
                <Image
                  source={{
                    uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.ImageName}`,
                  }}
                  style={styles.img}
                />
              </View>
              <View style={[styles.body80]}>
                <View style={{ marginLeft: 5 }}>
                  <View style={[styles.body100]} >
                    
                      <Text style={{ fontSize: 18, fontWeight: "900",color:Color.PrimaryColor }}>
                        {item.Name}
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "900",color:Color.NavigationColor }}>
                        {item.DisplayTag}
                      </Text>
                  </View>
                  <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                    <Text style={{ fontWeight: "900",color:Color.FontColor }}>
                      <Image
                        source={{
                          uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/icon_Location.png`,
                        }}
                        style={{ width: 15, height: 15 }}
                      />{" "}
                      {item.CityName}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.body20, { alignItems: "center" }]}></View>
            </View>
          </Pressable>
        </View>
      );
    };


    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
            <FlatList
                data={listItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            </SafeAreaView>
            {btnDisplay ? (
            <View>
              <View
                style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }]}
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
                  <Text style={styles.footerText}>Select Player</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
        
    )
}

const styles = StyleSheet.create({
   
    container: { flex: 1 },
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
        alignItems:"center"
    },
    StrickerTitle:{
        marginLeft:10,
        margintop:10
    },
    item: {
      backgroundColor: Color.WhiteBGColor,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: "gray",
      borderWidth: 3,
    },
    body20:{
      width:"20%"
    },
    body80:{
      width:"80%"
    },
    body100:{
      width:"100%"
    },
    body60:{
      width:"60%"
    },
    body40:{
      width:"40%"
    },
    img: {
        height: 60,
        width: 60,
    },
    selectedItem: {
      borderColor: "green",
      borderWidth: 3,
    },
    footerText: {
      color: "white",
      fontSize: 18,
      fontWeight: "700",
    },
})


export default MatchOut_FielderList;