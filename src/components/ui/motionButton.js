import {motion} from "framer-motion";

export default function MotionButton({disabled, ...props}) {
    return <motion.button
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        transition={{type: "spring", stiffness: 500, damping: 50, mass: 1}}
        className={`${props?.className} ${disabled ? "hover:cursor-default hover:shadow-none " +
            "hover:font-bold hover:ring-2 hover:ring-offset-0 hover:ring-blue-900" : ""}`}
        onClick={props?.onClick}
        whileHover={{scale: disabled ? 1 : 1.1}}
        whileTap={{scale: disabled ? 1 : 0.86}}
        disabled={disabled}
        style={{opacity: disabled ? "0.5" : "1"}}
    >
            {props?.children}
    </motion.button>
}