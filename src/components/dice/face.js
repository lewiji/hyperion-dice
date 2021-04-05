import {faces} from "../../utils/mappings";
import {memo, useEffect, useState} from "react";


function Face({dice, result, setOrder, ...props}) {
    const [letter, setLetter] = useState('');
    const [importance, setImportance] = useState(0);
    useEffect(() => {
        if (dice === undefined || result === undefined) return;
        const face = faces[dice][result];
        if (face !== undefined) {
            setImportance(face.length);
            setOrder(face.length);
            setLetter(face);
        } else {
            console.warn(`unknown face index: [${dice}, ${result}]`);
        }

    }, [dice, result, faces])
    return <div
        className={`dice_face text-xl  ${importance === 0 && "opacity-50 bg-opacity-50"} ${importance === 1 && "text-3xl"} 
    ${importance === 2 && "text-xl font-semibold"}`}>
        {letter}
    </div>;
}

const memoFace = memo(Face);
export default memoFace;