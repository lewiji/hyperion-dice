import {dice} from "../../utils/mappings";
import QuickSelectButton from "./quickSelectButton";
import {motion} from "framer-motion";
export default function QuickSelectButtons({selectedDice}) {
    return (<>
        <motion.div animate={{opacity: 1, scaleX: 1}} initial={{opacity: 0, scaleX: 0.5}} exit={{opacity: 0}} transition={{duration: 0.12}}
                    className={"component_title"}>_quick_select
        </motion.div>
        <div className={"flex justify-center items-center flex-col"}>
            <div className="lg:w-7/12 mx-auto flex flex-row flex-wrap justify-center text-center">
                {dice.map((d, i) => <QuickSelectButton key={d} name={d} index={i}/>)}
            </div>
        </div>
    </>);
}