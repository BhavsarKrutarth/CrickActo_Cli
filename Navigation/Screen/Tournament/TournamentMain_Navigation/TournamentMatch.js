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
import TournamentMatch_Upcomming from "./TournamentMatch/TournamentMatch_Upcomming";
import TournamentMatch_Live from "./TournamentMatch/TournamentMatch_Live";
import TournamentMatch_Past from "./TournamentMatch/TournamentMatch_Past";

const TournamentMatch = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Screen, setScreen] = useState("UpComming");
  const [Live_backgroundColor, setLive_backgroundColor] = useState("White");
  const [Text_Live, setText_Live] = useState(Color.Black);
  const [UpComming, setUpComming] = useState(Color.PrimaryColor);
  const [Text_UpComming, setText_UpComming] = useState(Color.White);
  const [Past, setPast] = useState("White");
  const [Text_Past, setText_Past] = useState(Color.Black);

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
            { backgroundColor: Live_backgroundColor },
          ]}
          onPress={() => {
            setLive_backgroundColor(Color.PrimaryColor);
            setUpComming(Color.WhiteBGColor);
            setPast(Color.WhiteBGColor);
            setText_UpComming(Color.Black);
            setText_Past(Color.Black);
            setText_Live(Color.White);
            setScreen("Live");
          }}
        >
          <Text style={{ color: Text_Live }}>Live</Text>
        </Pressable>
        <View style={styles.body01}></View>
        <Pressable
          style={[styles.body33, styles.Border, { backgroundColor: UpComming }]}
          onPress={() => {
            setLive_backgroundColor(Color.WhiteBGColor);
            setUpComming(Color.PrimaryColor);
            setText_UpComming(Color.White);
            setText_Live(Color.Black);
            setPast(Color.WhiteBGColor);
            setText_Past(Color.Black);
            setScreen("UpComming");
          }}
        >
          <Text style={{ color: Text_UpComming }}>UpComming</Text>
        </Pressable>
        <View style={styles.body01}></View>
        <Pressable
          style={[styles.body33, styles.Border, { backgroundColor: Past }]}
          onPress={() => {
            setLive_backgroundColor(Color.WhiteBGColor);
            setUpComming(Color.WhiteBGColor);
            setPast(Color.PrimaryColor);
            setText_Past(Color.White);
            setText_UpComming(Color.Black);
            setText_Live(Color.Black);
            setScreen("Past");
          }}
        >
          <Text style={{ color: Text_Past }}>Past</Text>
        </Pressable>
      </View>

      {Screen == "Live" ? <TournamentMatch_Live /> : null}

      {Screen == "UpComming" ? <TournamentMatch_Upcomming /> : null}

      {Screen == "Past" ? <TournamentMatch_Past /> : null}
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

export default TournamentMatch;
