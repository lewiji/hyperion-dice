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
            <MotionButton key={name}
                          className={`my-2 mx-2 w-32 px-1 h-20 bg-gradient-to-br hover:bg-gradient-to-bl ${colours[name]} `}
                          onClick={() => {
                              quickAdd(name)
                          }}
            >
                {name}<br/> {selectedDice?.[name] ? selectedDice[name] : ''}
            </MotionButton>
        );
    }, [selectedDice, quickAdd]);

    return (
        <div className={"flex justify-center items-center flex-col -mt-8"}>
            <div className="lg:w-7/12 mx-auto flex flex-row flex-wrap justify-center text-center">
                {dice.map(d => AddDice(d))}
            </div>
        </div>
    );
}