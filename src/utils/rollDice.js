import rng_tools from "./rng";

export function RollDice(name, maxVal, quantity) {
    const results = [];
    for (let i = 0; i < quantity; i++) {
        results.push({type: name, value: Math.floor(rng_tools.chance() * maxVal)});
    }

    return results;
}