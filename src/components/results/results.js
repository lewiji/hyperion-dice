import {useCallback, useEffect, useState} from "react";
import Body from "../dice/body";
import {faces} from "../../utils/mappings";
import ResultCard from "./resultCard";
import RollReducer from "./rollReducer";


function Results({results, reset}) {
    const [log, setLog] = useState([]);

    useEffect(() => {
        if (results !== undefined) {
            setLog([results, ...log,]);
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
            {log?.slice(0, 3).map((v, i) => {
                const initialState = {
                    success: 0,
                    failure: 0,
                    advantage: 0,
                    threat: 0,
                    triumph: 0,
                    despair: 0,
                    force: 0,
                };
                return <ResultCard key={`result-card-${(log.length - 1) - i}`} v={v} body={(r, i2) => (
                    <Body key={`dice-${(log.length - 1) - i}-${i2}`} id={i2} r={r}/>
                )} reducer={(acc, val) => {
                    return reducer(acc, val);
                }} initialState={initialState}/>;
            })}
        </div>);
}

export default Results;