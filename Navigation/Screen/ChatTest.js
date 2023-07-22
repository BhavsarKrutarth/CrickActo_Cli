import React,{useState, useEffect} from 'react'
// import { AreaChart, Grid } from 'react-native-svg-charts'
// import * as shape from 'd3-shape'

import { StyleSheet,View,Text,Dimensions } from 'react-native';
import Color from '../../Color/Color';

const ChatTest = () => {
  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');

  const [dimensions, setDimensions] = useState({
    screen: screenDimensions,
  });
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({screen}) => {
        setDimensions({screen});
      },
    );
    return () => subscription?.remove();




  });
  
  return (
     <View style={{flex:1,alignItems:"center"}}>
         <View style={[styles.circle]}>

          </View>
     </View>
  )
};

export default ChatTest;

const styles = StyleSheet.create({
  circle: {
    marginTop:20,
    width: 340,
    height: 340,
    borderRadius: 170,
    // backgroundColor: 'red',
    borderColor:Color.PrimaryColor,
    borderWidth:3,
    backgroundColor:"green"
    

  },
});
