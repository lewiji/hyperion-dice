import {useEffect, useRef} from "react";

export function PlayerDetails({name, onChange}) {
    const inputRef = useRef();
    useEffect(() => {
        const localName = window.localStorage.getItem('name');
        const parsedName = localName !== null
            ? JSON.parse(localName)
            : "";

        onChange(parsedName);
    }, []);

    return <div>
        <input type={"text"} onChange={(e) => {
            onChange(e.target.value)
        }} value={name}
               ref={inputRef} className={`md:text-2xl md:font-semibold py-2`} placeholder={"Enter name here..."}/>
    </div>
}