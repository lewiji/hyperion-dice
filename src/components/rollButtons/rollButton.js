import MotionButton from "../ui/motionButton";
import * as PropTypes from "prop-types";
import useIsSelectionEmpty from "../../hooks/useIsSelectionEmpty";
import {motion} from "framer-motion";

export default function RollButton({onRoll}) {
    const disabled = useIsSelectionEmpty();

    return <motion.div initial={{opacity: 0}} animate={{opacity: disabled ? 0 : 1}} className="flex justify-end my-2  items-start">
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