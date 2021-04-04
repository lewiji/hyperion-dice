import {faces} from "../../utils/mappings";

export default function RollReducer(acc, val) {
    const face = faces[val?.type][val?.value];
    switch (face) {
        case "s": {
            acc.success += 1;
            break;
        }
        case "sa": {
            acc.success += 1;
            acc.advantage += 1;
            break;
        }
        case "ss": {
            acc.success += 2;
            break;
        }
        case "f": {
            acc.failure += 1;
            break;
        }
        case "ff": {
            acc.failure += 2;
            break;
        }
        case "a": {
            acc.advantage += 1;
            break;
        }
        case "aa": {
            acc.advantage += 2;
            break;
        }
        case "t": {
            acc.threat += 1;
            break;
        }
        case "tf": {
            acc.threat += 1;
            acc.failure += 1;
            break;
        }
        case "tt": {
            acc.threat += 2;
            break;
        }
        case "x": {
            acc.triumph += 1;
            break;
        }
        case "xx": {
            acc.triumph += 2;
            break;
        }
    }
    return acc;
}