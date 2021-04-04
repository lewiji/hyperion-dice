import MotionButton from "../ui/motionButton";
import * as PropTypes from "prop-types";
import useIsSelectionEmpty from "../../hooks/useIsSelectionEmpty";

export default function RollButton({onRoll}) {
    const disabled = useIsSelectionEmpty();

    return <div className="flex justify-end my-2  items-start">
        <MotionButton
            className={`h-32 w-32 md:h-48 md:w-48 rounded-full   font-bold text-xl md:text-3xl text-black 
                        ${disabled ? "bg-opacity-90 opacity-50 bg-black ring-0 text-gray-900" : "bg-opacity-100 opacity-100" +
                "bg-opacity-100 opacity-100 bg-gradient-to-tr from-indigo-600 to-indigo-900 via-pink-200"}`}
            onClick={onRoll}
            disabled={disabled}>
            {"ROLL"}
        </MotionButton>

    </div>;
}

RollButton.propTypes = {
    floating: PropTypes.any,
    onClick: PropTypes.any
};