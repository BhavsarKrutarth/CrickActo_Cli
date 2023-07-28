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

const MultiTournamentGroundNewList = () => {
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
      "Navigation/Screen/Tournament/DropDownAdd/MultiTournamentGroundNewList.js"
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
    setIsLoading(true);
    try {
      var data = {
        PAGEINDEX: page,
        PAGECOUNT: 30,
        CITYID: CityId,
        SPNAME: "TOURNAMENT_GROUP_GET",
        ACTIVEGROUND: 1,
      };
      if (GroundName) {
        data.GROUNDNAME = GroundName;
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            // PageIndex: page,
            // PageCount: 30,
            SpName: "GROUNDMASTER_GET",
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
                      id: List.Groundid,
                      CityId: List.CityId,
                      CityName: List.CityName,
                      StateId: List.StateId,
                      GroundName: List.GroundName,
                      AvailableToTimeText: List.AvailableToTimeText,
                      AvailableFromTimeText: List.AvailableFromTimeText,
                      ToHoursTime: List.ToHoursTime,
                      ToMiniteTime: List.ToMiniteTime,
                      FromHoursTime: List.FromHoursTime,
                      FromMiniteTime: List.FromMiniteTime,
                      CricketKit: List.CricketKit,
                      Ball: List.Ball,
                      Bat: List.Bat,
                      Stump: List.Stump,
                      GroundType: List.GroundType,
                      HourlyCharge: List.HourlyCharge,
                      ActiveGround: List.ActiveGround,
                      MobileNo: List.MobileNo,
                      ImageBanner: List.ImageBanner,
                      PayMentType: List.PayMentType,
                      PersonIn: "false",
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.Groundid,
                  CityId: List.CityId,
                  CityName: List.CityName,
                  StateId: List.StateId,
                  GroundName: List.GroundName,
                  AvailableToTimeText: List.AvailableToTimeText,
                  AvailableFromTimeText: List.AvailableFromTimeText,
                  ToHoursTime: List.ToHoursTime,
                  ToMiniteTime: List.ToMiniteTime,
                  FromHoursTime: List.FromHoursTime,
                  FromMiniteTime: List.FromMiniteTime,
                  CricketKit: List.CricketKit,
                  Ball: List.Ball,
                  Bat: List.Bat,
                  Stump: List.Stump,
                  GroundType: List.GroundType,
                  HourlyCharge: List.HourlyCharge,
                  ActiveGround: List.ActiveGround,
                  MobileNo: List.MobileNo,
                  ImageBanner: List.ImageBanner,
                  PayMentType: List.PayMentType,
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

  const AddNewGround_GETList = async (CityId) => {
    setIsLoading(true);
    try {
      var data = {
        PAGEINDEX: 1,
        PAGECOUNT: 30,
        CITYID: CityId,
        SPNAME: "TOURNAMENT_GROUP_GET",
        ACTIVEGROUND: 1,
      };
      if (GroundName) {
        data.GROUNDNAME = GroundName;
      }

      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/Commonsp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            // PageIndex: page,
            // PageCount: 30,
            SpName: "GROUNDMASTER_GET",
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
                      id: List.Groundid,
                      CityId: List.CityId,
                      CityName: List.CityName,
                      StateId: List.StateId,
                      GroundName: List.GroundName,
                      AvailableToTimeText: List.AvailableToTimeText,
                      AvailableFromTimeText: List.AvailableFromTimeText,
                      ToHoursTime: List.ToHoursTime,
                      ToMiniteTime: List.ToMiniteTime,
                      FromHoursTime: List.FromHoursTime,
                      FromMiniteTime: List.FromMiniteTime,
                      CricketKit: List.CricketKit,
                      Ball: List.Ball,
                      Bat: List.Bat,
                      Stump: List.Stump,
                      GroundType: List.GroundType,
                      HourlyCharge: List.HourlyCharge,
                      ActiveGround: List.ActiveGround,
                      MobileNo: List.MobileNo,
                      ImageBanner: List.ImageBanner,
                      PayMentType: List.PayMentType,
                      PersonIn: "false",
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.Groundid,
                  CityId: List.CityId,
                  CityName: List.CityName,
                  StateId: List.StateId,
                  GroundName: List.GroundName,
                  AvailableToTimeText: List.AvailableToTimeText,
                  AvailableFromTimeText: List.AvailableFromTimeText,
                  ToHoursTime: List.ToHoursTime,
                  ToMiniteTime: List.ToMiniteTime,
                  FromHoursTime: List.FromHoursTime,
                  FromMiniteTime: List.FromMiniteTime,
                  CricketKit: List.CricketKit,
                  Ball: List.Ball,
                  Bat: List.Bat,
                  Stump: List.Stump,
                  GroundType: List.GroundType,
                  HourlyCharge: List.HourlyCharge,
                  ActiveGround: List.ActiveGround,
                  MobileNo: List.MobileNo,
                  ImageBanner: List.ImageBanner,
                  PayMentType: List.PayMentType,
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
        // setPage((prevPage) => prevPage + 1);
        startLoading();
        fetchData(CityId);
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
              {item.GroundName} - {item.CityName}
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={item.PersonIn === "true" ? true : false}
              onValueChange={() => {
                //    handleCheck(item.id, item.GroundName)}
                handleCheck(item.id)
              }}
            />
          </View>
          <View style={styles.width100}>
            <Text style={{color:Color.FontColor}}>Hourly Charge : {item.HourlyCharge}</Text>
          </View>
          <View
            style={[
              styles.width100,
              { justifyContent: "space-between", flexDirection: "row" },
            ]}
          >
            <Text style={{color:Color.FontColor}}>
              Time : {item.AvailableToTimeText} - {item.AvailableFromTimeText}
            </Text>
            <Text
              style={{
                fontWeight: "900",
                fontSize: 16,
                color:
                  item.PayMentType == "Paid" ? Color.PrimaryColor : "green",
              }}
            >
              {item.PayMentType}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const btnAddModel = async () => {
    var url = `${global.domainName}/cricbuddyAPI/api/Commonsp`;

    var data = {
      OPER: "add",
      CITYID: CityId,
      CITYNAME: CityName,
      MOBILENO: global.MobileNo,
      GROUNDNAME: AddNewGround,
      AVAILABLETOTIMETEXT: "0",
      AVAILABLEFROMTIMETEXT: "0",
      TOHOURSTIME: 0,
      TOMINITETIME: 0,
      FROMHOURSTIME: 0,
      FROMMINITETIME: 0,
      CRICKETKIT: 0,
      BALL: 0,
      BAT: 0,
      STUMP: 0,
      GROUNDTYPE: "Ground",
      HOURLYCHARGE: 0,
      ACTIVEGROUND: true,
      IMAGEBANNER: "DeafultBanner.jpg",
      SPNAME: "GROUNDMASTER_CRUD",
      PAYMENTTYPE: "Free",
    };

    const resposneJSON = await fetch(`${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
        SpName: "GROUNDMASTER_CRUD",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        /*-------------------- Page Call -----------------------*/
        var BindData = JSON.parse(json);
        if (BindData.SERVICERESPONSE.RESPONSECODE == 0) {
          alert("Save Successfully.");
          setModalVisible(!modalVisible);
          setAddNewGround(null);
          ClearControll();
          startLoading();
          AddNewGround_GETList(CityId);
        } else if (BindData.SERVICERESPONSE.RESPONSECODE == -2) {
          alert(BindData.SERVICERESPONSE.RESPONSEMESSAGE);
          setAddNewGround(null);
        }
        return json;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  function handleCheck(TeamRegistrationId) {
    const updatedData = data.map((item) => {
        var tempdata = "";
        
        if(item.PersonIn == "false")
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
          return { ...item, PersonIn: tempdata};
          
        }
        // console.log(item)
        return item;
        
      });
      
       //console.log(updatedData)
      setData(updatedData);
    // navigation.navigate(PageRedirect, {
    //   Groundid: id,
    //   Groundtitle: GroundName,
    // });
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          setAddNewGround(null);
        }}
      >
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, { fontSize: 25,color:Color.FontColor }]}>
                Add New Ground
              </Text>
              <Text style={styles.modalText}>City Name : {CityName}</Text>
              <View
                style={[
                  styles.fr,
                  {
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.modalText,
                    {
                      width: "40%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  Ground Name :{" "}
                </Text>
                <TextInput
                  label="Add New Ground"
                  value={AddNewGround}
                  placeholder="Enter New Ground Name"
                  placeholderTextColor={Color.FontColor}
                  onChangeText={(text) => {
                    setAddNewGround(null);
                    setAddNewGround(text);
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: Color.Texttitle,
                    width: "60%",
                    borderRadius: 5,
                    paddingLeft: 10,
                    color:Color.FontColor
                  }}
                />
              </View>
              <Text
                style={[
                  {
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    color: "red",
                    fontWeight: "bold",
                  },
                ]}
              >
                Note : Ground Add Free Type in {CityName} city.
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setAddNewGround(null);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonOpen, { marginLeft: 5 }]}
                  onPress={() => btnAddModel()}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={[
          styles.width100,
          styles.fr,
          { justifyContent: "space-between" },
        ]}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold",color:Color.FontColor }}>Ground list</Text>
        <Pressable
          style={[styles.fr]}
          onPress={() => {
            setModalVisible(!modalVisible);
            setAddNewGround(null);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 5,
              color: Color.PrimaryColor,
            }}
          >
            +
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold",color:Color.FontColor }}>
            Add New Ground
          </Text>
        </Pressable>
      </View>
      <View style={[styles.width100, styles.fr]}>
        <View style={styles.r40}>
          <Text style={styles.title40}>Select City</Text>
        </View>
        <View style={styles.r60}>
          <TextInput
            KeyboardAvoidingView={true}
            placeholder="select City / Town"
            placeholderTextColor={Color.FontColor}
            onFocus={() =>
              navigation.navigate("UserProfileCity", {
                MobileNo,
                PageRedirect: "TournamentGroundNewList",
              })
            }
            style={{
              borderBottomWidth: 2,
              borderBottomColor:
                CityIdError == false ? Color.Texttitle : Color.ErrorColor,
                color:Color.FontColor
            }}
            value={CityName}
          />
        </View>
      </View>
      <View style={[styles.width100, styles.fr]}>
        <View style={styles.r40}>
          <Text style={styles.title40}>Ground Name </Text>
        </View>
        <View style={styles.r60}>
          <TextInput
            KeyboardAvoidingView={true}
            placeholder="Enter Ground Name"
            placeholderTextColor={Color.FontColor}
            style={{
              borderBottomWidth: 2,
              borderBottomColor: Color.Texttitle,
              color:Color.FontColor
            }}
            onChangeText={(text) => setGroundName(text)}
            // value={CityName}
          />
        </View>
      </View>
      <View style={[styles.width100, styles.fr]}>
        <Pressable
          style={styles.btnserch}
          onPress={() => {
            ClearControll();
            startLoading();
            fetchData(CityId);
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
      <View style={[styles.width100, { marginBottom: 10,height:"70%" }]}>
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
      {data.length != 0 ?(
        <Pressable onPress={() => BtnNext()} style={[styles.width100, styles.fr,{alignItems:"center",justifyContent:"center",backgroundColor:Color.PrimaryColor,borderRadius:6}]}>
       <Text style={{color:"white",margin:10,}}>Select Ground</Text>
      </Pressable>
      ): null }
      
      <InertNetCheck />
    </View>
  );
};

export default MultiTournamentGroundNewList;

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
    color:Color.FontColor
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
    height: 82,
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
