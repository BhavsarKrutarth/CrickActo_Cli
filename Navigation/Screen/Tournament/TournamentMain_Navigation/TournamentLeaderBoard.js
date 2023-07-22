import {
    View,
    Text,
    StyleSheet,
    Image,
    RefreshControl,
    Modal,
  } from "react-native";
  import React, { useState } from "react";
  import { useRoute } from "@react-navigation/native";
  import { useNavigation } from "@react-navigation/native";
  import Color from "../../../../Color/Color";
  import { Pressable } from "react-native";
  import { color } from "react-native-reanimated";
  import TournamentMatch_Bowl from "./TournamentLeaderBoard/TournamentMatch_Bowl";
  import TournamentMatch_Bat from "./TournamentLeaderBoard/TournamentMatch_Bat";
  import TournamentMatch_Field from "./TournamentLeaderBoard/TournamentMatch_Field";
  
  const TournamentLeaderBoard = () => {
    const navigation = useNavigation();
    const route = useRoute();
  
    const [Screen, setScreen] = useState("Bat");
    const [Bat_backgroundColor, setBat_backgroundColor] = useState(Color.PrimaryColor);
    const [Text_Bat, setText_Bat] = useState(Color.White);
    const [Bowl, setBowl] = useState("White");
    const [Text_Bowl, setText_Bowl] = useState(Color.Black);
    const [Field, setField] = useState("White");
    const [Text_Field, setText_Field] = useState(Color.Black);
  
    React.useEffect(() => {
      console.log(
        "Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentMatch.js"
      );
  
      if (route.params?.LoadRef == "True") {
        //console.log(route.params?.LoadRef)
      }
    }, [route.params]);
  
    return (
      <View style={[styles.Container, styles.body100]}>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={[
              styles.body33,
              styles.Border,
              { backgroundColor: Bat_backgroundColor },
            ]}
            onPress={() => {
              setBat_backgroundColor(Color.PrimaryColor);
              setBowl(Color.WhiteBGColor);
              setField(Color.WhiteBGColor);
              setText_Bowl(Color.Black);
              setText_Field(Color.Black);
              setText_Bat(Color.White);
              setScreen("Bat");
            }}
          >
            <Text style={{ color: Text_Bat }}>Bat</Text>
          </Pressable>
          <View style={styles.body01}></View>
          <Pressable
            style={[styles.body33, styles.Border, { backgroundColor: Bowl }]}
            onPress={() => {
              setBat_backgroundColor(Color.WhiteBGColor);
              setBowl(Color.PrimaryColor);
              setText_Bowl(Color.White);
              setText_Bat(Color.Black);
              setField(Color.WhiteBGColor);
              setText_Field(Color.Black);
              setScreen("Bowl");
            }}
          >
            <Text style={{ color: Text_Bowl }}>Bowl</Text>
          </Pressable>
          <View style={styles.body01}></View>
          <Pressable
            style={[styles.body33, styles.Border, { backgroundColor: Field }]}
            onPress={() => {
              setBat_backgroundColor(Color.WhiteBGColor);
              setBowl(Color.WhiteBGColor);
              setField(Color.PrimaryColor);
              setText_Field(Color.White);
              setText_Bowl(Color.Black);
              setText_Bat(Color.Black);
              setScreen("Field");
            }}
          >
            <Text style={{ color: Text_Field }}>Field</Text>
          </Pressable>
          
        </View>
  
        {Screen == "Bat" ? <TournamentMatch_Bat /> : null}
  
        {Screen == "Bowl" ? <TournamentMatch_Bowl /> : null}
  
        {Screen == "Field" ? <TournamentMatch_Field /> : null}


      </View>
    );
  };
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: "#fff",
      borderColor: "#fff",
      borderWidth: 5,
    },
    Border: {
      borderColor: Color.borderColor,
      borderWidth: 2,
      padding: 10,
      alignItems: "center",
      borderRadius: 25,
    },
    body100: {
      width: "100%",
    },
    body95: {
      width: "95%",
    },
    body70: {
      width: "70%",
    },
    body40: {
      width: "40%",
    },
    body10: {
      width: "10%",
    },
    body20: {
      width: "20%",
    },
    body60: {
      width: "60%",
    },
    body33: {
      width: "30%",
    },
    body01: {
      width: "05%",
    },
    body50: {
      width: "50%",
    },
    body48: {
      width: "48%",
    },
    body02: {
      width: "02%",
    },
    Image: {
      marginTop: 10,
      height: 400,
      width: "auto",
    },
    btn_Background: {
      alignItems: "center",
      backgroundColor: Color.PrimaryColor,
      padding: 7,
      borderRadius: 25,
    },
    btn_Border: {
      borderColor: Color.PrimaryColor,
      borderWidth: 2,
      borderRadius: 25,
      alignItems: "center",
      padding: 7,
    },
    centeredView: {
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
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalbtn: {
      backgroundColor: Color.backgroundColor,
      padding: 25,
      alignItems: "center",
      borderRadius: 15,
    },
    modalImage: {
      width: 60,
      height: 60,
    },
    modalclose: {
      alignItems: "center",
      borderRadius: 25,
      padding: 10,
      borderColor: Color.backgroundColor,
      borderWidth: 2,
      backgroundColor: Color.PrimaryColor,
    },
  });
  
  export default TournamentLeaderBoard;
  