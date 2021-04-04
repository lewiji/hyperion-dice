import {useCallback, useEffect, useState} from "react";
import Body from "../dice/body";
import {faces} from "../../utils/mappings";
import ResultCard from "../ui/resultCard";
import {motion} from "framer-motion";
import RollReducer from "./rollReducer";


function DiceLog({results, reset, props}) {
    const [log, setLog] = useState([]);

    useEffect(() => {
        if (results !== undefined) {
            setLog([...log, results].slice(-3))
        }
    }, [results]);

    useEffect(() => {
        if (reset) {
            setLog([]);
        }
    }, [reset]);

    const reducer = useCallback((acc, val) => {
        return RollReducer(acc, val);
    }, [faces])

    return (
        <div
            className={"dice_log"} id={"dice_log"}>
            {log?.map((v, i) => {
                const initialState = {
                    success: 0,
                    failure: 0,
                    advantage: 0,
                    threat: 0,
                    triumph: 0,
                    despair: 0,
                    force: 0,
                };
                return <ResultCard key={`result-card-${i}`} v={v} body={(r, i2, idx) => (
                    <Body key={`dice-${i}-${i2}`} id={i2} r={r}/>
                )} reducer={(acc, val) => {
                    return reducer(acc, val);
                }} initialState={initialState}/>;
            })}
        </div>);
}

export default DiceLog;