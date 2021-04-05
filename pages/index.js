import {useCallback, useEffect, useState} from "react";
import useFirebase from "../src/hooks/useFirebase";
import Header from "../src/components/header/header";
import MapDiceToManualSelectors from "../src/components/manualSelectors/mapDiceToManualSelectors";
import QuickSelectButtons from "../src/components/quickSelectors/quickSelectButtons";
import ButtonContainer from "../src/components/ui/rollButtons/buttonContainer";
import Results from "../src/components/results/results";
import {useSelectedDice} from "../src/providers/selectedDiceContext";
import {RollDice} from "../src/utils/rollDice";
import {numSides} from "../src/utils/mappings";

function HomePage() {
    const fb = useFirebase({roomId: 'demo'});
    const {state: selectedDice, dispatch} = useSelectedDice();
    const [fbSubscribed, setFbSubscribed] = useState(false);
    const [name, setName] = useState();
    const [showInterface, setShowInterface] = useState(false);
    const [result, setResult] = useState();

    useEffect(() => {
        if (fbSubscribed || fb === undefined) return;
        if (!fbSubscribed) {
            fb.on("value", (val) => {
                    setResult(val.val());
                },
                (err) => {
                    console.log(err);
                });
            setFbSubscribed(true);
        }
        return function unsubscribe() {
            if (fbSubscribed) {
                fb.off('value')
            }
        };
    }, [fb, fbSubscribed]);

    useEffect(() => {
        window.localStorage.setItem('name', JSON.stringify(name));
        if (name?.length) {
            setShowInterface(true);
        } else {
            setShowInterface(false);
        }
    }, [name]);

    const doRoll = useCallback(() => {
        if (Object.values(selectedDice).filter(v => v > 0).length === 0) return;
        const results = Object.entries(selectedDice).reduce((acc, [k, v]) => {
            return [...acc, ...RollDice(k, numSides[k], v)]
        }, []);
        fb.set({name, selectedDice, results});
        dispatch({type: "reset"});
        setTimeout(() => {
            document.getElementById("scroll_anchor")?.scrollIntoView({block: "end", behavior: "smooth", inline: "end"});
        }, 2);
    }, [fb]);

    return <>
        <Header onNameChange={setName}/>
        {showInterface && (<div className={`flex flex-col md:flex-row`}>
            <div className={"flex-grow md:w-5/12"}>
                {result && (<Results results={result}/>)}
            </div>
            <div className={"flex-grow md:w-5/12"}>
                <QuickSelectButtons selectedDice={selectedDice}/>
                <MapDiceToManualSelectors/>
                <ButtonContainer onRoll={doRoll}/>
            </div>
        </div>)}
    </>;
}


export default HomePage
