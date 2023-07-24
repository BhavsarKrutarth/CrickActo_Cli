import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Color from "../../../../Color/Color";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import InertNetCheck from "../../InertNetCheck";
import Checkbox from "expo-checkbox";
import { Pressable } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const UserProfileCity = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [CityIdError, setCityIdError] = useState(false);
  const [CityName, setCityName] = useState(null);
  const [CityId, setCityId] = useState(null);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(0);
  const [FirstTimeIn, setFirstTimeIn] = useState(0);
  const [GroundName, setGroundName] = useState(null);
  const [PageRedirect, setPageRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [AddNewGround, setAddNewGround] = useState(null);

  React.useEffect(() => {
    if (route.params?.PageRedirect) setPageRedirect(route.params?.PageRedirect);

    console.log(
      "Navigation/Screen/UserProfile/UserProfileDropDown/UserProfileCity.js"
    );

    if (route.params?.CityId == undefined) {
      setCityId(global.CityId);
      setCityName(global.CityName);
      ClearControll();
      startLoading();
      fetchData(global.CityId);
    }

    if (route.params?.CityId) {
      setCityIdError(false);
      setCityId(route.params?.CityId);
      ClearControll();
      startLoading();
      fetchData(route.params?.CityId);
    }

    if (route.params?.CityName) setCityName(route.params?.CityName);
  }, [route.params]);

  const startLoading = () => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  };

  const ClearControll = () => {
    setTotalPage(0);
    setPage(1);
    setData([]);
  };
  const fetchData = async (CityId) => {
    console.log(page)
    setIsLoading(true);
    try {
      var data = {
        PAGEINDEX: page,
        PAGECOUNT: 30,
        SPNAME: "COMMON_CITYMASTER_GET",
      };

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "COMMON_CITYMASTER_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          setLoading(false);
          if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              setTotalPage(BindData.SERVICERESPONSE.TOTALPAGES);
              
              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                if (List) {
                  List.forEach((List) => {
                    setarray.push({
                      id: List.CITYID,
                      CityName: List.CITYNAME,
                      StateId: List.STATEID,
                      StateName: List.STATENAME,
                      CountryId: List.COUNTRYID,
                      CountryName: List.COUNTRYNAME,
                      PersonIn: "false",
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                      id: List.CITYID,
                      CityName: List.CITYNAME,
                      StateId: List.STATEID,
                      StateName: List.STATENAME,
                      CountryId: List.COUNTRYID,
                      CountryName: List.COUNTRYNAME,
                      PersonIn: "false",
                });
              }
              setPage((prevPage) => prevPage + 1);
              setData((prevData) => [...prevData, ...setarray]);

              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } catch (error) {
      alert(error);
      setIsLoading(false);
      return;
    } finally {
    }
  };
  const SerchByCall = async (CityId) => {
    setIsLoading(true);
    try {
      var data = {
        PAGEINDEX: 1,
        PAGECOUNT: 30,
        SPNAME: "COMMON_CITYMASTER_GET",
        WHERE_EQ_SEARCH:CityName
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "COMMON_CITYMASTER_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          setLoading(false);
          if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              setTotalPage(BindData.SERVICERESPONSE.TOTALPAGES);
              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                if (List) {
                  List.forEach((List) => {
                    setarray.push({
                      id: List.CITYID,
                      CityName: List.CITYNAME,
                      StateId: List.STATEID,
                      StateName: List.STATENAME,
                      CountryId: List.COUNTRYID,
                      CountryName: List.COUNTRYNAME,
                      PersonIn: "false",
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                      id: List.CITYID,
                      CityName: List.CITYNAME,
                      StateId: List.STATEID,
                      StateName: List.STATENAME,
                      CountryId: List.COUNTRYID,
                      CountryName: List.COUNTRYNAME,
                      PersonIn: "false",
                });
              }
              setPage((prevPage) => prevPage + 1);
              setData((prevData) => [...prevData, ...setarray]);

              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } catch (error) {
      alert(error);
      setIsLoading(false);
      return;
    } finally {
    }
  };

  
  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      if (TotalPage >= page) {
        startLoading();
        fetchData();
        // console.log(page)
        // console.log(TotalPage)
      }
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.width100}>
        <View style={styles.item}>
          <View
            style={[
              styles.width100,
              { justifyContent: "space-between", flexDirection: "row" },
            ]}
          >
            <Text style={{color:Color.FontColor}}>
             {item.CityName}
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={item.PersonIn === "true" ? true : false}
              onValueChange={() => {
                //    handleCheck(item.id, item.GroundName)}
                handleCheck(item.id,item.CityName)
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  
  function handleCheck(Cityid,CityName) {
    navigation.navigate(PageRedirect, {
      CityId : Cityid,
      CityName: CityName,
      MobileNo : global.MobileNo
  });
  }

  const BtnNext = () => {
    const NewBindData = [];
    var Temp_length = 0;
    data.forEach(element => 
      {
        if(element.PersonIn == "true")
        {
          Temp_length = 1;
          NewBindData.push({id : element.id,name : element.GroundName})
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
  return (
    <View style={styles.Container}>
      

      <View
        style={[
          styles.width100,
          styles.fr,
          { justifyContent: "space-between" ,marginBottom:10},
        ]}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold",color:Color.FontColor }}>
          City list</Text>
      </View>
      <View style={[styles.width100, styles.fr,]}>
        <View style={styles.r40}>
          <Text style={styles.title40}>Select City</Text>
        </View>
        <View style={styles.r60}>
          <TextInput
            KeyboardAvoidingView={true}
            placeholder="select City / Town"
            style={{
              color:Color.FontColor,
              borderBottomWidth: 2,
              borderBottomColor:
                CityIdError == false ? Color.Texttitle : Color.ErrorColor,
            }}
            value={CityName}
            onChangeText={(text) => setCityName(text)}
          />
        </View>
      </View>
      <View style={[styles.width100, styles.fr]}>
        <Pressable
          style={styles.btnserch}
          onPress={() => {
            console.log('btn click ')
            
            setTotalPage(0);
            setData([])
            setPage(1)
            startLoading();
            SerchByCall();
          }}
        >
          <Text style={styles.btntext}>Search</Text>
        </Pressable>
      </View>

      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <View style={[styles.width100, { marginBottom: 10,height:"80%" }]}>
        {data.length != 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Image
            style={{ width: "100%", height: 400 }}
            source={{
              uri: `${global.domainName}/CricbuddyAdmin/Content/assets/no_records.png`,
            }}
          />
        )}
      </View>
      <InertNetCheck />
    </View>
  );
};

export default UserProfileCity;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    position: "relative",
  },
  width100: {
    width: "100%",
  },
  img: {
    height: 60,
    width: 60,
    borderColor: "#077b8a",
    borderWidth: 2,
    // backgroundColor: "#DC7633",
    color: Color.WhiteBGColor,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgtitle: {
    color: Color.WhiteBGColor,
    fontSize: 18,
    fontWeight: "700",
  },
  btn: {
    borderColor: Color.LightGreenBorder,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.LightGreen,
    borderRadius: 10,
  },
  btntxt: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  MatchTypeBox: {
    borderColor: Color.LightGreenBorder,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  MatchTypetxt: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
  Title: {
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    elevation: 2,
    padding: 12,
    alignItems: "center",
    color: "green",
  },
  modalcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    margin: 10,
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
  modalbutton: {
    padding: 10,
  },
  modalbuttonOpen: {
    backgroundColor: "#F194FF",
  },
  modalbuttonClose: {
    backgroundColor: Color.LightGreen,
  },
  modaltextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modaltxtStyle: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "900",
  },
  modaltitleText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 24,
    fontWeight: "900",
    color: Color.PrimaryColor,
  },
  modaltxt: {
    fontSize: 16,
    fontWeight: "700",
  },
  flexDirectionrow: {
    flexDirection: "row",
  },
  input: {
    //height: 40,
    //paddingLeft: 12,
    borderBottomWidth: 2,
    borderBottomColor: Color.Texttitle,
  },
  image: {
    width: 20,
    height: 20,
  },
  item: {
    marginVertical: 10,
    height: 40,
    width: "100%",
    fontSize: 18,
    borderColor: Color.Texttitle,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },
  BannerBox: {
    // marginLeft: 10,
    // marginTop: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    width: "100%",
    backgroundColor: Color.NavigationColor,
  },
  BannerSpaceBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  BannerTitle: {
    color: "white",
    fontSize: 15,
  },
  imageBanner: {
    height: 100,
    width: 100,
  },
  Banner: {
    alignItems: "center",
    borderBottomColor: Color.Texttitle,
    borderBottomWidth: 5,
    height: 200,
    justifyContent: "center",
  },
  fr: {
    flexDirection: "row",
  },
  r40: {
    width: "40%",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  r60: {
    width: "60%",
  },
  title40: {
    fontSize: 16,
    fontWeight: "600",
    color:Color.FontColor
  },
  btnserch: {
    padding: 10,
    backgroundColor: Color.PrimaryColor,
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 40,
  },
  buttonOpen: {
    backgroundColor: Color.PrimaryColor,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:Color.FontColor
  },
});
