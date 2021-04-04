import {useCallback, useEffect, useState} from "react";
import useFirebase from "../src/hooks/useFirebase";
import Header from "../src/components/header/header";
import {MapDiceToManualSelectors} from "../src/components/manualSelectors/mapDiceToManualSelectors";
import QuickSelectButtons from "../src/components/quickSelectors/quickSelectButtons";
import ButtonContainer from "../src/components/rollButtons/buttonContainer";
import Results from "../src/components/results/results";
import {useSelectedDice} from "../src/providers/selectedDiceContext";
import {RollDice} from "../src/utils/rollDice";

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
        if (Object.values(selectedDice).filter(v => v > 0).length === 0) return;
        const orderedDice = Object.entries(selectedDice).reverse();
        const results = orderedDice.map(([k, v]) => RollDice(k, v));
        fb.set({name, selectedDice, results});
        dispatch({type: "reset"});
        document.getElementById("top_result")?.scrollIntoView();
    }, [fb]);

    return <>
        <Header onNameChange={setName}/>

        <div className={`flex flex-col md:flex-row ${(name === undefined || name === '' || name?.length < 1) ? 'invisible' : ''}`}>
            <div className={"flex-grow md:w-4/12 -mt-4"}>
                <Results results={result}/>
            </div>

            <div className={"md:w-6/12"}>
                <QuickSelectButtons selectedDice={selectedDice}/>

                <MapDiceToManualSelectors/>

                <ButtonContainer onRoll={doRoll}/>
            </div>
        </div>
    </>;
}


export default HomePage
