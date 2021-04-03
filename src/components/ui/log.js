import {useCallback, useEffect, useState} from "react";
import Body from "../dice/body";
import {faces} from "../../utils/mappings";

function renderDataHumanReadable(reduction) {
    const success = reduction.success - reduction.failure;
    const advantage = reduction.advantage - reduction.threat;
    const triumph = reduction.triumph - reduction.despair;
    const force = reduction.force;
    let out = [];

    if (triumph > 0) out.push(`${triumph} triumph`);
    if (force > 0) out.push(`${force} force`);
    if (success > -1) out.push(`${success} success`);
    else if (triumph < 1) out.push(`${Math.abs(success)} failure`)
    if (advantage > 0) out.push(`${advantage} advantage`);
    else if (advantage < 0) out.push(`${Math.abs(advantage)} threat`);

    return `${out.join(", ")}`;
}

function ActionLog({results, reset, props}) {
    const [log, setLog] = useState([]);

    useEffect(() => {
        if (results !== undefined) {
            setLog([...log, results].slice(0, 10))
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
            className={"dicelog"} id={"dice_log"}>
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
                return <div className={`p-2 bg-gray-900 rounded-lg my-1.5`}>
                    <p className={"text-sm font-light ml-2"}>{v.name}</p>
                    <div className={"grid grid-flow-row-dense grid-cols-6 gap-0.5"}>
                        {v.results?.map((r, i2) => (
                            <Body key={`dice-${i + (i2 * i)}`} id={i2} r={r}/>
                        ))}

                    </div>
                    <p className={"text-center p-1 bg-black rounded-lg"}>
                        {renderDataHumanReadable(v.results?.reduce((acc, val) => {
                            return reducer(val, acc);
                        }, initialState))}</p>
                </div>;
            })}
        </div>);
}

export default ActionLog;