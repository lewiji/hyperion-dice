import {dice} from "../../utils/mappings";
import QuickSelectButton from "./quickSelectButton";

export default function QuickSelectButtons({selectedDice}) {
    return (<>
        <p className={"component_title"}>_quick_select</p>
        <div className={"flex justify-center items-center flex-col"}>
            <div className="lg:w-7/12 mx-auto flex flex-row flex-wrap justify-center text-center">
                {dice.map((d, i) => <QuickSelectButton key={d} name={d} index={i}/>)}
            </div>
        </div>
    </>);
}