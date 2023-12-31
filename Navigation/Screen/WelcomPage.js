import React ,{useState}from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomPage = () => {
    React.useEffect(()=>
    {
      console.log("Navigation/Screen/Login/WelcomPage.js");
      
    },[])
    const navigation = useNavigation();
    const [url,setUrl] = useState(`${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile/WelcomeNew.jpg`)
    return (
        <View style={styles.container}>
            <ImageBackground 
            source={{ 
                 uri: `${global.domainName}/CricbuddyAdmin/Content/assets/UserProfile/WelcomeNew.jpg`
                // uri: `https://actoscript.com/Content/img/actoscript-logo.png`
             }} 
            //  resizeMode="cover" 
            resizeMode="stretch" 
            style={styles.image}>
                <Pressable 
                style={{ position:"absolute",
                bottom:0,
                width:"100%"
                 }}
                onPress={() => {
                    navigation.navigate('Login')
                   // alert({url})
                }}>
                <Text style={styles.text}>Let's start</Text>
                </Pressable>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        display:"flex",
        position:"relative"
    },
    text: {
        color: 'white',
        fontSize: 25,
        lineHeight: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#035369',
      
       

    },
});
export default WelcomPage