import React from "react";
import { Pressable, Ionicons, Text, View,StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";


export default function LineButton(props) {
  const { title, onPress, source } = props;

  return (
    <Pressable style={[styles.button]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}
LineButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
