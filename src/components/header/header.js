import Logo from "./logo";
import {PlayerDetails} from "./playerDetails";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";

const variants = {
    initial: {height: 720, scaleX: 0, scaleY: 1.5, opacity: 0},
    animate: {height: 285, scaleX: 1, scaleY: 1, opacity: 1, transition: {type: "spring", stiffness: 70, damping: 10, mass: 0.5}},
    named: {height: 86, scaleX: 1, scaleY: 0.96, opacity: 0.65, transition: {type: "spring", stiffness: 100, damping: 20, mass: 1}},
    exit: {height: 720, scaleX: 0, scaleY: 1.5, opacity: 0}
}

function Header({onNameChange, ...props}) {
    const [name, setName] = useState('');
    useEffect(() => {
        onNameChange(name);
    }, [name]);
    return <motion.div variants={variants} animate={name === '' ? "animate" : "named"} initial={"initial"} exit={"exit"}
                       transition={{type: 'spring', stiffness: 150, damping: 20, mass: 1}}
                       className={"flex w-full items-center justify-evenly flex-row"}>
        <Logo named={name !== ''}/>
        <PlayerDetails onChange={setName}/>
    </motion.div>;
}

Header.propTypes = {onNameChange: PropTypes.func};

export default Header;