import React ,{useState,useRef,useEffect} from "react";
import {View,Text,StyleSheet, TextInput,Pressable,Timer,Alert } from 'react-native';
import Color from "../../../Color/Color";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import InertNetCheck from "../InertNetCheck";

const OTP_Verify = props => {
    
    const navigation = useNavigation();
    const route = useRoute();
    // let DISPLAY_OTP = props.route.params.params.OTP || '';
    // let Countrycode = props.route.params.params.Countrycode || '';
    let DISPLAY_OTP = route.params.Redirect_otp || '';
    let Countrycode = route.params.Countrycode  || '';

    const [pin1text, setpin1text] = useState('');
    const [pin2text, setpin2text] = useState('');
    const [pin3text, setpin3text] = useState('');
    const [pin4text, setpin4text] = useState('');
    const [pin5text, setpin5text] = useState('');
    const [pin6text, setpin6text] = useState('');

    const [pintext_editable1, setpintext_editable1] = useState(true);
    const [pintext_editable2, setpintext_editable2] = useState(false);
    const [pintext_editable3, setpintext_editable3] = useState(false);
    const [pintext_editable4, setpintext_editable4] = useState(false);
    const [pintext_editable5, setpintext_editable5] = useState(false);
    const [pintext_editable6, setpintext_editable6] = useState(false);

    const [isError_Disable, setisError_Disable] = useState("none");
    
    const [isContinue, setisContinue] = useState(true);
    const [isdisabledresend, setisdisabledresend] = useState("flex");
    const [isdisabledbtn,setisdisabledbtn] = useState("none");
    
    
    const [buttoncolor1,setbuttoncolor1] = useState(Color.PrimaryColor);
    const [buttoncolor2,setbuttoncolor2] = useState(Color.sliverColor);
    const [buttoncolor3,setbuttoncolor3] = useState(Color.sliverColor);
    const [buttoncolor4,setbuttoncolor4] = useState(Color.sliverColor);
    const [buttoncolor5,setbuttoncolor5] = useState(Color.sliverColor);
    const [buttoncolor6,setbuttoncolor6] = useState(Color.sliverColor);
    const [btnContinueColor,setbtnContinueColor] = useState(Color.sliverColor);
    


    // let GetParam_MobileNo = props.route.params.params.phoneNumber || '';
    let GetParam_MobileNo = route.params.phoneNumber || '';
    const pin1 = useRef(null);
    const pin2 = useRef(null);
    const pin3 = useRef(null);
    const pin4 = useRef(null);
    const pin5 = useRef(null);
    const pin6 = useRef(null);

    const [counter, setCounter] = React.useState(30);


    useEffect(()=>
    {
        console.log("Navigation/Screen/Login/OTP_Verify.js");
        createTwoButtonAlert()
    },[])
    const createTwoButtonAlert = () =>
    Alert.alert(
      "One Time OTP Send. Please Note down.",
      "YOUR OTP IS : " + DISPLAY_OTP,
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        { text: "OK", onPress: () => ("") }
      ]
    );

    React.useEffect(() => {
        const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        {
            if(counter == 0)
            {
                setisdisabledresend("none")
                setisdisabledbtn("flex")
            }
            return () => clearInterval(timer);
        }
        
    }, [counter]);

    function pin1focuseout(e){
        
        if(e.nativeEvent.key == "Backspace"){
            setpin1text('');
            
            setpintext_editable1(true)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(false)
        }
        else if(e.nativeEvent.key == 1 || e.nativeEvent.key == 2 || e.nativeEvent.key == 3 || e.nativeEvent.key == 4 || e.nativeEvent.key == 5 || e.nativeEvent.key == 6 || e.nativeEvent.key == 7 || e.nativeEvent.key == 8 || e.nativeEvent.key == 9 || e.nativeEvent.key == 0){
           
            setpin1text(e.nativeEvent.key)
            setbuttoncolor2(Color.PrimaryColor)
            setpintext_editable1(false)
            setpintext_editable2(true)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(false)
            pin2.current.focus();
        }
    }
    function pin2focuseout2(e){
        
        if(e.nativeEvent.key == "Backspace"){
            setisError_Disable("none");
            setbuttoncolor1(Color.PrimaryColor)
            setpin1text('')
            setpin2text('')
            setbuttoncolor2(Color.sliverColor)

            setpintext_editable1(true)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(false)
            pin1.current.focus();
            

        }
        else if(e.nativeEvent.key == 1 || e.nativeEvent.key == 2 || e.nativeEvent.key == 3 || e.nativeEvent.key == 4 || e.nativeEvent.key == 5 || e.nativeEvent.key == 6 || e.nativeEvent.key == 7 || e.nativeEvent.key == 8 || e.nativeEvent.key == 9 || e.nativeEvent.key == 0){
            setpin2text(e.nativeEvent.key)
            setbuttoncolor3(Color.PrimaryColor)

            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(true)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(false)
            pin3.current.focus();
        }
    }
    function pin3focuseout3(e){
        if(e.nativeEvent.key == "Backspace"){
            setpin2text('')
            setpin3text('')
            setbuttoncolor3(Color.sliverColor)

            setpintext_editable1(false)
            setpintext_editable2(true)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(false)
            pin2.current.focus();
        }
        else if(e.nativeEvent.key == 1 || e.nativeEvent.key == 2 || e.nativeEvent.key == 3 || e.nativeEvent.key == 4 || e.nativeEvent.key == 5 || e.nativeEvent.key == 6 || e.nativeEvent.key == 7 || e.nativeEvent.key == 8 || e.nativeEvent.key == 9 || e.nativeEvent.key == 0){
            setpin3text(e.nativeEvent.key)
            setbuttoncolor4(Color.PrimaryColor)


            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(true)
            setpintext_editable5(false)
            setpintext_editable6(false)
            pin4.current.focus();
        }
    }
    function pin4focuseout4(e){
        if(e.nativeEvent.key == "Backspace"){
            setpin3text('')
            setpin4text('')
            setbuttoncolor4(Color.sliverColor)

            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(true)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(false)
            pin3.current.focus();
        }
        else if(e.nativeEvent.key == 1 || e.nativeEvent.key == 2 || e.nativeEvent.key == 3 || e.nativeEvent.key == 4 || e.nativeEvent.key == 5 || e.nativeEvent.key == 6 || e.nativeEvent.key == 7 || e.nativeEvent.key == 8 || e.nativeEvent.key == 9 || e.nativeEvent.key == 0){
            setpin4text(e.nativeEvent.key)
            setbuttoncolor5(Color.PrimaryColor)

            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(true)
            setpintext_editable6(false)
            pin5.current.focus();
        }
    }
    function pin5focuseout5(e){
        // setiseditable6(true);
        // setbuttoncolor6(Color.PrimaryColor)
        // pin6.current.focus();
        if(e.nativeEvent.key == "Backspace"){
            setpin4text('')
            setpin5text('')
            setbuttoncolor5(Color.sliverColor)

            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(true)
            setpintext_editable5(false)
            setpintext_editable6(false)
            pin4.current.focus();
        }
        else if(e.nativeEvent.key == 1 || e.nativeEvent.key == 2 || e.nativeEvent.key == 3 || e.nativeEvent.key == 4 || e.nativeEvent.key == 5 || e.nativeEvent.key == 6 || e.nativeEvent.key == 7 || e.nativeEvent.key == 8 || e.nativeEvent.key == 9 || e.nativeEvent.key == 0){
            setpin5text(e.nativeEvent.key)
            setbuttoncolor6(Color.PrimaryColor)

            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(true)
            pin6.current.focus();
        }
    }
    function pin6focuseout6(e){
        if(e.nativeEvent.key == "Backspace"){
            setpin5text('')
            setpin6text('')
            setbuttoncolor6(Color.sliverColor);
            setbtnContinueColor(Color.sliverColor);
            setisContinue(true);

            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(true)
            setpintext_editable6(false)
            pin5.current.focus();
        }
        else if(e.nativeEvent.key == 1 || e.nativeEvent.key == 2 || e.nativeEvent.key == 3 || e.nativeEvent.key == 4 || e.nativeEvent.key == 5 || e.nativeEvent.key == 6 || e.nativeEvent.key == 7 || e.nativeEvent.key == 8 || e.nativeEvent.key == 9 || e.nativeEvent.key == 0){
            setpin6text(e.nativeEvent.key)
            setbtnContinueColor(Color.PrimaryColor)
            setisContinue(false)


            setpintext_editable1(false)
            setpintext_editable2(false)
            setpintext_editable3(false)
            setpintext_editable4(false)
            setpintext_editable5(false)
            setpintext_editable6(true)
        }
    }
    function btnContinue ()
    {   var checkotp = pin1text+pin2text+pin3text+pin4text+pin5text+pin6text
        if(DISPLAY_OTP ==  checkotp)        
        {
            // props.navigation.navigate
            // (
            // 'PinSet',
            // {
            //     params: { 
            //         phoneNumber : GetParam_MobileNo,
            //         Countrycode:Countrycode
            //       },
            // },
            // );
            navigation.navigate('PinSet', {
                GetParam_MobileNo,
                Countrycode
              })
        }
        else 
        {
            setbuttoncolor1(Color.ErrorColor);
            setbuttoncolor2(Color.ErrorColor);
            setbuttoncolor3(Color.ErrorColor);
            setbuttoncolor4(Color.ErrorColor);
            setbuttoncolor5(Color.ErrorColor);
            setbuttoncolor6(Color.ErrorColor);
            setisError_Disable("flex");
        }
    }
    function btnsms(){
        Alert.alert(
            "Info.",
            "YOUR OTP IS : " + DISPLAY_OTP,
            [
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel"
              // },
              { text: "OK", onPress: () => ("") }
            ]
          );
    }
      
     return (
        <View style={styles.Container}>
            
            <View>
                <Text style={styles.heading}>Enter the OTP sent to</Text>
                <Text style={styles.subheading} >{GetParam_MobileNo}</Text>
            </View>
            <View style={styles.otpContainer}>
                <TextInput autoFocus editable={true} ref={pin1}  defaultValue={pin1text}  onKeyPress={(e) => pin1focuseout(e)}  maxLength={1} keyboardType='numeric' style={[styles.otptext,{borderColor:buttoncolor1}]}/>
                <TextInput ref={pin2} editable={true} defaultValue={pin2text} onKeyPress={(e) => pin2focuseout2(e)}  maxLength={1} keyboardType='numeric' style={[styles.otptext,{borderColor:buttoncolor2}]}/>
                <TextInput ref={pin3} editable={true} defaultValue={pin3text} onKeyPress={(e) => pin3focuseout3(e)}  maxLength={1} keyboardType='numeric'  style={[styles.otptext,{borderColor:buttoncolor3}]}/>
                <TextInput ref={pin4} editable={true} defaultValue={pin4text} onKeyPress={(e) => pin4focuseout4(e)}  maxLength={1} keyboardType='numeric'  style={[styles.otptext,{borderColor:buttoncolor4}]}/>
                <TextInput ref={pin5} editable={true} defaultValue={pin5text} onKeyPress={(e) => pin5focuseout5(e)}  maxLength={1} keyboardType='numeric'  style={[styles.otptext,{borderColor:buttoncolor5}]}/>
                <TextInput ref={pin6} editable={true} defaultValue={pin6text} onKeyPress={(e) => pin6focuseout6(e)}  maxLength={1} keyboardType='numeric'  style={[styles.otptext,{borderColor:buttoncolor6}]}/>
            </View>
            <View style={[styles.errorcontainer,{display:isError_Disable}]} >
                <Text style={styles.errorText}>Uh oh! The OTP you entered is invalid.</Text>
            </View>
            <View>
                <Pressable disabled={isContinue} onPress={() => btnContinue()} style={[styles.btnContinue,{backgroundColor:btnContinueColor}]}>
                <Text style={styles.btnContinueText}>Continue </Text>
                </Pressable >   
            </View>
             <View style={[styles.TimerContinuer,{display:isdisabledresend}]}>
                <Text style={styles.TimerText}>Didn't receive it? Retry in {counter}</Text>
            </View>
            <View style={[styles.TimerContinuer,{display:isdisabledbtn}]}>
                <Text style={styles.TimerText}>Retry via:</Text>
                <Pressable onPress={() => btnsms()} style={[styles.btnsms]}>
                    <Text style={styles.smstext}> OTP </Text>
                </Pressable> 
            </View>
            <InertNetCheck/>
        </View>
        
    )
}

const styles = StyleSheet.create({
Container:{
   //alignItems:'flex-end',
    flex:1,
    marginHorizontal:10
},
heading:{
    fontSize: 30,
    fontWeight:"bold",
    
},
subheading:{
    fontSize: 23,
    fontWeight:"bold",
},
otptext:{
    backgroundColor:'#f5f4f2',
    fontWeight:'600',
    alignSelf:'center',
    padding:0,
    fontSize:20,
    height:50,
    width:'13%',
    borderRadius:15,
    borderWidth:2,
    // borderColor:'#DC6933',
    borderColor:Color.sliverColor,
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center"
},
otpContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-evenly',
    flex:0.3
},
btnContinue:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    padding: 8,
    //backgroundColor: '#DC6933',
    //backgroundColor: Color.sliverColor,
    borderRadius:12,
    marginTop:10
},
btnContinueText:{
    padding:5,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
},
TimerContinuer:
{
    paddingTop:20
},
TimerText:{
    fontSize:16
},
btnsms:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '30%',
    padding: 8,
    backgroundColor: '#DC6933',
    borderRadius:12,
    marginTop:10
},
smstext:{
    color:"white",
    fontSize:15

},
errorcontainer:{
    marginLeft:10,
    marginTop:10
},
errorText:{
    fontSize:15,
    color:Color.ErrorColor
}
});
export default OTP_Verify;