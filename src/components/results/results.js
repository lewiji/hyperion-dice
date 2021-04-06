import {memo, useCallback, useEffect, useState} from "react";
import Body from "../dice/body";
import {faces} from "../../utils/mappings";
import ResultCard from "./resultCard";
import RollReducer from "./rollReducer";
import {motion} from "framer-motion";

const variants = {
    initial: {
        opacity: 0, scaleX: 0.5
    },
    animate: {
        opacity: 1, scaleX: 0.92,
        transition: {
            duration: 0.2
        }
    },
    hidden: {
        opacity: 0, scaleX: 0.5,
        transition: {
            duration: 0.2
        }
    }
}

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

    return (<>
        <motion.div id={"scroll_anchor"} animate={"animate"} initial={"initial"} exit={"exit"} variants={variants}
                    className={"component_title"}>
            _results
        </motion.div>
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
                return <ResultCard key={`result-card-${(log.length - 1) - i}`} value={v} body={(r, i2) => (
                    <Body key={`dice-${(log.length - 1) - i}-${i2}`} id={i2} data={r}/>
                )} reducer={(acc, val) => {
                    return reducer(acc, val);
                }} initialState={initialState}/>;
            })}
        </div>
    </>);
}

const memoResult = memo(Results);
export default memoResult;