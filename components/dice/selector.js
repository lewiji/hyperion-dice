import {useEffect, useReducer, useState} from "react";
import useFirebase from "../../hooks/useFirebase";
import MotionButton from "../motionButton";
import {motion, useAnimation} from "framer-motion";
import {colours} from "../../utils/mappings";

export default function DiceSelector({dice, quickAdd, onChange, index, PageProps}) {
    const [state, dispatch] = useReducer(reducer, initialState, (({numDice})=> {return {...initialState, ...numDice}}));
    useEffect(() => {
        if (quickAdd !== undefined && quickAdd === dice) {
            dispatch({type: 'increment'})
        }
        if (quickAdd === -1) {
            dispatch({type: 'set', payload: 0})
        }
    }, [quickAdd]);

    useEffect(() => {
        if (onChange) {
            onChange({type: dice, num: state.numDice});
        }
    }, [state.numDice]);

    return <>
        <div className={"h-16 w-40 flex flex-row justify-evenly -space-x-8"}>
            <MotionButton onClick={() => {
                dispatch({type: 'decrement'})
            }} className="bg-gray-800 z-20 ring ring-2 ring-yellow-500">-
            </MotionButton>
            <motion.div animate={{x: 0, opacity: 1}} initial={{x: -50, opacity: 0}} transition={{delay:(index * 0.05)}} className={`w-16 text-center flex justify-center items-center font-bold border border-4 border-yellow-500 bg-gradient-to-br ${colours[dice]}`}>
                <motion.p>{state.numDice}</motion.p>
            </motion.div>
            <MotionButton onClick={() => {
                dispatch({type: 'increment'})
            }} className="bg-gray-800 z-20 ring ring-2 ring-yellow-500">+
            </MotionButton>
        </div>
    </>
}

const initialState = {numDice: 0};
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {numDice: state.numDice + 1}
        case 'decrement':
            return {numDice: Math.max(0, state.numDice - 1)}
        case 'set':
            return {numDice: Math.max(0, action.payload)};
        default:
            return state;
    }
}

