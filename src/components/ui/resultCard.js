import * as PropTypes from "prop-types";

function renderDataHumanReadable(reduction) {
    const success = reduction.success - reduction.failure;
    const advantage = reduction.advantage - reduction.threat;
    const triumph = reduction.triumph - reduction.despair;
    const force = reduction.force;
    let out = [];

    if (triumph > 0) out.push(`${triumph} triumph`);
    if (force > 0) out.push(`${force} force`);
    if (success > -1) out.push(`${success} success`);
    else if (triumph < 1) out.push(`${Math.abs(success)} failure`)
    if (advantage > 0) out.push(`${advantage} advantage`);
    else if (advantage < 0) out.push(`${Math.abs(advantage)} threat`);

    return `${out.join(", ")}`;
}

export default function ResultCard({body, reducer, ...props}) {
    return <div className={`p-2 bg-gradient-to-tl from-gray-900 to-indigo-900 rounded-lg my-4 overflow-hidden`}>
        <p className={"text-sm font-light ml-2"}>{props.v.name}</p>
        <div className={"flex flex-row flex-wrap justify-center my-2"}>
            {props.v.results?.map(body)}
        </div>
        <p className={"text-center p-1 bg-black rounded-lg"}>
            {renderDataHumanReadable(props.v.results?.reduce(reducer, props.initialState))}</p>
    </div>;
}

ResultCard.propTypes = {
    v: PropTypes.any,
    prop1: PropTypes.func,
    prop2: PropTypes.func,
    initialState: PropTypes.shape({
        triumph: PropTypes.number,
        success: PropTypes.number,
        failure: PropTypes.number,
        advantage: PropTypes.number,
        force: PropTypes.number,
        threat: PropTypes.number,
        despair: PropTypes.number
    })
};