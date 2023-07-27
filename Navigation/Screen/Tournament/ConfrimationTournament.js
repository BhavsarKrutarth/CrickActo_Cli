import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet} from "react-native";
import { useRoute } from '@react-navigation/native';
import Color from "../../../Color/Color";
import LineButton from "../../../Component/LineButton/LineButton";
import Custombutton from "../../../Component/PressableButton/Custombutton";
import { useNavigation } from "@react-navigation/native";

const ConfrimationTournament = props => {
    const navigation = useNavigation();
    const route = useRoute();
    let Tournament = route.params.Tournament  || '';
    const [Player,showPlayer] = useState(true);
    const [TournamentTitle,setTournamentTitle] = useState(null);

    React.useEffect(() => {
      console.log("Navigation/Screen/Tournament/ConfrimationTournament.js")
      if(Tournament == "I'm the Organiser")
      {
        showPlayer(true)
        setTournamentTitle("Cool! Just make sure no one else has created this tournament already.");
      }
      else if(Tournament == "I'm the Scorer")
      {
        showPlayer(true)
        setTournamentTitle("Well,just make sure the organiser has not created the tournament already.");
      }
      else if(Tournament == "I'm a player")
      {
        showPlayer(false)
        setTournamentTitle("Ok,if you are trying to find your match,go to MY CRICKET or search for it.");
      }
      else if(Tournament == "None of the above")
      {
        showPlayer(true)
        setTournamentTitle("Are you sure you want to create a new tournament? Just make sure it is not a duplicate tournament.");
      }
   }, []);
    
    return (
      <View style={styles.Container}>
        <View style={styles.body}>
          <View style={[styles.body100, { marginTop: 25 }]}>
            <Text style={styles.MainTitle}>{Tournament}</Text>
          </View>
          <View style={[styles.body100, styles.Flatlist]}>
            <Text style={styles.MainTitle}>{TournamentTitle}</Text>
          </View>
          <View style={styles.bodyrow}>
            <View
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
                title={"Let Me Check"}
                onPress={() =>
                  // alert("Let Me Check")
                  navigation.navigate("Tournament")
                }
              />
            </View>
            <View style={[styles.body40, { paddingLeft: 20 }]}>
              {Player ? (
                <Custombutton
                  title={"Next"}
                  onPress={() =>
                    navigation.navigate("TournamentRegistration", {
                      Tournament,
                    })
                  }
                />
              ) : (
                <Custombutton
                  title={"My Cricket"}
                  onPress={() =>
                    navigation.navigate("Tournament", {
                      Tournament,
                    })
                  }
                />
              )}
            </View>
          </View>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Color.OrorangeBGColor,
      },
      body: {
        flexDirection: "column",
        flexWrap: "wrap",
      },
      bodyrow:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 25,
        alignItems: "center",
        width: "80%",
        marginLeft:"10%"
      },
      body100: {
        width: "100%",
        marginLeft: 20,
      },
      MainTitle:{
        fontSize:25,
        color:Color.FontColor
      },
      Flatlist:{
        width: "90%",
        marginVertical: 20,
        borderColor: "black",
        borderRadius: 20,
        backgroundColor: "white",
        height: 300,
        margin: 10,
        alignItems:'center',
        justifyContent: 'center',
        elevation: 15
      },
      body40: {
        width: "40%",
      },
      body60: {
        width: "60%",
      },
});

export default ConfrimationTournament;