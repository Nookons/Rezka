export const defaultStateActions = {
    user: null,
}

const FETCH_USER = "FETCH_USER"
const SIGN_IN = "SIGN_IN"

export const userReducer = (state = defaultStateActions, action) => {
    switch (action.type) {
        case "FETCH_USER":
            return {...state, user: { ...action.payload } }
        case "SIGN_IN":
            return {...state, user: { ...action.payload } }
        default:
            return state
    }
}

export const getUserAction      = (payload) => ({type: FETCH_USER, payload})
export const userSignInAction   = (payload) => ({type: SIGN_IN, payload})