import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import Color from "../../../Color/Color";
import { useNavigation } from '@react-navigation/native';

const StartAMatch = (props) => {
  const navigation = useNavigation();

  const [MatchBorder, setMatchBorder] = useState("#f2f2f2");
  const [Tu_MatchBorder, setTu_MatchBorder] = useState("#f2f2f2");
  const [visible, setvisible] = useState(false);
  const [Flag, setFlag] = useState(0);

  React.useEffect(() => {
    console.log("Navigation/Screen/Match/StartAMatch.js");
  }, [])


  const Tournament = () => {
    setTu_MatchBorder("green");
    setMatchBorder("#f2f2f2")
    setFlag(2);
  }
  const MatchSelect = () => {
    setMatchBorder("green");
    setTu_MatchBorder("#f2f2f2")
    setFlag(1);
  };
  const BtnNext = () => {
    if (Flag == 1) {
      
      navigation.navigate("TeamSelect")
    }
    else if (Flag == 2) {
      navigation.navigate("AddANewTournamentAndSeries")
    }
    else {
      Alert.alert("Alert", "Please Select Match Type First.", [
        {
          text: "OK",
          //  onPress: () => console.log("OK Pressed")
        },
      ]);
    }
  };

  return (
    <View style={styles.Continer}>
      <View style={{ flex: 0.9 }}>
        <View style={styles.width100}>
          <Text style={styles.HederTitle}>Select Type of Match</Text>
        </View>
        <View style={[styles.width100, { flexDirection: "row" }]}>
          
          <Pressable  style={[
                styles.width40,
                styles.HederBox,
                { borderColor: Tu_MatchBorder, borderWidth: 2 },
              ]} onPress={() => Tournament()}>
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/Match/Tournament.png",
                }}
                style={{ height: 60, width: 60 }}
              />
              <Text style={styles.HederBoxTitle}>Tournament</Text>
          </Pressable>
          <Pressable
            style={[
              styles.width40,
              styles.HederBox,
              { borderColor: MatchBorder, borderWidth: 2 },
            ]}
            onPress={() => MatchSelect()}
          >
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/Match/Individual.png",
                }}
                style={{ height: 60, width: 60 }}
              />
              <Text style={styles.HederBoxTitle}>Individual</Text>
            
          </Pressable>
        </View>
      </View>
      <View style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }]}>
        <Pressable
          style={[styles.button, styles.width100]}
          onPress={() => BtnNext()}
        >
          <Text style={styles.footerText}>NEXT</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StartAMatch;

const styles = StyleSheet.create({
  Continer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    position: "relative",
  },
  width100: {
    width: "100%",
  },
  width40: {
    width: "40%",
    marginTop: 10,
  },
  HederTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  HederBox: {
    height: 125,
    marginRight: 10,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  HederBoxTitle: {
    fontSize: 14,
    fontWeight: "700",
    color:Color.FontColor
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
    backgroundColor: Color.PrimaryColor,
  },
  footerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
