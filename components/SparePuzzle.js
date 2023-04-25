import { StyleSheet, Text, View  } from "react-native"
import {Svg, Path, G} from 'react-native-svg';
import {Africa} from "../worldmaps/africa"
import { useRandom } from "../hooks/useRandom";
import { useEffect, useRef, useState } from "react";

export default function SparePuzzle(){

    var continent = Africa;
    var [previousIndexes, getNextIndex, getInitIndex] = useRandom(continent.countries.length);
    const [puzzleState, setPuzzleState] = useState({score: 0, randomIndex: getInitIndex()})

    const randomCountryId = useRef()
    
    const countryPress = (cId)  => {
        var nextState = puzzleState;
        if(cId == randomCountryId.current){
            console.log('success');
            var nextScore = nextState.score + 1;
            nextState = {...nextState, score: nextScore};
        }
        else{
            console.log('fail');
        }
        var nextRandomIndex = getNextIndex();
        nextState = {...nextState, randomIndex: nextRandomIndex};
        setPuzzleState(nextState);
      }

      console.log('rerender random:'+puzzleState.randomIndex);
    return(
        <View style={styles.container}>
      <Text style={styles.conuntryHeader}>you score is: {puzzleState.score}/{previousIndexes.length}({continent.countries.length})</Text>
      <Svg>
        <G scale={0.42} width={continent.width} height={continent.height}>
          {continent.countries.map((cntry, index) => {
            if(index == puzzleState.randomIndex){
                randomCountryId.current = cntry.id;
            }
            return (
              <Path
                key={index}
                stroke="black"
                strokeWidth={2}
                fill= { index == puzzleState.randomIndex?  "gray": "silver"}
                d={cntry.d}
                onPress={() => countryPress(cntry.id)}
              />
            );
          })}
        </G>
      </Svg>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent:'center',
      marginTop:200
    },
    conuntryHeader:{
      marginBottom:15,
      alignContent:'flex-start'
    }
  });
  