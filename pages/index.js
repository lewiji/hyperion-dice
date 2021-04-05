import {useCallback, useEffect, useState} from "react";
import useFirebase from "../src/hooks/useFirebase";
import Header from "../src/components/header/header";
import {MapDiceToManualSelectors} from "../src/components/manualSelectors/mapDiceToManualSelectors";
import QuickSelectButtons from "../src/components/quickSelectors/quickSelectButtons";
import ButtonContainer from "../src/components/ui/rollButtons/buttonContainer";
import Results from "../src/components/results/results";
import {useSelectedDice} from "../src/providers/selectedDiceContext";
import {RollDice} from "../src/utils/rollDice";
import {AnimatePresence, motion} from "framer-motion";
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

            /* return () => {
                 fb.off('value')
             };*/
        }
    }, [fb, fbSubscribed]);

    const doRoll = useCallback(() => {
        if (Object.values(selectedDice).filter(v => v > 0).length === 0) return;
        const results = Object.entries(selectedDice).reduce((acc, [k, v]) => {
            return [...acc, ...RollDice(k, numSides[k], v)]
        }, []);
        fb.set({name, selectedDice, results});
        dispatch({type: "reset"});
        document.getElementById("top_result")?.scrollIntoView();
    }, [fb]);

    return <>
        <Header onNameChange={setName}/>
        <AnimatePresence>
            {(name?.length > 0) && (<div className={`flex flex-col md:flex-row`}>
                {result && (<div className={"flex-grow md:w-4/12"}>
                    <motion.div animate={{opacity: 1, scaleX: 0.92}} initial={{opacity: 0, scaleX: 0.5}} exit={{opacity: 0}}
                                transition={{duration: 0.12}} className={"component_title"}>
                        _results
                    </motion.div>
                    <Results results={result}/>
                </div>)}

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
