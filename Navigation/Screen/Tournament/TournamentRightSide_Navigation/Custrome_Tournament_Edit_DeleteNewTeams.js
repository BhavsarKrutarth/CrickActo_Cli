import { StyleSheet, Pressable, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Custrome_Tournament_Edit_DeleteNewTeams = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [id, setid] = useState(null);
    const [ImageName, setImageName] = useState(null);
    const [ImageFlieName, setImageFlieName] = useState(null);
    const [imgtitle, setimgtitle] = useState(null);
    const [title, settitle] = useState(null);
    const [CityId, setCityId] = useState(null);
    const [CityName, setCityName] = useState(null);
    const [image, setImage] = useState(null);
    const [PageRedirect, setPageRedirect] = useState(null);


    useEffect(() => {
        console.log("Navigation/Screen/Tournament/TournamentRightSide_Navigation/Custrome_Tournament_Edit_DeleteNewTeams.js");
        if (route.params?.PageRedirect)
            setPageRedirect(route.params?.PageRedirect);

        if (route.params?.id)
            setid(route.params?.id);

        if (route.params?.ImageName)
            setImageName(route.params?.ImageName);

        if (route.params?.ImageName)
            setImageFlieName(route.params?.ImageName);

        if (route.params?.imgtitle)
            setimgtitle(route.params?.imgtitle);

        if (route.params?.title)
            settitle(route.params?.title);


        if (route.params?.Common_CityId) {
            setCityId(route.params?.Common_CityId);
        }
        else {
            if (route.params?.CityId)
                setCityId(route.params?.CityId);
        }

        if (route.params?.Common_CityName) {
            setCityName(route.params?.Common_CityName);
        }
        else {
            if (route.params?.CityName)
                setCityName(route.params?.CityName);
        }

    }, [route.params]);
    return (
        <View>
            <Pressable onPress={() => {
                navigation.navigate('Tournament_Edit_DeleteNewTeams', {
                    id:id
                    ,ImageName:ImageName
                    ,ImageFlieName:ImageFlieName
                    ,imgtitle:imgtitle
                    ,title:title
                    ,CityId: CityId
                    ,CityName: CityName
                    ,image:image
                    ,PageRedirect:PageRedirect
                })
            }}>
                <Image
                    source={{
                        uri:
                            "" +
                            global.domainName +
                            "/CricbuddyAdmin/Content/assets/edit.png",
                    }}
                    style={{ width: 25, height: 25 }}
                />
            </Pressable>
        </View>
    )
}

export default Custrome_Tournament_Edit_DeleteNewTeams

const styles = StyleSheet.create({})