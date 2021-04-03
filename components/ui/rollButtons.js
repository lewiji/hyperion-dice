import MotionButton from "../motionButton";
import * as PropTypes from "prop-types";

export default function RollButtons({onRoll, onReset, floating, disabled, ...props}) {
    return <div className="flex justify-end my-2  items-start">
        <MotionButton
            className={`h-32 w-32 rounded-full ring  font-bold text-xl text-black 
                        ${disabled ? "bg-opacity-50 opacity-50 bg-gray-500" : "bg-opacity-100 opacity-100 underline bg-gradient-to-tr from-indigo-500 to-indigo-800 via-pink-200 " }
                        ${floating ? "fixed z-40 top-10" : ""}`}
            onClick={onRoll}
            disabled={disabled}
        >
            ROLL
        </MotionButton>

    </div>;
}

RollButtons.propTypes = {
    floating: PropTypes.any,
    onClick: PropTypes.any
};