import { StyleSheet, Text, View, SafeAreaView, FlatList,RefreshControl,Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Color from "../../../../../Color/Color";

const TournamentMatch_Bowl = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [BindData, setBindData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    Bind_Best_Batsman();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  /* -----------------------refreshing ------------------------------*/
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  /* -----------------------refreshing ------------------------------*/

  const Bind_Best_Batsman = async () => {
    try {
      var data = {
        TOURNAMENTID: global.Tournamentid,
        SPNAME: "TOURNAMENTMATCH_BOWL_GET",
      };

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "TOURNAMENTMATCH_BOWL_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            var List = [];
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              if (List.length > 1) setBindData(List);
              else setBindData([List]);
              // if (List.length > 1) setPointTableData(List);
              // else setPointTableData([List]);

              // setFistTimeLoad(false);
            }
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

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentLeaderBoard/TournamentMatch_Bowl.js"
    );
    Bind_Best_Batsman();
  }, []);
  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.body100,
        {
          padding: 10,
          borderColor: Color.borderColor,
          borderWidth: 2,
          marginBottom: 10,
        },
      ]}
    >
      <View style={styles.flexrow}>
        <Text style={{color:Color.FontColor}}>
          {index + 1} ) {item.BowlerName} - {item.TeamName}
        </Text>
      </View>
      <View style={[styles.body100, styles.flexrow]}>
        <Text style={{color:Color.FontColor}}>Inning : {item.Inning}</Text>
        <Text style={{ marginHorizontal: 4,color:Color.FontColor }}>|</Text>
        <Text style={{color:Color.FontColor}}>Out : {item.OutCount}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.Container}>
      {BindData.length == 0 ? (
        <View>
          <View style={{ width: "100%" }}>
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
              <Image
                source={{
                  uri:
                    "" +
                    global.domainName +
                    "/CricbuddyAdmin/Content/assets/tournament/tournament_Background.png",
                }}
                style={{ marginTop: 10, height: 400, width: "auto" }}
              />
            </RefreshControl>
          </View>
        </View>
      ) : (
        <SafeAreaView style={[styles.Container]}>
          <View style={[{ height: "100%", marginTop: 10 }]}>
            {/* -------------------------------- List ----------------------------------------- */}
            <FlatList
              data={BindData}
              renderItem={renderItem}
              keyExtractor={(item) => item.BowlerPlayerid}
              // ListHeaderComponent={renderHeader}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default TournamentMatch_Bowl;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  body100: {
    width: "100%",
  },
  flexrow: {
    flexDirection: "row",
  },
});
