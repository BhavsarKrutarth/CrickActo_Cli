import { View, Text, StyleSheet } from "react-native";
import React,{useEffect ,useState } from "react";
import Color from "../../../../Color/Color";

const MyProfile_stats_Fielding = () => {

  const [Mat,setMat] = useState(null);
  const [Catch,setCatch] = useState(null);
 
 


  React.useEffect(() => {
    console.log("Navigation/Screen/MyProfile/Stats/MyProfile_stats_Fielding.js");
    BattingDeatil();
  }, []);
  const BattingDeatil = async () => {
    try {
      var data = {
        WHERE_EQ_MOBILENO: global.MobileNo,
      };
      const resposneJSON = await fetch(
        `${global.domainName}/cricbuddyAPI/api/CommonSp/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "FF7B5E5C-A468-4CE0-B812-98008627C8KT",
            SpName: "MYPROFILE_FIELDING_BOWLING_GET",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          var BindData = JSON.parse(json);
          var List;
          //  console.log(BindData);
          if (BindData.SERVICERESPONSE.RESPONSECODE = "0") {
            
              List = BindData.SERVICERESPONSE;
               //console.log(List)
              setMat(List.Mat);
              setCatch(List.Catch);
          } else {
            alert("Error: internal server error");
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      alert(error);
      return;
    } finally {
    }
  };


  return (
    <View style={style.Container}>
      {/* <Text>My Batting Profile</Text> */}
      <View style={[style.body100, style.MainTitle]}>
        <Text style={style.MainTitleText}>My Fielding Profile</Text>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Mat}</Text>
          <Text style={style.CellSectionText2}>MAT</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Catch}</Text>
          <Text style={style.CellSectionText2}>Catch</Text>
        </View>
        
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
  },
  body100: {
    width: "100%",
  },
  body33: {
    width: "33%",
  },
  body01: {
    width: "1%",
  },
  MainTitle: {
    padding: 5,
  },
  MainTitleText: {
    fontSize: 18,
  },
  ColumWise: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center"
  },
  CellSection: {
    borderColor: "pink",
    borderwidth: 2,
    backgroundColor: Color.borderColor,
    alignItems: "center",
    padding: 10,
  },
  CellSectionText2: {
    color: Color.GunmetalGray,
  },
  CellSectionText1: {
    fontWeight: "bold",
    color:Color.FontColor
  },
});
export default MyProfile_stats_Fielding;