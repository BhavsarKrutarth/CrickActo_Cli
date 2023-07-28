import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../Color/Color";
// import { color } from "react-native-reanimated";
import { Alert } from "react-native";
const Tournament_Rounds = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [ListItems, setListItems] = useState([]);
  const [LoadRef, setLoadRef] = useState(null);

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentRightSide_Navigation/Tournament_Rounds.js"
    );
    Tournament_RoundList_GET();

    if (route.params?.LoadRef) {
      Tournament_RoundList_GET();
      Alert.alert(
        "Add Groups",
        "If you need point table,you will have to add groups.Do you want to add Groups now?",
        [
          {
            text: "YES I'M SURE",
            onPress: () => {
              navigation.navigate("Tournament_AddGroups",{
                RedirectPage: "Tournament_Rounds",
              });
            },
            style: "cancel",
          },
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
        ]
      );
    }
  }, [route.params]);

  const Tournament_RoundList_GET = async () => {
    try {
      var data = {
        Tournamentid: global.Tournamentid,
        MobileNo: global.MobileNo,
        SPNAME: "TOURNAMENT_ROUND_GET",
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/` + global.MobileNo,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            MobileNo: global.MobileNo,
            Tournamentid: global.Tournamentid,
            SpName: "TOURNAMENT_ROUND_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
            List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
            var setarray = [];
            if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
              if (List) {
                List.forEach((List) => {
                  setarray.push({
                    id: List.Roundid,
                    Tournamentid: List.Tournamentid,
                    RoundType: List.RoundType,
                    RoundName: List.RoundName,
                  });
                });
              }
            } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
              setarray.push({
                id: List.Roundid,
                Tournamentid: List.Tournamentid,
                RoundType: List.RoundType,
                RoundName: List.RoundName,
              });
            }
            setListItems(setarray);
          } else if (BindData.SERVICERESPONSE.TOTALRECORDS == "0") {
            setListItems([]);
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
  };
  const RemoveCRUD = async (id) => {
    {
      try {
        var data = {
          oper: "Delete",
          Roundid: id,
          MobileNo: global.MobileNo,
          SPNAME: "TOURNAMENT_ROUND_CRUD",
        };
        const resposneJSON = await fetch(
          `${global.domainName}/cricbuddyAPI/api/CommonSp`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
              SpName: "TOURNAMENT_ROUND_CRUD",
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => response.json())
          .then((json) => {
            var BindData = JSON.parse(json);
            var List;
            if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
              Tournament_RoundList_GET();
            } else if (BindData.SERVICERESPONSE.RESPONSECODE == "-1") {
              alert(BindData.SERVICERESPONSE.RESPONSEMESSAGE);
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
  };
  const Remove = async (id) => {
    Alert.alert("Confirmation", "Are you sure you want to delete ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          RemoveCRUD(id);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.FlateListBorder}>
        <View>
          <Text style={[styles.FlateListText,{color:Color.FontColor}]}>{item.RoundName}</Text>
        </View>
        <View>
          <Pressable onPress={() => Remove(item.id)}>
            <Image
              style={{width:25,height:25}}
              source={{
                uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Remove.jpg`,
              }}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { position: "relative" }]}>
      <View style={[styles.body100]}>
        {ListItems.length > 0 ? (
          <SafeAreaView>
            <FlatList
              data={ListItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
            />
          </SafeAreaView>
        ) : (
          <Image
            style={{ width: 400, height: 400 }}
            source={{
              uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Round.jpg`,
            }}
          />
        )}
      </View>

      <View
        style={[
          styles.body100,
          { flexDirection: "row", bottom: 0, position: "absolute" },
        ]}
      >
        <View style={[styles.body100, styles.btn_Background]}>
          <Pressable
            onPress={() => {
              navigation.navigate("Tournament_AddRound", {
                RedirectPage: "Tournament_Rounds",
              });
            }}
          >
            <Text style={{ color: "white" }}>Add Round</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  body100: {
    width: "100%",
  },
  btn_Background: {
    alignItems: "center",
    backgroundColor: Color.PrimaryColor,
    padding: 7,
    borderRadius: 25,
  },
  FlateListBorder: {
    padding: 10,
    backgroundColor: "white",
    borderColor: Color.GunmetalGray,
    borderWidth: 2,
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  FlateListText: {
    fontSize: 15,
    fontWeight: "600",
  },
  subimage: {
    height: "100%",
    width: 20,
  },
});
export default Tournament_Rounds;
