import {useCallback, useEffect, useState} from "react";
import useFirebase from "../src/hooks/useFirebase";
import Header from "../src/components/header/header";
import {MapDiceToManualSelectors} from "../src/components/manualSelectors/mapDiceToManualSelectors";
import QuickSelectButtons from "../src/components/quickSelectors/quickSelectButtons";
import rng_tools from "../src/utils/rng";
import ButtonContainer from "../src/components/rollButtons/buttonContainer";
import DiceLog from "../src/components/log/diceLog";
import {useSelectedDice} from "../src/providers/selectedDiceContext";

function HomePage() {
    const fb = useFirebase({});
    const {state: selectedDice, dispatch} = useSelectedDice();
    const [fbSubscribed, setFbSubscribed] = useState(false);
    const [name, setName] = useState();
    const [result, setResult] = useState();

    useEffect(() => {
        if (fb === undefined) return;
        if (!fbSubscribed) {
            fb.on("value", (val) => {
                setResult(val.val());
            }, (err) => {
                console.log(err);
            });
            setFbSubscribed(true);

            return () => {
                fb.off('value')
            };
        }
    }, [fb, fbSubscribed]);

    const doRoll = useCallback(() => {
        let results = [];
        if (Object.values(selectedDice).filter(v => v > 0).length === 0) return;
        const orderedDice = Object.entries(selectedDice).reverse();
        for (let [key, value] of orderedDice) {
            switch (key) {
                case "ability":
                    results = [...results, ...RollDice(key, 8, value)];
                    break;
                case "difficulty":
                    results = [...results, ...RollDice(key, 8, value)];
                    break;
                case "boost":
                    results = [...results, ...RollDice(key, 6, value)];
                    break;
                case "force":
                    results = [...results, ...RollDice(key, 12, value)];
                    break;
                case "proficiency":
                    results = [...results, ...RollDice(key, 12, value)];
                    break;
                case "challenge":
                    results = [...results, ...RollDice(key, 12, value)];
                    break;
                case "setback":
                    results = [...results, ...RollDice(key, 6, value)];
                    break;
            }
        }
        let fbData = {
            name,
            selectedDice,
            results
        };
        fb.set(fbData);
        dispatch({type: "reset"});
        document.getElementById("top_result")?.scrollIntoView();
    }, [fb]);

    if (name === undefined || name === '' || name?.length < 1) {
        return <Header onNameChange={setName}/>
    }

    return <>
        <Header onNameChange={setName}/>
        {
            <div className={"flex flex-col md:flex-row"}>
                <div className={"flex-grow md:w-4/12 -mt-4"}>
                    <DiceLog results={result}/>
                </div>

                <div className={"md:w-6/12"}>
                    <QuickSelectButtons selectedDice={selectedDice}/>

                    <MapDiceToManualSelectors/>

                    <ButtonContainer onRoll={doRoll}/>
                </div>
            </div>
        }
    </>
}

function RollDice(name, maxVal, quantity) {
    const results = [];
    for (let i = 0; i < quantity; i++) {
        results.push({type: name, value: Math.floor(rng_tools.chance() * maxVal)});
    }

    return results;
}

export default HomePage
