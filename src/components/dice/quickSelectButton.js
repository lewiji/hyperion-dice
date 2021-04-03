import {useCallback} from "react";
import MotionButton from "../ui/motionButton";
import {colours, dice} from "../../utils/mappings";

export default function QuickSelectButton({addCallback, selectedDice, ...props}) {

    const quickAdd = useCallback((dice) => {
        if (addCallback) {
            addCallback(dice);
        }
    }, [addCallback]);

    const AddDice = useCallback(name => {
        return (
            <MotionButton key={name} className={`my-2 md:my-5  md:mx-6 w-36 h-20 bg-gradient-to-br ${colours[name]} `}
                          onClick={() => {quickAdd(name)}}
            >
                {name}<br/> {selectedDice?.[name] ? selectedDice[name] : ''}
            </MotionButton>
        );
    }, [selectedDice, quickAdd]);

    return (
        <div className={"flex justify-center items-center flex-col"}>
            <div className={"font-light text-sm mx-auto text-center"}>quick_selection:</div>
            <div className="lg:w-7/12 mx-auto flex flex-row flex-wrap justify-evenly text-center">
                {dice.map(d => AddDice(d))}
            </div>
        </div>);
}