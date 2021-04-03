import isaac from 'isaac';

/**
 * Returns unsigned value between 0.0 and 1.0
 * @returns {0.0, 1.0}
 */
function rand_real() {
    return isaac.random();
}

/**
 * Returns signed 32bit int between -2147483648 (0x00000000) and 2147483647 (0xFFFFFFFF).
 * @returns {*}
 */
function rand_int32() {
    return isaac.rand();
}

export function seed(seed) {
    isaac.seed(seed);
}

/**
 * Returns a value between 0 and 1
 * @returns {0.0|1.0}
 */
export function chance() {
    return rand_real();
}

export function uint() {
    return Math.abs(rand_int32());
}

export function int() {
    return rand_int32();
}

const rng_tools = {
    chance,
    uint,
    int
}

export default rng_tools;