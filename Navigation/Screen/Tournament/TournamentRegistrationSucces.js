import { StyleSheet, Text, View, Image,Pressable } from "react-native";
import React from "react";
import Color from "../../../Color/Color";
import { useNavigation } from "@react-navigation/native";

const TournamentRegistrationSucces = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    console.log("Navigation/Screen/Tournament/TournamentRegistrationSucces.js")
    function onBeforeRemove(event) {
        event.preventDefault(); //prevented nav from going back
        
        navigation.navigate("Tournament", {
          // PageName: "RightDrawerNavigator_TournamenentMain",
          //  TournamentName: global.TournamentName || '',
          //  Tournamentid: global.Tournamentid || ''
        });
    }

    navigation.addListener('beforeRemove', onBeforeRemove); // listener added
    

    return function cleanup() {
      navigation.removeListener('beforeRemove', onBeforeRemove) // clean up 
    };
  });
  return (
    <View style={styles.Container}>
      <View style={styles.body100}>
        <Image
          style={styles.image}
          source={{
            uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/success.png`,
          }}
        />
      </View>
      <View style={styles.body100}>
        <Text style={styles.headertitle}>
          Great,your tournament is registered...
        </Text>
        <Text style={styles.subtitle}>
          Now just a few more setps to finish the setup
        </Text>
      </View>
      <View style={{ width: "100%", flexDirection: "row", marginTop: 30 }}>
        <View style={{ width: "30%", alignItems: "center" }}>
          <Image
            style={styles.subimage}
            source={{
              uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/add_Team_2.png`,
            }}
          />
        </View>
        <View style={{ width: "70%" }}>
          <Pressable>
            <Text style={styles.txtteams}>Add Teams</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
        <View style={{ width: "30%", alignItems: "center" }}>
          <Image
            style={styles.subimage}
            source={{
              uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/add_Group.png`,
            }}
          />
        </View>
        <View style={{ width: "70%" }}>
          <Pressable>
            <Text style={{ fontSize: 16, marginTop: 15 }}>
              Add Rounds/Groups fro Points Table
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
        <View style={{ width: "30%", alignItems: "center" }}>
          <Image
            style={styles.subimage}
            source={{
              uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/add_Schedule.png`,
            }}
          />
        </View>
        <View style={{ width: "70%" }}>
          <Pressable>
            <Text style={styles.txtteams}>Add Schedule</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ width: "80%", marginTop: 20, marginLeft: "10%" }}>
        <Pressable
          style={[styles.button, styles.buttonSave]}
          onPress={() =>
            {
              navigation.navigate("TournamenentMain", {
                PageName: "RightDrawerNavigator_TournamenentMain",
                 TournamentName: global.TournamentName || '',
                 Tournamentid: global.Tournamentid || ''
              });
            }
          }
        >
          <Text style={{ color: "white", fontSize: 20 }}>Let's Go</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TournamentRegistrationSucces;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.WhiteBGColor,
  },
  image: {
    marginTop: 40,
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  subimage:{
    width: 80,
    height: 80,
  },
  body100:{
    width:"100%"
    ,alignItems: 'center'
  },
  headertitle:{
    fontSize:18,
    color:Color.Texttitle
  },
  subtitle:{
    fontSize:14,
    color:Color.Texttitle
  },
  txtteams:{
    fontSize:16,
    marginTop:20
  },
  button:{
    borderRadius: 20,
    elevation: 2,
    padding:12,
    alignItems:'center',
    color:"green"

  },
  buttonSave: {
    backgroundColor: Color.PrimaryColor,
    
  },
});
