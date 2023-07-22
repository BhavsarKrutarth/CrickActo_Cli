import { Text, View } from 'react-native'
import React, { PureComponent,useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';


const TournamenentMain = props => {
  const navigation = useNavigation();
 

    const route = useRoute();
    let Tournamentid = route.params.Tournamentid
    return (
      <View>
        <Text>TournamenentMain id = {Tournamentid}</Text>
      </View>
    )
}

export default TournamenentMain