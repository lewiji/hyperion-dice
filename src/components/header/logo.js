import {motion} from 'framer-motion'

const variants = {
    initial: {x: 0, sizeY: 128, opacity: 0},
    animate: {x: 0, sizeY: 52, opacity: 1},
    exit: {x: 0, sizeY: 0, opacity: 0},
}


function Logo({named}) {
    return (<motion.div
        variants={variants}
        animate={"animate"}
        initial={"initial"}
        exit={"exit"}
        transition={{duration: 0.5}}
        className="h-32 w-80 bg-cover bg-center"
        style={{backgroundImage: `url("/logo.svg")`}}/>);
}

export default Logo