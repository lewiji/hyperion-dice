import {createContext, useContext, useReducer} from "react";

const PlayerContext = createContext(undefined);

function playerReducer(state, action) {
    switch (action.type) {
        case 'setName': {
            const {name} = action.payload;
            if (typeof name === "string" || name === undefined) {
                window.localStorage.setItem('name', JSON.stringify(name || ""));
                return {...state, name};
            }
            return state;
        }
        case 'setFbId': {
            const {uid} = action.payload;
            if (typeof uid === "string" || uid === undefined) {
                console.info(`setting fbId ${uid}`);
                return {...state, fbId: uid};
            }
            return state;
        }
        case 'reset': {
            return {};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export function PlayerProvider({children}) {
    const [state, dispatch] = useReducer(playerReducer, {});
    const value = {state, dispatch};
    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}