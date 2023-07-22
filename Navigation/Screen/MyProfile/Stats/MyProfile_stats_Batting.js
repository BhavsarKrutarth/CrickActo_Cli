import { View, Text, StyleSheet } from "react-native";
import React,{useEffect ,useState } from "react";
import Color from "../../../../Color/Color";

const MyProfile_stats_Batting = () => {

  const [Mat,setMat] = useState(null);
  const [Inns,setInns] = useState(null);
  const [Runs,setRuns] = useState(null);
  const [HS,setHS] = useState(null);
  const [Avg,setAvg] = useState(null);
  const [SR,setSR] = useState(null);
  const [ThirtyCount,setThirtyCount] = useState(null);
  const [FityCount,setFityCount] = useState(null);
  const [HundredsCount,setHundredsCount] = useState(null);
  const [FourCount,setFourCount] = useState(null);
  const [SixCount,setSixCount] = useState(null) ;
  const [Duck,SetDuck] = useState(null);
  const [WonMatch,setWonMatch] = useState(null);
  const [LossMatch,setLossMatch] = useState(null);


  React.useEffect(() => {
    console.log("Navigation/Screen/MyProfile/Stats/MyProfile_stats_Batting.js");
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
            SpName: "MYPROFILE_STATS_BATTING_GET",
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
              setInns(List.Inns);
              setRuns(List.Run);
              setHS(List.HS);
              setAvg(List.Avg);
              setSR(List.SR);
              setThirtyCount(List.TR);
              setFityCount(List.FT);
              setHundredsCount(List.HT);
              setFourCount(List.FOUR);
              setSixCount(List.SIX);
              SetDuck(List.DUCK);
              setWonMatch(List.WonMatch);
              setLossMatch(List.LossMatch);



              
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
        <Text style={style.MainTitleText}>My Batting Profile</Text>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Mat}</Text>
          <Text style={style.CellSectionText2}>MAT</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Inns}</Text>
          <Text style={style.CellSectionText2}>INNS</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Runs}</Text>
          <Text style={style.CellSectionText2}>RUNS</Text>
        </View>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{HS}</Text>
          <Text style={style.CellSectionText2}>HS</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Avg}</Text>
          <Text style={style.CellSectionText2}>AVG</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{SR}</Text>
          <Text style={style.CellSectionText2}>SR</Text>
        </View>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{ThirtyCount}</Text>
          <Text style={style.CellSectionText2}>30S</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{FityCount}</Text>
          <Text style={style.CellSectionText2}>50S</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{HundredsCount}</Text>
          <Text style={style.CellSectionText2}>100S</Text>
        </View>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{FourCount}</Text>
          <Text style={style.CellSectionText2}>4s</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{SixCount}</Text>
          <Text style={style.CellSectionText2}>6S</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Duck}</Text>
          <Text style={style.CellSectionText2}>Duck</Text>
        </View>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{WonMatch}</Text>
          <Text style={style.CellSectionText2}>WON</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{LossMatch}</Text>
          <Text style={style.CellSectionText2}>LOSS</Text>
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
  },
});
export default MyProfile_stats_Batting;
