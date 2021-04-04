import RollButton from "./rollButton";
import ResetButton from "./resetButton";
import * as PropTypes from "prop-types";

export default function ButtonContainer({onRoll}) {
    return <div className="fixed bottom-0 left-0 w-full mx-auto flex justify-center gap-x-4 pb-8 items-end
                            mt-5 z-50 bg-gradient-to-b from-transparent to-black via-gray-900">
        <RollButton onRoll={onRoll}/>
        <ResetButton/>
    </div>;
}

ButtonContainer.propTypes = {
    numSelectedDice: PropTypes.number,
    onRoll: PropTypes.func,
    onReset: PropTypes.func
};