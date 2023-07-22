import React from "react";
import {View,Text,StyleSheet} from 'react-native'

const SecoundPage = props => {
  return(
    <View style={styles.container}>
        <Text>Secound Page SCreen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SecoundPage;