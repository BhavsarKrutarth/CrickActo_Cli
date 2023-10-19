import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../Color/Color";
import { useState } from "react";

const Tournament_AddRound = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [RedirectPage,setRedirectPage] = useState(null);
  const [PageName,setPageName] = useState(null);

  React.useEffect(() => {
    console.log("Navigation/Screen/Tournament/TournamentMain_Navigation/Tournament_AddRound.js")
    console.log(route.params?.RedirectPage)
    if(route.params?.RedirectPage)
    {
      setRedirectPage(route.params?.RedirectPage);
    }

    if(route.params?.PageName)
    {
      setPageName(route.params?.PageName);
    }
  }, [route.params]);

  const [KnowOutImageName, setKnowOutImageName] = useState("down.png");
  const [KnowOutBgColor, setKnowOutBgColor] = useState("White");
  const [KnowOutBgText, setKnowOutBgText] = useState("black");
  const [knowOut, setknowOut] = useState([]);
  const KnowListdata = [
    { id: 1, RoundName: "Super Knockout",RoundType :"knock_Out" },
    { id: 2, RoundName: "Super League" ,RoundType :"knock_Out"},
    { id: 3, RoundName: "Round One" ,RoundType :"knock_Out" },
    { id: 4, RoundName: "Round Two" ,RoundType :"knock_Out" },
    { id: 5, RoundName: "Round Three" ,RoundType :"knock_Out" },
    { id: 6, RoundName: "Round Four" ,RoundType :"knock_Out" },
    { id: 7, RoundName: "Round Five" ,RoundType :"knock_Out" },
    { id: 8, RoundName: "Pre Quarter Final" ,RoundType :"knock_Out" },
    { id: 9, RoundName: "Quarter Final" ,RoundType :"knock_Out" },
    { id: 10, RoundName: "Semi Final" ,RoundType :"knock_Out" },
    { id: 11, RoundName: "Final" ,RoundType :"knock_Out" },
    { id: 12, RoundName: "Super Six" ,RoundType :"knock_Out" },
    { id: 13, RoundName: "Third Position" ,RoundType :"knock_Out" },
    { id: 14, RoundName: "Fourth Position" ,RoundType :"knock_Out" },
    { id: 15, RoundName: "Fifth Position" ,RoundType :"knock_Out" },
    { id: 16, RoundName: "Warm up Match" ,RoundType :"knock_Out" },
    { id: 17, RoundName: "Seven Position" ,RoundType :"knock_Out" },
    { id: 18, RoundName: "Nine Position" ,RoundType :"knock_Out" },
    { id: 19, RoundName: "Eleven Position" ,RoundType :"knock_Out" },
    { id: 20, RoundName: "Deciding Match" ,RoundType :"knock_Out" },
    { id: 21, RoundName: "1st Test" ,RoundType :"knock_Out" },
    { id: 22, RoundName: "2nd Test" ,RoundType :"knock_Out" },
    { id: 23, RoundName: "3rd Test" ,RoundType :"knock_Out" },
    { id: 24, RoundName: "4th Test" ,RoundType :"knock_Out" },
    { id: 25, RoundName: "5th Test" ,RoundType :"knock_Out" },
    { id: 26, RoundName: "LEAGUE MATCHES" ,RoundType :"knock_Out" },

  ];
  const [KnowselectedItems, setKnowselectedItems] = useState([]);
  const handleItemPress = (item) => {
    const index = KnowselectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (index === -1) {
      // Add the item to the selected items array
      setKnowselectedItems([...KnowselectedItems, item]);
    } else {
      // Remove the item from the selected items array
      const newKnowselectedItems = [...KnowselectedItems];
      newKnowselectedItems.splice(index, 1);
      setKnowselectedItems(newKnowselectedItems);
    }
  };

  const BtnSave = async (KnowselectedItems) => {
    try {
        var data = {
          oper: "Add",
          MobileNo:global.MobileNo,
          Tournamentid: global.Tournamentid,
          KnowselectedItems:KnowselectedItems,
          SPNAME: "TOURNAMENT_ROUND_CRUD",
        }
  
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/Tournament_Round/`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              SpName: "TOURNAMENT_ROUND_CRUD",
            },
            body: JSON.stringify(data)
          }
        )
          .then((response) => response.json())
          .then((json) => {
            var BindData = JSON.parse(json);
            var List;
            if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
              console.log(RedirectPage)
                navigation.navigate(RedirectPage, {
                LoadRef: "True",
                PageName:PageName,
              })
            }
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        alert(error);
        return;
      } finally {
      }
}

  const Know_renderItem = ({ item }) => {
    const isSelected = KnowselectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
    var Know_BorderColor = "";
    var Know_ImageName = "";

    if (isSelected) {
      Know_BorderColor = Color.PrimaryColor;
      Know_ImageName = "check_Color";
    } else {
      Know_BorderColor = Color.backgroundColor;
      Know_ImageName = "check_Light";
    }
    return (
      <View style={{ padding: 2 }}>
        <TouchableOpacity onPress={() => handleItemPress(item)}>
          <View
            style={{
              borderColor: Know_BorderColor,
              borderWidth: 3,
              backgroundColor: "white",
              padding: 10,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600",color:Color.FontColor }}>
              {item.RoundName}
            </Text>
            <Image
              source={{
                uri:
                  "" +
                  global.domainName +
                  `/CricbuddyAdmin/Content/assets/${Know_ImageName}.png`,
              }}
              style={styles.Image}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <Pressable
        style={[
          styles.body100,
          styles.knowOutTitle,
          { backgroundColor: KnowOutBgColor },
        ]}
        onPress={() => {
          if (KnowOutImageName == "down.png") {
            setKnowOutImageName("up1.png");
            setKnowOutBgColor("#2a373f");
            setKnowOutBgText("white");
          } else {
            setKnowOutImageName("down.png");
            setKnowOutBgColor("white");
            setKnowOutBgText("black");
            setKnowselectedItems([]);
          }
        }}
      >
        <Text style={{ color: KnowOutBgText, fontSize: 18, fontWeight: "500" }}>
          Know Out
        </Text>
        <Image
          source={{
            uri:
              "" +
              global.domainName +
              `/CricbuddyAdmin/Content/assets/${KnowOutImageName}`,
          }}
          style={styles.Image}
        />
      </Pressable>
      <View style={{ flex: 1, backgroundColor: Color.backgroundColor }}>
        {KnowOutImageName == "up1.png" ? (
          <FlatList
            data={KnowListdata}
            renderItem={Know_renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={KnowselectedItems}
          />
        ) : null}
        {KnowselectedItems.length > 0 ? (
          <View style={styles.body100}>
            <Pressable
              onPress={() => {
                 //console.log(KnowselectedItems);
                // console.log(global.Tournamentid);
                // console.log(global.TournamentName);
                BtnSave(KnowselectedItems)

              }}
              style={{
                backgroundColor: Color.PrimaryColor,
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 14 }}>
                Done
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  knowOutTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Color.backgroundColor,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  Image: {
    height: 20,
    width: 20,
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
});

export default Tournament_AddRound;
