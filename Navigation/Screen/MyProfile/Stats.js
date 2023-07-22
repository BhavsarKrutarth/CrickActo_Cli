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
import Color from "../../../Color/Color";
import { Pressable } from "react-native";

import MyProfile_stats_Batting from "./Stats/MyProfile_stats_Batting";
import MyProfile_stats_Bowling from "./Stats/MyProfile_stats_Bowling";
import MyProfile_stats_Fielding from "./Stats/MyProfile_stats_Fielding";

const Stats = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Screen, setScreen] = useState("Batting");
  const [Bowling_backgroundColor, setBowling_backgroundColor] = useState("White");
  const [Text_Bowling, setText_Bowling] = useState(Color.Black);
  const [Batting, setBatting] = useState(Color.PrimaryColor);
  const [Text_Batting, setText_Batting] = useState(Color.White);
  const [Fielding, setFielding] = useState("White");
  const [Text_Fielding, setText_Fielding] = useState(Color.Black);

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
            { backgroundColor: Bowling_backgroundColor },
          ]}
          onPress={() => {
            setBowling_backgroundColor(Color.PrimaryColor);
            setBatting(Color.WhiteBGColor);
            setFielding(Color.WhiteBGColor);
            setText_Batting(Color.Black);
            setText_Fielding(Color.Black);
            setText_Bowling(Color.White);
            setScreen("Bowling");
          }}
        >
          <Text style={{ color: Text_Bowling }}>Bowling</Text>
        </Pressable>
        <View style={styles.body01}></View>
        <Pressable
          style={[styles.body33, styles.Border, { backgroundColor: Batting }]}
          onPress={() => {
            setBowling_backgroundColor(Color.WhiteBGColor);
            setBatting(Color.PrimaryColor);
            setText_Batting(Color.White);
            setText_Bowling(Color.Black);
            setFielding(Color.WhiteBGColor);
            setText_Fielding(Color.Black);
            setScreen("Batting");
          }}
        >
          <Text style={{ color: Text_Batting }}>Batting</Text>
        </Pressable>
        <View style={styles.body01}></View>
        <Pressable
          style={[styles.body33, styles.Border, { backgroundColor: Fielding }]}
          onPress={() => {
            setBowling_backgroundColor(Color.WhiteBGColor);
            setBatting(Color.WhiteBGColor);
            setFielding(Color.PrimaryColor);
            setText_Fielding(Color.White);
            setText_Batting(Color.Black);
            setText_Bowling(Color.Black);
            setScreen("Fielding");
          }}
        >
          <Text style={{ color: Text_Fielding }}>Fielding</Text>
        </Pressable>
      </View>

      {Screen == "Bowling" ? <MyProfile_stats_Bowling /> : null}

      {Screen == "Batting" ? <MyProfile_stats_Batting /> : null}

      {Screen == "Fielding" ? <MyProfile_stats_Fielding /> : null}
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

export default Stats