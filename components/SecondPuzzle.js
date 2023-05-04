import { Button, StyleSheet, Text, View } from "react-native"
import { Svg, Path, G } from 'react-native-svg';
import { Africa } from "../worldmaps/africa"
import { useRandom } from "../hooks/useRandom";
import { useEffect, useRef, useState } from "react";

export default function SecondPuzzle() {

  var continent = Africa;
  var [previousIndexes, getNextIndex, getInitIndex, generateAndShuffleChoices] = useRandom(continent.countries.length);
  const [puzzleState, setPuzzleState] = useState({ score: 0, randomIndex: 0 })

  const randomCountryId = useRef()
  const choices = generateAndShuffleChoices(puzzleState.randomIndex);

  useEffect(() => {
    setPuzzleState({ score: 0, randomIndex: getInitIndex() })
  }, [])

  const countryPress = (cId) => {
    var nextState = puzzleState;
    if (cId == randomCountryId.current) {
      console.log('success');
      var nextScore = nextState.score + 1;
      nextState = { ...nextState, score: nextScore };
    }
    else {
      console.log('fail');
    }
    var nextRandomIndex = getNextIndex();
    nextState = { ...nextState, randomIndex: nextRandomIndex };
    setPuzzleState(nextState);
  }

  if (puzzleState.randomIndex == -1) {
    return (
      <View style={styles.puzzlePage}>
        <Text style={styles.conuntryHeader}>you scored {puzzleState.score}/{previousIndexes.length}</Text>
      </View>
    )
  }
  return (
    <View style={styles.puzzlePage}>
      <Text style={styles.conuntryHeader}>{puzzleState.score}/{(previousIndexes.length - 1)}({continent.countries.length})</Text>


      <View style={styles.choicesWrapper}>
        {choices.map(item => {
          return (<Button onPress={() => countryPress(continent.countries[item].id)} title={continent.countries[item].en_name} key={"choice_" + continent.countries[item].id} />)
        })}
      </View>
      <Svg>
        <G scale={0.42} width={continent.width} height={continent.height}>
          {continent.countries.map((cntry, index) => {
            if (index == puzzleState.randomIndex) {
              randomCountryId.current = cntry.id;
            }
            return (
              <Path
                key={index}
                stroke="black"
                strokeWidth={2}
                fill={index == puzzleState.randomIndex ? "gray" : "silver"}
                d={cntry.d}
              />
            );
          })}
        </G>
      </Svg>

    </View>
  )
}

const styles = StyleSheet.create({
  puzzlePage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 200
  },
  conuntryHeader: {
    marginBottom: 15,
    alignContent: 'flex-start'
  },
  choicesWrapper: {
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }

});
