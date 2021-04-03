import MotionButton from "./motionButton";
import * as PropTypes from "prop-types";

export default function ResetButton(props) {
    return <MotionButton className={`h-12 text-sm text-center bg-yellow-500 
                                ${props.numSelectedDice < 1 ? "bg-opacity-20 opacity-10" : "bg-opacity-60 opacity-70"} 
                                fixed bottom-4 right-8 z-40`}
                         disabled={props.numSelectedDice < 1}
                         onClick={props.onClick}>
        RESET
    </MotionButton>;
}

ResetButton.propTypes = {
    numSelectedDice: PropTypes.number,
    onClick: PropTypes.func
};