// import React in our code
import React, { useState, useEffect } from "react";
// import all the components we are going to use
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
// import MultiSelect library
// import MultiSelect from "react-native-multiple-select";
import Color from "../../../../Color/Color";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

// Dummy Data for the MutiSelect
// const items = [
//   // name key is must. It is to show the text in front
//   {id: 1, name: 'angellist'},
//   {id: 2, name: 'codepen'},
//   {id: 3, name: 'envelope'},
//   {id: 4, name: 'etsy'},
//   {id: 5, name: 'facebook'},
//   {id: 6, name: 'foursquare'},
//   {id: 7, name: 'github-alt'},
//   {id: 8, name: 'github'},
//   {id: 9, name: 'gitlab'},
//   {id: 10, name: 'instagram'},
// ];

const MultiSelectTournamentGround = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Data Source for the SearchableDropdown
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsText, setselectedItemsText] = useState([]);
  const [items, setitems] = useState([]);
  const [filteredItems, setfilteredItems] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [NewGroundName, setNewGroundName] = useState(null);
  const [PageRedirect, setPageRedirect] = useState(null);

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
    // console.log(items)
    // console.log(selectedItems);
    setfilteredItems(items.filter((item) => selectedItems.includes(item.id)));
  };

  useEffect(() => {
    console.log(
      "Navigation/Screen/Tournament/DropDownAdd/MultiSelectTournamentGround.js"
    );
    BindGroundDeatils_Get();

    if (route.params?.PageRedirect) setPageRedirect(route.params?.PageRedirect);
  }, []);

  const BtnNext = () => {
    const NewBindData = [];
    var Temp_length = 0;
    items.forEach(element => 
      {
        if(element.Chk == "true")
        {
          Temp_length = 1;
          NewBindData.push({id : element.id,name : element.name})
        }
          
      }
    );
     
    if (Temp_length == 1) {
      navigation.navigate(PageRedirect, {
        MultiSelect_Groupname: NewBindData,
      });
    } else {
      alert("Please select at list one ground.");
    }
  };
  const BindGroundDeatils_Get = async () => {
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
                name: DataTransfer.NAME,
                Chk:false
              });
            });
            setitems(setarray);
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
  const handleSubmit = () => {
    // console.log("Selected items:", selectedItems);
    // Perform any additional actions here, such as submitting the selected items to a server
  };
  const AddNewGroup = async () => {
    try {
      var data = {
        oper: "add",
        GROUPNAME: NewGroundName,
        SPNAME: "GROUND_CRUD",
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "GROUND_CRUD",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          // console.log(BindData)

          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            alert("Group add sucessfully.");
            setmodalVisible(false);
            BindGroundDeatils_Get();
            setNewGroundName(null);
          } else {
            alert("Error: internal server error");
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

  const renderItem = ({ item, index }) => (
    <View style={{ padding: 10 }}>
      <View
        style={[
          styles.body100,
          {
            padding: 10,
            borderColor: "#eaeaea",
            borderWidth: 2,
            justifyContent: "space-between",
            flexDirection: "row",
          },
        ]}
      >
        <Text>{index + 1} - {item.name}</Text>
        <Checkbox
          value={item.Chk === "true" ? true : false}
          onValueChange={() => handleCheck(item.id)}
          style={{ marginRight: 12, marginTop: 5, height: 25, width: 25 }}
        />
      </View>
    </View>
  );
  const handleCheck = (TeamRegistrationId) => {
    
    const updatedData = items.map((item) => {
      var tempdata = "";
      
      if(item.Chk == "false")
      {
        tempdata = "true"
      }
      else 
      {
        tempdata = "false"
      }
      
      if (item.id === TeamRegistrationId) {
        // console.log(item.id)
        // console.log(TeamRegistrationId)
        return { ...item, Chk: tempdata};
        
      }
      
      return item;
      
    });
    
    // console.log(updatedData)
    setitems(updatedData);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, { height: "100%" }]}>
        <View style={[styles.body100, { position: "relative" }]}>
          <View style={[styles.body100, { marginBottom: 10, height: "10%" }]}>
            <Pressable
              onPress={() => {
                setmodalVisible(false);
                setmodalVisible(true);
              }}
              style={styles.AddNewGroupbtn}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={{
                  uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tournament/icon_plus.png`,
                }}
              />
              <Text style={{ marginLeft: 10, fontSize: 18 }}>
                Add New Ground
              </Text>
            </Pressable>
          </View>
          <View style={[styles.body100, { paddingBottom: 25, height: "80%" }]}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={[{ height: "10%" }]}>
            <Pressable
              style={[styles.button, styles.body100]}
              onPress={() => BtnNext()}
            >
              <Text style={styles.footerText}>NEXT</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({ modalVisible: !modalVisible });
        }}
      >
        <View style={[styles.Modal_centeredView]}>
          <View style={[styles.Modal_modalView, { width: "100%" }]}>
            <View style={[styles.body100, { alignItems: "center" }]}>
              <Text style={styles.Modal_modalText}>Add Ground Name</Text>
            </View>
            <View style={[styles.body100, { width: "100%" }]}>
              <TextInput
                style={[styles.input, { width: "100%" }]}
                value={NewGroundName}
                onChangeText={(text) => {
                  setNewGroundName(null);
                  setNewGroundName(text);
                }}
                placeholder="Enter Ground"
              />
            </View>
            <View style={[styles.Modal_Footer]}>
              <View style={styles.body50}>
                <Pressable
                  onPress={() => {
                    setNewGroundName(null);
                    setmodalVisible(false);
                  }}
                  style={styles.Modla_Cancelbtn}
                >
                  <Text style={styles.Modal_Cancelbtn_text}>CANCEL</Text>
                </Pressable>
              </View>
              <View style={styles.body50}>
                <Pressable
                  style={styles.Modal_okbtn}
                  onPress={() => {
                    AddNewGroup();
                  }}
                >
                  <Text style={styles.Modal_okbtn_text}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MultiSelectTournamentGround;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headingText: {
    padding: 8,
  },
  body100: {
    width: "100%",
  },
  body80: {
    width: "90%",
  },
  body20: {
    width: "10%",
  },
  body50: {
    width: "50%",
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
    backgroundColor: Color.PrimaryColor,
  },
  footerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  Modal_centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  Modal_modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Modal_button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  Modal_buttonOpen: {
    backgroundColor: "#F194FF",
  },
  Modal_buttonClose: {
    backgroundColor: "#2196F3",
  },
  Modal_textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  Modal_modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  AddNewGroupbtn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color.borderColor,
    borderWidth: 2,
    padding: 7,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Color.Texttitle,
  },
  Modal_Footer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  Modla_Cancelbtn: {
    backgroundColor: "#e7e8ea",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Modal_Cancelbtn_text: {
    fontWeight: "500",
  },
  Modal_okbtn: {
    backgroundColor: Color.PrimaryColor,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Modal_okbtn_text: {
    color: "white",
    fontWeight: "500",
  },
});
