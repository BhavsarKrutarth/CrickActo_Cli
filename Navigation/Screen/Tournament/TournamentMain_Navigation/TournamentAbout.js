import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Color from "../../../../Color/Color";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function TournamentAbout() {
  const navigation = useNavigation();
  const route = useRoute();
  const [TournamentName, setTournamentName] = useState(null);
  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const [CityName, setCityName] = useState(null);
  const [GroundName, setGroundName] = useState(null);
  const [OrganiserName, setOrganiserName] = useState(null);
  const [OrganiserNo, setOrganiserNo] = useState(null);
  const [Tournamentid, setTournamentid] = useState(null);

  React.useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/TournamentMain_Navigation/TournamentAbout.js"
    );
    BindTournamentDeatil();
  });

  const BindTournamentDeatil = async () => {
    try {
      var data = {
        TOURNAMENTID: global.Tournamentid,
        SPNAME: "TOURNAMENT_API_GET",
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "TOURNAMENT_API_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;

          if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              console.log(List)
              if (List.TOURNAMENTNAME) {
                if (List.TOURNAMENTNAME) setTournamentName(List.TOURNAMENTNAME);
                if (List.STARTDATE) setStartDate(List.STARTDATE);
                if (List.ENDDATE) setEndDate(List.ENDDATE);
                if (List.CITYTITLE) setCityName(List.CITYTITLE)
                if (List.GROUNDTITLE) setGroundName(List.GROUNDTITLE)
                if (List.ORGANISERNAME) setOrganiserName(List.ORGANISERNAME)
                if (List.ORGANISERNO) setOrganiserNo(List.ORGANISERNO)
                if (List.TOURNAMENTID) setTournamentid(List.TOURNAMENTID)
              }
              else {
                
                if (List[0].TOURNAMENTNAME) setTournamentName(List[0].TOURNAMENTNAME);
                if (List[0].STARTDATE) setStartDate(List[0].STARTDATE);
                if (List[0].ENDDATE) setEndDate(List[0].ENDDATE);
                if (List[0].CITYTITLE) setCityName(List[0].CITYTITLE)
                if (List[0].GROUNDTITLE) setGroundName(List[0].GROUNDTITLE)
                if (List[0].ORGANISERNAME) setOrganiserName(List[0].ORGANISERNAME)
                if (List[0].ORGANISERNO) setOrganiserNo(List[0].ORGANISERNO)
                if (List[0].TOURNAMENTID) setTournamentid(List[0].TOURNAMENTID)
              }


            } else {
              //setDisplayList("false")
            }
          } else {
            //alert("Error: UNAUTHORIZATION PERSON");
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

  return (
    <View style={[styles.Container]}>
      <View style={styles.body100}>
        <View style={styles.body30}>
          <Text style={styles.Title}>Name</Text>
        </View>
        <View style={styles.body70}>
          <Text style={styles.Title}>: {TournamentName}</Text>
        </View>
      </View>
      <View style={styles.body100}>
        <View style={styles.body30}>
          <Text style={styles.Title}>Date</Text>
        </View>
        <View style={styles.body70}>
          <Text style={styles.Title}>: {StartDate} To {EndDate}</Text>
        </View>
      </View>
      <View style={styles.body100}>
        <View style={styles.body30}>
          <Text style={styles.Title}>Location</Text>
        </View>
        <View style={styles.body70}>
          <Text style={styles.Title}>: {CityName}</Text>
        </View>
      </View>
      <View style={styles.body100}>
        <View style={styles.body30}>
          <Text style={styles.Title}>Ground Name</Text>
        </View>
        <View style={styles.body70}>
          <Text style={styles.Title}>: {GroundName}</Text>
        </View>
      </View>
      <View style={styles.body100}>
        <View style={styles.body30}>
          <Text style={styles.Title}>Organiser Name</Text>
        </View>
        <View style={styles.body70}>
          <Text style={styles.Title}>: {OrganiserName}</Text>
        </View>
      </View>
      <View style={styles.body100}>
        <View style={styles.body30}>
          <Text style={styles.Title}>Organiser No</Text>
        </View>
        <View style={styles.body70}>
          <Text style={styles.Title}>: {OrganiserNo}</Text>
        </View>
      </View>
      <View style={styles.body100}>
        <View style={styles.body30}>
          <Text style={styles.Title}>Tournament id</Text>
        </View>
        <View style={styles.body70}>
          <Text style={styles.Title}>: {Tournamentid}</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
  },
  body100: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
  },
  body30: {
    width: "30%",
  },
  body70: {
    width: "70%",
  },
  body60: {
    width: "60%",
  },
  Title: {
    fontSize: 16,
    color: Color.Texttitle,
  },
});
