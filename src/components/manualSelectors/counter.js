import {colours} from "../../utils/mappings";
import {motion} from "framer-motion";
import * as PropTypes from "prop-types";

export default function Counter({dice, state}) {
    return <div className={`w-16 text-center flex justify-center items-center font-bold bg-gradient-to-br ${colours[dice]}`}>
        <motion.p className={`${state[dice] === 0 || state[dice] === undefined ? "opacity-50" : "opacity-100"}`}>
            {state[dice] || 0}
        </motion.p>
    </div>;
}

Counter.propTypes = {
    dice: PropTypes.any,
    state: PropTypes.any
};