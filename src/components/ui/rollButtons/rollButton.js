import MotionButton from "../motionButton";
import * as PropTypes from "prop-types";
import useIsSelectionEmpty from "../../../hooks/useIsSelectionEmpty";
import {motion} from "framer-motion";

const variants = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,
        }
    },
    disabled: {
        scale: 0,
        opacity: 1
    },
    exit: {
        y: 190,
        scale: 0,
        opacity: 0,
    }
}

export default function RollButton({onRoll}) {
    const disabled = useIsSelectionEmpty();

    return <motion.div variants={variants} initial={"initial"} animate={disabled ? "disabled" : "animate"} exit={"exit"}
                       className="flex justify-end my-2  items-start">
        <MotionButton
            className={`h-48 w-48 rounded-full   font-bold text-xl md:text-3xl text-black 
                    bg-opacity-100 opacity-100" bg-opacity-100 opacity-100 bg-gradient-to-tr from-indigo-600 to-indigo-900 via-pink-200`}
            onClick={onRoll}
            disabled={disabled}>
            {"ROLL"}
        </MotionButton>

    </motion.div>;
}

RollButton.propTypes = {
    floating: PropTypes.any,
    onClick: PropTypes.any
};