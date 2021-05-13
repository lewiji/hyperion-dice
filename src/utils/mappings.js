/* die names (the names in german) */
export const dice = [
    "ability", "difficulty", "boost", "force", "proficiency", "challenge", "setback"
];
/* number of sides for each type */
export const numSides = {
    "ability": 8,    "difficulty": 8,
    "boost": 6,    "force": 12,
    "proficiency": 12,    "challenge": 12,
    "setback": 6,
};
/* a = advantage, b = boost, some of them idk what they are but* they're  what you
   type to get the dice symbols from the custom EotE font */
export const validFaceLetters = "abcd f st xyz BCD Z"
/* what do the `validFaceLetters` map to in actual human form bcuz wtf */
export const faceToLetter = {
    "advantage": "a",
    "failure": "f",
    "success": "s",
    "threat": "t",
    "triumph": "x",
    "despair": "y",
    "force": "z"
};
/* used this `printable dice symbols` image as a reference for this table of* faces
for each type. rolling the dice will lookup one of these faces to give a result */
export const faces = {
    "difficulty": ["t", "f", "tf", "t", "", "tt", "ff", "t"],
    "ability": ["s", "a", "sa", "ss", "a", "s", "aa", ""],
    "proficiency": ["aa", "a", "aa", "x", "s", "sa", "s", "sa", "ss", "sa", "ss", ""],
    "challenge": ["tt", "t", "tt", "t", "tf", "f", "tf", "f", "ff", "y", "ff", ""],
    "force": ["Z", "zz", "Z", "zz", "Z", "zz", "Z", "z", "Z", "z", "Z", "ZZ"],
    "setback": ["", "", "t", "t", "f", "f", "f", "f", "t", "t", "", ""],
    "boost": ["sa", "a", "aa", "s", "", "", "", "", "a", "s", "aa", "sa"]
};

/* colours for the dice */
export const colours = {
    "ability": "from-green-400 to-green-600 text-black",
    "difficulty": "from-purple-600 to-purple-900",
    "boost": "from-blue-200 to-blue-500 text-black",
    "force": "from-white to-gray-300 text-black",
    "proficiency": "from-yellow-300 to-yellow-500 text-black",
    "challenge": "from-red-500 to-red-900",
    "setback": "from-gray-800 to-black"
};