import React from "react";
import { Pressable, Ionicons, Text, View,StyleSheet } from "react-native";
import PropTypes from "prop-types";

// import styles from "./styles";




export default function Modal(props) {
//   const { title, onPress, source } = props;

  return (
    <Modal
      transparent={true}
      visible={visible}
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
            }}
          >
            <Text>Hi, This is dummy alert!</Text>
            <Button
              onPress={() => {
                setvisible(false);
              }}
              title="Close"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
// Modal.propTypes = {
//   onPress: PropTypes.func,
//   source: PropTypes.number,
//   title: PropTypes.string,
// };
