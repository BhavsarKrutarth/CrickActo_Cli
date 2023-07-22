import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Color from "../../../Color/Color";
import { Switch } from "react-native-paper";

const Setting = () => {
  const [GroupList, setGroupList] = useState(false);
  const onGroupList = (value) => {
    setGroupList(!GroupList);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.width100}>
        <Text style={styles.HeaderTitle}> My Setting</Text>
      </View>
      <View style={[styles.width100]}>
        <View style={[styles.width40, { justifyContent: "center" }]}>
          <Text style={styles.Title}>Group Add List Model</Text>
        </View>
        <View
          style={[
            styles.width60,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Switch value={GroupList} onValueChange={onGroupList} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    margin: 10,
  },
  HeaderTitle: {
    padding: 5,
    fontWeight: "bold",
    fontSize: 25,
  },
  width100: {
    width: "100%",
    flexDirection: "row",
  },
  width40: {
    width40: "40%",
    flex:1
  },
  width60: {
    width60: "60%",
    flex:1

  },
  Title: {
    marginLeft: 10,
    fontWeight:"600",
    fontSize:18

  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Color.Texttitle,
    marginHorizontal: 10,
  },
});

export default Setting;
