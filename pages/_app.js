import '../src/styles/globals.css'
import {SelectedDiceProvider} from "../src/providers/selectedDiceContext";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";

const variantsWithOrchestration = {
    initial: {opacity: 0, scale: 0, transition: {duration: 1, staggerChildren: 0.2, delayChildren: 0.2}},
    animate: {opacity: 1, scale: 1, transition: {duration: 1, staggerChildren: 0.2, delayChildren: 0.2}},
    exit: {opacity: 0, scale: 0, transition: {duration: 1, staggerChildren: 0.2, delayChildren: 0.2}},
}

function MyApp({Component, pageProps}) {
    return (
        <motion.main key={"parent"} variants={variantsWithOrchestration}
                     className={"bg-black w-full h-screen text-white container mx-auto"}>
            <SelectedDiceProvider>
                <AnimatePresence exitBeforeEnter={true}>
                    <AnimateSharedLayout>
                        <Component {...pageProps} />
                    </AnimateSharedLayout>
                </AnimatePresence>
            </SelectedDiceProvider>
        </motion.main>
    );
}

export default MyApp