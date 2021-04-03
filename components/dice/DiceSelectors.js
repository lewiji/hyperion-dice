import QuickSelector from "./quickselector";
import DiceType from "./dicetype";
import MotionButton from "../motionButton";
import * as PropTypes from "prop-types";
import {useEffect} from "react";
import RollButtons from "../ui/rollButtons";
import {dice} from "../../utils/mappings";

export function DiceSelectors({floating, selectedDice, onRoll, onReset, ...props}) {
    useEffect(() => {console.log(selectedDice)}, [selectedDice]);
    return <>
        <div className="flex flex-wrap flex-row justify-center items-center mb-12 md:w-4/6 mx-auto space-x-4">
            { dice.map((v, i) => {
                return <DiceType key={v} index={i} dice={v} quickAdd={props.quickAdd}
                          onChange={props.onChange}/>
            })}
        </div>
    </>;
}

DiceSelectors.propTypes = {
    addCallback: PropTypes.func,
    quickAdd: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func
};