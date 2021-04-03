import {motion} from 'framer-motion'

const variants = {
    initial: {x: 0, sizeY: 128, opacity: 0},
    unnamed: {x: 0, sizeY: 64, opacity: 1},
    named: {x: 0, sizeY: 64, opacity: 1},
}


function Logo({named}) {
    return (<motion.div
        variants={variants} animate={named ? "named" : "unnamed"} initial={"initial"}
        transition={{duration: 2}}
        className="h-32 w-80 bg-cover bg-center"
        style={{backgroundImage: `url("/logo.svg")`}}>
        &nbsp;
    </motion.div>);
}

export default Logo