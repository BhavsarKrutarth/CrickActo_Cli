import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Button,
  Linking,
} from "react-native";
import Color from "../../Color/Color";
import InertNetCheck from "./InertNetCheck";
//import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
//import { BannerAdSize,BannerAd,AppOpenAd, TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
import scoketservices from "../../scoket/scoketservices";

const MainPage = () => {

  // const adUnitId =  TestIds.BANNER ;
  //const adUnitId =  "ca-app-pub-6921176299600807/8728899348" ;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(0);
  const [FirstTimeIn, setFirstTimeIn] = useState(0);

  useEffect(() => {
    scoketservices.initializeSocket()
    fetchData();

    //    // Load the ad when the component mounts
    //    BannerAd.createTestAd(TestIds.BANNER)
    //    .then((response) => {
    //      console.log('Ad created successfully');
    //    })
    //    .catch((error) => {
    //      console.log('Ad creation failed', error);
    //    });

    //  // Clean up the ad when the component unmounts
    //  return () => {
    //    BannerAd.destroy();
    //  };
  }, []);

  const OpenURLButton = ({ url, children, colocode }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    // return <Button title={children} onPress={handlePress} />;
    return (
      <Pressable
        style={[styles.btnSubmit, { backgroundColor: colocode }]}
        onPress={handlePress}
      >
        <Text style={styles.btnSubmitText}>{children}</Text>
      </Pressable>
    );
  };
  const fetchData = async () => {
    // console.log(FirstTimeIn)
    setIsLoading(true);

    // try {
    //   // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    //   const response = await fetch(`YOUR_API_ENDPOINT?page=${page}`);
    //   const newData = await response.json();

    // } catch (error) {
    //   console.error(error);
    //   setIsLoading(false);
    // }

    try {
      var data = {
        PAGEINDEX: page,
        PAGECOUNT: 30,
        SPNAME: "MAINPAGE_POST_GET",
      }
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            // PageIndex: page,
            // PageCount: 30,
            // SpName: "MAINPAGE_POST_GET",
            SpName:"MAINPAGE_POST_GET",
          },
          body: JSON.stringify(data)
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json + "JSONE BIND")
          var BindData = JSON.parse(json);
          var List;


          if (BindData.SERVICERESPONSE.RESPONSECODE != "-1") {
            if (BindData.SERVICERESPONSE.TOTALRECORDS != "0") {
              List = BindData.SERVICERESPONSE.DETAILSLIST.DETAILS;
              setTotalPage(BindData.SERVICERESPONSE.TOTALPAGES);
              var setarray = [];
              if (BindData.SERVICERESPONSE.TOTALRECORDS > 1) {
                if (List) {
                  List.forEach((List) => {
                    setarray.push({
                      id: List.MAINPAGE_POSTID,
                      MAINTITLE: List.MAINTITLE,
                      MAINTYPE: List.MAINTYPE,
                      MAINDATE: List.MAINDATE,
                      BUTTONTITLE: List.BUTTONTITLE,
                      COMMENTCOUNT: List.COMMENTCOUNT,
                      LIKECOUNT: List.LIKECOUNT,
                      COLORCODE: List.COLORCODE,
                      IMAGENAME: List.IMAGENAME,
                      BTNURL: List.BTNURL,
                    });
                  });
                }
              } else if (BindData.SERVICERESPONSE.TOTALRECORDS == 1) {
                setarray.push({
                  id: List.MAINPAGE_POSTID,
                  MAINTITLE: List.MAINTITLE,
                  MAINTYPE: List.MAINTYPE,
                  MAINDATE: List.MAINDATE,
                  BUTTONTITLE: List.BUTTONTITLE,
                  COMMENTCOUNT: List.COMMENTCOUNT,
                  LIKECOUNT: List.LIKECOUNT,
                  COLORCODE: List.COLORCODE,
                  IMAGENAME: List.IMAGENAME,
                  BTNURL: List.BTNURL,
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
        fetchData();
      }
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.body100]}>
        <Text style={[styles.Title, { marginLeft: 5, color: "black" }]}>{item.MAINTITLE}</Text>
        {item.IMAGENAME !== '' ? (
          <Image
            style={styles.subimage}
            resizeMode="stretch"
            source={{
              uri: `${global.domainName}/CricbuddyAdmin/Content/assets/Post/${item.IMAGENAME}`,
            }}
          />
        ) : null}

        <OpenURLButton
          url={item.BTNURL}
          colocode={item.COLORCODE}
          style={[styles.btnSubmit]}
        >
          {item.BUTTONTITLE}
        </OpenURLButton>
        <View style={styles.SubView}>
          <Text style={{ marginLeft: 5 }}>{item.MAINDATE}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <InertNetCheck />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    position: "relative",
  },
  body100: {
    width: "100%",
  },
  Title: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  subimage: {
    height: 202,
    width: "100%",
  },
  btnSubmitText: {
    textAlign: "center",
    padding: 5,
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },
  SubView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reaction: {
    borderBottomColor: Color.borderColor,
    borderBottomWidth: 2,
    borderTopColor: Color.borderColor,
    borderTopWidth: 2,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default MainPage;
