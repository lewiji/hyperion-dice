import {useCallback, useEffect, useState} from "react";
import useFirebase from "../src/hooks/useFirebase";
import ActionLog from "../src/components/ui/log";
import Header from "../src/components/ui/header";
import {MapDiceToSelectors} from "../src/components/dice/mapDiceToSelectors";
import RollButtons from "../src/components/ui/rollButtons";
import MotionButton from "../src/components/ui/motionButton";
import QuickSelectButton from "../src/components/dice/quickSelectButton";
import rng_tools from "../src/utils/rng";

function HomePage() {
    const fb = useFirebase({});
    const [name, setName] = useState();
    const [quickAddDice, setQuickAddDice] = useState();
    const [fbSubscribed, setFbSubscribed] = useState(false);
    const [result, setResult] = useState();
    const [selectedDice, setSelectedDice] = useState({});

    useEffect(() => {
        if (fb === undefined) return;
        if (!fbSubscribed) {
            console.log("subscribing to fb")
            fb.on("value", (val) => {
                console.log(val.val());
                setResult(val.val());
            }, (err) => {
                console.log(err);
            });
            setFbSubscribed(true);
        }
    }, [fb, fbSubscribed]);

    useEffect(() => {
        const selectedDiceOverZero = Object.values(selectedDice).filter(v => {
            console.log(v);
            return v > 0
        });
    }, [selectedDice])

    useEffect(() => {
        if (quickAddDice !== undefined) {
            setQuickAddDice(undefined);
        }
    }, [quickAddDice]);

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
        setQuickAddDice(-1);
        let fbData = {
            name,
            selectedDice,
            results
        };
        fb.set(fbData);
        setSelectedDice({});
        document.getElementById("dice_log").scrollIntoView();
    }, [fb]);

    const doReset = useCallback(() => {
        setQuickAddDice(-1);
        setSelectedDice({});
    }, []);

    const onDiceNumChanged = useCallback(({type, num}) => {
        setSelectedDice({...selectedDice, [type]: num});
    }, [selectedDice]);

    const getNumSelectedDice = useCallback(() => {
        const filteredDice = Object.entries(selectedDice).filter(([k, v]) => v > 0);
        return filteredDice.length;
    }, [selectedDice])

    if (name === undefined || name === '' || name?.length < 1) {
        return <Header onNameChange={setName}/>
    }

    return <>
        <Header onNameChange={setName}/>
        {
            <div className={"flex flex-col md:flex-row"}>
                <MotionButton
                    className={`h-12 text-sm text-center bg-yellow-500 ${getNumSelectedDice() < 1 ? "bg-opacity-20 opacity-10" : "bg-opacity-60 opacity-70"} fixed right-3 bottom-8  z-40`}
                    disabled={getNumSelectedDice() < 1}
                    onClick={doReset}>RESET</MotionButton>
                <div className={"flex-grow md:w-4/12 -mt-4"}>
                    <div className={"font-light text-sm mx-auto text-center"}>results:</div>
                    <ActionLog results={result}/>
                </div>

                <div className={"md:w-7/12"}>
                    <hr className={"opacity-20 my-2"}/>
                    <div className="w-full mx-auto flex justify-around my-5">
                        <RollButtons disabled={getNumSelectedDice() < 1} onRoll={doRoll} onReset={doReset}/>
                    </div>

                    <hr className={"opacity-20 my-2"}/>
                    <div>
                        <QuickSelectButton selectedDice={selectedDice} addCallback={setQuickAddDice}/>
                    </div>

                    <hr className={"opacity-20 my-2"}/>
                    <MapDiceToSelectors addCallback={setQuickAddDice} quickAdd={quickAddDice}
                                        onChange={onDiceNumChanged}
                                        onRoll={doRoll} onReset={doReset} selectedDice={selectedDice}/>
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
