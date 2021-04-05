import {colours} from "../../utils/mappings";
import {motion} from "framer-motion";
import * as PropTypes from "prop-types";
import {memo} from "react";

function Counter({dice, state}) {
    const greaterThanZero = (state[dice] !== undefined && state[dice] > 0);
    return <div className={`w-16 text-center flex justify-center items-center font-bold bg-gradient-to-br ${colours[dice]}`}>
        <motion.p animate={{scale: greaterThanZero ? 1.1 : 0.9}} className={`${greaterThanZero ? "opacity-100" : "opacity-50"}`}>
            {state[dice] || 0}
        </motion.p>
    </div>;
}

Counter.propTypes = {
    dice: PropTypes.any,
    state: PropTypes.any
};

const memoCounter = memo(Counter);
export default memoCounter;