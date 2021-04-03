import {useEffect, useRef} from "react";

export function PlayerDetails({onChange}) {
    const inputRef = useRef();
    useEffect(() => {
        if (inputRef && inputRef.current) {
            onChange(inputRef.current.value);
        }
    }, [inputRef]);
    return <div id={"topresult"}>
        <input type={"text"} onChange={(e) => {
            onChange(e.target.value)
        }}  ref={inputRef} className={`md:text-2xl md:font-semibold py-2`} placeholder={"Enter name here..."}/>
    </div>
}