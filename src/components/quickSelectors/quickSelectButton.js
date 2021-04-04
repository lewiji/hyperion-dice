import MotionButton from "../ui/motionButton";
import {colours} from "../../utils/mappings";
import {useSelectedDice} from "../../providers/selectedDiceContext";
import {useEffect, useState} from "react";

export default function QuickSelectButton({name}) {
    const {state, dispatch} = useSelectedDice();

    return (
        <MotionButton key={name}
                      className={`my-2 mx-2 w-32 px-1 h-20 bg-gradient-to-br hover:bg-gradient-to-bl ${colours[name]} `}
                      onClick={() => {
                          dispatch({type: 'increment', payload: name});
                      }}
        >
            {name}<br/> {state[name]}
        </MotionButton>
    );
}