import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
// import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import Color from "../../../../Color/Color";

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
                label: DataTransfer.NAME,
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
  const _renderItem = item => {
    return (
      <View style={{
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text style={{
          flex: 1,
          fontSize: 16,
          color: Color.FontColor,
          paddingLeft: 10
        }}>{item.title}</Text>
        {/* <Image style={styles.icon} source={require('./assets/tick.png')} /> */}
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <Dropdown
        placeholderStyle={[{ color: Color.PrimaryColor, fontSize: 16, }]}
        selectedTextStyle={[{ color: Color.FontColor, fontSize: 16, }]}
        inputSearchStyle={[{
          color: Color.FontColor, height: 40,
          fontSize: 16,
        }]}
        style={{
          backgroundColor: 'white',
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
          marginTop: 20,
        }}
        containerStyle={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
        data={selectedItem}
        search
        searchPlaceholder="Search"
        labelField="label"
        valueField="value"
        label="Select Category"
        placeholder="Select Category"
        // value={dropdown}
        onChange={item => {
          // setDropdown(item.value);
          // console.log('selected', item);
          item && ChangeSelectItem(item.id, item.title);
        }}
        renderItem={item => _renderItem(item)}
        textError="Error"
      />
      {/* <AutocompleteDropdown
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
      /> */}
    </View>
  );
};

export default TouranmentPitchType