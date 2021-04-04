import {useCallback, useEffect, useState} from "react";
import useFirebase from "../src/hooks/useFirebase";
import Header from "../src/components/header/header";
import {MapDiceToManualSelectors} from "../src/components/manualSelectors/mapDiceToManualSelectors";
import QuickSelectButtons from "../src/components/quickSelectors/quickSelectButtons";
import ButtonContainer from "../src/components/ui/rollButtons/buttonContainer";
import Results from "../src/components/results/results";
import {SelectedDiceProvider, useSelectedDice} from "../src/providers/selectedDiceContext";
import {RollDice} from "../src/utils/rollDice";
import {AnimatePresence} from "framer-motion";
import {numSides} from "../src/utils/mappings";

function HomePage() {
    const fb = useFirebase({roomId: 'demo'});
    const {state: selectedDice, dispatch} = useSelectedDice();
    const [fbSubscribed, setFbSubscribed] = useState(false);
    const [name, setName] = useState();
    const [result, setResult] = useState();

    useEffect(() => {
        if (fbSubscribed || fb === undefined) return;
        console.log("subscribing")
        if (!fbSubscribed) {
            fb.on("value", (val) => {
                console.log(val.val());
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
        console.log("rolling");
        if (Object.values(selectedDice).filter(v => v > 0).length === 0) return;
        console.log("dice selected:")
        console.log(selectedDice);
        const orderedDice = Object.entries(selectedDice).reverse();
        const results = orderedDice.reduce((acc, [k, v]) => {
            return [...acc, ...RollDice(k, numSides[k], v)]
        }, []);
        console.log(results);
        fb.set({name, selectedDice, results});
        dispatch({type: "reset"});
        document.getElementById("top_result")?.scrollIntoView();
    }, [fb]);

    return <>
        <Header onNameChange={setName}/>

        <AnimatePresence>
            {(name?.length > 0) && (<div className={`flex flex-col md:flex-row`}>
                <div className={"flex-grow md:w-4/12 -mt-4"}>
                    <Results results={result}/>
                </div>

                <div className={"md:w-6/12"}>
                    <QuickSelectButtons selectedDice={selectedDice}/>

                    <MapDiceToManualSelectors/>

                    <ButtonContainer onRoll={doRoll}/>
                </div>
            </div>)}
        </AnimatePresence>
    </>;
}


export default HomePage
