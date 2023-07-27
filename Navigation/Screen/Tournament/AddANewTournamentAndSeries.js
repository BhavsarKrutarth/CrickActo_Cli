import React ,{useState}from "react";
import {View,Text,StyleSheet} from "react-native";
import Color from "../../../Color/Color";
import { useNavigation } from '@react-navigation/native';


const AddANewTournamentAndSeries = props => {
  React.useEffect(()=>
  {
    console.log("Navigation/Screen/Tournament/AddANewTournamentAndSeries.js")
  },[])
  
    const navigation = useNavigation();
    const RedirectToConfrimPage = (Tournament) => {
        navigation.navigate("ConfrimationTournament", {
          Tournament,
        });
    }

    return (
      <View style={styles.Container}>
        <View style={styles.body}>
          <View style={[styles.body100, { marginTop: 15 }]}>
            <Text style={[styles.MainTitle, { fontWeight:"300",color:Color.FontColor }]}>
              Choose
            </Text>
          </View>
          <View style={[styles.body100, { marginTop: 0 }]}>
            <Text style={[styles.MainTitle, { fontWeight: "600" ,color:Color.PrimaryColor}]}>
              Your Role
            </Text>
          </View>
          <View style={[styles.body50]}>
            <View style={styles.Flatlist}>
              <Text
                onPress={() => RedirectToConfrimPage("I'm the Organiser")}
                style={styles.title}
              >
                I'm the Organiser
              </Text>
            </View>
          </View>
          <View style={[styles.body50]}>
            <View style={styles.Flatlist}>
              <Text
                style={styles.title}
                onPress={() => RedirectToConfrimPage("I'm the Scorer")}
              >
                I'm the Scorer
              </Text>
            </View>
          </View>

          <View style={[styles.body50]}>
            <View style={styles.Flatlist}>
              <Text
                style={styles.title}
                onPress={() => RedirectToConfrimPage("I'm a player")}
              >
                I'm a player
              </Text>
            </View>
          </View>
          <View style={[styles.body50]}>
            <View style={styles.Flatlist}>
              <Text
                style={styles.title}
                onPress={() => RedirectToConfrimPage("None of the above")}
              >
                None of the above
              </Text>
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
    flexDirection: "row",
    flexWrap: "wrap",
    margin:20
  },
  body50: {
    width: "50%",
  },
  Flatlist: {
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "white",
    height: 150,
    margin: 10,
    alignItems:'center',
    justifyContent: 'center',
    elevation: 15

  },
  body100: {
    width: "100%",
    marginLeft: 20,
  },
  MainTitle: {
    fontSize: 30,
  },
  title:{
    fontSize:25,
    margin:5,
    color:Color.FontColor
  }
});

export default AddANewTournamentAndSeries
