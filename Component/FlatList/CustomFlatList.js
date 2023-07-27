import React, { useEffect,useState,useRef } from 'react';
import PropTypes from "prop-types";
//import all the components we are going to use
import {
  FlatList,
  View,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
  RefreshControl
} from "react-native";
import Color from '../../Color/Color';
import { useNavigation } from '@react-navigation/native';
/* -----------------------refreshing ------------------------------*/
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
/* -----------------------refreshing ------------------------------*/
export default function CustomFlatList(props) {
  const navigation = useNavigation();
  const { data,onPress } = props;
    const [listItems, setListItems] = useState(
      // [
      //   { id: '1', value: 'A' },
      //   { id: '2', value: 'B' },
      //   { id: '3', value: 'C' },
      // ]
      );
      
  const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
  // useEffect(()=>{
  //   Tournament_GET();
  //   Animated.timing(translateX,{toValue:0,duration:100, useNativeDriver: true}).start();
  // })
  React.useEffect(()=>{
    setListItems([]);
    Tournament_GET();
    Animated.timing(translateX,{toValue:0,duration:100, useNativeDriver: true}).start();
  }, [])
  const Tournament_GET = async () => {
    try {
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/TournamentRegistration/` + global.MobileNo,
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
          var BindData = JSON.parse(json);
          var List;
          if (BindData.SERVICERESPONSE.RESPONSECODE == "0") {
            if (BindData.SERVICERESPONSE.DETAILSLIST) {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.TOURNAMENTID,
                  TournamentName: List.TOURNAMENTNAME,
                  TournamentDate: List.STARTDATE,
                  CityTitle: List.CITYTITLE,
                  Images: List.BANNERIMAGE,
                  TournamentAdmin: List.TOURNAMENTADMIN
                  //"/banner1.jpg",
                });
              } else {
                if (List) {
                  List.forEach((List) => {
                    setarray.push({
                      id: List.TOURNAMENTID,
                      TournamentName: List.TOURNAMENTNAME,
                      TournamentDate: List.STARTDATE,
                      CityTitle: List.CITYTITLE,
                      Images: List.BANNERIMAGE,
                      TournamentAdmin: List.TOURNAMENTADMIN
                    });
                  });
                }
              }
              setListItems(setarray);
            }
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
  const ItemView = ({ item }) => {

    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <Animated.View style={{ transform: [{ translateY: translateX }] }}>
        {/* <Text style={styles.item} onPress={() => getItem(item)}>
          {item.OrganiserName}
        </Text> */}
        <Pressable style={styles.item} onPress={() => getItem(item)}>
          <Image
            style={styles.subimage}
            source={{
              
              uri: `${global.domainName}/cricbuddyAPI/UploadFiles/UserProfile/${item.Images} `,
            }}
          />
          <View style={{padding:10}}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={styles.Title}>{item.TournamentName}</Text>
              <Text style={styles.Title}>{item.TournamentDate}</Text>
            </View>
            <Text style={styles.Title}>{item.CityTitle}</Text>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    // alert('Id : ' + item.id + ' OrganiserName : ' + item.OrganiserName);
    var TournamentName = item.TournamentName;
    // TournamenentMain
    global.Tournamentid = item.id;
    global.TournamentName = item.TournamentName
    global.TournamentAdmin = item.TournamentAdmin

    navigation.navigate("TournamenentMain",{
        TournamentName,
    })
  };
  /* -----------------------refreshing ------------------------------*/ 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    Tournament_GET();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
/* -----------------------refreshing ------------------------------*/

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={listItems}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          }
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      marginTop: 5,
    },
    item: {
      marginVertical:10,
      height:200,
      width:"100%",
      fontSize: 18,
      borderColor:Color.Texttitle,
      borderWidth:1,
      backgroundColor:"white",
      borderBottomEndRadius:15,
      borderBottomLeftRadius:15
      
    },
    subimage:{
      width: "100%",
      height: "70%",
    },
    Title:{
      fontSize:16,
      color:Color.FontColor
    }
  });


CustomFlatList.propTypes = {
  data: PropTypes.array,
  onPress:PropTypes.func,
};
