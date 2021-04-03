import {colours} from "../../utils/mappings";
import Face from "./face";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";

export default function Body({id, ...props}) {
    const [order, setOrder] = useState(0);
    const [rotation, setRotation] = useState();
    useEffect(() => {
        const chance = Math.random();
        if (chance < 0.25) {
            setRotation(0);
        } else if (chance < 0.5) {
            setRotation(90);
        } else if (chance < 0.75) {
            setRotation(180);
        } else if (chance <= 1) {
            setRotation(270);
        } else {
            setRotation(0);
        }
    }, []);
    if (rotation === undefined) return null;
    return <motion.div
        initial={{opacity: 0, scale: 1.1, y: 16, x: -72, rotate: rotation}}
        animate={{opacity: 1, scale: 1, y: 0, x: 0, rotate: 360}}
        transition={{type: 'spring', stiffness: 250, damping: 14, mass: 0.5, delay: id * 0.042}}
        className={`dice_graphic ${colours[props.r.type]} ${`order-${order}`}`}
    >
        <Face dice={props.r.type} result={props.r.value} setOrder={setOrder}/>
    </motion.div>;
}

Body.propTypes = {r: PropTypes.any};