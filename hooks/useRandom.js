import { useRef } from "react";

export function useRandom(maxLength) {
    const indexVals = useRef([]);

    const generateRandom = () => {
        var randNum = Math.round(Math.random() * 100);
        var randIndex = Math.round(randNum * maxLength / 100);
        randIndex = randIndex % maxLength;
        return randIndex;
    };

    const getNextIndex = () => {
        var previousValues = indexVals.current;
        if (previousValues.length == maxLength)
            return -1;
        var nextRand = generateRandom();
        while (previousValues.findIndex(e => e === nextRand) > -1) {
            nextRand++;
            nextRand = nextRand % maxLength;
        }
        indexVals.current = ([...previousValues, nextRand]);
        return nextRand;
    };

    const getInitIndex = () => {
        if (indexVals.current.length == 0) {
            var initIndex = generateRandom();
            indexVals.current = ([initIndex]);
            return initIndex;
        }
    }

    const generateAndShuffleChoices = (currentIndex) => {
        var choices = [currentIndex] // correct answer

        for (var i = 0; i < 3; i++) {
            var choice = generateRandom();
            while (choices.findIndex(e => e === choice) > -1) {
                choice++;
                choice = choice % maxLength;
            }
            choices.push(choice);
        }

        var shuffle = generateRandom() % 4;
        for (var i = 0; i <= shuffle; i++)
            choices.push(choices.shift());//shift the array
        return choices;
    }

    return [indexVals.current, getNextIndex, getInitIndex, generateAndShuffleChoices]
}