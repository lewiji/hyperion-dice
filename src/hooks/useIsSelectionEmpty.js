import {useEffect, useState} from "react";
import {useSelectedDice} from "../providers/selectedDiceContext";

export default function useIsSelectionEmpty() {
    const {state} = useSelectedDice();
    const [empty, setEmpty] = useState(true);
    useEffect(() => {
        if (state === undefined) return false;
        setEmpty(Object.entries(state).filter(([k, v]) => v > 0).length === 0);
    }, [state]);
    return empty;
}
