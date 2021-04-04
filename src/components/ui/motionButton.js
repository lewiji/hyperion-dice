import {motion} from "framer-motion";

export default function MotionButton({disabled, className, onClick, children}) {
    return <motion.button
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        transition={{type: "spring", stiffness: 76, damping: 7, mass: 0.05}}
        className={`${className} ${disabled ? "hover:cursor-default hover:shadow-none " +
            "hover:font-bold hover:ring-2 hover:ring-offset-0 hover:ring-blue-900" : ""}`}
        onClick={onClick}
        whileHover={{scale: disabled ? 1 : 1.02, y: -2}}
        whileTap={{scale: disabled ? 1 : 0.98}}
        disabled={disabled}
        style={{opacity: disabled ? "0.5" : "1"}}
    >
        {children}
    </motion.button>
}