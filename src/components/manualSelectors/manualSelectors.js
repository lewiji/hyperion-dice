import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {dice} from "../../utils/mappings";
import DiceSelector from "./manualSelector";
import {memo} from "react";

function ManualSelectors() {
    return <>
        <motion.div animate={{opacity: 1, scaleX: 1}} initial={{opacity: 0, scaleX: 0.5}} exit={{opacity: 0}} transition={{duration: 0.12}}
                    className={"component_title"}>_edit
        </motion.div>
        <div className="flex flex-wrap flex-row justify-center items-center my-8 mx-auto gap-y-3 md:gap-y-6 gap-x-1 mb-64">
            {dice.map((v, i) => {
                return (<div key={v} className={"flex flex-col justify-between items-center"}>
                    <motion.p animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} transition={{duration: 0.3}}
                              className={"text-sm mb-1"}>{v}</motion.p>
                    <DiceSelector dice={v} index={i}/>
                </div>);
            })}
        </div>
    </>;
}

ManualSelectors.propTypes = {
    addCallback: PropTypes.func,
    quickAdd: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func
};

const memoMapDice = memo(ManualSelectors);
export default memoMapDice;