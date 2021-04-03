import {colours} from "../../utils/mappings";
import DiceFace from "./diceface";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";

export default function DiceGraphic({id, ...props}) {
    const [order, setOrder] = useState(0);
    const [rotation, setRotation] = useState();
    useEffect(() => {
        const chance = Math.random();
        if (chance < 0.25) {
            setRotation(0);
        } else if (chance < 0.5) {
            setRotation(90);
        }
        else if (chance < 0.75) {
            setRotation(180);
        } else if (chance <= 1) {
            setRotation(270);
        } else {
            setRotation(0);
        }
    }, []);
    if (rotation === undefined) return null;
    return <motion.div
        initial={{opacity: 0, scale: 2, y: rotation / 2, x: 30, rotate: rotation}}
        animate={{opacity: 1, scale: 1, y: 0, x: 0, rotate: 360}}
        transition={{type: 'spring', stiffness: 250, damping: 30, mass: 0.3,  delay: id * 0.064}}
        className={`dicegraphic ${colours[props.r.type]} ${`order-${order}`}`}
    >
        <DiceFace dice={props.r.type} result={props.r.value} setOrder={setOrder}/>
    </motion.div>;
}

DiceGraphic.propTypes = {r: PropTypes.any};