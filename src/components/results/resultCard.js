import * as PropTypes from "prop-types";
import {memo} from "react";
import {motion} from "framer-motion";

function renderDataHumanReadable(reduction) {
    if (reduction === undefined) return "";
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

function ResultCard({body, reducer, ...props}) {
    if (props.v === undefined || props.v?.results === undefined) return null;
    return <>
        <motion.div className={`p-1.5 bg-gradient-to-tr from-gray-900 via-indigo-900 to-indigo-800 rounded-lg my-4 overflow-hidden`}
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, y: 100}}
                    transition={{duration: 0.2}}>
            <p className={"text-sm font-semibold ml-1 bg-gray-200 bg-opacity-5 w-min px-2 rounded shadow-sm text-shadow-sm"}>{props.v?.name}</p>
            <div className={"flex flex-row flex-wrap justify-center my-2 bg-purple-500 mx-1 bg-opacity-20 rounded overflow-hidden"}>
                {props.v?.results?.map(body)}
            </div>
            <p className={"text-center p-1 bg-black bg-opacity-50 rounded-lg"}>
                {renderDataHumanReadable(props.v?.results?.reduce(reducer, props.initialState))}</p>
        </motion.div>
    </>;
}

ResultCard.propTypes = {
    v: PropTypes.any,
    prop1: PropTypes.func,
    prop2: PropTypes.func,
    initialState: PropTypes.shape({
        triumph: PropTypes.number,
        success: PropTypes.number,
        failure: PropTypes.number,
        advantage: PropTypes.number,
        force: PropTypes.number,
        threat: PropTypes.number,
        despair: PropTypes.number
    })
};

const memoResultCard = memo(ResultCard);
export default memoResultCard;