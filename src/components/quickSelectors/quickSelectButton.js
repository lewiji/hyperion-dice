import MotionButton from "../ui/motionButton";
import {colours} from "../../utils/mappings";
import {useSelectedDice} from "../../providers/selectedDiceContext";
import {motion} from "framer-motion";
import {memo, useCallback} from "react";

const variants = {
    initial: {x: -15, y: -25, opacity: 0},
    animate: {x: 0, y: 0, opacity: 1},
    exit: {x: -5, y: -8, opacity: 0},
}

function QuickSelectButton({name, index}) {
    const {state, dispatch} = useSelectedDice();

    const increment = useCallback(() => {
        dispatch({type: 'increment', payload: name});
    }, [name, dispatch]);

    return (
        <motion.div variants={variants} animate={"animate"} initial={"initial"} exit={"exit"} transition={{delay: (index * 0.02)}}>
            <MotionButton key={name}
                          className={`my-2 mx-2 w-36 px-1 h-16 bg-gradient-to-br hover:bg-gradient-to-bl ${colours[name]} `}
                          onClick={increment}
            >
                {name}<br/> {state[name]}
            </MotionButton>
        </motion.div>
    );
}

const memoQSButton = memo(QuickSelectButton);
export default memoQSButton;