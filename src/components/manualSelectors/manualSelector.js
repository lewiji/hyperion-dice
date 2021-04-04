import {useEffect} from "react";
import {motion} from "framer-motion";
import MotionButton from "../ui/motionButton";
import {colours} from "../../utils/mappings";
import {useSelectedDice} from "../../providers/selectedDiceContext";

export default function DiceSelector({dice, index}) {
    const {state, dispatch} = useSelectedDice();
    return <>
        <div className={"h-16 w-40 flex flex-row justify-evenly -space-x-8"}>
            <MotionButton onClick={() => {
                dispatch({type: 'decrement', payload: dice});
            }} className="bg-gray-800 z-20 ring ring-2 ring-yellow-500">
                -
            </MotionButton>
            <motion.div animate={{x: 0, opacity: 1}} initial={{x: -50, opacity: 0}} transition={{delay: (index * 0.05)}}
                        className={`w-16 text-center flex justify-center items-center font-bold border border-4 border-yellow-500 bg-gradient-to-br ${colours[dice]}`}>
                <motion.p>{state[dice] || 0}</motion.p>
            </motion.div>
            <MotionButton onClick={() => {
                dispatch({type: 'increment', payload: dice});
            }} className="bg-gray-800 z-20 ring ring-2 ring-yellow-500">
                +
            </MotionButton>
        </div>
    </>
}

