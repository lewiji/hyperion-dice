export const dice = ["ability", "difficulty", "boost", "force", "proficiency", "challenge", "setback"];

export const colours = {
    "ability": "from-green-400 to-green-600 text-black",
    "difficulty": "from-purple-600 to-purple-900",
    "boost":  "from-blue-200 to-blue-500 text-black",
    "force": "bg-white text-black",
    "proficiency": "from-yellow-300 to-yellow-500 text-black",
    "challenge":"from-red-500 to-red-900",
    "setback":  "from-gray-800 to-black-900"
}

export const validFaceLetters = "abcd f st xyz BCD Z"

export const faceToLetter = {
    "advantage": "a",
    "failure": "f",
    "success": "s",
    "threat": "t",
    "triumph": "x",
    "despair": "y",
    "force": "z"
}

export const faces = {
    "difficulty": ["t", "f", "tf", "t", "", "tt", "ff", "t"],
    "ability": ["s", "a", "sa", "ss", "a", "s", "aa", ""],
    "proficiency": ["aa", "a", "aa", "x", "s", "sa", "s", "sa", "ss", "sa", "ss", ""],
    "challenge": ["tt", "t", "tt", "t", "tf", "f", "tf", "f", "ff", "y", "ff", ""],
    "force": ["Z", "zz", "Z", "zz", "Z", "zz", "Z", "z", "Z", "z", "Z", "ZZ"],
    "setback": ["", "", "t", "t", "f", "f", "f", "f", "t", "t", "", ""],
    "boost": ["sa", "a", "aa", "s", "", "", "", "", "a", "s", "aa", "sa"]
}

