import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const MatchShortArea = () => {
  React.useEffect(() => {
    console.log("Navigation/Screen/Match/MatchRegister/MatchShortArea.js");
  }, [(route.params,Matchid)]);

  return (
    <View style={styles.Container}>
      <View
        style={[
          styles.body100,
          { justifyContent: "center", alignItems: "center", marginTop: 10 },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 2, backgroundColor: "#cfcfcf" }} />
          <View>
            <Text style={{ width:100, textAlign: "center",fontSize:16,fontWeight:"600" }}>Shot Area</Text>
          </View>
          <View style={{ flex: 1, height: 2, backgroundColor: "#cfcfcf" }} />
        </View>
      </View>
      <View style={[styles.body100,{justifyContent:"center",alignItems:"center"}]}>
        <Text style={{fontSize:20,fontWeight:"600"}}>Wagon Wheel</Text>
      </View>
      <View style={{}}></View>
    </View>
  );
}

export default MatchShortArea

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding:10
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
})