import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useNavigation } from "@react-navigation/native";

const TouranmentCategory = () => {
  console.log("Navigation/Screen/Tournament/DropDownAdd/TouranmentCategory.js")
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState([]);
  useEffect(() => {
    TouranmentCategory_GET();
    // console.log(Dimensions.get("window").height)
  }, []);
  const TouranmentCategory_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Common/5`,
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
  const ChangeSelectItem = (Categoryid, Categorytitle) => {
    navigation.navigate("TournamentRegistration", {
        Categoryid,
        Categorytitle,
    });
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <AutocompleteDropdown
        // suggestionsListMaxHeight={Dimensions.get("window").height * 0.9}
        // suggestionsListTextStyle={{
        //   backgroundColor:"black",
        //   color:"white"
        // }}
        textInputProps={{
          placeholder: "Search Category",
          autoFocus: true,
          autoCorrect: false,
          autoCapitalize: "none",
          style: {
            // borderRadius: 25,
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

export default TouranmentCategory