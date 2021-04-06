import {useEffect, useRef} from "react";
import {usePlayer} from "../../providers/playerContext";

export function PlayerDetails() {
    const inputRef = useRef();
    const {state, dispatch} = usePlayer();
    useEffect(() => {
        const localName = window.localStorage.getItem('name');
        const parsedName = localName !== null
            ? JSON.parse(localName)
            : "";

        dispatch({type: "setName", payload: {name: parsedName}});
    }, []);

    return <div>
        <input type={"text"} onChange={(e) => {
            dispatch({type: "setName", payload: {name: e?.target?.value}});
        }} value={state?.name}
               ref={inputRef} className={`md:text-2xl md:font-semibold py-2`} placeholder={"Enter name here..."}/>
    </div>
}