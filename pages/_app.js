import '../src/styles/globals.css'
import {SelectedDiceProvider} from "../src/providers/selectedDiceContext";
import {AnimatePresence, motion} from "framer-motion";
import Header from "../src/components/header/header";

const variantsWithOrchestration = {
    initial: {opacity: 0, scale: 1, transition: {duration: 0.35, staggerChildren: 0.5, delayChildren: 0.5, when: "beforeChildren"}},
    animate: {opacity: 1, scale: 1, transition: {duration: 0.35, staggerChildren: 0.5, delayChildren: 0.5, when: "beforeChildren"}},
    exit: {opacity: 0, scale: 1, transition: {duration: 0.35, staggerChildren: 0.5, delayChildren: 0.5, when: "beforeChildren"}},
}

function MyApp({Component, pageProps}) {
    return (
        <motion.main key={"parent"}
                     variants={variantsWithOrchestration}
                     initial={"initial"}
                     animate={"animate"}
                     exit={"exit"}
                     className={"bg-black w-full h-screen text-white container mx-auto"}>
            <SelectedDiceProvider>
                <AnimatePresence>
                    <Component {...pageProps} />
                </AnimatePresence>
            </SelectedDiceProvider>
        </motion.main>
    );
}

export default MyApp