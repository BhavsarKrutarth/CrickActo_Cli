import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const TouranamentGround = () => {
  console.log("Navigation/Screen/Tournament/DropDownAdd/TouranamentGround.js")
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedItem, setSelectedItem] = useState([{id:1,value:'test'},{id:2,value:'test2'},{id:3,value:'test3'}]);
const [PageRedirect,setPageRedirect] = useState(null);

  useEffect(() => {
    PAYINGROLE_GET();
    // console.log(Dimensions.get("window").height)

    if(route.params?.PageRedirect)
      setPageRedirect(route.params?.PageRedirect)

  }, [route.params]);
  const PAYINGROLE_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Common/4`,
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
  const ChangeSelectItem = (Groundid, Groundtitle) => {
     navigation.navigate(PageRedirect, {
      Groundid,
      Groundtitle,
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
          placeholder: "Search Ground",
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

export default TouranamentGround