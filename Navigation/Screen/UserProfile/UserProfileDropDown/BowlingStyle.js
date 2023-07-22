import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const BowlingStyle = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [MobileNo, setMobileNo] = useState(null);
  const [BowlingItem, setBowlingItem] = useState([])
  React.useEffect(() => {
    if(route.params?.MobileNo)
        setMobileNo(route.params?.MobileNo)
        BowlingStyle_GET();
  }, [(route.params)]);
  const BowlingStyle_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Common/3`,
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
            setBowlingItem(setarray);
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
  const ChangeSelectItem = (Bowlingstyleid,Bowlingstyletitle) => {
    navigation.navigate('UserProfileEdit', {
         MobileNo,  
        Bowlingstyleid,
        Bowlingstyletitle

    })
  }

  return (
    <View style={{backgroundColor: 'white',}}>
      <AutocompleteDropdown
        textInputProps={{
          placeholder: 'Search City',
          autoFocus:true,
          autoCorrect: false,
          showChevron:false,
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
        dataSet={BowlingItem}
      />
    </View>
  )
}

export default BowlingStyle
