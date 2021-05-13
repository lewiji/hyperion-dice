import * as PropTypes from "prop-types";
import {memo, useEffect, useState} from "react";
import {motion} from "framer-motion";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config.js'

const twConfig = resolveConfig(tailwindConfig)

function renderDataHumanReadable(reduction) {
    if (reduction === undefined) return "";
    const success = reduction.success - reduction.failure;
    const advantage = reduction.advantage - reduction.threat;
    const triumph = reduction.triumph - reduction.despair;
    const force = reduction.force;
    let out = [];
    if (triumph > 0) out.push(`${triumph} triumph`);
    if (triumph < 0) out.push(`${Math.abs(triumph)} despair`);
    if (force > 0) out.push(`${force} force`);
    if (success > 0 && triumph >= 0) out.push(`${success} success`);
    else if (success < 0) out.push(`${Math.abs(success)} failure`)
    if (advantage > 0) out.push(`${advantage} advantage`);
    else if (advantage < 0) out.push(`${Math.abs(advantage)} threat`);

    if (out.length === 0) {
        out.push("Nothing :(")
    }
    return `${out.join(", ")}`;
}

const colours = {
    base: twConfig.theme.colors.gray["900"],
    success: twConfig.theme.colors.green["700"],
    failure: twConfig.theme.colors.red["800"],
    triumph: twConfig.theme.colors.yellow["500"]
}

const cardVariants = {
    initial: {opacity: 0, scale: 0},
    animate: {opacity: 1, scale: 1, backgroundColor: colours.base},
    success: {
        opacity: 1, scale: 1, backgroundOpacity: 0.9, backgroundColor: colours.success
    },
    failure: {
        opacity: 1, scale: 1, backgroundOpacity: 0.9, backgroundColor: colours.failure
    },
    triumph: {
        opacity: 1, scale: 1, backgroundOpacity: 0.9, backgroundColor: colours.triumph
    },
    exit: {opacity: 0}
}


function ResultCard({body, reducer, value, ...props}) {
    const [readout, setReadout] = useState("");
    const [variant, setVariant] = useState("animate");

    useEffect(() => {
        const hrString = renderDataHumanReadable(value?.results?.reduce(reducer, props.initialState));
        setReadout(hrString);
        if (hrString.includes("triumph")) {
            setTimeout(() => {
                setVariant("triumph");
            }, 600);
        } else if (hrString.includes("success")) {
            setTimeout(() => {
                setVariant("success");
            }, 600);
        } else if (hrString.includes("failure")) {
            setTimeout(() => {
                setVariant("failure");
            }, 600);
        }
    }, [value]);

    if (value === undefined || value?.results === undefined) return null;
    return <>
        <motion.div className={`p-1.5 rounded-lg my-4`}
                    layout
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}>
            <p className={"text-sm font-semibold ml-1 bg-gray-200 bg-opacity-5 w-auto px-2 rounded shadow-sm text-shadow-sm"}>{props.v?.name}</p>
            <div className={"flex flex-row flex-wrap justify-center my-2 bg-purple-500 mx-1 bg-opacity-20 rounded overflow-hidden"}>
                {props.v?.results?.map(body)}
            </div>
            <motion.p variants={cardVariants} initial={"initial"} animate={"animate"} exit={"exit"}
                      transition={{delay: 0.5}}
                      className={"text-center p-1 bg-black bg-opacity-50 rounded-lg"}>
                {readout}
            </motion.p>
        </motion.div>
    </>;
}

ResultCard.propTypes = {
    value: PropTypes.any,
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