import {useEffect, useState} from "react";
import {useSelectedDice} from "../providers/selectedDiceContext";

export default function useNumSelected() {
    const {state} = useSelectedDice();
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (state === undefined) return false;
        setCount(Object.values(state).reduce((a, v) => a + v, 0).length === 0);
    }, [state]);
    return count;
}
