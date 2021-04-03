import {colours} from "../../utils/mappings";
import DiceFace from "./diceface";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useState} from "react";

export default function DiceGraphic({id, ...props}) {
    const [order, setOrder] = useState(0);
    return <motion.div initial={{opacity: 0, scale: 0, rotate: 0}} animate={{opacity: 1, scale: 1, rotate: 360}} transition={{delay: id * 0.1}}
        className={`select-none p-3 text-center w-12 h-12 flex items-center justify-center shadow-xl rounded bg-gradient-to-br 
                         ${colours[props.r.type]} ${`order-${order}`} m-2`}
    >
        <DiceFace dice={props.r.type} result={props.r.value} setOrder={setOrder}/>
    </motion.div>;
}

DiceGraphic.propTypes = {r: PropTypes.any};