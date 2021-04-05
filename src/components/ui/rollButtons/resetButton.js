import MotionButton from "../motionButton";
import * as PropTypes from "prop-types";
import {useSelectedDice} from "../../../providers/selectedDiceContext";
import useIsSelectionEmpty from "../../../hooks/useIsSelectionEmpty";
import {memo} from "react";


function ResetButton() {
    const {dispatch} = useSelectedDice();
    const disabled = useIsSelectionEmpty();

    return <MotionButton className={`h-12 text-sm text-center bg-yellow-500 pointer-events-auto
                            ${disabled ? "bg-opacity-20 opacity-10" : "bg-opacity-60 opacity-70"} 
                            fixed bottom-4 right-8 z-40`}
                         disabled={disabled}
                         onClick={() => {
                             dispatch({type: "reset"})
                         }}>
        RESET
    </MotionButton>;
}

ResetButton.propTypes = {
    numSelectedDice: PropTypes.number,
    onClick: PropTypes.func
};

const memoResetButton = memo(ResetButton);
export default memoResetButton;
