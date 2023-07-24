import React, {useState, useRef} from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity,Pressable,Image, Button, ImageBackground} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Color from '../../../Color/Color';
import { useNavigation } from '@react-navigation/native';
import InertNetCheck from '../InertNetCheck.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = props => {
   
    
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [CountryCode, setCountryCode] = useState('');
    const [CountryCode_state, setCountryCode_state] = useState('');
    var btncount = 0;
    
    const [isDisabled, setIsDisabled] = useState(true);
    const [buttoncolor,setbuttoncolor] = useState(Color.sliverColor)
    const phoneInput = useRef(null);

    React.useEffect(()=>
    {
      console.log("Navigation/Screen/Login/Login.js");
    },[])

    const checkphonenumber = (phoneNumber) => {
      
      setPhoneNumber(phoneNumber)
        //setPhoneNumber(mobileno);
        let  count = phoneNumber;
        
        if(count.length == 10)
        {
            setbuttoncolor(Color.PrimaryColor);
            setIsDisabled(false);
        }
        else if (count.length <= 9)
        {
            setbuttoncolor(Color.sliverColor);
            setIsDisabled(true);
        }
        else
        {
            setbuttoncolor(Color.sliverColor);
            setIsDisabled(true);
        }
    };
    const CHECK_USER_OR_NOT_API = async (MobileNo,Countrycode,Countrycode_State) => {
      try {
        const resposneJSON = await fetch(`${global.domainName}/cricbuddyAPI/api/UserMaster/`, {
          method: 'POST',
          headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            "Authorization":"FF7B5E5C-A468-4CE0-B812-98008627C8KT",
          },
          body: JSON.stringify({
            MobileNo: MobileNo,
            CountryName: Countrycode,
            CountryCode: Countrycode_State,
            CityName:"",
            CityId:"",
            Name:""
          })
        }).then((response) => response.json())
        .then((json) => {
          /*-------------------- Page Call -----------------------*/
          var tempData = JSON.parse(json);
          var Redirect_otp = ""
          if(tempData.SERVICERESPONSE.DETAILSLIST.DETAILS != "")
          {
            Redirect_otp = tempData.SERVICERESPONSE.DETAILSLIST.DETAILS.OTP
          }
          else 
          {
            Redirect_otp = "OTP IS NOT CREATE."
          }

          navigation.navigate('OTP_Verify', {
            phoneNumber,
            Redirect_otp,
            Countrycode
          })

          /*-------------------- Page Call -----------------------*/
          
          return json;
          
        })
        .catch((error) => {
          console.error(error);
        });
      } catch (error) {
        alert(error)
        return
  
      } finally {
        
      }
    }
    const btnclicklogin = async () => {
      CHECK_USER_OR_NOT_API(phoneNumber,CountryCode,CountryCode_state);
    }

    return (
        <View style={styleSheet.MainContainer}>
        <InertNetCheck/>
        <Image
            style={styleSheet.image}
            source={{
            uri: `${global.domainName}/CricbuddyAdmin/Content/assets/tiny_logo.png`,
            }}
        />    

        <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN"
        layout="first"
        withShadow
        autoFocus
        containerStyle={styleSheet.phoneNumberView}
        textInputProps={{ maxLength: 10, }}
        textContainerStyle={{ paddingVertical: 0 }}
        onChangeFormattedText={text => {
            // setPhoneNumber(text)
            setCountryCode(phoneInput.current?.getCountryCode() || '')
            setCountryCode_state(phoneInput.current.state.code || '')
        }}
        onChangeText={(phoneNumber) => checkphonenumber(phoneNumber)}
        />

        <Pressable disabled={isDisabled} style={[styleSheet.button,{backgroundColor:buttoncolor}]} //onPress={() => props.navigation.navigate('OTP_Verify')}
         onPress={() => btnclicklogin()}
        >
        <Text style={styleSheet.buttonText}>Let's Play </Text>
        </Pressable>
        
        <Text style={styleSheet.terms1}>By clicking. I accept the terms of services and privacy policy.</Text>
        {/* <Text stlye ={styleSheet.terms1}> By Signing in, you agree to  our Terms   </Text>
        <Text stlye ={styleSheet.terms2}> and Privacy Policy  </Text> */}
        
        </View>
    )
}


const styleSheet = StyleSheet.create({
    
    MainContainer: {
      alignItems: 'center',
    },
     image:{
      marginTop:80,
      width: 70,
      height: 70,
      marginBottom:30
     },
    heading:{
      fontSize: 24,
      textAlign: 'center',
      paddingBottom: 20,
      color: 'black'
    },
   
    phoneNumberView: {
      width: '80%',
      height: 50,
      backgroundColor: 'white'
    },
   
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
      width: '60%',
      padding: 8,
      //backgroundColor: '#DC6933',
      //backgroundColor: Color.sliverColor,
      borderRadius:12
    },
   
    buttonText:{
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
    },
    terms1:{
        
        textAlign:'center',
        color:Color.PrimaryColor,
        fontWeight:"700"
       
    },
    terms2:{
       textAlign:'center',
       marginLeft:500
    }
  });

  
export default Login;