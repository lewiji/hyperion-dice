import {colours} from "../../utils/mappings";
import Face from "./face";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {memo, useEffect, useState} from "react";

const variants = {
    initial: {
        opacity: 0, scale: 0, y: 16, x: -120, rotate: 0
    },
    animate: id => ({
        opacity: 1, scale: 1, y: 0, x: 0, rotate: 360,
        transition: {type: 'spring', stiffness: 220, damping: 20, mass: 1, delay: 0.05 + id * 0.04}
    }),
    exit: {
        opacity: 0, scale: 0.5, y: 64
    }
}

const hoverState = {scale: 1.18, transition: {type: "spring", stiffness: 750, damping: 20, mass: 1}};

function Body({id, ...props}) {
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
        variants={variants}
        custom={id}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        whileHover={hoverState}
        className={`dice_graphic ${colours[props.r.type]} ${`order-${order}`}`}
    >
        <Face dice={props.r.type} result={props.r.value} setOrder={setOrder}/>
    </motion.div>;
}

Body.propTypes = {r: PropTypes.any};

const memoBody = memo(Body);
export default memoBody;