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
import {usePlayer} from "../src/providers/playerContext";

function HomePage() {
    const fb = useFirebase({roomId: 'demo'});
    const {state: selectedDice, dispatch} = useSelectedDice();
    const [fbSubscribed, setFbSubscribed] = useState(false);
    const {state: player} = usePlayer();
    const [showInterface, setShowInterface] = useState(false);
    const [result, setResult] = useState();

    useEffect(() => {
        if (fbSubscribed || fb === undefined) return;
        if (!player?.fbId) return;
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
    }, [fb, fbSubscribed, player]);

    useEffect(() => {
        if (player?.name?.length && player?.fbId?.length) {
            setShowInterface(true);
        } else {
            setShowInterface(false);
        }
    }, [player]);

    const doRoll = useCallback(() => {
        if (Object.values(selectedDice).filter(v => v > 0).length === 0) return;
        const results = Object.entries(selectedDice).reduce((acc, [k, v]) => {
            return [...acc, ...RollDice(k, numSides[k], v)]
        }, []);
        fb.set({name: player?.name, selectedDice, results});
        dispatch({type: "reset"});
        setTimeout(() => {
            document.getElementById("scroll_anchor")?.scrollIntoView();
        }, 2);
    }, [fb]);

    return <>
        <Header/>
        {showInterface && (
            <div className={`flex flex-col md:flex-row mx-auto`}>
                <div className={"flex-grow md:w-5/12"}>
                    {result && (<Results results={result}/>)}
                </div>
                <div className={"flex-grow md:w-5/12"}>
                    <QuickSelectButtons selectedDice={selectedDice}/>
                    <MapDiceToManualSelectors/>
                    <ButtonContainer onRoll={doRoll}/>
                </div>
            </div>
        )}
    </>;
}


export default HomePage
