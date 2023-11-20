export const defaultStateActions = {
    favoriteItems: [],
}

const FETCH_ACTIONS = "FETCH_ACTIONS"

export const favoriteReducer = (state = defaultStateActions, action) => {
    switch (action.type) {
        case "FETCH_FAVORITE":
            return {...state, favoriteItems: [...state.favoriteItems, ...action.payload]}
        case "ADD_FAVORITE":
            return {...state, favoriteItems: [...state.favoriteItems, action.payload]}
        case "REMOVE_FAVORITE":
            return {...state, favoriteItems: state.favoriteItems.filter(barrel => barrel.id !== action.payload)}
        default:
            return state
    }
}

export const addActionAction = (payload) => ({type: FETCH_ACTIONS, payload})