import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const TournamentSponsors = () => {
  React.useEffect(()=>
  {
    console.log("Navigation/Screen/MyTeams/MyTeamFollowing.js");
  },[])
  return (
    <View style={{flex:1}}>
      <Image
            style={{height:"100%",width:"100%"}}
            source={{
              uri: `${global.domainName}/CricbuddyAdmin/Content/assets/CommingSoon.jpg `,
            }}
          />
    </View>
  )
}

export default TournamentSponsors

const styles = StyleSheet.create({})