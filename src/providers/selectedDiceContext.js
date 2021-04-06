import {createContext, useContext, useReducer} from "react";

const SelectedDiceContext = createContext(undefined);

function selectedDiceReducer(state, action) {
    switch (action.type) {
        case 'increment': {
            const dice_type = action.payload;
            if (typeof dice_type === "string") {
                if (state[dice_type] === undefined) {
                    return {...state, [dice_type]: 1};
                } else {
                    return {...state, [dice_type]: state[dice_type] + 1};
                }
            } else {
                throw new Error(`Unknown dice type: ${action.payload}`);
            }
        }
        case 'decrement': {
            const dice_type = action.payload;
            if (typeof dice_type === "string" && state[dice_type] !== undefined) {
                const newVal = Math.max(0, state[dice_type] - 1);
                return {...state, [dice_type]: newVal};
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

export function SelectedDiceProvider({children}) {
    const [state, dispatch] = useReducer(selectedDiceReducer, {});
    const value = {state, dispatch};
    return <SelectedDiceContext.Provider value={value}>{children}</SelectedDiceContext.Provider>;
}

export function useSelectedDice() {
    const context = useContext(SelectedDiceContext);
    if (context === undefined) {
        throw new Error('useSelectedDice must be used within a CountProvider');
    }
    return context;
}