import RollButton from "./rollButton";
import ResetButton from "./resetButton";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import useIsSelectionEmpty from "../../../hooks/useIsSelectionEmpty";

const variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 450,
            damping: 30,
            mass: 0.72,
        }
    },
    disabled: {
        opacity: 0
    },
    exit: {
        opacity: 0,
    }
}

export default function ButtonContainer({onRoll}) {
    const disabled = useIsSelectionEmpty();
    return (
        <motion.div variants={variants} initial={"initial"} animate={disabled ? "disabled" : "animate"} exit={"exit"}
                    className="fixed bottom-0 left-0 w-full mx-auto flex justify-center gap-x-4 pb-4 items-end mt-5 z-50 bg-gradient-to-b
                    from-transparent to-black via-gray-900 pointer-events-none">
            <RollButton onRoll={onRoll}/>
            <ResetButton/>
        </motion.div>
    );
}

ButtonContainer.propTypes = {
    numSelectedDice: PropTypes.number,
    onRoll: PropTypes.func,
    onReset: PropTypes.func
};