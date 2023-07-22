import { StyleSheet } from 'react-native';
import Color from "../../Color/Color";


const styles = StyleSheet.create({
  button:{
    borderRadius: 20,
    elevation: 2,
    padding:12,
    alignItems:'center',
    backgroundColor: Color.PrimaryColor,
  },
  title:{
    color:"white"
  }
});

export default styles;
