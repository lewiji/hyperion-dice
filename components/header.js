import Logo from "./ui/logo";
import {PlayerDetails} from "./playerDetails";
import * as PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";

const variants = {
    initial: {
        height: 720,
        scaleX: 0.6,
        opacity: 0
    },
    unnamed: {
        height: 350,
        scaleX: 1,
        opacity: 1,
    },
    named: {
        height: 170,
        scaleX: 1,
        opacity: 1,
    }
}

function Header({onNameChange, ...props}) {
    const [name, setName] = useState('');
    useEffect(() => {
        onNameChange(name);
    }, [name]);
    return <motion.div variants={variants} animate={name === '' ? "unnamed" : "named"} initial={"initial"} transition={{type: 'spring', stiffness: 150, damping: 20, mass: 1}}
                       className={"flex w-full items-center justify-evenly flex-row"}>
        <Logo named={name !== ''}/>
        <PlayerDetails onChange={setName}/>
    </motion.div>;
}

Header.propTypes = {onChange: PropTypes.func};

export default Header;