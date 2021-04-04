import MotionButton from "../ui/motionButton";
import {colours} from "../../utils/mappings";
import {useSelectedDice} from "../../providers/selectedDiceContext";
import {motion} from "framer-motion";

export default function QuickSelectButton({name, index}) {
    const {state, dispatch} = useSelectedDice();

    return (
        <motion.div animate={{x: 0, y: 0, opacity: 1}} initial={{x: -15, y: -25, opacity: 0}} transition={{delay: (index * 0.02)}}>
            <MotionButton key={name}
                          className={`my-2 mx-2 w-32 px-1 h-20 bg-gradient-to-br hover:bg-gradient-to-bl ${colours[name]} `}
                          onClick={() => {
                              dispatch({type: 'increment', payload: name});
                          }}
            >
                {name}<br/> {state[name]}
            </MotionButton>
        </motion.div>
    );
}