import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const BattingStyle = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [MobileNo, setMobileNo] = useState(null);
  const [PAYINGROLENAME, setPAYINGROLENAME] = useState(null);
  const [PayingRoletitle, setPayingRoletitle] = useState(null);
  const [PayingRoleid, setPayingRoleid] = useState([]);
  const [selectedItem, setSelectedItem] = useState([])
  React.useEffect(() => {
    if(route.params?.MobileNo)
        setMobileNo(route.params?.MobileNo)
    BattingStyle_GET();

  }, [(route.params?.MobileNo)]);
  const BattingStyle_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Common/2`,
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

            var setarray = [],
              CheckTransferName = "";
            DataTransfer.forEach((DataTransfer) => {
              setarray.push({
                id: DataTransfer.ID,
                title: DataTransfer.NAME,
              });
              CheckTransferName = DataTransfer.ID;
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
  const ChangeSelectItem = (Battingstyleid,Battingstyletitle) => {
    navigation.navigate('UserProfileEdit', {
        MobileNo,
        Battingstyleid,
        Battingstyletitle

    })
  }

  return (
    <View style={{backgroundColor: 'white',}}>
      <AutocompleteDropdown
        textInputProps={{
          placeholder: 'Search City',
          autoFocus:true,
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            // borderRadius: 25,
            backgroundColor: 'white',
            color: 'black',
            paddingLeft: 18,
          },
        }}
        clearOnFocus={false}
        closeOnBlur={true}
        onSelectItem={(item) => {
          item && ChangeSelectItem(item.id,item.title);
        }}
        dataSet={selectedItem}
      />
    </View>
  )
}

export default BattingStyle
