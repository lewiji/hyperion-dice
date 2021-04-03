import DiceType from "./dicetype";
import * as PropTypes from "prop-types";
import {useEffect} from "react";
import {dice} from "../../utils/mappings";

export function MapDiceToManualSelectors({floating, selectedDice, onRoll, onReset, ...props}) {
    useEffect(() => {
        console.log(selectedDice)
    }, [selectedDice]);
    return <>
        <div
            className="flex flex-wrap flex-row justify-center items-center my-8 mx-auto gap-y-3 md:gap-y-6 gap-x-1 mb-64">
            {dice.map((v, i) => {
                return <DiceType key={v} index={i} dice={v} quickAdd={props.quickAdd} onChange={props.onChange}/>
            })}
        </div>
    </>;
}

MapDiceToManualSelectors.propTypes = {
    addCallback: PropTypes.func,
    quickAdd: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func
};