import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useNavigation } from "@react-navigation/native";

const TouranmentPitchType = () => {
  console.log("Navigation/Screen/Tournament/DropDownAdd/TouranmentPitchType.js");
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState([]);
  useEffect(() => {
    TouranmentPitchType_GET();
    // console.log(Dimensions.get("window").height)
  }, []);
  const TouranmentPitchType_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Common/7`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var PayingRoleData = JSON.parse(json);
          if (PayingRoleData.SERVICERESPONSE.RESPONSECODE == "0") {
            var DataTransfer =
              PayingRoleData.SERVICERESPONSE.DETAILSLIST.DETAILS;

            var setarray = [];
            DataTransfer.forEach((DataTransfer) => {
              setarray.push({
                id: DataTransfer.ID,
                title: DataTransfer.NAME,
              });
            });
            setSelectedItem(setarray);
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
  const ChangeSelectItem = (PitchTypeid, PitchTypetitle) => {
    navigation.navigate("TournamentRegistration", {
        PitchTypeid,
        PitchTypetitle,
    });
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <AutocompleteDropdown
        textInputProps={{
          placeholder: "Search Pitch Type",
          autoFocus: true,
          autoCorrect: false,
          autoCapitalize: "none",
          style: {
            backgroundColor: "white",
            color: "black",
            paddingLeft: 18,
          },
        }}
        clearOnFocus={false}
        closeOnBlur={true}
        onSelectItem={(item) => {
          item && ChangeSelectItem(item.id, item.title);
        }}
        dataSet={selectedItem}
      />
    </View>
  );
};

export default TouranmentPitchType