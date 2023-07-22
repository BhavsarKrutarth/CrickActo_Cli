import { View, Text, StyleSheet } from "react-native";
import React,{useEffect ,useState } from "react";
import Color from "../../../../Color/Color";

const MyProfile_stats_Bowling = () => {

  const [Mat,setMat] = useState(null);
  const [Inns,setInns] = useState(null);
  const [OVER,SETOVER] = useState(null);
  const [Maidens,setMaidens] = useState(null);
  const [Run,setRun] = useState(null);
  const [WKTS,setWKTS] = useState(null);
  const [BB,setBB] = useState(null);
  const [HatTrick,setHatTrick] = useState(null);
  const [FIVE_WKCT,setFIVE_WKCT] = useState(null);
  const [ECO,setECO] = useState(null);
  const [FourCount,setFourCount] = useState(null);
  const [SixCount,setSixCount] = useState(null) ;
  const [Sr,setSr] = useState(null);
  const [AVG,setAVG] = useState(null);
 


  React.useEffect(() => {
    console.log("Navigation/Screen/MyProfile/Stats/MyProfile_stats_Bowling.js");
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
            SpName: "MYPROFILE_STATS_BOWLING_GET",
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
              SETOVER(List.OVER);
              setMaidens(List.Maidens);
              setRun(List.Run);
              setWKTS(List.WKTS);
              setBB(List.BB);
              setHatTrick(List.HatTrick);
              setFIVE_WKCT(List.FIVE_WKCT);
              setFourCount(List.FOUR);
              setSixCount(List.SIX);
              setECO(List.ECO);
              setSr(List.Sr);
             setAVG(List.AVG);



              
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
        <Text style={style.MainTitleText}>My Bowling Profile</Text>
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
          <Text style={style.CellSectionText1}>{OVER}</Text>
          <Text style={style.CellSectionText2}>OVER</Text>
        </View>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Maidens}</Text>
          <Text style={style.CellSectionText2}>MAIDENS</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Run}</Text>
          <Text style={style.CellSectionText2}>RUN</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{WKTS}</Text>
          <Text style={style.CellSectionText2}>WKTS</Text>
        </View>
      </View>
      <View style={[style.body100, style.ColumWise]}>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{BB}</Text>
          <Text style={style.CellSectionText2}>BB</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{HatTrick}</Text>
          <Text style={style.CellSectionText2}>3 WKTS</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{FIVE_WKCT}</Text>
          <Text style={style.CellSectionText2}>5 WKTS</Text>
        </View>
      </View>
      <View style={[style.body100, style.ColumWise]}>
      <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{Sr}</Text>
          <Text style={style.CellSectionText2}>SR</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{AVG}</Text>
          <Text style={style.CellSectionText2}>AVG</Text>
        </View>
        <View style={style.body01}></View>
        <View style={[style.body33, style.CellSection]}>
          <Text style={style.CellSectionText1}>{ECO}</Text>
          <Text style={style.CellSectionText2}>ECO</Text>
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
export default MyProfile_stats_Bowling;

