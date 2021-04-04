import '../src/styles/globals.css'
import {SelectedDiceProvider} from "../src/providers/selectedDiceContext";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";

const variantsWithOrchestration = {
    initial: {opacity: 0, scale: 0, transition: {duration: 1, staggerChildren: 0.5, delayChildren: 0.5, when: "beforeChildren"}},
    animate: {opacity: 1, scale: 1, transition: {duration: 1, staggerChildren: 0.5, delayChildren: 0.5, when: "beforeChildren"}},
    exit: {opacity: 0, scale: 1, transition: {duration: 1, staggerChildren: 0.5, delayChildren: 0.5, when: "beforeChildren"}},
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
                    <AnimateSharedLayout>
                        <Component {...pageProps} />
                    </AnimateSharedLayout>
            </SelectedDiceProvider>
        </motion.main>
    );
}

export default MyApp