import React,{useState,useEffect} from "react";
import {View,Image,StyleSheet,Text,Pressable,RefreshControl} from "react-native"

import Custombutton from "../../../Component/PressableButton/Custombutton";
import LineButton from "../../../Component/LineButton/LineButton";
import { useNavigation } from '@react-navigation/native';

import Color from "../../../Color/Color";
import CustomFlatList from "../../../Component/FlatList/CustomFlatList";
import { ScrollView } from "react-native-gesture-handler";

const Tournament = props => {
  console.log("Navigation/Screen/Tournament/Tournament.js")
  const navigation = useNavigation();
  const [TournamentList,SetTournamentList] = useState(false)
 
  React.useEffect(()=>{
    SetTournamentList(false);
    Tournament_GET();
  }, [])

  const Tournament_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/TournamentRegistration/` + global.MobileNo,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          console.log(BindData)
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            if(BindData.SERVICERESPONSE.DETAILSLIST)
            {
              if (BindData.SERVICERESPONSE.TOTALRECORDS >= 1) {
                SetTournamentList(true);
              } else {
                SetTournamentList(false);
              }
            }
            else 
            {
              SetTournamentList(false);
            }
          }
          else 
          {
            SetTournamentList(false);
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
/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
  SetTournamentList(false);
  Tournament_GET();
  setRefreshing(true);
  wait(2000).then(() => setRefreshing(false));
}, []);
/* -----------------------refreshing ------------------------------*/
    return (
      <View style={styles.Container}>
        <View style={styles.BannerBox}>
          <Pressable
            onPress={() => navigation.navigate("AddANewTournamentAndSeries")}
          >
            <View style={styles.BannerSpaceBetween}>
              <Text style={styles.BannerTitle}>Want to host a tournament?</Text>
              <Text style={styles.BannerTitle}>REGISTER</Text>
            </View>
          </Pressable>
        </View>
        {TournamentList ? (
          <CustomFlatList onPress={() => getItem(item)}></CustomFlatList>
        ) : (
          <ScrollView
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          }
           >
            <View>
              <View style={styles.body100}>
                <Image
                  source={{
                    uri: ""+global.domainName+"/CricbuddyAdmin/Content/assets/tournament/tournament_Background.png",
                  }}
                  style={styles.Image}
                />
              </View>
              <View style={styles.body}>
                {/* <View
                  style={[
                    styles.body60,
                    {
                      borderColor: Color.PrimaryColor,
                      borderWidth: 2,
                      borderRadius: 30,
                      alignItems: "center",
                    },
                  ]}
                >
                  <LineButton
                    title={"VIEW TOURNAMENTS"}
                    onPress={() => alert("click")}
                  />
                </View> */}
                <View style={[styles.body100, { padding: 5 }]}>
                  <Custombutton
                    title={"REGISTER"}
                    onPress={() =>
                      navigation.navigate("AddANewTournamentAndSeries")
                    }
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
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
  body40: {
    width: "40%",
  },
  body60: {
    width: "60%",
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
});

export default Tournament;