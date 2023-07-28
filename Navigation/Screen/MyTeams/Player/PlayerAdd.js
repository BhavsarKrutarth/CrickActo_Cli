import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React,{useState,useEffect} from "react";
import Color from "../../../../Color/Color";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

const PlayerAdd = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [MyTeam,setMyTeam] = useState(null);
  const [MyTeamId,setMyTeamId] = useState(null);
  React.useEffect(() => {
    console.log("Navigation/Screen/MyTeams/Player/PlayerAdd.js");
    if(route.params?.MyTeamId)
      setMyTeamId(route.params?.MyTeamId);
    
    if(route.params?.MyTeam)
      setMyTeam(route.params?.MyTeam);
    
    // TournamentMyTeam();
  }, [(route.params)]);
  return (
    <View style={styles.Container}>
      <View style={styles.width100}>
        <Pressable onPress={() => 
        {
          navigation.navigate("PlayerAddViaPhoneNo",{
            PLayer_RedirectPage: "PlayerPageMain",
            MyTeam : MyTeam,
            MyTeamId :MyTeamId
           })          
        }}>
        <View style={[styles.width25, { marginTop: 20, marginLeft: 20 }]}>
          <Image
            source={{
              uri:
                "" +
                global.domainName +
                "/CricbuddyAdmin/Content/assets/MyTeam/dialing_mobile_no.png",
            }}
            style={{ height: 50, width: 50 }}
          />
        </View>
        </Pressable>
        
        <View style={styles.width75}>
        <Pressable onPress={() => 
        {
          navigation.navigate("PlayerAddViaPhoneNo",{
            PLayer_RedirectPage: "PlayerPageMain",
            MyTeam : MyTeam,
            MyTeamId :MyTeamId
           })          
        }}>
          <Text style={{fontSize:18,color:Color.FontColor}}>Add Via Phone Number</Text>
          <Text style={{fontSize:14,color:Color.Texttitle}}>Best for adding 1 or 2 players quickly.</Text>
          </Pressable>
        </View>
        
       
      </View>
      
    </View>
  );
};

export default PlayerAdd;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#E8E3E3",
    borderColor: "#fff",
    borderWidth: 10,
  },
  width100: {
    width: "100%",
    flexDirection: "row",
  },
  width25: {
    width: "25%",
    marginTop: 20, marginLeft: 20
  },
  width75: {
    width: "75%",
    marginTop: 20, marginLeft: 0
  },
 
});
