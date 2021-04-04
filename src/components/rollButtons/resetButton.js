import MotionButton from "../ui/motionButton";
import * as PropTypes from "prop-types";
import {useSelectedDice} from "../../providers/selectedDiceContext";
import useIsSelectionEmpty from "../../hooks/useIsSelectionEmpty";


export default function ResetButton() {
    const {dispatch} = useSelectedDice();
    const disabled = useIsSelectionEmpty();

    return <MotionButton className={`h-12 text-sm text-center bg-yellow-500 
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