// React Native NetInfo
// https://aboutreact.com/react-native-netinfo/

// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  Image,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";

const InertNetCheck = () => {
  const [Modalvisible, setModalvisible] = useState(false);
  const [netInfo, setNetInfo] = useState("");

  const ModalDisplay = () => {
    NetInfo.addEventListener((state) => {
      console.log(state.isConnected);
      if (state.isConnected) {
        console.log(state.isConnected);
        setModalvisible(false);
      } else {
        setModalvisible(true);
      }
    });
  };
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setModalvisible(false);
      } else {
        setModalvisible(true);
      }
      setNetInfo(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`
      );
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then((state) => {
      alert(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        transparent={true}
        visible={Modalvisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      >
        <View style={{ backgroundColor: "#000000AA", flex: 1 }}>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                padding: 22,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                borderColor: "rgba(0, 0, 0, 0.1)",
                height:200,
                
              }}
            >
              <Text
                style={{ paddingBottom: 10, fontSize: 18, fontWeight: "bold" }}
              >
                Please check internet connection
              </Text>
             
              {/* <Image
              // source={{
              //   uri:
              //     "" +
              //     global.domainName +
              //     `/CricbuddyAdmin/Content/assets/No_InterConnection_1.gif`,
              // }}
              source={{uri: 'assets/No_InterConnection'}}
              style={{ width: 200, height: 200 ,resizeMode: 'center'  }}
              
            /> */}
              <Button
                onPress={() => {
                  ModalDisplay();
                }}
                title="Try Again"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: "center",
    color: "black",
    paddingVertical: 20,
  },
});

export default InertNetCheck;
