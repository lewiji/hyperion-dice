import DiceSelector from "./manualSelector";

function DiceType({dice, quickAdd, onChange, index, ...props}) {
    return <div className={"flex flex-col justify-between items-center"}>
        <p className={"text-sm mb-1"}>{dice}</p>
        <DiceSelector dice={dice} quickAdd={quickAdd} onChange={onChange} index={index}/>
    </div>
}

export default DiceType;