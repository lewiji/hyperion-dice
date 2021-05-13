import rng_tools from "./rng";

export function RollDice(name, maxVal, quantity) {
    const results = [];
    for (let i = 0; i < quantity; i++) {
        const face = Math.floor(rng_tools.chance() * maxVal);
        results.push({type: name, value: face});
    }
    return results;
}