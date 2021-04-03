import {useCallback, useEffect, useState} from "react";
import Body from "../dice/body";
import {faces} from "../../utils/mappings";
import ResultCard from "./resultCard";
import {motion} from "framer-motion";


function DiceLog({results, reset, props}) {
    const [log, setLog] = useState([]);

    useEffect(() => {
        if (results !== undefined) {
            setLog([results, ...log].slice(0, 10))
        }
    }, [results]);

    useEffect(() => {
        if (reset) {
            setLog([]);
        }
    }, [reset]);

    const reducer = useCallback((val, acc) => {
        const face = faces[val.type][val.value];
        switch (face) {
            case "s": {
                acc.success += 1;
                break;
            }
            case "sa": {
                acc.success += 1;
                acc.advantage += 1;
                break;
            }
            case "ss": {
                acc.success += 2;
                break;
            }
            case "f": {
                acc.failure += 1;
                break;
            }
            case "ff": {
                acc.failure += 2;
                break;
            }
            case "a": {
                acc.advantage += 1;
                break;
            }
            case "aa": {
                acc.advantage += 2;
                break;
            }
            case "t": {
                acc.threat += 1;
                break;
            }
            case "tf": {
                acc.threat += 1;
                acc.failure += 1;
                break;
            }
            case "tt": {
                acc.threat += 2;
                break;
            }
            case "x": {
                acc.triumph += 1;
                break;
            }
            case "xx": {
                acc.triumph += 2;
                break;
            }
        }
        return acc;
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
                return <ResultCard key={`resultcard-${i}`} v={v} body={(r, i2) => (
                    <Body key={`dice-${log.length - i}-${i2}`} id={i2} r={r}/>
                )} reducer={(acc, val) => {
                    return reducer(val, acc);
                }} initialState={initialState}/>;
            })}
        </div>);
}

export default DiceLog;