import {motion} from "framer-motion";
import MotionButton from "../ui/motionButton";
import {colours} from "../../utils/mappings";
import {useSelectedDice} from "../../providers/selectedDiceContext";

export default function DiceSelector({dice, index}) {
    const {state, dispatch} = useSelectedDice();
    return <>
        <motion.div className={"h-16 w-40 flex flex-row justify-evenly -space-x-3"}
                    animate={{x: 0, y: 0, scale: 1}}
                    initial={{x: -20, y: -15, scale: 0}}
                    transition={{delay: (0.07 + (index * 0.016))}}
        >
            <MotionButton onClick={() => {
                dispatch({type: 'decrement', payload: dice});
            }} className="manual_selector rounded-l-lg rounded-r-none">
                -
            </MotionButton>
            <div className={`w-16 text-center flex justify-center items-center font-bold bg-gradient-to-br ${colours[dice]}`}>
                <motion.p>{state[dice] || 0}</motion.p>
            </div>
            <MotionButton onClick={() => {
                dispatch({type: 'increment', payload: dice});
            }} className="manual_selector rounded-r-lg rounded-l-none">
                +
            </MotionButton>
        </motion.div>
    </>
}

