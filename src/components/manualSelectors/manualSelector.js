import {motion} from "framer-motion";
import MotionButton from "../ui/motionButton";
import {useSelectedDice} from "../../providers/selectedDiceContext";
import Counter from "./counter";
import {memo, useCallback} from "react";

const variants = {
    initial: {x: -20, y: -15, scale: 0},
    animate: {x: 0, y: 0, scale: 1, opacity: 1},
    exit: {opacity: 0},
}

function DiceSelector({dice, index}) {
    const {state, dispatch} = useSelectedDice();

    const increment = useCallback(() => {
        dispatch({type: 'increment', payload: dice});
    }, [dice, dispatch]);

    const decrement = useCallback(() => {
        dispatch({type: 'decrement', payload: dice});
    }, [dice, dispatch]);

    return <>
        <motion.div className={`h-16 w-36 flex flex-row justify-evenly -space-x-4 `}
                    variants={variants}
                    animate={"animate"}
                    initial={"initial"}
                    exit={"exit"}
                    transition={{delay: 0.07 + index * 0.016}}
        >
            <MotionButton onClick={decrement} className="manual_selector rounded-l-lg rounded-r-none">
                {"-"}
            </MotionButton>
            <Counter dice={dice} state={state}/>
            <MotionButton onClick={increment} className="manual_selector rounded-r-lg rounded-l-none">
                {"+"}
            </MotionButton>
        </motion.div>
    </>
}

const memoDiceSelector = memo(DiceSelector);
export default memoDiceSelector;