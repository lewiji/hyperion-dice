import DiceSelector from "./selector";

function DiceType({dice, quickAdd, onChange, index, numSelected, props}) {
    return <div className={"flex flex-col justify-between items-center m-3 my-5"}>
        <p className={"text-sm mb-2"}>{dice}</p>
        <DiceSelector dice={dice} quickAdd={quickAdd} onChange={onChange} index={index} />
    </div>
}

export default DiceType;