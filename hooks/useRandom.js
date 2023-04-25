import { useRef } from "react";

export function useRandom(maxLength){
    const indexVals = useRef([]);

    const generateRandom = () => {
        var randNum = Math.round (Math.random() * 100);
        var randIndex = Math.round (randNum * maxLength / 100);
        return randIndex;
    };

    const getNextIndex = () => {
        var previousValues = indexVals.current;
         if(previousValues.length == maxLength)
            return -1;
        var nextRand = generateRandom();
        while(previousValues.findIndex(e => e === nextRand) > -1){
            nextRand++;
            nextRand = nextRand % maxLength;
        } 
        indexVals.current = ([...previousValues,nextRand]); 
        return nextRand;
    };

    const getInitIndex = () => {
        if(indexVals.length == 0){
            var initIndex = generateRandom();
            indexVals.current = ([...previousValues,initIndex]); 
            return initIndex;
        }
    }

    const generateAndShuffleChoices = (currentIndex) => {
        var choices = new Array(4);
        choices[0] = currentIndex // correct answer
        for (var i = 1; i <= 3; i++){
            var temp = generateRandom();
        }
    }
     
    return [indexVals.current, getNextIndex, getInitIndex]
}