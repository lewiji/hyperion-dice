import Logo from "./logo";
import {PlayerDetails} from "./playerDetails";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {memo, useCallback, useState} from "react";
import {usePlayer} from "../../providers/playerContext";

const variants = {
    initial: {height: 720, scaleX: 0, scaleY: 1.5, opacity: 0},
    animate: {height: 285, scaleX: 1, scaleY: 1, opacity: 1, transition: {type: "spring", stiffness: 70, damping: 10, mass: 0.5}},
    named: {height: 86, scaleX: 1, scaleY: 0.96, opacity: 0.65, transition: {type: "spring", stiffness: 100, damping: 20, mass: 1}},
    exit: {height: 720, scaleX: 0, scaleY: 1.5, opacity: 0}
}

function Header() {
    const {state: player} = usePlayer();

    return <motion.div variants={variants} animate={player?.name !== "" ? "named" : "animate"} initial={"initial"} exit={"exit"}
                       transition={{type: 'spring', stiffness: 150, damping: 20, mass: 1}}
                       className={"flex w-full items-center justify-evenly flex-row overflow-hidden"}>
        <Logo/>
        <PlayerDetails/>
    </motion.div>;
}

const memoHeader = memo(Header);
export default memoHeader;