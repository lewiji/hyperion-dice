import {dice} from "../../utils/mappings";
import QuickSelectButton from "./quickSelectButton";

export default function QuickSelectButtons({selectedDice, ...props}) {
    return (
        <div className={"flex justify-center items-center flex-col -mt-8"}>
            <div className="lg:w-7/12 mx-auto flex flex-row flex-wrap justify-center text-center">
                {dice.map(d => <QuickSelectButton key={d} name={d}/>)}
            </div>
        </div>
    );
}